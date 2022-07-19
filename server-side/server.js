import "dotenv/config";
import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import isAuth from "./isAuth.js";

const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.post("/login", async (req, res) => {
  const data = await fetch(`http://localhost:8080/users/`).then((data) =>
    data.json()
  );
  const user = data.filter((item) => item.username === req.body.username);
  if (user[0].password === req.body.password) {
    const token = jwt.sign(
      { id: user[0].id, username: user[0].username },
      process.env.SECRET
    );
    res.json({
      id: user[0].id,
      username: user[0].username,
      token,
    });
  } else {
    res.json({ err: "Neteisingas prisijungimo vardas arba slaptazodis" });
  }
});

app.post("/register", async (req, res) => {
  await fetch("http://localhost:8080/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(req.body),
  });
  res.json();
});

app.get("/verifyToken", async (req, res) => {
  const verify = await isAuth(req);
  res.json({
    verify: verify,
    username: req.token?.username,
    id: req.token?.id,
  });
});

app.get("/posts/:id?", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/posts/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});

app.post("/add", async (req, res) => {
  const { user_id, post } = req.body;
  await fetch("http://localhost:8080/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ user_id, post, time_created: new Date().toLocaleDateString("LT") }),
  });
  res.json();
});

app.get("/answers/:id?", async (req, res) => {
  const data = await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`
  ).then((data) => data.json());
  res.json(data);
});

app.post(`/post/answer/:id?`, async (req, res) => {
  const { user_id, post_id, answer } = req.body;
  await fetch(
    `http://localhost:8080/answers/${req.params.id ? req.params.id : ""}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id, post_id, answer }),
    }
  );
  res.json({ success: true });
});

app.get("/users/", async (req, res) => {
  const data = await fetch(`http://localhost:8080/users/`).then((data) =>
    data.json()
  );
  const usernames = data.map((username) => {
    return { username: username.username, id: username.id };
  });
  res.json(usernames);
});

app.listen(process.env.PORT || 5001, () =>
  console.log(`Serveris veikia siuo portu - ${PORT}`)
);
