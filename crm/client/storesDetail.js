displaystoreTable = (createTable) => {
  createTable.forEach((store) => {
    const html = `
      <tr id="${store.Id}">
        <td><a href="${store.Id}">${store.Id}</a></td>
        <td>${store.Name}</td>
        <td>${store.Type}</td>
        <td>${store.Address}</td>
      </tr>`;
    document.querySelector(".storetable").insertAdjacentHTML("beforeend", html);
  });
};

const getDatastore = async (storeId = 1) => {
  console.log(storeId);
  await fetch(`/api/detail/store/aaa/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displaystoreTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

displaystoreTableSale = (createTable) => {
  createTable.forEach((store) => {
    // <td><a href="?month=${store.Month}">${store.Month}</a></td>
    const html = `
      <tr>
        <td>${store.Month}</td>
        <td>${store.Total_Revenue}</td>
        <td>${store.Item_Count}</td>
      </tr>`;
    document
      .querySelector(".month_sales_table")
      .insertAdjacentHTML("beforeend", html);
  });
};

const getDatastoreSalesTable = async (storeId, month) => {
  console.log(window.location.pathname);
  console.log(window.location.search);
  await fetch(`/api/detail/store/bbb/${storeId}?month=${month}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displaystoreTableSale(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const pageNum = window.location.pathname.split("/")[3];
  const pageMonth = window.location.search.split("=")[1];
  getDatastore(pageNum);
  getDatastoreSalesTable(pageNum, pageMonth);
});
