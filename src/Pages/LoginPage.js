import React, { Component } from "react";
import '../CSS/LoginPage.css'
import { FaUser, FaLock } from "react-icons/fa";


class LoginPage extends Component{
  
    render(){
        return(
        
            <div className="Loginpage">
                <div className="form-box-login">
                    <form action="">
                <h1>Login</h1>
                <div className="input-box">
                <input type="text" placeholder="username" required></input>
                    <FaUser className="icon"/>
                </div>
                <div className="input-box">
                <input type="text" name="password"placeholder="password" required></input>
                    <FaLock className="icon"/>
                </div>
                <div className="select">
                    <select><option>ADMINISTRATER</option><option>Library</option></select>
                </div>
                <button type="submit">Login</button>
                <div className="register-link"><p> I Don't have an Account?<a href="login">Register</a></p></div>
                </form>
            </div>
                    
            </div>
        )
    }
}
export default LoginPage;
