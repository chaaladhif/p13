import "./style.css";
import { useEffect, useState } from "react";
import { setUserFirstName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import EditName from "../editName/index";
import Axios from "axios";
function Welcome() {
    const [isEditing, setIsEditing] = useState(false); // État local pour contrôler la visibilité de EditName
    // Fonction pour basculer l'état d'édition
    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    // Sélection des informations de connexion depuis Redux
    const loginInfos = useSelector((state) => state.user.loginInfos);
    const token = useSelector((state) => state.user.token);
    const [firstName, setfirstNames] = useState(""); // État local pour le nom d'utilisateur
    const dispatch = useDispatch();
    useEffect(() => {
        getUserData(); // Appel de la fonction pour récupérer les données utilisateur
    }, []);
    // Fonction pour récupérer les données utilisateur depuis l'API
    const getUserData = () => {
        Axios.post("http://localhost:3001/api/v1/user/profile", loginInfos, {
            headers: {
                Authorization: `Bearer ${token}`,
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                const updatedUserName = response.data.body.userName;
                setfirstNames(updatedUserName);
                dispatch(setUserFirstName(updatedUserName));
            })
            .catch(function (error) {
                console.error("Token incorrect.");
                console.log(error);
            });
    };
    return (
        <div className="welcome-container">
            {isEditing && <EditName />}
            {/* Affichez EditName si isEditing est true */}
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {firstName}!
                </h1>
                <button className="edit-button" onClick={toggleEdit}>
                    Edit Name
                </button>
            </div>
        </div>
    );
}

export default Welcome;
