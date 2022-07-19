import "./login.css";
import { useNavigate } from "react-router-dom";

const Login = ({ setUser, setLoggedIn }) => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      password: e.target.password.value,
    };
    await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) return alert(data.err);
        setUser(data);
        localStorage.setItem("token", data.token);
        setLoggedIn(true);
        navigate("/", { replace: true });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="loginDiv">
      <h2>Prisijunkite prie savo vartotojo</h2>
      <form onSubmit={addUser} className="loginRegisterForm">
        <label htmlFor="username">Įveskite vartotojo vardą</label> <br />
        <input type="text" placeholder="Vartotojo vardas" name="username" /> <br />
        <label htmlFor="password">Įveskite savo slaptažodį</label> <br />
        <input type="password" placeholder="Slaptažodis" name="password" />
        <br></br>
        <button type="submit" className="login-register">Prisijungti</button>
      </form>
    </div>
  );
};
export default Login;