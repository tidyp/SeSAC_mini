import express, { query } from "express";
import apiRoutes from "./routes/apiRoutes.js";
import path from "path";

const rootDir = path.resolve();
const app = express();
const port = 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC: CSS, JS 시작 경로
app.use("/", express.static(path.join(rootDir, "..", "client")));
app.use("/", express.static(path.join(rootDir, "..", "client", 'detailpages')));

// GET: displayPage
app.get("/crm/:table?/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "displayTable.html");
  res.sendFile(htmlFilePath);
});
app.get("/crm/:table?/detail/:id?", (req, res) => {
  const detailPage = `${req.params.table}.html`;
  const htmlFilePath = path.join(rootDir, "..", "client", 'detailpages', detailPage);
  res.sendFile(htmlFilePath);
});

// api routes
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`${port} 서버 실행 중...`);
});
