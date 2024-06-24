import { Component } from "react";
import axios from "axios";
import '../CSS/CurrentStock.css'

class CurrentStock extends Component{
    constructor(props){
        super(props);
        this.state = {
            currentStock: []
        }
    }

    async componentDidMount(){
        const response = await axios.get('http://localhost:8090/currentStock/loadCurrentStock');
        console.log(response.data);
        this.setState(() => ({
            currentStock: response.data
        }))
    }

    render(){
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
            </div>
            <div><h1>Current Stock</h1></div>
        <div id= {"customer-contaier"}>
            
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>CURRENT_STOCK_ID</th>
                            <th>PRODUCT_NAME</th>
                            <th>QUANTITY</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.currentStock.map(stock => (
                            <tr key={stock.CureentStockId}>
                                <td>{stock.currentStockId}</td>
                                <td>{stock.products.productName}</td>
                                <td>{stock.quantity}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
        
        </>)
    }
}

export default CurrentStock;