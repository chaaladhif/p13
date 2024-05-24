import "./style.css";
import { useEffect, useState } from "react";
import { setUserFirstName, setUserLastName } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import EditName from "../editName/index";
import Axios from "axios";
function Welcome() {
    const [isEditing, setIsEditing] = useState(false); // État local pour contrôler la visibilité de EditName
    const dispatch = useDispatch();

    const loginInfos = useSelector((state) => state.user.loginInfos);
    const token = useSelector((state) => state.user.token);
    const firstName = useSelector((state) => state.user.firstName);
    const lastName = useSelector((state) => state.user.lastName);

    const toggleEdit = () => {
        setIsEditing(!isEditing);
    };

    useEffect(() => {
        getUserData(); // Appel de la fonction pour récupérer les données utilisateur
    }, []);

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

                dispatch(setUserFirstName(updatedFirstName));
                dispatch(setUserLastName(updatedLastName));
            })
            .catch(function (error) {
                console.error("Token incorrect.");
                console.log(error);
            });
    };

    const handleEditComplete = () => {
        setIsEditing(false);
    };

    const handleNameChange = (newFirstName, newLastName) => {
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
