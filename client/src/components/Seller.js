import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon, Item, Segment } from 'semantic-ui-react';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

import axios from 'axios';
import './Seller.css';

class Seller extends Component {
  state = { 
    activeItem: '',
    customermail: '',
    sellermail: '',
    sellers: []
  }
  componentDidMount() {
    var usermail = localStorage.getItem('sellername');
    if(usermail === null) {
      this.props.history.push('/SellLogin');
    }
    axios.get('/portal/sellerlogindetails').then((res) => {
      if(usermail !== null) {
      this.setState({
        sellers: res.data.sellers,
        sellermail: usermail
      })
    }
    })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
//   onAddProducts = () => {
//     this.props.history.push('/SellerAdd');
// } 
  onLogout = () => {
    // toast.notify('Hope to see you again Bye!!', {
    //   duration: 2000
    // });
    // axios.post('http://localhost:4000/portal/logout').then((res) => {
    //   if(res.data.details.sellermail === '') {
    //     this.props.history.push('/');
    //   }
    // })
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
  render() {
    let sellers = this.state.sellers.map((seller) => {
      return (
        <Item key={seller._id}>
         <Item.Image size='tiny' src={seller.image} rounded centered/>
         <Item.Content verticalAlign='middle'>
           <Item.Header>
               {seller.username}
               {/* <Icon name='like' /> */}
             </Item.Header>
             <Item.Meta>
               <span className='cinema'>{seller.place}</span>
               <Icon name='map marker alternate' size='small' color='olive'/>
             </Item.Meta>
          </Item.Content>
         </Item>
      )
    })
    // const { activeItem } = this.state;
    var route1 = null;
    if(this.state.sellermail !== null) { 
      route1 = <li><Link to="/selleredit" style={{outline: 'none'}}>Items</Link></li>
    }
    var route2 = <li><Link to="/SellRegister" style={{outline: 'none'}}>Register</Link></li>
//     <div>
//     <Menu.Item as={Link} to="/SellRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
// </div>
 if(this.state.sellermail !== null) {
  route2 = null
}
var route3 = <li><Link to="/SellLogin" style={{outline: 'none'}}>Login</Link></li>
if(this.state.sellermail !== null) { route3 = null }
    if(this.state.sellermail !== null) {
  var  route4 = <li><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
//   <Menu.Menu position='right'>
//     <Menu.Item
//    name='logout'
//    onClick={this.onLogout}
//  />
//  </Menu.Menu>;
    }
    if(this.state.sellermail !== null) {
      var  route5 = <li><Link to="/SellOrders" style={{outline: 'none'}}>Orders</Link></li>
    }
    if(this.state.sellermail !== null) {
      var  route6 = <li><Link to="/SellerAdd" style={{outline: 'none'}}>Add Item</Link></li>
    //   <Menu.Item
    //   name='addproduct'
    //   onClick={this.onAddProducts}
    // />
    }
    return (
      <div>
        {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item> */}
            {/* <Menu.Item as={Link} to="/customerproducts" name='products' active={activeItem === 'products'} onClick={this.handleItemClick}></Menu.Item> */}
            {/* <Menu.Item as={Link} to="/CustRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
            <Menu.Item as={Link} to="/CustLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/>
         
          <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>  */}
          {/* {route1}
          {route2}
          {route3}
          {route6}
          {route5}
          {route4}
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
        <li><Link to="/" style={{outline: 'none'}}>Home</Link></li>
          {route1}
          {route2}
          {route3}
          {route6}
          {route5}
          {route4}
      </ul>
    </div>
  </div>
</nav>

        <Segment style={{marginTop: '50px'}}>
        <h1 style={{textAlign: "center"}}>Our Donators</h1>
        <Item.Group>
          {/* <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' alt="customer"/> */}
          { sellers }
        </Item.Group>
        </Segment>
      </div>
    );
  }
}

export default Seller;