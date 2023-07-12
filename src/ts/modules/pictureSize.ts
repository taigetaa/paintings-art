const pictureSize = (imgSelector: string) => {
  const blocks = document.querySelectorAll(imgSelector);

  const showImg = (block: Element) => {
    const img = block!.querySelector("img");
    if (img) {
      const paragraphs: NodeListOf<HTMLElement> | null = block.querySelectorAll("p:not(.size-hit)");
      img.src = img.src.slice(0, -4) + "-1.png";
      paragraphs.forEach(p => {
        if (p) {
          p.style.display = "none";
        }
      });
    }
  };

  const hideImg = (block: Element) => {
    const img = block.querySelector("img");
    if (img) {
      const paragraphs: NodeListOf<HTMLElement> | null = block.querySelectorAll("p:not(.size-hit)");
      img.src = img.src.slice(0, -6) + ".png";
      paragraphs.forEach(p => {
        if (p) {
          p.style.display = "block";
        }
      });
    }
  };

  blocks.forEach(block => {
    block.addEventListener("mouseover", () => {
      showImg(block);
    });

    block.addEventListener("mouseout", () => {
      hideImg(block);
    });
  });
};

export default pictureSize;
