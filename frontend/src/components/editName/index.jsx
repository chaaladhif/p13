import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { setUserFirstName, setUserLastName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";

function EditName({ onEditComplete, onNameChange }) {
    const dispatch = useDispatch(); // Récupération de la fonction de dispatch Redux
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const token = useSelector((state) => state.user.token); // Sélection du token depuis le state Redux

    const handleUpdateName = (event) => {
        event.preventDefault();

        const newFirstName = document.getElementById("firstname").value;
        const newLastName = document.getElementById("lastname").value;
        if (newFirstName !== "" || newLastName !== "") {
            setFirstName(newFirstName); // Mise à jour de l'état local du prénom
            setLastName(newLastName);
            dispatch(setUserFirstName(newFirstName)); // Dispatch de l'action Redux pour mettre à jour le prénom dans le store
            dispatch(setUserLastName(newLastName));

            updateData(newFirstName, newLastName);
            onNameChange(newFirstName, newLastName);
            onEditComplete(); // Fermeture du formulaire après la mise à jour
        } else {
            console.error("Username is required.");
        }
    };

    const updateData = (newFirstName, newLastName) => {
        // Fonction pour envoyer les données à l'API
        const userData = {
            firstName: newFirstName, // Nouveau prénom
            lastName: newLastName,
        };
        Axios.put("http://localhost:3001/api/v1/user/profile", userData, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
            .then((response) => {
                console.log("username successfully changed", response);
            })
            .catch((error) => {
                console.error("Error updating username.");
                console.log(error);
            });
    };

    return (
        <div className="edit-content">
            <form className="form">
                <div className="row">
                    <input
                        type="text"
                        id="firstname"
                        placeholder="First name"
                    />
                    <input type="text" id="lastname" placeholder="Last name" />
                </div>
                <div className="row">
                    <button className="save-button" onClick={handleUpdateName}>
                        Save
                    </button>
                    <button className="cancel-button" onClick={onEditComplete}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default EditName;
