//import checkNumInputs from '';

const initForms = (): void => {
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
  const inputs: NodeListOf<HTMLInputElement> =
    document.querySelectorAll("input");
  const uploads: NodeListOf<HTMLFormElement> =
    document.querySelectorAll('[name="upload"]');

  // checkNumInputs("input[name='user_phone']");

  const messages = {
    loading: "Загрузка...",
    success: "Скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
    spinner: "./spinner.gif",
    ok: "./ok.png",
    fail: "./fail.png",
  };

  const path = {
    designer: "https://simple-server-cumz.onrender.com/api/data",
    question: "https://simple-server-cumz.onrender.com/api/data",
  };

  const postData = async (url: string, data: string) => {
    const res = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = (): void => {
    inputs.forEach((field: HTMLInputElement) => {
      field.value = "";
    });
    uploads.forEach((item) => {
      if (item.previousElementSibling) {
        item.previousElementSibling.textContent = "Файл не выбран";
      }
    });
  };

  uploads.forEach((item) => {
    item.addEventListener("input", () => {
      const [fileName, fileExt] = item.files[0].name.split(".");
      const dots = fileName.length > 6 ? "..." : ".";
      const name: string = fileName.substring(0, 6) + dots + fileExt[1];
      if (item.previousElementSibling) {
        item.previousElementSibling!.textContent = name;
      }
    });
  });

  forms.forEach((event) => {
    event.addEventListener("submit", (e) => {
      e.preventDefault();

      const statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      event.parentNode!.appendChild(statusMessage);

      event.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        event.style.display = "none";
      }, 400);

      const statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      const textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);

      const api = event.closest(".popup-design") || event.classList.contains("calc_form") ? path.designer : path.question;

      const formData = new FormData(event);
      const jsonObject = Object.fromEntries(formData);
      const file = formData.get("upload");

      const reader = new FileReader();
      reader.onloadend = function () {
        const base64Data = (reader?.result as string).split(",")[1];

        jsonObject.upload = base64Data.slice(0, 10);

        const json = JSON.stringify(jsonObject);

        postData("https://simple-server-cumz.onrender.com/api/data", json)
          .then((res: string) => {
            statusImg.setAttribute("src", messages.ok);
            textMessage.textContent = messages.success;
          })
          .catch(() => {
            statusImg.setAttribute("src", messages.fail);
            textMessage.textContent = messages.failure;
          })
          .finally(() => {
            clearInputs();
            setTimeout(() => {
              statusMessage.remove();
              event.style.display = "block";
              event.classList.remove("fadeOutUp");
              event.classList.add("fadeInUp");
            }, 5000);
          });
      };
      reader.readAsDataURL(file as Blob);
    });
  });
};

export default initForms;
