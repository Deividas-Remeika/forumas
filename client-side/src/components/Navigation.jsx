import "./navigation.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navigation = ({ loggedIn, setLoggedIn }) => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    navigate("/");
  };
  return (
    <>
      {loggedIn ? (
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Link to="/"><img className='logo' src="images/logo.png" alt="logo" /></Link>
          </Link>
          <div>
            <button onClick={logout}>Atsijungti</button>
          </div>
        </nav>
      ) : (
        <nav>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Link to="/"><img className='logo' src="images/logo.png" alt="logo" /></Link>
          </Link>
          <div>
            <Link to="/login">
              <button>Prisijungti</button>
            </Link>
            <Link to="/register">
              <button>Registruotis</button>
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
export default Navigation;