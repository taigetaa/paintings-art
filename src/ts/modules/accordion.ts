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
  // const blocks = document.querySelectorAll(itemsSelector);

  // blocks.forEach(block => {
  //   block.classList.add("animated", "fadeInDown");
  // });

  // if (btns) {
  //   btns.forEach((btn: HTMLElement) => {
  //     btn.addEventListener("click", function () {
  //       if (!this.classList.contains("active")) {
  //         btns.forEach((btn: HTMLElement) => {
  //           btn.classList.remove("active", "active-style");
  //         });
  //         this.classList.add("active", "active-style");
  //       }
  //     });
  //   });
  // }
};

export default accordion;
