import "./style.css";
import { useEffect, useState } from "react";
import { setUserFirstName, setUserLastName } from "../../store"; // Import des actions Redux pour mettre à jour le prénom et le nom de l'utilisateur
import { useDispatch, useSelector } from "react-redux"; // Import des hooks de React-Redux
import EditName from "../editName/index";
import Axios from "axios";
function Welcome() {
    // État local pour contrôler si l'édition du nom est en cours ou non
    const [isEditing, setIsEditing] = useState(false);
    // Initialisation du hook useDispatch pour envoyer des actions Redux
    const dispatch = useDispatch();
    // Sélection des informations utilisateur depuis le store Redux
    const loginInfos = useSelector((state) => state.user.loginInfos);
    const token = useSelector((state) => state.user.token);
    const firstName = useSelector((state) => state.user.firstName);
    const lastName = useSelector((state) => state.user.lastName);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };
    //effectuer une action au montage du composant
    useEffect(() => {
        getUserData(); // Appel de la fonction pour récupérer les données utilisateur
    }, []);
    // Fonction pour récupérer les données utilisateur via une requête HTTP
    const getUserData = () => {
        // Envoi d'une requête POST à l'API pour récupérer les données de profil de l'utilisateur
        Axios.post("http://localhost:3001/api/v1/user/profile", loginInfos, {
            headers: {
                // Ajout du token d'autorisation dans les en-têtes de la requête
                Authorization: `Bearer ${token}`,
                accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                // Extraction des firstanme et lastname mis à jour depuis la réponse de l'API
                const updatedFirstName = response.data.body.firstName;
                const updatedLastName = response.data.body.lastName;
                // Envoi des actions Redux pour mettre à jour le prénom et le nom dans le store
                dispatch(setUserFirstName(updatedFirstName));
                dispatch(setUserLastName(updatedLastName));
            })
            .catch(function (error) {
                console.error("Token incorrect.");
                console.log(error);
            });
    };
    // Fonction pour gérer la fin de l'édition du nom
    const handleEditComplete = () => {
        setIsEditing(false);
    };
    // Fonction pour gérer les changements de prénom et de nom
    const handleNameChange = (newFirstName, newLastName) => {
        // Envoi des actions Redux pour mettre à jour le prénom et le nom dans le store
        dispatch(setUserFirstName(newFirstName));
        dispatch(setUserLastName(newLastName));
    };

    return (
        <div className="welcome-container">
            {isEditing && (
                <EditName
                    onEditComplete={handleEditComplete}
                    onNameChange={handleNameChange}
                />
            )}
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
