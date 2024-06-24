import { Component } from "react";
import axios from "axios";
import '../CSS/Sales.css'

class Sales extends Component{
    constructor(props){
        super(props);
        this.state = {
            productName: '',
            sellPrice:'',
            soldBy:'',
            quantity: '',
            message: '',
            price: '',
            products: [],
            customers: [],
            salesData: [],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSalePriceChange = this.handleSalePriceChange.bind(this);
        this.handleCustomerChange = this.handleCustomerChange.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        this.setState ({
            [name]: value,
        });
    }

    handleSelectChange(event) {
       this.setState({
        productame: event.target.value
       }) 
    }

    handleSalePriceChange(event) {
        this.setState({
            sellPrice:  event.target.value
        })
    }

    handleCustomerChange(event) {
        this.setState({
            soldBy: event.target.value
        })
    }

    findRecord() {
        return this.state.products.filter(product => product.productName === this.state.productName).map(product => (
            <option key = {product.sellingRice}>
                {product.sellingPrice}
            </option>
        ));
    }

    async componentDidMount() {
        const response = await axios.get('http://localhost:8080/products/getAllProducts');
        this.setState(() => ({
            products: response.data
        }))

        const customerResponse = await axios.get('http://localhost:8090/customer/getAllCustomer');
        this.setState(() =>({
            customers: customerResponse.data
        }))

        const salesResponse = await axios.get('http://localhost:8090/sales/loadAllSales');
        this.setState(() => ({
            salesData: salesResponse.data
        }))
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { productName, sellPrice, quantity, soldBy } = this.state;
        const salesData = { productName, sellPrice, quantity, soldBy };
        try {
            console.log(salesData);
            const response = await axios.post('http://localhost:8080/sales/addSale', salesData);

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
                <div><h1>Sales Details</h1></div>
            <div id={"product-container"}>
                
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>SALE_ID</th>
                                <th>SOLD_DATE</th>
                                <th>QUANTITY</th>
                                <th>REVENUE</th>
                                <th>SOLDBY</th>
                            </tr>

                        </thead>
                        <tbody>
                            {this.state.salesData.map(sale => (
                                <tr key={sale.salesId}>
                                    <td>{sale.salesId}</td>
                                    <td>{sale.dateTime}</td>
                                    <td>{sale.quantity}</td>
                                    <td>{sale.revenue}</td>
                                    <td>{sale.soldBy}</td>
                                </tr>
                            ))}

                        </tbody>
                    </table>
                </div>
            </div>
            <div id={"add-product-container"}>
                <div>
                    <h4>{this.state.message}</h4>
                    <h2> Add Customer</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"add-product-input"}>
                        <div className={"add-product-details"}>
                            <label htmlFor={"customerName"}> Product Name:</label>
                            <select onChange={this.handleSelectChange}>
                                <option>Select Product Name</option>
                                {this.state.products.map(product => (
                                    <option key={product.id} value={product.productName}>
                                        {product.productName}

                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"location"}>Selling Price: </label>
                            <select onChange={this.handleSalePriceChange}>
                                <option>Select Price</option>
                                {this.state.productName && this.findRecord()}

                            </select>
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"phone"}>Quantity: </label>
                            <input type={"text"} id={"quantity"} name={"quantity"} onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"email"}>SoldBy: </label>
                            <select onChange={this.handleCustomerChange}>
                                <option>Select Customer Name</option>
                                {this.state.customers.map(customer => (
                                    <option key={customer.customerId} value={customer.customerName}>
                                        {customer.customerName}

                                    </option>
                                ))}
                            </select>
                        </div>

                       
                    </div>
                </form>
                <div id={"add-product-login"}>
                            <div id={"add-product-login-button"}>
                                <button name={"add-product"}>Add Customer</button>
                            </div>
                        </div>
            </div>
            </div>
        </>)
    }
}

export default Sales;