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

// router.get("/users/:pagenum?", (req, res) => {
router.get("/users/:pagenum?", (req, res) => {
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

router.get("/detail/order/:orderId?", (req, res) => {
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

router.get("/detail/item/:itemId?", (req, res) => {
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

export default router;
