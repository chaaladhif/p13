import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout, setUserFirstName } from "../../store";
import { NavLink } from "react-router-dom";

function Loged() {
    const token = useSelector((state) => state.user.token);
    const firstname = useSelector((state) => state.user.firstName);
    const dispatch = useDispatch();

    useEffect(() => {
        //console.log(username);
        if (firstname) {
            dispatch(setUserFirstName(firstname));
        }
    }, [firstname, dispatch]);

    const handleSignOut = () => {
        dispatch(setLogout());
    };

    if (token) {
        return (
            <div className="rownav">
                <NavLink className="main-nav-item" to="/Profile">
                    <i className="fa fa-user-circle"></i>
                    <p className="usernamep">{firstname}</p>
                </NavLink>
                <NavLink
                    className="main-nav-item"
                    to="/"
                    onClick={handleSignOut}
                >
                    <i className="fa fa-sign-out"></i>
                    <p className="sign-out-container">Sign Out</p>
                </NavLink>
            </div>
        );
    } else {
        return (
            <div>
                <NavLink className="main-nav-item" to="/Login">
                    <i className="fa fa-user-circle"></i>
                    Sign In
                </NavLink>
            </div>
        );
    }
}

export default Loged;
