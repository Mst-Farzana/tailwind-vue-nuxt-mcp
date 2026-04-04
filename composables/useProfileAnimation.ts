import { onMounted, ref } from 'vue';

export function useProfileAnimation(targetValue: number, duration = 1500) {
  const displayValue = ref(0);
  const isAnimating = ref(false);

  const startAnimation = () => {
    if (isAnimating.value || !import.meta.client) return;
    isAnimating.value = true;

    const startTime = Date.now();
    const startValue = 0;
    const range = targetValue - startValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // easeOutCubic
      const ease = 1 - Math.pow(1 - progress, 3);
      displayValue.value = Math.round(startValue + ease * range);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        isAnimating.value = false;
      }
    };

    requestAnimationFrame(animate);
  };

  onMounted(() => {
    startAnimation();
  });

  return {
    displayValue,
    isAnimating,
  };
}
