import { Component } from "react";
import '../CSS/HomePage.css'
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
            const response = await axios.get('http://localhost:8080/products/getAllProducts');
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
                const response = await axios.post('http://localhost:8080/products/addProduct',productData);
            
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
                <h1>Product Details</h1>
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
                <div className="table-container">
                    <table>
                        <tr>
                            <th>PRODUCT_CODE</th>
                            <th>PRODUCT_NAME</th>
                            <th>COST_PRICE</th>
                            <th>SELL_PRICE</th>
                            <th>BRAND</th>
                        </tr>
                    </table>
                </div>
                <div>
                    <button className="signout">Signout</button>
                </div>
            </div>
        )
    }
}

export default Product;