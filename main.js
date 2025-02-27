const API_KEY = `d560ddbd071c4173a2387aabfcb6084f`;
let newsList = [];

const openNav = () => {
  const sideNav = document.querySelector(".side-menu");
  sideNav.style.width = "250px";
};

const closeNav = () => {
  const sideNav = document.querySelector(".side-menu");
  sideNav.style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  // 클릭 시 검색창을 토글하기 위해 스타일 변경
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

// 아이콘 클릭 시 검색창을 보이도록 하는 클래스 추가
const toggleSearchBox = () => {
  document.body.classList.toggle("search-visible");
};

const getLatestNews = async () => {
  const url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr`
  );
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("aaa", newsList);
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
          <div class="col-lg-4">
            <img class="news-img-size" src="${
              news.urlToImage
            }"onerror="this.onerror=null; this.src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU';"/>
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
          <p>${
            news.summary == null || news.summary == ""
              ? "내용없음"
              : news.summary.length > 200
              ? news.summary.substring(0, 200) + "..."
              : news.summary
          }</p>
            <p>${news.description ? news.description : "설명 없음"}</p>

            <div>${news.rights || "no source"} · ${moment(
        news.publishedAt
      ).fromNow()}</div>

          </div>
        </div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
