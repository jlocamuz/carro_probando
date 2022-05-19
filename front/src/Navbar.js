import { Link } from "react-router-dom";

const Navbar = ({user, setIsSubmitted, isSubmitted}) => {


  return (
    <nav className="navbar">
      <h1>MiniMarket</h1>
      <div className="links">
        <Link to="/sale_details/">
          <button> Sales</button>
        </Link>
        <Link to="/">
          <button> Home </button>
        </Link>
        {
          !user.is_admin &&
        <Link to="/carro/">
          <button> Carro </button>
        </Link>          
        }

        <button onClick={() => {setIsSubmitted(!isSubmitted)}}>log out</button>
      </div>
    </nav>
  );
}
 
export default Navbar;