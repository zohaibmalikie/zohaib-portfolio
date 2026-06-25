export const smoothEase = [0.22, 1, 0.36, 1] as [
  number,
  number,
  number,
  number
];

export const revealTransition = {
  duration: 0.72,
  ease: smoothEase
};

export const staggerTransition = {
  staggerChildren: 0.08,
  delayChildren: 0.08
};
