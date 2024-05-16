import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { setUserFirstName, setUserLastName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
function EditName() {
    const dispatch = useDispatch(); // Récupération de la fonction de dispatch Redux
    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");

    const [updateFirst, setUpdateFirst] = useState(false);
    const [updateLast, setUpdateLast] = useState(false);

    const token = useSelector((state) => state.user.token); // Sélection du token depuis le state Redux

    const handleUpdateName = (event) => {
        // Fonction appelée lors de la soumission du formulaire
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        if (firstname !== "" || lastname !== "") {
            event.preventDefault();
            setFirstName(firstname); // Mise à jour de l'état local du prénom
            setLasName(lastname);
            dispatch(setUserFirstName(firstname)); // Dispatch de l'action Redux pour mettre à jour le prénom dans le store
            dispatch(setUserLastName(lastname));

            updateData(firstname, lastname);
            setUpdateFirst(!updateFirst);
            setUpdateLast(!updateLast);
            Navigate("/");
        } else {
            console.error("Username is required.");
        }
    };

    const updateData = (firstname, lastname) => {
        // Fonction pour envoyer les données à l'API
        const userData = {
            firstName: firstname, // Nouveau prénom
            lastName: lastname,
        };
        Axios.put("http://localhost:3001/api/v1/user/profile", userData, {
            // Requête PUT à l'API avec Axios
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
                    {/*<label htmlFor="firstname">First name:</label>*/}
                    <input type="text" id="firstname" />
                    {/* <label htmlFor="lastname" className="labelform">
                        Last name:
                    </label>*/}
                    <input type="text" id="lastname" />
                </div>
                <div className="row">
                    <button className="save-button" onClick={handleUpdateName}>
                        Save
                    </button>
                    <button className="cancel-button" disabled>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
export default EditName;
