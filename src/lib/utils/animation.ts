import { Dir } from "@types/navigation";

export const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];
export const DUR = 0.28;

export const VARIANTS: Record<Dir, { initial: object; animate: object; exit: object }> = {
  forward: { initial: { opacity: 0, x: 22 },   animate: { opacity: 1, x: 0 },  exit: { opacity: 0, x: -22 } },
  back:    { initial: { opacity: 0, x: -22 },   animate: { opacity: 1, x: 0 },  exit: { opacity: 0, x: 22  } },
  up:      { initial: { opacity: 0, y: 32 },    animate: { opacity: 1, y: 0 },  exit: { opacity: 0, y: -24 } },
  down:    { initial: { opacity: 0, y: -24 },   animate: { opacity: 1, y: 0 },  exit: { opacity: 0, y: 32  } },
  fade:    { initial: { opacity: 0, scale: 0.97 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 1.02 } },
};
