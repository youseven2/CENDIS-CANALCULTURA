import { useEffect, useState } from 'react';

export type DeviceCategory = 'mobile' | 'tablet' | 'desktop';

export interface DeviceInfo {
  device: DeviceCategory;
  label: string;
  width: number;
  height: number;
  isPortrait: boolean;
  isTouch: boolean;
}

function detectDevice(): DeviceInfo {
  if (typeof window === 'undefined') {
    return {
      device: 'desktop',
      label: 'Computadora',
      width: 1280,
      height: 800,
      isPortrait: false,
      isTouch: false,
    };
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const isPortrait = height >= width;
  const isTouch =
    window.matchMedia('(pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;

  let device: DeviceCategory = 'desktop';
  let label = 'Computadora';

  if (width < 640) {
    device = 'mobile';
    label = 'Celular';
  } else if (width < 1024 || (isTouch && width <= 1180 && isPortrait)) {
    device = 'tablet';
    label = 'Tablet';
  }

  return {
    device,
    label,
    width,
    height,
    isPortrait,
    isTouch,
  };
}

/**
 * Automatically detects whether the user is on a mobile phone, tablet, or desktop computer
 * and updates reactively on resize or orientation change.
 */
export function useDeviceType(): DeviceInfo {
  const [info, setInfo] = useState<DeviceInfo>(() => detectDevice());

  useEffect(() => {
    const handleUpdate = () => {
      setInfo(detectDevice());
    };

    window.addEventListener('resize', handleUpdate);
    window.addEventListener('orientationchange', handleUpdate);
    return () => {
      window.removeEventListener('resize', handleUpdate);
      window.removeEventListener('orientationchange', handleUpdate);
    };
  }, []);

  return info;
}
