// 버튼표시
const displayPageBtn = (MAXPAGE, currpageNum = 0) => {
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
  document.querySelector("footer").innerHTML = "";
  document.querySelector("footer").insertAdjacentHTML("beforeend", pagebtn);
};
// 총페이지수
const getDataTotal = async (currpage, currpageNum) => {
  await fetch(`/api/count/${currpage}`, {
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

const Laylout = (createTable) => {
  createTable.forEach((user) => {
    const html = `
      <tr id="${user.Id}">
        <td><a href="/crm/userDetail/${user.Id}">${user.Id}</a></td>
        <td>${user.Name}</td>
        <td>${user.Gender}</td>
        <td>${user.Age}</td>
        <td>${user.Birthdate}</td>
        <td>${user.Address}</td>
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

const currBar = (currpage) => {
  document.getElementById(`${currpage}`).classList.add("active");
};

// 페이지 load시 실행
document.addEventListener("DOMContentLoaded", () => {
  const currpage = window.location.pathname.split("/")[2]; // page: users, orders, orderitems, items, stores
  const currpageNum = window.location.pathname.split("/")[3]; // pageNum = 1, 2, 3, 4....
  currBar(currpage);
  displayTable(currpage, currpageNum);
  getDataTotal(currpage, currpageNum);
});
