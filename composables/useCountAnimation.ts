// composables/useCountAnimation.ts
import { onMounted, ref, watch } from 'vue';

export function useCountAnimation(
  targetValue: number,
  duration = 1500,
  delay = 0,
  // ✅ Nuxt/Vite এনভায়রনমেন্টের জন্য সঠিক চেক
  testMode = import.meta.env.TEST || import.meta.env.MODE === 'test',
) {
  const displayValue = ref(0);

  // ✅ টেস্ট মোডে সরাসরি ভ্যালু রিটার্ন করুন (অ্যানিমেশন স্কিপ)
  if (testMode) {
    displayValue.value = targetValue;
    return { displayValue };
  }

  const startAnimation = () => {
    // ✅ শুধুমাত্র ক্লায়েন্ট সাইডে রান করুন
    if (!import.meta.client) return;

    setTimeout(() => {
      const startTime = performance.now();
      const startValue = 0;
      const endValue = targetValue;
      const range = endValue - startValue;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // ✅ easeOutCubic ইজিং ফাংশন
        const ease = 1 - Math.pow(1 - progress, 3);
        displayValue.value = Math.round(startValue + ease * range);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
    }, delay);
  };

  // ✅ মাউন্ট হওয়ার পর অ্যানিমেশন শুরু
  onMounted(() => {
    startAnimation();
  });

  // ✅ targetValue পরিবর্তন হলে রি-অ্যানিমেট
  watch(
    () => targetValue,
    () => {
      displayValue.value = 0;
      startAnimation();
    },
  );

  return { displayValue };
}
