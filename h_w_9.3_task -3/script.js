function useRequest(url, callback) {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);

  xhr.onload = function () {
    if (xhr.status != 200) {
      console.log("Статус ответа: ", xhr.status);
    } else {
      data = JSON.parse(xhr.response);

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
let input = document.querySelector("#input");
let button = document.querySelector("#button");

/**
 * Функция обработки полученного результата
 * apiData - объект с результатом запроса
 */
function displayResult(apiData) {
  if (input.value < 1 || input.value > 10) {
    output.innerHTML = "Число вне диапазона от 1 до 10!";
  } else {
    output.innerHTML = `
      <div class="card">
        <img
          src="${apiData.cards[0].image}"
          class="card-image"
        />
      </div>
    `;
  }
}

// Вешаем обработчик на кнопку для запроса
button.addEventListener("click", () => {
  useRequest(
    ` https://deckofcardsapi.com/api/deck/new/draw/?count=${input.value}`,
    displayResult
  );
});
