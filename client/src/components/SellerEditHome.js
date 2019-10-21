import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import { Menu } from 'semantic-ui-react';
import SellerProduct from './SellerProduct';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

class SellerEditHome extends Component {
    state = {
        products : [],
        activeItem: 'products',
        customermail: '',
        sellermail: ''
    }
    componentDidMount() {
        console.log(this.props);
        var usermail = localStorage.getItem('sellername');
        // this.setState({
        //   sellermail: usermail
        // })
        if(usermail === null) {
          this.props.history.push('/SellLogin');
        }
        axios.get('/portal/sellerproducts', {
          params: {
            sellermail: usermail
          }
        })
        .then((res) => {
        //     if(res.data.msg) {
        //         this.props.history.push('/SellLogin');
        //     }
        //     if(!res.data.msg) {
        //     this.setState({
        //         products: res.data.products
        //     })
        // }
        // if(usermail === null) {
        //   this.props.history.push('/SellLogin');
        // }
        if(usermail !== null) {
          this.setState({
            products: res.data.products,
            sellermail: usermail
        })
        }
        })
    }

    onLogout = () => {
        // toast.notify('Hope to see you again Bye!!', {
        //   duration: 2000
        // });
        localStorage.removeItem('sellername');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        var username = localStorage.getItem('sellername');
        this.setState({
           sellermail: username
        })
        if(username === null) {
          this.props.history.push('/Seller');
        }
      }

    onAddProducts = () => {
        this.props.history.push('/SellerAdd');
    } 

    render() {
        // const { activeItem } = this.state;
        let products = this.state.products.map((product) => {
            return (
              <SellerProduct 
                 name = {product.name}
                 id = {product._id}
                 picture = {product.picture}
                 key = {product._id}
                 description = {product.description}
                 price={product.price}
                 quantity={product.quantity}
                 discount={product.discount}/>  )
            })
        return (
        <div>
         <div>
          {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Seller" name='home' onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/selleredit" name='products' active={activeItem === 'products'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item
              name='addproduct'
              onClick={this.onAddProducts}
            />
            <Menu.Item as={Link} to="/SellOrders" name='customerorders' active={activeItem === 'customerorders'} onClick={this.handleItemClick}></Menu.Item>
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              onClick={this.onLogout}
            />
          </Menu.Menu>
        </Menu> */}
        <nav className="navbar navbar-inverse navbar-fixed-top">
  <div className="container-fluid">
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/" style={{width: '170px', fontSize: '35px', marginLeft: '15px', outline: 'none'}}>
       Foodbe
      </a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        <li><Link to="/Seller" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/selleredit" style={{outline: 'none'}}>Items</Link></li>
        <li><Link to="SellerAdd" style={{outline: 'none'}}>Add Item</Link></li>
        <li><Link to="/SellOrders" style={{outline: 'none'}}>Orders</Link></li>
        <li id="logoutli"><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
      </ul>
    </div>
  </div>
</nav>

        {/* <Segment>
          <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' alt="seller"/>
        </Segment> */}
      </div>
      <div style={{marginTop: '50px'}}>
      {products}
      </div>
      </div>
        )
    }
}

export default SellerEditHome;