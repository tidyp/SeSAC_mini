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
  console.log(storeId)
  await fetch(`/api/detail/store/aaa/${storeId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data.error);
      displaystoreTable(data); // table
    })
    .catch((err) => {
      console.log("에러", err);
    });
};

document.addEventListener("DOMContentLoaded", () => {
  const pageNum = window.location.pathname.split("/")[3];
  console.log(pageNum)
  getDatastore(pageNum);
});
