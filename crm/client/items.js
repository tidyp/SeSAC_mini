displayTable = (createTable) => {
  createTable.forEach((item) => {
    const html = `
      <tr id="${item.Id}">
        <td><a href="#">${item.Name}</a></td>
        <td>${item.Type}</td>
        <td>${item.UnitPrice}</td>
      </tr>`;
    document.querySelector("tbody").insertAdjacentHTML("beforeend", html);
  });
};

displayPageBtn = (pageNum = 0) => {
  // const num = data / 20;
  console.log(pageNum);
  const num = 50;
  let prebtn = ``;
  let nextbtn = ``;
  let btnlist = "";

  sbtn = Math.max(1, +pageNum - 6);
  ebtn = Math.min(50, +pageNum + 5);

  for (let i = sbtn; i <= ebtn; i++) {
    btnlist += `<div><a href=/items/${i}>${i}</a></div>`;
  }
  if (+pageNum > 1) {
    prebtn = `<div><a href='#'>Previous</a></div>`;
  }

  if (+pageNum < 50) {
    nextbtn = `<div><a href='#'>Next</a></div>`;
  }

  const pagebtn = prebtn + btnlist + nextbtn;
  document.querySelector("footer").innerHTML = "";
  document.querySelector("footer").insertAdjacentHTML("beforeend", pagebtn);
};

const getData = async (pageNum = 1) => {
  await fetch(`/api/items/${pageNum}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.error);
      displayTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const pageNum = window.location.pathname.split("/")[2];
  getData(pageNum);
  // displayPageBtn(pageNum);
});
