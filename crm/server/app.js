import express from "express";
import apiRoutes from "./routes/api.js";
import path from "path";

const rootDir = path.resolve();
const app = express();
const port = 3000;

// static
app.use("/", express.static(path.join(rootDir, "..", "client")));
app.use("/:id", express.static(path.join(rootDir, "..", "client")));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET
app.get("/", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "usersPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/users/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "usersPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/orders/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "ordersPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/orderitems/:id?", (req, res) => {
  const htmlFilePath = path.join(
    rootDir,
    "..",
    "client",
    "orderitemsPage.html"
  );
  res.sendFile(htmlFilePath);
});
app.get("/items/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "itemsPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/stores/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "storesPage.html");
  res.sendFile(htmlFilePath);
});

// REST API
app.use("/api", apiRoutes);

app.listen(port, () => {
  console.log(`${port} 서버 실행 중...`);
});
