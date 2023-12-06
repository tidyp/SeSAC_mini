import express from "express";
import db from "../database/mysqldb.js";

const router = express.Router();

// GET: api/table/id
// => table(users, items, orders, stores, orderitmes)
// => id(1,2,3,4,5....)
router.get("/:tableName?/:pageNum?", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const tableName = req.params.tableName;
  const searchName = req.query.name;
  const pageNum = +req.params.pageNum || 1;
  const offset = pageNum === 1 ? 0 : (pageNum - 1) * 20;

  const querytableheader = `show columns from ${tableName};`;

  const querytable = `SELECT * FROM ${tableName}`;
  const querywhere = `WHERE Name LIKE ?`;
  const queryoffset = `LIMIT 20 OFFSET ${offset}`;

  const query = `${querytable} ${searchName ? querywhere : ""} ${queryoffset}`;
  const queryPage = `SELECT COUNT(*) AS MAXPAGE from ${tableName} ${
    searchName ? querywhere : ""
  };`;

  try {
    const [header] = await db.execute(querytableheader);
    const [body] = await db.execute(query, [`%${searchName}%`]);
    const [totalPage] = await db.execute(queryPage, [`%${searchName}%`]);
    res.json({
      header,
      body,
      totalPage,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

router.get("/users/detail/:pageId?", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const pageId = req.params.pageId;

  const query_infoheader = `show columns from users;`;
  const query_infobody = `SELECT * FROM users WHERE Id LIKE ?`;
  const query_orderbody = `SELECT Id, OrderAt, StoreId FROM orders WHERE UserId LIKE ?`;
  const query_orderstorebody = `
  SELECT s.Id, s.Name, count(*) AS vCount 
  FROM users u
  JOIN orders o
    ON u.Id = o.UserId
  JOIN stores s
    ON s.Id = o.storeId
  WHERE u.id LIKE ?
  GROUP BY s.Id, s.Name
  ORDER BY vCount DESC
  LIMIT 5;
  `;
  const query_orderitembody = `
  SELECT i.Id, i.Name, count(*) AS oCount
  FROM users u
  JOIN orders o
    ON u.Id = o.UserId
  JOIN orderitems oi
    ON o.Id = oi.OrderId
  JOIN items i
    ON i.Id = oi.ItemId
  WHERE u.id LIKE ?
  GROUP BY i.Id, i.Name
  ORDER BY oCount DESC
  LIMIT 5;
  `;

  try {
    const [infoheader] = await db.execute(query_infoheader);
    const [infobody] = await db.execute(query_infobody, [`%${pageId}%`]);
    const [orderbody] = await db.execute(query_orderbody, [`%${pageId}%`]);
    const [orderstorebody] = await db.execute(query_orderstorebody, [
      `%${pageId}%`,
    ]);
    const [orderitembody] = await db.execute(query_orderitembody, [
      `%${pageId}%`,
    ]);
    res.json({
      infoheader,
      infobody,
      orderbody,
      orderstorebody,
      orderitembody,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

router.get("/orders/detail/:pageId?", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const pageId = req.params.pageId;

  const query_infoheader = `show columns from orders;`;
  const query_infobody = `SELECT * FROM orders WHERE Id LIKE ?`;

  try {
    const [infoheader] = await db.execute(query_infoheader);
    const [infobody] = await db.execute(query_infobody, [`%${pageId}%`]);

    res.json({
      infoheader,
      infobody,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

router.get("/orderitems/detail/:pageId?", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const pageId = req.params.pageId;

  const query_infoheader = `show columns from orderitems;`;
  const query_infobody = `SELECT * FROM orderitems WHERE Id LIKE ?`;

  try {
    const [infoheader] = await db.execute(query_infoheader);
    const [infobody] = await db.execute(query_infobody, [`%${pageId}%`]);

    res.json({
      infoheader,
      infobody,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

router.get("/items/detail/:pageId?", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const pageId = req.params.pageId;

  const query_infoheader = `show columns from items;`;
  const query_infobody = `SELECT * FROM items WHERE Id LIKE ?`;
  const query_items_month_sales = `
  SELECT substr(o.orderAt, 6, 2) AS Datemonth, SUM(UnitPrice) AS month_sales_sum, COUNT(UnitPrice) AS month_sales_count
  FROM stores s
  JOIN orders o
    ON s.Id = o.StoreId
  JOIN orderitems oi
    ON o.Id = oi.OrderId
  JOIN items i
    ON i.Id = oi.ItemId
  WHERE i.Id LIKE ?
  GROUP BY substr(o.orderAt, 6, 2)
  ORDER BY Datemonth;
  `;
  console.log(pageId);
  try {
    const [infoheader] = await db.execute(query_infoheader);
    const [infobody] = await db.execute(query_infobody, [`%${pageId}%`]);
    const [items_month_sales] = await db.execute(query_items_month_sales, [
      `%${pageId}%`,
    ]);
    res.json({
      infoheader,
      infobody,
      items_month_sales,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

router.get("/stores/detail/:pageId", async (req, res) => {
  console.log(`API 요청됨: ${req.url}`);
  const pageId = req.params.pageId;
  // console.log(req.query)
  // const pageIddate = req.query.month;
  // console.log(pageIddate)

  const query_infoheader = `show columns from stores;`;
  const query_infobody = `SELECT * FROM stores WHERE Id LIKE ?`;
  const query_stores_month_sales = `
  SELECT substr(o.orderAt, 1, 7) AS Month, SUM(UnitPrice) AS month_sales_sum, COUNT(UnitPrice) AS month_sales_count
  FROM stores s
  JOIN orders o
    ON s.Id = o.StoreId
  JOIN orderitems oi
    ON o.Id = oi.OrderId
  JOIN items i
    ON i.Id = oi.ItemId
  WHERE s.Id LIKE ?
  GROUP BY substr(o.orderAt, 1, 7)
  ORDER BY Month;
  `;
  const query_vip = `
  SELECT u.id, u.Name, COUNT(*) AS frequency
  FROM users u
  JOIN orders o ON u.Id = o.UserId
  JOIN stores s ON s.Id = o.storeId
  WHERE s.Id LIKE ?
  GROUP BY u.id, u.Name
  ORDER BY COUNT(*) DESC
  LIMIT 5
  `

  try {
    const [infoheader] = await db.execute(query_infoheader);
    const [infobody] = await db.execute(query_infobody, [`%${pageId}%`]);
    const [stores_month_sales] = await db.execute(query_stores_month_sales, [`%${pageId}%`]);
    const [vip] = await db.execute(query_vip, [`%${pageId}%`]);
    res.json({
      infoheader,
      infobody,
      stores_month_sales,
      vip,
    });
  } catch (error) {
    res.status(500).json({ error: "서버 오류." });
  }
});

export default router;
