const filter = () => {
  const menu: HTMLElement | null = document.querySelector('.portfolio-menu');
  const items: NodeListOf<HTMLElement> = document.querySelectorAll('li');
  const btnAll: HTMLElement | null = document.querySelector('.all');
  const btnLovers: HTMLElement | null = document.querySelector('.lovers');
  const btnChef: HTMLElement | null = document.querySelector('.chef');
  const btnGirl: HTMLElement | null = document.querySelector('.girl');
  const btnGuy: HTMLElement | null = document.querySelector('.guy');
  const btnGrandmother: HTMLElement | null = document.querySelector('.grandmother');
  const btnGranddad: HTMLElement | null = document.querySelector('.granddad');
  const wrapper: HTMLElement | null = document.querySelector('.portfolio-wrapper');
  const markAll: NodeListOf<HTMLElement> = wrapper!.querySelectorAll('.all');
  const markGirl: NodeListOf<HTMLElement> = wrapper!.querySelectorAll('.girl');
  const markLovers: NodeListOf<HTMLElement> = wrapper!.querySelectorAll('.lovers');
  const markChef: NodeListOf<HTMLElement> = wrapper!.querySelectorAll('.chef');
  const markGuy: NodeListOf<HTMLElement> = wrapper!.querySelectorAll('.guy');
  const no: HTMLElement | null = document.querySelector('.portfolio-no');
  
  const typeFilter = (markType?: NodeListOf<HTMLElement>) => {
    if (no) {
        markAll.forEach(mark => {
            mark.style.display = 'none';
            mark.classList.remove('.animated', '.fadeIn');

            no.style.display = 'none';
            mark.classList.remove('.animated', '.fadeIn');

            if (markType) {
                markType.forEach((mark: HTMLElement) => {
                    mark.style.display = 'block';
                    mark.classList.add('animated', 'fadeIn');
                });
            } else {
                no.style.display = 'block';
                no.classList.add('animated', 'fadeIn');
            }
        });
    }

  };

  if (btnAll) {
    btnAll.addEventListener('click', () => {
    typeFilter(markAll);
    });
  }

  btnLovers?.addEventListener('click', () => {
    typeFilter(markLovers);
  });

  btnGuy?.addEventListener('click', () => {
    typeFilter(markGuy);
  });
  
  btnChef?.addEventListener('click', () => {
    typeFilter(markChef);
  });

  btnGirl?.addEventListener('click', () => {
    typeFilter(markGirl);
  });

  btnGrandmother?.addEventListener('click', () => {
    typeFilter();
  });

  btnGranddad?.addEventListener('click', () => {
    typeFilter();
  });

  menu?.addEventListener('click', (e) => {
    const target = e.target as Element;

    if (target && target.tagName === "LI" && items) {
      items.forEach(btn => btn.classList.remove('active'));
      target.classList.add('active');
    }
  });
};

export default filter;
