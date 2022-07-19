import "./showPosts.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ShowPosts = ({
  dataUsers,
  dataAnswers,
  user,
  loggedIn,
  getAllAnswers,
}) => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`/posts/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, [id]);

  const answerPost = async (e) => {
    e.preventDefault();
    const answerData = {
      user_id: user.id,
      post_id: data.id,
      answer: e.target.answerToComment.value,
    };

    await fetch(`/post/answer`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(answerData),
    })
      .then(getAllAnswers())
      .then(() => e.target.reset())
      .catch((err) => console.log(err));
  };

  return (
    <div className="mainPosts">
      <div>
        <h2>
          Temos pavadinimas: {data.post}{" "}
          <span>
            {data.edited === true ? "edited" : null}
          </span>
        </h2>
      </div>
      <div className="mainAnswers">
        {dataAnswers
          .filter((answer) => {
            return answer.post_id === data.id;
          })
          .map((answer, i) => {
            return (
              <div key={i}>
                <div>
                  <span style={{ fontWeight: "bold" }}>
                    {typeof dataUsers !== "undefined" ? (
                      dataUsers
                        .filter((username) => {
                          return username.id === answer.user_id;
                        })
                        .map((username) => username.username)
                    ) : (
                      <span>Kraunama...</span>
                    )}
                    :
                  </span>{" "}
                  {answer.answer}{" "}
                </div>
              </div>
            );
          })}
      </div>
      {loggedIn ? (
        <div>
          <form onSubmit={(e) => answerPost(e)}>
            <textarea
              name="answerToComment"
              cols="65"
              rows="5"
              required
            ></textarea>
            <br />
            <button type="submit" className="login-register">Atsakyti</button>
          </form>
        </div>
      ) : null}
    </div>
  );
};
export default ShowPosts;
