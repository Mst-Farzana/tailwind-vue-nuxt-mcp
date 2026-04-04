export const useProfile = () => {
  const user = ref(null);
  const loading = ref(true);

  const fetchProfile = async () => {
    user.value = await $fetch('/api/profile');
  };

  return { user, loading, fetchProfile };
};
