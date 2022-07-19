import "./register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const addUser = async (e) => {
    e.preventDefault();
    const user = {
      username: e.target.username.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };
    await fetch("/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then(() => navigate("/login", { replace: true }))
      .catch((error) => console.log(error));
  };
  return (
    <div className="mainRegistration">
      <h2>Registracija</h2>
      <form onSubmit={addUser} className="loginRegisterForm">
        <label htmlFor="username">Įveskite savo prisijungimo vardą </label> <br />
        <input
          type="text"
          name="username"
          placeholder="Prisijungimo vardas"
          required
        />{" "}
        <br />
        <label htmlFor="email">Įveskite savo el.pašto adresą</label> <br />
        <input
          type="email"
          name="email"
          placeholder="example@email.com"
          required
        />
        <br />
        <label htmlFor="password">Įveskite savo slaptažodį</label> <br />
        <input
          type="password"
          name="password"
          placeholder="Slaptažodis"
          minLength="6"
          required
        />{" "}
        <br />
        <button type="submit" className="login-register">Registruotis</button>
      </form>
    </div>
  );
};
export default Register;