displayOrderTable = (createTable) => {
  createTable.forEach((item) => {
    const html = `
      <tr id="${item.Name}">
        <td>${item.Name}</td>
        <td>${item.Type}</td>
        <td>${item.UnitPrice}</td>
      </tr>`;
    document.querySelector(".itemtable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataOrder = async (itemId = 1) => {
  console.log(itemId)
  await fetch(`/api/detail/item/aaa/${itemId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.error);
      displayOrderTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const pageNum = window.location.pathname.split("/")[3];
  console.log(pageNum)
  getDataOrder(pageNum);
});
