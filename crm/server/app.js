import express from "express";
import apiRoutes from "./routes/api.js";
import path from "path";

const rootDir = path.resolve();
const app = express();
const port = 3000;

// static
app.use("/crm", express.static(path.join(rootDir, "..", "client")));
app.use("/crm/:id", express.static(path.join(rootDir, "..", "client")));
// app.use("/:id", express.static(path.join(rootDir, "..", "client")));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// GET: Page
app.get("/crm", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "main.html");
  res.sendFile(htmlFilePath);
});

// GET: Page-Users
app.get("/crm/users/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "usersPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/crm/userDetail/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "usersDetailPage.html");
  res.sendFile(htmlFilePath);
});


app.get("/crm/orders/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "ordersPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/crm/orderitems/:id?", (req, res) => {
  const htmlFilePath = path.join(
    rootDir,
    "..",
    "client",
    "orderitemsPage.html"
  );
  res.sendFile(htmlFilePath);
});
app.get("/crm/items/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "itemsPage.html");
  res.sendFile(htmlFilePath);
});
app.get("/crm/stores/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "storesPage.html");
  res.sendFile(htmlFilePath);
});


// GET: detail-Page
app.get("/crm/orderDetail/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "ordersDetailPage.html");
  res.sendFile(htmlFilePath);
});
// GET: detail-Page
app.get("/crm/orderitemDetail/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "orderitemsDetailPage.html");
  res.sendFile(htmlFilePath);
});
// GET: detail-Page
app.get("/crm/storeDetail/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "storesDetailPage.html");
  res.sendFile(htmlFilePath);
});
// GET: detail-Page
app.get("/crm/itemDetail/:id?", (req, res) => {
  const htmlFilePath = path.join(rootDir, "..", "client", "itemsDetailPage.html");
  res.sendFile(htmlFilePath);
});



// REST API
app.use("/api", apiRoutes);


app.listen(port, () => {
  console.log(`${port} 서버 실행 중...`);
});
