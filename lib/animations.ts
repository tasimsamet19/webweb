// Expo-out: hızlı başlar, crisp durur — Apple/premium his
export const easing = [0.16, 1, 0.3, 1] as const;
// Soft-out: section geçişleri için daha yumuşak
export const easingSoft = [0.22, 1, 0.36, 1] as const;

export const defaultTransition = { duration: 0.55, ease: easing };
export const fastTransition = { duration: 0.3, ease: easing };

export const fadeInUp = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

export const fadeInDown = {
  initial: { opacity: 0, y: -12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export const scaleIn = {
  initial: { opacity: 0, scale: 0.94 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.94 },
};

export const slideInLeft = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

// 0.04s stagger — kademe görünmez, derinlik hissi kalır
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.05,
    },
  },
};

export const staggerFast = {
  animate: {
    transition: {
      staggerChildren: 0.03,
      delayChildren: 0.03,
    },
  },
};
