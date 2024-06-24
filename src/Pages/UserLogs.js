import { Component } from "react";
import '../CSS/UserLogs.css'
import axios from "axios";

class UserLogs extends Component{
    constructor(props){
        super(props);
        this.state = {
            userData: []
        }
    }

    async componentDidMount() {
        const response = await axios.get('http://loacalhost:8090/loadAllUsers');
        console.log(response.data);
        this.setState(() => ({
            userData: response.data
        }))
    }

    render() {
        return(<>
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
            <div><h1>User Logs</h1></div>
            <div id={"user-container"}>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>USERNAME </th>
                                <th>IN_TIME </th>
                                <th>OUT_TIME </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.userData.map(user => (
                                <tr key = {user.id}>
                                    <td>{user.userName}</td>
                                    <td>{user.loginTime}</td>
                                    <td>{user.logoutTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>)
    }
}

export default UserLogs;