export default defineNuxtPlugin(() => {
  const html = document.documentElement;
  const savedTheme = localStorage.getItem('theme') || 'light';

  html.classList.toggle('dark', savedTheme === 'dark');
  html.setAttribute('data-theme', savedTheme);
});
