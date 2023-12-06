// 페이지이동버튼
const displayPageBtn = ({ MAXPAGE }) => {
  console.log(MAXPAGE);
  const currpageNum = window.location.pathname.split("/")[3]; // pageNum = 1, 2, 3, 4....
  const maxPage = +MAXPAGE / 20;
  let prebtn = ``;
  let nextbtn = ``;
  let btnlist = "";
  sbtn = Math.max(1, +currpageNum - 6);
  ebtn = Math.min(maxPage, +currpageNum + 5);

  for (let i = sbtn; i <= ebtn; i++) {
    if (i == currpageNum) {
      btnlist += `<div><a class='active2' href='${i}'>${i}</a></div>`;
    } else {
      btnlist += `<div><a href='${i}'>${i}</a></div>`;
    }
  }
  if (+currpageNum > 1) {
    prebtn = `<div><a href='${+currpageNum - 1}'>Previous</a></div>`;
  }

  if (+currpageNum < maxPage) {
    nextbtn = `<div><a href='${+currpageNum + 1}'>Next</a></div>`;
  }

  const pagebtn = prebtn + btnlist + nextbtn;
  document.querySelector("footer").insertAdjacentHTML("beforeend", pagebtn);
};

const Laylout = async ({ header, body, totalPage }) => {
  await header.forEach((header) => {
    const html = `<th>${header.Field}</th>`;
    document.querySelector(".thead").insertAdjacentHTML("beforeend", html);
  });

  await body.forEach((body) => {
    const keys = Object.keys(body);
    const html = `
    <tr id="${body.Id}">
      ${keys
        .map(
          (key, index) => `
        ${
          index === 0
            ? `<td><a href="./detail/${body[key]}">${body[key]}</a></td>`
            : `<td>${body[key]}</td>`
        }
      `
        )
        .join("")}
    </tr>
    `;
    document.querySelector(".tbody").insertAdjacentHTML("beforeend", html);
  });
  await displayPageBtn(totalPage[0]);
};

const getData = async (page, pageNum) => {
  await fetch(`/api/${page}/${pageNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      Laylout(data);
    });
};

// 현재 페이지 확인
const currBar = (currpage) => {
  document.getElementById(`${currpage}`).classList.add("active");
};

// 페이지 load시 실행
document.addEventListener("DOMContentLoaded", async () => {
  const currpage = window.location.pathname.split("/")[2]; // page: users, orders, orderitems, items, stores
  const currpageNum = window.location.pathname.split("/")[3]; // pageNum = 1, 2, 3, 4....
  console.log(currpage, currpageNum);
  await getData(currpage, currpageNum);
  await currBar(currpage);
});

let searchValue;

const searchHandler = async () => {
  const currpage = window.location.pathname.split("/")[2]; // page: users, orders, orderitems, items, stores
  const currpageNum = window.location.pathname.split("/")[3]; // pageNum = 1, 2, 3, 4....
  console.log(currpage, currpageNum);

  searchValue = document.getElementById("inputtext").value.trim();
  document.querySelector(".thead").innerHTML = "";
  document.querySelector(".tbody").innerHTML = "";
  await fetch(`/api/${currpage}?name=${searchValue}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Laylout(data);
    })
    .catch((err) => {
      console.log("에러", err);
    });
};
