export const useTheme = () => {
  const isDark = useState<boolean>('isDark', () => false);

  const setTheme = (mode: 'light' | 'dark') => {
    const html = document.documentElement;

    isDark.value = mode === 'dark';
    html.classList.toggle('dark', isDark.value);
    html.setAttribute('data-theme', mode);

    localStorage.setItem('theme', mode);
  };

  const toggleTheme = () => {
    setTheme(isDark.value ? 'light' : 'dark');
  };

  return {
    isDark,
    toggleTheme,
    setTheme,
  };
};
