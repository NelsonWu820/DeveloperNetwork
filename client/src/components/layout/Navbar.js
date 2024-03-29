import { Link } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types"; 
import {logout} from "../../actions/auth";
import { Fragment } from "react";


const Navbar = ({ auth: {isAuthenticated}, logout}) => {
  const authLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>
      </li>
      <li>
        <Link to="/posts">
          Posts
        </Link>
      </li>
      <li>
        <a  onClick={logout} href="#!">
          <i className="fas fa-sign-out-alt" /> {' '}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to="/profiles">
          Developers
        </Link>  
      </li>
      <li><Link to="/register">Register</Link></li>
      <li><Link to="/login">Login</Link></li>
    </ul>
  );

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fas fa-code"></i> Developer Network</Link>
      </h1>
      <Fragment> { isAuthenticated ? authLinks: guestLinks}</Fragment>
    </nav>
  );
};

Navbar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired 
};

const mapStateToProps = state =>({
  auth: state.auth
});


export default connect(mapStateToProps, { logout })(Navbar);