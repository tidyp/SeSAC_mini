// 버튼표시
const displayPageBtn = (MAXPAGE, currpageNum = 0) => {
  const maxPage = +MAXPAGE / 20;
  let prebtn = ``;
  let nextbtn = ``;
  let btnlist = "";

  sbtn = Math.max(1, +currpageNum - 6);
  ebtn = Math.min(maxPage, +currpageNum + 5);

  for (let i = sbtn; i <= ebtn; i++) {
    btnlist += `<div><a href=/crm/users/${i}>${i}</a></div>`;
  }
  if (+currpageNum > 1) {
    prebtn = `<div><a href='${+currpageNum - 1}'>Previous</a></div>`;
  }

  if (+currpageNum < maxPage) {
    nextbtn = `<div><a href='${+currpageNum + 1}'>Previous</a></div>`;
  }

  const pagebtn = prebtn + btnlist + nextbtn;
  document.querySelector("footer").innerHTML = "";
  document.querySelector("footer").insertAdjacentHTML("beforeend", pagebtn);
};
// 총페이지수
const getDataTotal = async (currpage, currpageNum) => {
  await fetch(`/api/${currpage}/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      const MAXPAGE = data[0].MAXPAGE;
      displayPageBtn(MAXPAGE, currpageNum);
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

// ---

const currBar = (currpage) => {
  document.getElementById(`${currpage}`).classList.add("active");
};

const Laylout = (createTable) => {
  createTable.forEach((order) => {
    const html = `
      <tr id="${order.Id}">
        <td><a href="/crm/orderDetail/${order.Id}">${order.Id}</a></td>
        <td>${order.OrderAt}</td>
        <td><a href="/crm/storeDetail/${order.StoreId}">${order.StoreId}</a></td>
        <td><a href="/crm/userDetail/${order.UserId}">${order.UserId}</a></td>
      </tr>`;
    document
      .querySelector(".dispalytable")
      .insertAdjacentHTML("beforeend", html);
  });
};

// 페이지에 맞는 데이터 요청 및 테이블 작성
const displayTable = async (page, pageNum = 1) => {
  await fetch(`/api/${page}/${pageNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Laylout(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

// 페이지 load시 실행
document.addEventListener("DOMContentLoaded", () => {
  const currpage = window.location.pathname.split("/")[2]; // page: users, orders, orderitems, items, stores
  const currpageNum = window.location.pathname.split("/")[3]; // pageNum = 1, 2, 3, 4....
  currBar(currpage);
  displayTable(currpage, currpageNum);
  getDataTotal(currpage, currpageNum);
});
