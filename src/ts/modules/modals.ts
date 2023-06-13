const modals = (): void => {
  let btnPressed: boolean = false;
  const bindModal = ( triggerSelector, modalSelector, closeSelector, destroy: boolean = false): void => {
    const triggers: NodeListOf<Element> =
      document.querySelectorAll(triggerSelector);
    const modal: HTMLElement | null = document.querySelector(modalSelector);
    const close: Element | null = document.querySelector(closeSelector);
    const windows: NodeListOf<HTMLElement> = document.querySelectorAll("[data-modal]");

    if (!modal) {
      return;
    }

    const closeModal = (): void => {
      modal!.style.display = "none";
      document.body.style.overflow = "";
      document.body.style.marginRight = "0px";
    };

    triggers.forEach(btns => {
      btns.addEventListener("click", (e: Event) => {
        if (e.target) {
          e.preventDefault();
        }

        btnPressed = true;

        if (destroy) {
          btns.remove();
        }

        windows.forEach((window) => {
          window.style.display = "none";
          window.classList.add('animated', 'fadeIn');
        });

        modal!.style.display = "block";
        document.body.style.overflow = "hidden";
        document.body.style.marginRight = `${scroll}px`;
      });
    });

    close!.addEventListener("click", () => {
      windows.forEach((window) => {
        window.style.display = "none";
      });

      closeModal();
    });

    modal!.addEventListener("click", (e: Event) => {
      if (e.target === modal) {
        windows.forEach((window) => {
          window.style.display = "none";
        });

        closeModal();
      }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        closeModal();
      }
    });
  };

  const showModalByTime = (selector: string, time: number): void => {
    setTimeout(function () {
      let display: string = "";

      document.querySelectorAll("[data-modal]").forEach((window: Element) => {
        if (getComputedStyle(window).display !== "none") {
          display = "block";
        }
      });

      if (!display) {
        const window: HTMLElement | null = document.querySelector(".popup-content");
        window?.classList.add('animated', 'fadeIn');
        document.querySelector<HTMLElement>(selector)!.style.display = "block";
        document.body.style.overflow = "hidden";
      }
    }, time);
  };

  const openByScroll = (selector: string): void => {
    window.addEventListener('scroll', () => {
      if (!btnPressed && window.pageYOffset + document.documentElement.clientHeight + 1 >= document.documentElement.scrollHeight) {
        (document.querySelector(selector) as HTMLElement).click();
      }
    });
  }

  bindModal(".button-design", ".popup-design", ".popup-design .popup-close");
  bindModal(".button-consultation", ".popup-consultation", ".popup-consultation .popup-close");
  bindModal(".fixed-gift", ".popup-gift", ".popup-gift .popup-close", true);
  openByScroll(".fixed-gift");
  showModalByTime(".popup-consultation", 6000);
};

export { modals };
