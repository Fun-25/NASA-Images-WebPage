let input = document.getElementById("search-input");
let form = document.getElementById("search-form");
let btn = document.getElementById("btn");
let imgContainer = document.getElementById("current-image-container");
let ul = document.getElementById("search-history")
let p=document.getElementById("no-search")
let flag;
//To get image of a current date
async function getCurrentImageOfTheDay() {
  let currentDate = new Date().toISOString().split("T")[0];

  let response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${currentDate}&api_key=eCJhzH0wSXl5RTx3HiPrZsV5TFi41Mv485sIc1ZM`
  );
  let data = await response.json();

  imgContainer.innerHTML = `
    <h1>NASA's Picture of the Day</h1>
    <p><a><img src="${data.url}" alt="Spatial-Images" width="50%"></a></p>
    <p>${data.title}</p>
    <p>${data.explanation}</p>
    `;
}
getCurrentImageOfTheDay();

//To get image of a specific date
async function getImageOfTheDay(event, selectedDate, flag) {
  event.preventDefault();

  let specificDate = new Date(selectedDate).toISOString().split("T")[0];

  let response = await fetch(
    `https://api.nasa.gov/planetary/apod?date=${specificDate}&api_key=eCJhzH0wSXl5RTx3HiPrZsV5TFi41Mv485sIc1ZM`
  );
  let data = await response.json();

  imgContainer.innerHTML = `
          <h1>Picture On ${selectedDate}</h1>
          <p><a><img src="${data.url}" alt="Spatial-Images" width="50%"></a></p>
          <p>${data.title}</p>
          <p>${data.explanation}</p>
          `;

  //Save searches to localStorage

  function saveSearch() {
    let imgArray = JSON.parse(localStorage.getItem("searches")) || [];
    let img = {
      date: specificDate,
    };
    let isDuplicate = imgArray.some((item) => item.date === specificDate);

    if (!isDuplicate) {
      {
        imgArray.push(img);
        localStorage.setItem("searches", JSON.stringify(imgArray));
      }
    }
  }

  saveSearch();
  if (flag == 0) addSearchToHistory();
}

form.addEventListener("submit", (event) => {
  let selectedDate = input.value;
  flag = 0;
  getImageOfTheDay(event, selectedDate, flag);
});

//Search History
function addSearchToHistory(flag) {
  flag;
    
  let a = document.createElement("a");
  let list = document.createElement("li");
  a.href = "#";
  list.innerHTML = input.value;
  ul.classList.add("ulElement");
  list.classList.add("list")
  a.setAttribute("class", "link");

  a.appendChild(list);
  ul.insertBefore(a, ul.firstChild);

  a.addEventListener("click", (event) => {
    flag = 1;
    let clickedDate = event.target.innerHTML;
    ul.insertBefore(a, ul.firstChild);
    getImageOfTheDay(event, clickedDate);
  });
}
