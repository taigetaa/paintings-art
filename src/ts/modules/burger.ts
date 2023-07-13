const burger = (menuSelector: string, burgerSelector: string) => {
  const menuElem: HTMLElement | null = document.querySelector(menuSelector);
  const burgerElem: HTMLElement | null = document.querySelector(burgerSelector);

  if (menuElem && burgerElem) {
    menuElem.style.display = "none";

    burgerElem.addEventListener("click", () => {
        if (menuElem.style.display == 'none' && window.screen.availWidth < 993) {
            menuElem.style.display = "block";
        } else {
            menuElem.style.display = "none";
        }
    });
  }

  window.addEventListener('recize', () => {
    if (menuElem && burgerElem && window.screen.availWidth > 992) {
        menuElem.style.display = 'none';
    }
  });
};

export default burger;
