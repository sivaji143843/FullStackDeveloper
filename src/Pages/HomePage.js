import { Component } from "react";
import '../CSS/HomePage.css'
class HomePage extends Component{
    render(){
        return(
            <div>
                <div className="home">
                    <h1>Welcome, Trial Admin.</h1>
                    <p><b>Manage your inventory, transactions and personnel, all in one place</b></p>
                    <h5>Click on the Menu Button to start</h5>
                </div>
                <div className="buttom">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/currentstock">CurrentStock</a></li>
                        <li><a href="/customers">Customers</a></li>
                        <li><a href="/suppliers">Suppliers</a></li>
                        <li><a href="/sales">Sales</a></li>
                        <li><a href="/purchase">Purchase</a></li>
                        <li><a href="users">Users</a></li>
                        <li><a href="userlogs">UserLogs</a></li>
                    </ul>
                </div>
                <div>
                    <button className="signout">Signout</button>
                </div>
            </div>
        )
    }
}
export default HomePage;