import { Component } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./HomePage";
import Product from "./Product";
import LoginPage from "./LoginPage";
import CurrentStock from "./CurrentStock";
import UserLogs from "./UserLogs";
import Users from "./Users"
import Sales from "./Sales"
import Purchase from "./Purchase"
import Suppliers from "./Suppliers"

class Layout extends Component {
    render(){
        return ( <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path = {"/"} element = {<LoginPage />} />
               <Route path = {"/home"} element = {<HomePage />} />
                <Route path = {"/products"} element = {<Product />} />
                <Route path = {"/currentstock"} element = {<CurrentStock />} />
                <Route path = {"/userlogs"} element = {<UserLogs />} />
                <Route path = {"/users"} element = {<Users />} />
                <Route path = {"/sales"} element = {<Sales />} />
                <Route path = {"/purcgase"} element = {<Purchase />} />
                <Route path = {"/suppliers"} element = {<Suppliers />} />
                
            </Routes>
        </div>
        </BrowserRouter>

        )
    }
}
export default Layout;