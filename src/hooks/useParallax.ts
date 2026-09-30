import { useState, useEffect, useRef } from 'react';
import { useDeviceOrientation } from './useDeviceOrientation';

export interface ParallaxValues {
  x: number;       // -1 to 1 (horizontal offset)
  y: number;       // -1 to 1 (vertical offset)
  isTouch: boolean;
  hasGyro: boolean;
  requestGyro: () => Promise<boolean>;
}

export function useParallax(): ParallaxValues {
  const [coords, setCoords] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);
  const targetCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const currentCoords = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);

  const gyro = useDeviceOrientation();

  // Check touch capabilities
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsTouchDevice(isTouch);
  }, []);

  // Update target based on mouse or gyro
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized coords centered at (0,0), ranging from -1 to 1
      const normalizedX = (e.clientX / window.innerWidth) * 2 - 1;
      const normalizedY = (e.clientY / window.innerHeight) * 2 - 1;
      targetCoords.current = { x: normalizedX, y: normalizedY };
    };

    // If gyro is actively tilting on mobile, use gyro
    if (gyro.permissionGranted && (Math.abs(gyro.tiltX) > 0.01 || Math.abs(gyro.tiltY) > 0.01)) {
      targetCoords.current = { x: gyro.tiltX, y: gyro.tiltY };
    } else {
      window.addEventListener('mousemove', handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [gyro.tiltX, gyro.tiltY, gyro.permissionGranted]);

  // Smooth lerp loop at 60fps
  useEffect(() => {
    let active = true;

    const tick = () => {
      if (!active) return;

      const factor = 0.08; // Buttery dampening factor
      currentCoords.current.x += (targetCoords.current.x - currentCoords.current.x) * factor;
      currentCoords.current.y += (targetCoords.current.y - currentCoords.current.y) * factor;

      setCoords({
        x: Math.round(currentCoords.current.x * 1000) / 1000,
        y: Math.round(currentCoords.current.y * 1000) / 1000,
      });

      rafId.current = requestAnimationFrame(tick);
    };

    rafId.current = requestAnimationFrame(tick);

    return () => {
      active = false;
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, []);

  return {
    x: coords.x,
    y: coords.y,
    isTouch: isTouchDevice,
    hasGyro: gyro.isAvailable,
    requestGyro: gyro.requestPermission,
  };
}
