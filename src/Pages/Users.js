import { Component } from "react";
import '../CSS/User.css'
import axios from "axios";

class Users extends Component{
    constructor(props){
        super(props);
           this.state = {
            userData: []
           }
        }

        async componentDidMount() {
            const response = await axios.get('http://localhost:8090/loadRegistrations');
            console.log(response.data);
            this.setState(() => ({
                userData: response.data
            }))
        }

        render() {
            return (<>
            <div>
            <div className="buttom">
                    <ul>
                        <li><a href="/home">Home</a></li>
                        <li><a href="/products">Products</a></li>
                        <li><a href="/currentstock">CurrentStock</a></li>
                        <li><a href="/customers">Customers</a></li>
                        <li><a href="/suppliers">Suppliers</a></li>
                        <li><a href="/sales">Sales</a></li>
                        <li><a href="/purcgase">Purchase</a></li>
                        <li><a href="users">Users</a></li>
                        <li><a href="userlogs">UserLogs</a></li>
                    </ul>
                </div>
                <div>
                    <button className="signout">Signout</button>
                </div>
                <div><h1>Users</h1></div>
                <div id={"users-container"}>
                    <table className="styled-sheet">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>USERNAME</th>
                                <th>MOBILE_NO</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userData.map(user => (
                               <tr key = {user.id}>
                                <td>{user.id}</td>
                                <td>{user.fullName}</td>
                                <td>{user.username}</td>
                                <td>{user.mobileNo}</td>
                               </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </>)
        }
    }

    export default Users;