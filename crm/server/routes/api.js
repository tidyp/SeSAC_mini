import express from "express";
import db from "../database/mysqldb.js";

const router = express.Router();

router.get("/count/:table", (req, res) => {
  const table = req.params.table;
  db.execute(`SELECT COUNT(*) AS MAXPAGE FROM ${table}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/users/:pagenum?", (req, res) => {
  console.log(`API 요청됨: ${req.url}`);

  const searchName = req.query.name || "";
  const pageNum = +req.params.pagenum || 1;
  const offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  console.log(searchName, pageNum, offset);

  db.execute(
    `SELECT * FROM users WHERE Name LIKE '${searchName}%' LIMIT 20 OFFSET ${offset}`
  )
    .then(([rows, fieldData]) => {
      if (rows.length === 0) {
        res.status(404).json({ error: "데이터 없음." });
      } else {
        // console.log(rows)
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "서버 오류." });
    });
});

// router.get("/users/:pagenum?", (req, res) => {
// router.get("/users?", (req, res) => {
//   console.log(`api 요청됨: ${req.url}`);

//   const searchName = req.query.name;

//   const pageNum = +req.params.pagenum;
//   let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;

//   db.execute(
//     `SELECT * FROM users WHERE Name LIKE '${searchName}%' LIMIT 20 OFFSET 0`
//   )
//     .then(([rows, fieldData]) => {
//       if (rows.length == 0) {
//         console.log(rows.length);
//         res.status(404).json({ error: "데이터 없음." });
//       } else {
//         res.json(rows);
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// router.get("/users/:pagenum?", (req, res) => {
router.get("/users/:pagenum?", (req, res) => {
  console.log(`api 요청됨: ${req.query.name}`);
  console.log(`api 요청됨: ${req.url}`);

  const pageNum = +req.params.pagenum;
  let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  db.execute(`SELECT * FROM users LIMIT 20 OFFSET ${offset}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/orders/:pagenum?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);

  const pageNum = +req.params.pagenum;
  let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  db.execute(`SELECT * FROM orders LIMIT 20 OFFSET ${offset}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/orderitems/:pagenum?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);

  const pageNum = +req.params.pagenum;
  let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  db.execute(`SELECT * FROM orderitems LIMIT 20 OFFSET ${offset}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/items/:pagenum?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);

  const pageNum = +req.params.pagenum;
  let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  db.execute(`SELECT * FROM items LIMIT 20 OFFSET ${offset}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
router.get("/stores/:pagenum?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);

  const pageNum = +req.params.pagenum;
  let offset = isNaN(pageNum) ? 0 : pageNum === 1 ? 0 : (pageNum - 1) * 20;
  db.execute(`SELECT * FROM stores LIMIT 20 OFFSET ${offset}`)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// ----------------------------------------
// ----------------------------------------

// 유저상세정보: 고객정보
router.get("/detail/user/aaa/:userId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const userId = req.params.userId;
  console.log(userId);
  db.execute(`SELECT * FROM users WHERE Id LIKE ?#`, [userId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
// 유저상세정보: 주문정보
router.get("/detail/user/bbb/:userId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const userId = req.params.userId;
  console.log(userId);
  db.execute(`SELECT * FROM orders WHERE UserId LIKE ?#`, [userId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// 유저상세정보: 자주방문
router.get("/detail/user/ccc/:userId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const userId = req.params.userId;
  console.log(userId);
  db.execute(
    `SELECT s.Id, s.Name, count(*) AS vCount 
    FROM users u
    JOIN orders o
      ON u.Id = o.UserId
    JOIN stores s
      ON s.Id = o.storeId
    WHERE u.id LIKE '%${userId}%'
    GROUP BY s.Id, s.Name
    ORDER BY vCount DESC
    LIMIT 5;
    `
  )
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// 유저상세정보: 자주주문
router.get("/detail/user/ddd/:userId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const userId = req.params.userId;
  console.log(userId);
  db.execute(
    `SELECT i.Id, i.Name, count(*) AS oCount
    FROM users u
    JOIN orders o
      ON u.Id = o.UserId
    JOIN orderitems oi
      ON o.Id = oi.OrderId
    JOIN items i
      ON i.Id = oi.ItemId
    WHERE u.id LIKE '${userId}'
    GROUP BY i.Id, i.Name
    ORDER BY oCount DESC
    LIMIT 5;
    `
  )
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// ----------------------------------------
router.get("/detail/order/aaa/:orderId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const orderId = req.params.orderId;
  console.log(orderId);
  db.execute(`SELECT * FROM orders WHERE Id LIKE ?#`, [orderId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/detail/item/aaa/:itemId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const itemId = req.params.itemId;
  console.log(itemId);
  db.execute(`SELECT * FROM items WHERE Id LIKE ?#`, [itemId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/detail/store/aaa/:storeId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const storeId = req.params.storeId;
  console.log(storeId);
  db.execute(`SELECT * FROM stores WHERE Id LIKE ?#`, [storeId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

// ----------------------------------------
router.get("/detail/store/aaa/:orderId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const orderId = req.params.orderId;
  console.log(orderId);
  db.execute(`SELECT * FROM orders WHERE Id LIKE ?#`, [orderId])
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/detail/store/bbb/:orderId?", (req, res) => {
  console.log(`api 요청됨: ${req.url}`);
  const orderId = req.params.orderId;
  const month = req.query.month;
  console.log(`dwqdqwdqdqdwqdqwdwq ${month === undefined}`);
  let query = "";

  if (month === 'undefined') {
    query = `
    SELECT s.id, substr(o.orderAt, 1, 7) AS Month, SUM(UnitPrice) AS Total_Revenue, Count(UnitPrice) AS Item_Count
    FROM stores s
    JOIN orders o
      ON s.Id = o.StoreId
    JOIN orderitems oi
      ON o.Id = oi.OrderId
    JOIN items i
      ON i.Id = oi.ItemId
    WHERE s.Id = '${orderId}'
    GROUP BY substr(o.orderAt,1 , 7)
    ORDER BY Month;
    `;
  } else {
    query = `
    SELECT s.id, substr(o.orderAt, 6, 5) AS Month, SUM(UnitPrice) AS Total_Revenue, Count(UnitPrice) AS Item_Count
    FROM stores s
    JOIN orders o
      ON s.Id = o.StoreId
    JOIN orderitems oi
      ON o.Id = oi.OrderId
    JOIN items i
      ON i.Id = oi.ItemId
    WHERE s.Id = '${orderId}' AND substr(o.orderAt, 1, 7) = '${month}'
    GROUP BY substr(o.orderAt, 6, 5)
    ORDER BY Month;
    `;
  }

  console.log(query);

  db.execute(query)
    .then(([rows, fieldData]) => {
      if (rows.length == 0) {
        console.log(rows.length);
        res.status(404).json({ error: "데이터 없음." });
      } else {
        res.json(rows);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

export default router;
