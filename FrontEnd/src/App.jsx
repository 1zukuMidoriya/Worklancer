import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css'
import RegisterPage from "./Components/RegistrationPage.jsx";
import LoginAndRegstration from "./Pages/LoginAndRegstration.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Dashboard from "./Pages/Dashboard.jsx";
import Login from "./Components/Login.jsx";
import LodingSpinner from "./Components/LodingSpinner.jsx";
import UserContext from "./UserContext.jsx";
import {useState} from "react";
import AdminDashboard from "./Pages/AdminDashboard.jsx";
import AllProjects from "./Pages/AllProjects.jsx";
import ProjectDetails from "./Pages/ProjectDetails.jsx";
import AdminClientsCards from './Components/AdminClientsCards.jsx';
import UserDetails from './Pages/UserDetails.jsx';
import AdminProjectView from './Pages/AdminProjectView.jsx';

function App() {
    const [user, setUser] = useState(null);

    return (
    <UserContext.Provider value={{ user, setUser }} >
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/register" element={<RegisterPage />}/>
                <Route path="/dashboard" element={<Dashboard />}/>
                <Route path="/AdminDashboard" element={<AdminDashboard />}/>
                <Route path="/loader" element={<LodingSpinner />}/>
                <Route path="/all-projects" element={<AllProjects />}/>
                <Route path="/project/:id" element={<ProjectDetails />}/>
                <Route path='/AdminClientsCards' element={<AdminClientsCards/>}/>
                <Route path="/user-details/:userId" element={<UserDetails />}/>
                <Route path="/admin/project/:projectId" element={<AdminProjectView />}/>
            </Routes>
        </BrowserRouter>
    </UserContext.Provider>
  )
}

export default App
