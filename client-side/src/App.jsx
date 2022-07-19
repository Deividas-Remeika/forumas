import "./App.css";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Register from "./components/Register";
import Login from "./components/Login";
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import ShowPosts from "./components/ShowPosts";
import AddPost from "./components/AddPost";

function App() {
  const [posts, setPosts] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState();
  const [answer, setAnswer] = useState([]);

  const getAllAnswers = () => {
    fetch("/answers")
      .then((res) => res.json())
      .then((answers) => {
        setAnswers(answers);
      });
  };
  const getAllPosts = () => {
    fetch(`/posts/`)
      .then((res) => res.json())
      .then((posts) => {
        setPosts(posts);
      }, []);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setLoggedIn(true);

    fetch(`/post/answer`)
      .then((res) => res.json())
      .then((answer) => {
        setAnswer(answer);
      });

    getAllPosts();

    getAllAnswers();

    fetch("/users")
      .then((res) => res.json())
      .then((users) => {
        setUsers(users);
      });

    fetch("/verifyToken", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.verify === false) {
          setLoggedIn(false);
        } else {
          setLoggedIn(true);
          setUser({ username: data.username, id: data.id });
        }
      });
  }, []);
  return (
    <>
      <Navigation user={user} loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route
          path="/posts/:id"
          element={
            <ShowPosts
              getAllAnswers={getAllAnswers}
              getAllPosts={getAllPosts}
              loggedIn={loggedIn}
              user={user}
              dataUsers={users}
              dataAnswers={answers}
              answer={answer}
            />
          }
        />
        <Route
          path="/add"
          element={
            <AddPost getAllPosts={getAllPosts} user={user} />
          }
        />
        <Route
          path="/"
          element={
            <Home
              getAllPosts={getAllPosts}
              user={user}
              dataUsers={users}
              dataPost={posts}
              dataAnswers={answers}
              loggedIn={loggedIn}
            />
          }
        />
        <Route path="/register" element={<Register />} />
        <Route
          path="/login"
          element={<Login setLoggedIn={setLoggedIn} setUser={setUser} />}
        />
      </Routes>
    </>
  );
}

export default App;
