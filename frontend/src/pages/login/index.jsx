import "./style.css";
import { Link } from "react-router-dom";
function Login() {
    return (
        <div className="main bg-dark">
            <div className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <Link to="/Account" className="sign-in">
                        <button type="submit" className="sign-in-button">
                            Sign In
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
}

export default Login;
