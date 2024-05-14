import "./style.css";
import { NavLink } from "react-router-dom";

function ErrorPage() {
    return (
        <div>
            <i className="fa-solid fa-triangle-exclamation"></i>
            <p className="oups">
                Oups!
                <br /> HTTP ERROR 404.
            </p>
            <NavLink to="/">
                <button className="error-button">
                    Retourner sur la page d’accueil
                </button>
            </NavLink>
        </div>
    );
}

export default ErrorPage;
