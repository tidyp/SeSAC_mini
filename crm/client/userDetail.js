//---------------------
displayUserTable = (createTable) => {
  createTable.forEach((user) => {
    const html = `
      <tr id="${user.Id}">
        <td>${user.Name}</td>
        <td>${user.Gender}</td>
        <td>${user.Age}</td>
        <td>${user.Birthdate}</td>
        <td>${user.Address}</td>
      </tr>`;
    document.querySelector(".usertable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataUser = async (userId = 1) => {
  await fetch(`/api/detail/user/aaa/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayUserTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

//---------------------

displayOrderTable = (createTable) => {
  createTable.forEach((order) => {
    const html = `
    <tr id="${order.Id}">
      <td><a href="/crm/orderDetail/${order.Id}">${order.Id}</a></td>
      <td>${order.OrderAt}</td>
      <td>${order.StoreId}</td>
    </tr>`;
      // <td>${order.UserId}</td>
    document.querySelector(".ordertable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataOrder = async (userId = 1) => {
  await fetch(`/api/detail/user/bbb/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayOrderTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

//---------------------
displayStoreTable = (createTable) => {
  createTable.forEach((store) => {
    const html = `
    <tr id="${store.Id}">
      <td><a href="/crm/storeDetail/${store.Id}">${store.Id}</a></td>
      <td>${store.Name}</td>
      <td>${store.vCount}</td>
    </tr>`;
      // <td>${store.UserId}</td>
    document.querySelector(".storetable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataVisit = async (userId = 1) => {
  await fetch(`/api/detail/user/ccc/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayStoreTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};
//---------------------
displayItemTable = (createTable) => {
  createTable.forEach((item) => {
    const html = `
    <tr id="${item.Id}">
      <td><a href="/crm/itemDetail/${item.Id}">${item.Id}</a></td>
      <td>${item.Name}</td>
      <td>${item.oCount}</td>
    </tr>`;
      // <td>${store.UserId}</td>
    document.querySelector(".itemtable").insertAdjacentHTML("beforeend", html);
  });
};

const getDataItemOrder = async (userId = 1) => {
  await fetch(`/api/detail/user/ddd/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      displayItemTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};



document.addEventListener("DOMContentLoaded", () => {
  const pageNum = window.location.pathname.split("/")[3];
  getDataUser(pageNum);
  getDataOrder(pageNum);
  getDataVisit(pageNum)
  getDataItemOrder(pageNum)
});
