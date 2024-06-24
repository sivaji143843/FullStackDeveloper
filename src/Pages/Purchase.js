import React, { Component } from "react";
import axios from "axios";
import '../CSS/Purchase.css'
class Purchase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierName: '',
            productName: '',
            quantity: '',
            costPrice: '',
            sellingPrice: '',
            brand: '',
            message: '',
            purchaseRecords: [],
            supplierRecords: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
    }
    handleChange(event) {
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value,
        });
    }
    async componentDidMount() {

        const purchaseResponse = await axios.get('http://localhost:8080/purchase/loadAllPurchase');
        console.log(purchaseResponse.data);
        this.setState(() => ({
            purchaseRecords: purchaseResponse.data
        }))
        const response = await axios.get('http://localhost:8080/supplier/loadSuppliers');
        console.log(response.data);
        this.setState(() => ({
            supplierRecords: response.data
        }))
    }
    handleSelectChange(event) {
        this.setState({
            supplierName: event.target.value
        })

    }
    async handleSubmit(event) {
        event.preventDefault();
        const { supplierName, productName, quantity, costPrice, sellingPrice, brand } = this.state;
        const purchaseData = { supplierName, productName, quantity, costPrice, sellingPrice, brand };
        try {
            console.log(purchaseData);
            const response = await axios.post('http://localhost:8080/purchase/addPurchase', purchaseData);
            if (response.status === 200) {
                alert(response.data);
                window.location.reload();
            }
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                const { status, data } = error.response;
                if (status === 401) {
                    this.setState({ message: data });
                } else if (status === 400) {
                    this.setState({ message: data });
                } else if (status === 500) {
                    this.setState({ message: data });
                } else {
                    this.setState({ message: 'An error occurred' });
                }
            } else if (error.request) {
                // The request was made but no response was received
                this.setState({ message: 'No response from server' });
            } else {
                // Something happened in setting up the request that triggered an Error
                this.setState({ message: 'Error: ' + error.message });
            }
        }

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

                <div><h1>Purchase Details</h1></div>
            <div id={"product-container"}>
                
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>PURCHASE_ID</th>
                                <th>PRODUCT_CODE</th>
                                <th>PRODUCT_NAME</th>
                                <th>QUANTITY</th>
                                <th>TOTAL_COST</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.purchaseRecords && this.state.purchaseRecords.map(purchase => (
                                <tr key={purchase.purchaseId}>
                                    <td>{purchase.purchaseId}</td>
                                    <td>{purchase.productCode}</td>
                                    <td>{purchase.productName}</td>
                                    <td>{purchase.quantity}</td>
                                    <td>{purchase.totalCost}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id={"add-product-container"}>
                <div>
                    <h2> Add Purchase</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"add-product-input"}>
                        <div className={"add-product-details"}>
                            <label htmlFor={"product-brand"}>Select Supplier : </label>
                            <select onChange={this.handleSelectChange}>
                                <option>Select Supplier</option>
                                {this.state.supplierRecords.map(supplier => (
                                    <option key={supplier.supplierId} value={supplier.supplierName}>
                                        {supplier.supplierName}

                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"productName"}> Product Name:</label>
                            <input type={"text"} name={"productName"} id={"productName"} onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"quantity"}>Quantity: </label>
                            <input type={"text"} id={"quantity"} name={"quantity"} onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"costPrice"}>Cost Price: </label>
                            <input type={"text"} id={"costPrice"} name={"costPrice"} onChange={this.handleChange} required />
                        </div>

                        <div className={"add-product-details"}>
                            <label htmlFor={"sellingPrice"}>Selling Price: </label>
                            <input type={"text"} id={"sellingPrice"} name={"sellingPrice"} onChange={this.handleChange} required />
                        </div>

                        <div className={"add-product-details"}>
                            <label htmlFor={"brand"}>Brand: </label>
                            <input type={"text"} id={"brand"} name={"brand"} onChange={this.handleChange} required />
                        </div>

                    </div>
                </form>
                <div id={"add-product-login"}>
                            <div id={"add-product-login-button"}>
                                <button name={"add-product"}>Add Purchase</button>
                            </div>
                        </div>
            </div>
            </div>
        </>)
    }
}

export default Purchase;
