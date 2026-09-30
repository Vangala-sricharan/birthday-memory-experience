import { useState, useEffect, useCallback } from 'react';

export interface DeviceOrientationState {
  tiltX: number; // -1 to 1 (left / right)
  tiltY: number; // -1 to 1 (forward / backward)
  gamma: number; // Raw gamma
  beta: number;  // Raw beta
  isAvailable: boolean;
  permissionGranted: boolean;
  requestPermission: () => Promise<boolean>;
}

export function useDeviceOrientation(): DeviceOrientationState {
  const [tiltX, setTiltX] = useState<number>(0);
  const [tiltY, setTiltY] = useState<number>(0);
  const [rawGamma, setRawGamma] = useState<number>(0);
  const [rawBeta, setRawBeta] = useState<number>(0);
  const [isAvailable, setIsAvailable] = useState<boolean>(false);
  const [permissionGranted, setPermissionGranted] = useState<boolean>(false);

  const handleOrientation = useCallback((event: DeviceOrientationEvent) => {
    if (event.gamma === null || event.beta === null) return;

    // gamma: -90 to 90 (left to right tilt)
    // beta: -180 to 180 (front to back tilt)
    const gamma = Math.max(-45, Math.min(45, event.gamma));
    const beta = Math.max(-45, Math.min(45, event.beta - 45)); // Adjusted for typical holding angle ~45deg

    // Normalized to -1 .. +1 with soft scaling
    const normalizedX = gamma / 45;
    const normalizedY = beta / 45;

    setRawGamma(event.gamma);
    setRawBeta(event.beta);
    setTiltX(normalizedX);
    setTiltY(normalizedY);
  }, []);

  const requestPermission = useCallback(async (): Promise<boolean> => {
    // Check for iOS 13+ permission API
    if (
      typeof window !== 'undefined' &&
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => Promise<string> }).requestPermission === 'function'
    ) {
      try {
        const response = await (DeviceOrientationEvent as unknown as { requestPermission: () => Promise<string> }).requestPermission();
        if (response === 'granted') {
          setPermissionGranted(true);
          window.addEventListener('deviceorientation', handleOrientation);
          return true;
        }
        return false;
      } catch (err) {
        console.warn('DeviceOrientation permission request failed:', err);
        return false;
      }
    } else {
      // Android and standard browsers without explicit permission prompt
      setPermissionGranted(true);
      window.addEventListener('deviceorientation', handleOrientation);
      return true;
    }
  }, [handleOrientation]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const hasOrientationEvent = 'DeviceOrientationEvent' in window;
    setIsAvailable(hasOrientationEvent);

    // Auto-listen if permission request is not required (e.g., Chrome Android)
    const isIOSPermissionNeeded =
      typeof (DeviceOrientationEvent as unknown as { requestPermission?: () => unknown }).requestPermission === 'function';

    if (hasOrientationEvent && !isIOSPermissionNeeded) {
      window.addEventListener('deviceorientation', handleOrientation);
      setPermissionGranted(true);
    }

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, [handleOrientation]);

  return {
    tiltX,
    tiltY,
    gamma: rawGamma,
    beta: rawBeta,
    isAvailable,
    permissionGranted,
    requestPermission
  };
}
