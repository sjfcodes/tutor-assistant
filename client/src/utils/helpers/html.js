const preventBodyScroll = (prevent) => {
  const bodyClass = document.querySelector('body').classList;
  if (prevent) return bodyClass.add('is-fixed');
  return bodyClass.remove('is-fixed');
};

export default preventBodyScroll;
