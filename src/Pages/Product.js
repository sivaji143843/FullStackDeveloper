import React, { Component } from "react";
import '../CSS/Product.css'
import axios from "axios";

 class Product extends Component{
    constructor(props){
        super(props);
        this.state={
            productName:'',
            quantity:'',
            costPrice:'',
            sellingPrice:'',
            productBrand:'',
            message:'',
            products:[],
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const { name, value} =event.target;
        console.log(name);
        console.log(value);
        this.setState({
            [name]: value,
        });
    }
        async componentDidMount(){
            const response = await axios.get('http://localhost:8090/products/getAllProducts');
            console.log(response.data);
            this.setState(()=>({
                products:response.data
            }))
        }
        async handleSubmit(event) {
            event.preventDefault();
            const { productName, quantity,costPrice,sellingPrice, productBrand} = this.state;
            const productData = { productName, quantity,costPrice,sellingPrice, productBrand};
            try {
                console.log(productData);
                const response = await axios.post('http://localhost:8090/products/addProduct',productData);
            
                if (response.status===200) {
                    alert(response.data);
                    
                }
            }catch (error){
                if (error.response) {
                    // The request was made and the server responded with a status code
                    const { status,data } = error.response;
                    if (status === 401) {
                        this.setState({ message: data });
                    } else if (status === 400) {
                        this.setState({ message: data });
                    }  else if (status === 500) {
                        this.setState({ message: data });
                    }else {
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
    
    render(){
        return(
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
                <div><h1>Product Details</h1>
                <div id = {"product-container"}>   
                    <div className="table-container">
                        <table>
                            <thead>
                                <tr>
                                    <th>PRODUCT_CODE</th>
                                    <th>PRODUCT_NAME</th>
                                    <th>COST_PRICE</th>
                                    <th>SELL_PRICE</th>
                                    <th>BRAND</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.products.map(product => (
                                    <tr key = {product.id}>
                                        <td>{product.productCode}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.costPrice}</td>
                                        <td>{product.sellingPrice}</td>
                                        <td>{product.productBrand}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>
                <div>
                    <button className="signout">Signout</button>
                </div>
            <div id={"add-product-container"}>
                <div>
                    <h4>{this.state.message}</h4>
                    <h2> Add Product</h2>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"add-product-input"}>
                        <div className={"add-product-details"}>
                            <label htmlFor={"productName"}> Product Name:</label>
                            <input type={"text"} name={"productName"} id={"productName"} placeholder="Enter Product Name" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"quantity"}>Quantity: </label>
                            <input type={"text"} id={"quantity"} name={"quantity"} className={"quantity"} placeholder="Enter Quantity" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"costPrice"}>Cost Price: </label>
                            <input type={"text"} id={"costPrice"} name={"costPrice"} className={"costPrice"} placeholder="Enter Cost Price" onChange={this.handleChange} required />
                            </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"sellingPrice"}>Selling Price: </label>
                            <input type={"text"} id={"sellingPrice"} name={"sellingPrice"} className={"sellingPrice"} placeholder="Enter Selling Price" onChange={this.handleChange} required />
                        </div>
                        <div className={"add-product-details"}>
                            <label htmlFor={"productBrand"}>Brand: </label>
                            <input type={"text"} id={"productBrand"}name={"productBrand"}  className={"productBrand"} placeholder="Enter Brand Name" onChange={this.handleChange} required />
                        </div>
                       
                        </div>
                        </form>
                        <div id={"add-product-login"}>
                            <div id={"add-product-login-button"}>
                                <button name={"add-product"}>Add Product</button>
                            </div>
                        </div>
            </div>
            </div>  
        )
    }    

 }
export default Product;