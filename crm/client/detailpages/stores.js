const Laylout = async (data) => {
  await data.infoheader.forEach((header) => {
    const html = `<th>${header.Field}</th>`;
    document.querySelector(".thead1").insertAdjacentHTML("beforeend", html);
  });

  await data.infobody.forEach((body) => {
    const keys = Object.keys(body);
    const html = `
    <tr id="${body.Id}">
      ${keys.map((key, index) => `${`<td>${body[key]}</td>`}`).join("")}
    </tr>`;
    document.querySelector(".tbody1").insertAdjacentHTML("beforeend", html);
  });

  await data.stores_month_sales.forEach((body) => {
    const keys = Object.keys(body);
    const html = `<tr id="${body.Id}">
      ${keys
        .map(
          (key, index) => `
        ${
          index === 0
            ? `<td><a href="?month=${body[key]}/">${body[key]}</a></td>`
            : `<td>${body[key]}</td>`
        }
      `
        )
        .join("")}
    </tr>
    `;
    document.querySelector(".tbody2").insertAdjacentHTML("beforeend", html);
  });

  await data.vip.forEach((body) => {
    const keys = Object.keys(body);
    const html = `<tr id="${body.Id}">
      ${keys
        .map(
          (key, index) =>
            `${
              index === 0
                ? `<td><a href="../../users/detail/${body[key]}/">${body[key]}</a></td>`
                : `<td>${body[key]}</td>`
            }`
        )
        .join("")}
    </tr>
    `;
    document.querySelector(".tbody3").insertAdjacentHTML("beforeend", html);
  });
};

const getData = async (page, pageId) => {
  // await fetch(`/api/stores/detail/${pageId}?month=${pageMonth}`, {
  await fetch(`/api/stores/detail/${pageId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      Laylout(data);
    });
};

// 현재 페이지 확인
const currBar = (currpage) => {
  document.getElementById(`${currpage}`).classList.add("active");
};

// 페이지 load시 실행
document.addEventListener("DOMContentLoaded", async () => {
  const currpage = window.location.pathname.split("/")[2];
  const pageId = window.location.pathname.split("/")[4];

  // console.log(window.location.search);

  await getData(currpage, pageId);
  await currBar(currpage);
});
