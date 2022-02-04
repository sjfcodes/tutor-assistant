const preventBodyScroll = (prevent) => {
  const bodyClass = document.querySelector('body').classList;
  if (prevent) return bodyClass.add('is-fixed');
  return bodyClass.remove('is-fixed');
};

const collapseNavbar = () => {
  document.querySelector('.navbar-burger').classList.remove('is-active');
  document.querySelector('.navbar-menu').classList.remove('is-active');
};

export {
  preventBodyScroll,
  collapseNavbar,
};
