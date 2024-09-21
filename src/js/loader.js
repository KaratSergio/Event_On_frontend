export const showLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'block';
  }
};

export const hideLoader = () => {
  const loader = document.getElementById('loader');
  if (loader) {
    loader.style.display = 'none';
  }
};
