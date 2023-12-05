displayOrderTable = (createTable) => {
  createTable.forEach((order) => {
    const html = `
      <tr id="${order.Id}">
        <td><a href="${order.Id}">${order.Id}</a></td>
        <td>${order.OrderAt}</td>
        <td>${order.StoreId}</td>
        <td>${order.UserId}</td>
      </tr>`;
    document.querySelector(".ordertable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataOrder = async (orderId = 1) => {
  console.log(orderId)
  await fetch(`/api/detail/order/aaa/${orderId}`, {
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
  getDataOrder(pageNum);
});
