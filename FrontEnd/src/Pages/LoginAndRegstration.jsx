import React from 'react'
import RegisterPage from "../Components/RegistrationPage.jsx";
import Login from "../Components/Login.jsx";


function LoginAndRegstration() {
    let user = "new";
    return (

            user === "new" ? <RegisterPage/>:<Login/>

    )
}

export default LoginAndRegstration
