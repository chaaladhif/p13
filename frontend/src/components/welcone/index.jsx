import "./style.css";
import { useEffect, useState } from "react";
import { setUserFirstName, setUserLastName } from "../../store";
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
    const [firstName, setfirstName] = useState("");
    const [lastName, setlastName] = useState(""); // État local pour le nom d'utilisateur
    // État local pour le nom d'utilisateur
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
                const updatedFirstName = response.data.body.firstName;
                const updatedLastName = response.data.body.lastName;

                setfirstName(updatedFirstName);
                setlastName(updatedLastName);

                dispatch(setUserFirstName(updatedFirstName));
                dispatch(setUserLastName(updatedLastName));
            })
            .catch(function (error) {
                console.error("Token incorrect.");
                console.log(error);
            });
    }; // Fonction pour désactiver le mode édition après mise à jour du nom
    // Fonction pour désactiver le mode édition après mise à jour du nom
    const handleEditComplete = (event) => {
        event.preventDefault(); // Empêche l'action par défaut du formulaire

        setIsEditing(false);
    };
    return (
        <div className="welcome-container">
            {isEditing && <EditName onEditComplete={handleEditComplete} />}
            {/* Affichez EditName si isEditing est true */}
            <div className="header">
                <h1>
                    Welcome back
                    <br />
                    {firstName} {lastName}!
                </h1>
                <button className="edit-button" onClick={toggleEdit}>
                    Edit Name
                </button>
            </div>
        </div>
    );
}

export default Welcome;
