import { useState } from "react";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { setUserFirstName, setUserLastName, setUsername } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
function EditName() {
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLasName] = useState("");

    const [updateFirst, setUpdateFirst] = useState(false);
    const [updateLast, setUpdateLast] = useState(false);

    const token = useSelector((state) => state.user.token);

    const handleUpdateName = (event) => {
        const firstname = document.getElementById("firstname").value;
        const lastname = document.getElementById("lastname").value;
        console.log(firstname, lastname);
        if (firstname !== "" && lastname !== "") {
            event.preventDefault();
            setFirstName(firstname);
            setLasName(lastname);
            dispatch(setUserFirstName(firstname));
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
        const userData = {
            firstName: firstname,
            lastName: lastname,
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
