const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const router = require("./server");
app.use("/", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
