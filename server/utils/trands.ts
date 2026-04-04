export type TrendMeta = {
  color: 'green' | 'yellow' | 'red';
  icon: string;
  icon_bg: string;
};

export const getTrendMeta = (percent: number): TrendMeta => {
  if (percent > 50) {
    return { color: 'green', icon: 'mdi:trending-up', icon_bg: 'bg-emerald-400' };
  }
  if (percent === 50) {
    return { color: 'yellow', icon: 'mdi:arrow-right', icon_bg: 'bg-yellow-400' };
  }
  return { color: 'red', icon: 'mdi:trending-down', icon_bg: 'bg-red-400' };
};
