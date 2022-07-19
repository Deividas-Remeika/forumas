import "./addPost.css";
import { useNavigate } from "react-router-dom";

const AddPost = ({ user, getAllPosts }) => {
  const navigate = useNavigate();
  const addPost = async (e) => {
    e.preventDefault();
    await fetch("/add", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },

      body: JSON.stringify({
        post: e.target.post.value,
        user_id: user.id,
        time_created: new Date().toLocaleDateString("LT"),
      }),
    })
      .then(() => navigate("/", { replace: true }))
      .then(getAllPosts())
      .catch((err) => console.log(err));
  };
  return (
    <div className="mainForm">
      <form onSubmit={addPost} className="loginRegisterForm">
        <h2>Pridėti naują temą</h2>
        <label>Prašome nurodyti tikslų temos pavadinimą</label>
        <input
          type="text"
          name="post"
          placeholder="Temos pavadinimas"
          required
        />{" "}
        <br />
        <button type="submit" className="login-register">Pridėti temą</button>
      </form>
    </div>
  );
};
export default AddPost;