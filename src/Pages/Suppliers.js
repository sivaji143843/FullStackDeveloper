import React, { Component } from "react";
import '../CSS/Suppliers.css'
import axios from "axios";

class Suppliers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            supplierName: '',
            mobileNumber: '',
            address: '',
            email: '',
            message: '',
            supplierRecords: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
        const response = await axios.get('http://localhost:8080/supplier/loadSuppliers');
        console.log(response.data);
        this.setState(() => ({
            supplierRecords: response.data
        }))
    }
    async handleSubmit(event) {
        event.preventDefault();
        const { supplierName, mobileNumber, address, email } = this.state;
        const supplierData = { supplierName, mobileNumber, address, email };
        try {
            console.log(supplierData);
            const response = await axios.post('http://localhost:8080/supplier/addSupplier', supplierData);

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
            <div><h1>Suppliers Details </h1></div>
            <div id={"product-container"}>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>SUPPLIER_CODE</th>
                                <th>SUPPLIER_NAME</th>
                                <th>ADDRESS</th>
                                <th>MOBILE_NUMBER</th>
                                <th>EMAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.supplierRecords.map(supplier => (
                                <tr key={supplier.supplierId}>
                                    <td>{supplier.supplierCode}</td>
                                    <td>{supplier.supplierName}</td>
                                    <td>{supplier.address}</td>
                                    <td>{supplier.mobileNumber}</td>
                                    <td>{supplier.email}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div id={"add-product-container"}>
                <div>
                    <h2> Add Supplier </h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"add-product-input"}>
                        <div className={"add-product-details"}>
                            <label htmlFor={"supplierName"}> Supplier Name:</label>
                            <input type={"text"} name={"supplierName"} id={"supplierName"} placeholder="Enter Supplier Name" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"address"}>Address: </label>
                            <input type={"text"} id={"address"} name={"address"} placeholder="Enter Address" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"mobileNumber"}>Mobile Number: </label>
                            <input type={"text"} id={"mobileNumber"} name={"mobileNumber"} placeholder="Enter Mobile Number" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"quantity"}>Email : </label>
                            <input type={"text"} id={"email"} name={"email"} placeholder="Enter Email" onChange={this.handleChange} required />
                        </div>

                    </div>
                </form>
                <div id={"add-product-login"}>
                            <div id={"add-product-login-button"}>
                                <button name={"add-product"}>Add Supplier</button>
                            </div>
                        </div>
            </div>
            </div>
        </>)
    }
}

export default Suppliers;
