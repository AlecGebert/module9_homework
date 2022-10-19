function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      data = JSON.parse(xhr.response);
      console.log(data);
      if (callback) {
        callback(data);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };

  xhr.send();
}

let output = document.querySelector("#output");
let inputOne = document.querySelector("#inputOne");
let inputTwo = document.querySelector("#inputTwo");
let button = document.querySelector("#button");

/**
 * Функция обработки полученного результата
 * apiData - объект с результатом запроса
 */
function displayResult(apiData) {
  if (
    inputOne.value < 100 ||
    inputOne.value > 500 ||
    inputTwo.value < 100 ||
    inputTwo.value > 500
  ) {
    output.innerHTML = "Число вне диапазона от 100 до 500!";
  } else {
    output.innerHTML = `
        <div class="card">
          <img
            src="${apiData.file}" width="${inputOne.value}" hight="${inputTwo.value}"
            class="card-image"
          />
        </div>
      `;
  }
}

// Вешаем обработчик на кнопку для запроса
button.addEventListener("click", () => {
  useRequest(` http://aws.random.cat/meow`, displayResult);
});
