import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/index";
import Footer from "./components/footer/index";
import Home from "./pages/home/index";
import ErrorPage from "./pages/errorPage/index";
import Login from "./pages/login";
import Profile from "./pages/profile/index";
function App() {
    return (
        <>
            <BrowserRouter>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Login" element={<Login />} />
                    <Route path="/Profile" element={<Profile />} />
                    <Route path="*" element={<ErrorPage />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </>
    );
}

export default App;
