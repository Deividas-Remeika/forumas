import "./Home.css";
import { Link } from "react-router-dom";

const Home = ({
  loggedIn,
  dataPost,
  dataAnswers,
  dataUsers,
}) => {
  return (
    <>
      {loggedIn ? (
        <div className="homeDiv">
          <div className="newTheme">
            <Link to={"/add"}>
              <button>Pradėti naują temą</button>
            </Link>
          </div>
          {dataPost.map((post, id) => (
            <div className="postsDiv" key={id}>
              <Link to={`/posts/${post.id}`}>
                <h2 className="titleName">Temos pavadinimas: {post.post}</h2>
              </Link>
              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.post_id === post.id;
                  })
                  .map((answer, i) => {
                    return (
                      <div key={i}>
                        <p className="answers">
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
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="homeDiv">
          {dataPost.map((post, id) => (
            <div className="postsDiv" key={id}>
              <Link to={`/posts/${post.id}`}>
                <h2 className="titleName">Temos pavadinimas: {post.post}</h2>
              </Link>
              <div>
                {dataAnswers
                  .filter((answer) => {
                    return answer.post_id === post.id;
                  })
                  .map((answer, i) => {
                    return (
                      <div key={i}>
                        <p className="answers">
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
                        </p>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};
export default Home;
