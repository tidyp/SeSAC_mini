import express from "express";
import db from "../database/mysqldb.js";

const router = express.Router();

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

export default router;
