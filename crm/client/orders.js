const currBar = (currpage) => {
  document.getElementById(`${currpage}`).classList.add("active");
};

const Laylout = (createTable) => {
  createTable.forEach((order) => {
    const html = `
    <tr id=${order.Id}>
    <td><a href="/orderDetail/${order.Id}">${order.Id}</a></td>
    <td>${order.OrderAt}</td>
    <td>${order.StoreId}</td>
    <td>${order.UserId}</td>
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
