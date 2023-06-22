//import checkNumInputs from '';

const initForms = (): void => {
  const forms: NodeListOf<HTMLFormElement> = document.querySelectorAll("form");
  const inputs: NodeListOf<HTMLElement> = document.querySelectorAll("input");
  const uploads: NodeListOf<HTMLFormElement> = document.querySelectorAll('[name="upload"]');

  // checkNumInputs("input[name='user_phone']");

  const messages = {
    loading: "Загрузка...",
    success: "Скоро мы с Вами свяжемся!",
    failure: "Что-то пошло не так...",
    spinner: "/src/assets/img/spinner.gif",
    ok: "/src/assets/img/ok.png",
    fail: "/src/assets/img/fail.png",
  };

  const path = {
    designer: "assets/server.php",
    question: "assets/question.php",
  };

  const postData: any = async (url: string, data: any) => {
    let res = await fetch(url, {
      method: "POST",
      body: data,
    });

    return await res.text();
  };

  const clearInputs = (): void => {
    inputs.forEach((field: any) => {
      field.value = "";
    });
    uploads.forEach(item => {
      item.previousElementSibling!.textContent = 'Файл не выбран';
    });
  };

  uploads.forEach(item => {
    item.addEventListener('input', () => {
      console.log(item.files[0]);
      let dots;
      const nameSplit = item.files[0].name.split('.');
      nameSplit[0].length > 6 ? dots = '...' : dots = '.';
      const name: string = nameSplit[0].substring(0, 6) + dots + nameSplit[1];
      item.previousElementSibling!.textContent = name;
    });
  });

  forms.forEach((event) => {
    event.addEventListener("submit", (e) => {
      e.preventDefault();

      let statusMessage = document.createElement("div");
      statusMessage.classList.add("status");
      event.parentNode!.appendChild(statusMessage);

      event.classList.add("animated", "fadeOutUp");
      setTimeout(() => {
        event.style.display = "none";
      }, 400);

      let statusImg = document.createElement("img");
      statusImg.setAttribute("src", messages.spinner);
      statusImg.classList.add("animated", "fadeInUp");
      statusMessage.appendChild(statusImg);

      let textMessage = document.createElement("div");
      textMessage.textContent = messages.loading;
      statusMessage.appendChild(textMessage);

      const formData = new FormData(event);
      const jsonObject = Object.fromEntries(formData);
      const jsonString = JSON.stringify(jsonObject);

      console.log(jsonString);
      let api;
      event.closest(".popup-design") || event.classList.contains('calc_form') ? api = path.designer : (api = path.question);
      console.log(api);

      postData('https://simple-server-cumz.onrender.com/api/data', JSON)
        .then((res: string) => {
          console.log(res);
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
            event.style.display = 'block';
            event.classList.remove('fadeOutUp');
            event.classList.add('fadeInUp');
          }, 5000);
        });
    });
  });
};

export default initForms;
