import "./style.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setLoginInfos, setUserFirstName, setUserToken } from "../../store"; // Importez actions setUserToken et setUserFirstName
import Axios from "axios"; // Importez Axios pour effectuer la requête HTTP
import { useNavigate } from "react-router-dom";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Construisez l'objet de données à envoyer dans la requête HTTP
        const data = {
            email,
            password,
        };
        // Effectuez la requête HTTP pour l'authentification de l'utilisateur
        Axios.post("http://localhost:3001/api/v1/user/login", data)
            .then((response) => {
                dispatch(setLoginInfos(data));
                // Une fois l'utilisateur connecté avec succès, stockez le token JWT et d'autres informations dans store Redux
                dispatch(setUserToken(response.data.body.token));
                dispatch(setUserFirstName(response.data.body.firstName));
                navigate("/Profile"); // Redirigez l'utilisateur vers la page de profil
            })
            .catch((error) => {
                // Gérez les erreurs d'authentification
                console.error("Erreur lors de la connexion :", error);
            });
    };

    return (
        <div className="main bg-dark">
            <div className="sign-in-content">
                <i className="fa fa-user-circle sign-in-icon"></i>
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-wrapper">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="input-wrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="input-remember">
                        <input type="checkbox" id="remember-me" />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="sign-in-button">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
