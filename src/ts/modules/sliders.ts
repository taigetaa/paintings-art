const sliders = (
  slides: string,
  dir: string,
  prev: string,
  next: string
): void => {
  let slideIndex: number = 1;
  let paused: any = false;
  const items: NodeListOf<HTMLElement> = document.querySelectorAll(slides);

  const showSlides = (n: number): void => {
    if (n > items.length) {
      slideIndex = 1;
    }

    if (n < 1) {
      slideIndex = items.length;
    }

    items.forEach((item) => {
      item.classList.add("animated");
      item.style.display = "none";
    });

    if (items[slideIndex - 1]) {
      items[slideIndex - 1].style.display = "block";
    }
  };

  showSlides(slideIndex);

  const changeSlides = (n: number): void => {
    showSlides((slideIndex += n));
  };

  try {
    const prevBtn: HTMLElement | null = document.querySelector(prev);
    const nextBtn: HTMLElement | null = document.querySelector(next);

    prevBtn?.addEventListener("click", () => {
      changeSlides(-1);
      items[slideIndex - 1].classList.remove("slideInLeft");
      items[slideIndex - 1].classList.add("slideInRight");
    });

    nextBtn?.addEventListener("click", () => {
      changeSlides(1);
      items[slideIndex - 1].classList.remove("slideInRight");
      items[slideIndex - 1].classList.add("slideInLeft");
    });
  } catch (error) {}

  const activateAnimation = (): void => {
    if (dir === "vertical") {
      paused = setInterval(() => {
        changeSlides(1);
        items[slideIndex - 1].classList.add("slideInDown");
      }, 3000);
    } else {
      paused = setInterval(() => {
        changeSlides(1);
        items[slideIndex - 1].classList.remove("slideInRight");
        items[slideIndex - 1].classList.add("slideInLeft");
      }, 3000);
    }
  };
  activateAnimation();
  
  items[0].parentNode!.addEventListener('mouseenter', () => {
    clearInterval(paused);
  });
  items[0].parentNode!.addEventListener('mouseleave', () => {
    activateAnimation();
  });
};

export default sliders;
