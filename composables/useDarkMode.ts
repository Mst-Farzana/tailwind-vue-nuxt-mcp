export const useDarkMode = () => {
  const isDark = useState('isDark', () => false);

  const toggleDark = () => {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle('dark', isDark.value);
  };

  return { isDark, toggleDark };
};
