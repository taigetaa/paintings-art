const accordion = (triggersSelector: string) => {
  const btns: NodeListOf<HTMLElement> = document.querySelectorAll(triggersSelector);

  btns.forEach(btn => {
    btn.addEventListener('click', function() {
      const item: any = this.nextElementSibling;
      this.classList.toggle('active-style');
      item?.classList.toggle('active-content');

      if (this.classList.contains('active-style') && (item)) {
        item.style.maxHeight = item.scrollHeight + 80 + 'px';
      } else if (item) {
        item.style.maxHeight = '0px';
      }
    });
  });
};

export default accordion;
