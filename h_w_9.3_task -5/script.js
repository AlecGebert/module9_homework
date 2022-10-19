/**
 * Функция-обертка над XMLHttpRequest, осуществляющая запрос
 * url - урл, по которому будет осуществляться запрос
 * callback - функция, которая вызовется при успешном выполнении
 * и первым параметром получит объект-результат запроса
 */
let output = document.querySelector("#output");
let buttonClear = document.querySelector("#button-clear");
let inputOne = document.querySelector("#inputOne");
let inputTwo = document.querySelector("#inputTwo");
let button = document.querySelector("#button");
let imageWidth = inputOne.value;
let imageHeight = inputTwo.value;
const apiKey = "Y4VEz0cqKC8pe-HnLQsKx26RUQjllOWfbxEycW2Y3nk";
let numImagesAvailable = 10;
let randomNumber = Math.floor(Math.random() * numImagesAvailable);

function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      const result = JSON.parse(xhr.response);
      if (callback) {
        callback(result);
      }
    }
  };

  xhr.onerror = function () {
    console.log("Ошибка! Статус ответа: ", xhr.status);
  };

  xhr.send();
}

// Вешаем обработчик на кнопку для запроса

document.addEventListener("DOMContentLoaded", () => {
  // Получаем данные по ключу myJSON в localStorage
  const myJSON = localStorage.getItem("myJSON");

  if (myJSON) {
    // Если данные в localStorage есть - просто выводим их
    // output.innerHTML = JSON.parse(myJSON);

    output.innerHTML = JSON.parse(myJSON);
  }
  // console.log("localStorage JSON", JSON.parse(myJSON));
});
button.addEventListener("click", () => {
  // Если данных в localStorage нет - делаем запрос
  useRequest(
    ` https://api.unsplash.com/photos/?per_page=${randomNumber}&client_id=${apiKey}`,
    function (apiData) {
      if (imageWidth < 100 || imageWidth > 500) {
        output.innerHTML = "Ширина картинки вне диапазона от 100 до 500!";
      } else if (imageHeight < 100 || imageHeight > 500) {
        output.innerHTML = "Высота картинки вне диапазона от 100 до 500!";
      } else {
        let cards = "";

        apiData.forEach((item) => {
          let cardBlock = `
                   <div class="card">
                     <img
                       src="${
                         item.urls.raw + `&w=${imageWidth}&h=${imageHeight}`
                       }"
                       class="card-image"
                     />
                   </div>
                 `;
          cards += cardBlock;
        });

        localStorage.setItem("myJSON", JSON.stringify(cards));
        return (output.innerHTML = cards);
      }
    }
  );
});
// Вешаем обработчик на кнопку для очистки localStorage
buttonClear.addEventListener("click", () => {
  localStorage.clear();
  console.log("Данные из localStorage удалены");
});
