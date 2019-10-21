import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import { Icon, Item, Segment } from 'semantic-ui-react';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

import axios from 'axios';

import './Customer.css';

class Customer extends Component {
  state = { 
    activeItem: '',
    customermail: '',
    customers: []
  }
  componentDidMount() {
    var usermail = localStorage.getItem('username');
    if(usermail === null) {
      this.props.history.push('/CustLogin');
    }
    axios.get('/portal/logindetails').then((res) => {
      if(usermail !== null) {
        this.setState({
          customers: res.data.customers,
          customermail: usermail
        })
      }
    })
}
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  onLogout = () => {
    localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            var username = localStorage.getItem('username');
            this.setState({
               customermail: username
            })
            if(username === null) {
              this.props.history.push('/');
            }
  }
  render() {
    let customers = this.state.customers.map((customer) => {
      return (
        <Item key={customer._id}>
         <Item.Image size='tiny' src={customer.image} centered/>
         <Item.Content verticalAlign='middle'>
           <Item.Header>
               {customer.username}
               {/* <Icon name='like' /> */}
             </Item.Header>
             <Item.Meta>
               <span className='cinema'>{customer.place}</span>
               <Icon name='map marker alternate' size='small' color='olive'/>
             </Item.Meta>
          </Item.Content>
         </Item>
      )
    })
    // const { activeItem } = this.state;
    var route1 = null;
    if(this.state.customermail !== null) { 
      // route1 = <Menu.Item as={Link} to="/customerproducts" name='products' active={activeItem === 'products'} onClick={this.handleItemClick}></Menu.Item>
      route1 = <li><Link to="/customerproducts" style={{outline: 'none'}}>Items</Link></li>
    }
    var route2 = <li><Link to="/CustRegister" style={{outline: 'none'}}>Register</Link></li>
 if(this.state.customermail !== null) {
  route2 = null
}
// var route3 = <Menu.Item as={Link} to="/CustLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/>
var route3 = <li><Link to="/CustLogin" style={{outline: 'none'}}>Login</Link></li>
if(this.state.customermail !== null) { route3 = null }
    if(this.state.customermail !== null) {
  var  route4 = <li><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
//   <Menu.Menu position='right'>
//     <Menu.Item
//    name='logout'
//    onClick={this.onLogout}
//  />
//  </Menu.Menu>;
    }
 if(this.state.customermail !== null) {
  var  route5 = <li><Link to="/CustOrders" style={{outline: 'none'}}>Orders</Link></li>
  // <Menu.Item as={Link} to="/CustOrders" name='orders'/>
}
// if(this.state.customermail !== '') {
//   var  profile = <Image src='https://www.hungama.com/assets/images/profile-img1.png' as={Link} to="/CustProfile" avatar size="mini"/>
  
// }
    return (
      <div>
           {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            {/* <Menu.Item as={Link} to="/customerproducts" name='products' active={activeItem === 'products'} onClick={this.handleItemClick}></Menu.Item> */}
            {/* <Menu.Item as={Link} to="/CustRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
            <Menu.Item as={Link} to="/CustLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/> */}
         
          {/* <Menu.Menu position='right'>
            <Menu.Item
              name='logout'
              active={activeItem === 'logout'}
              onClick={this.handleItemClick}
            />
          </Menu.Menu>  */}
          {/* {route1}
          {route2}
          {route3}
          {route5}
          {route4} */}
          {/* {profile} */}
        {/* </Menu>  */}

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
        {route5}
        {route4}
      </ul>
    </div>
  </div>
</nav>
        <Segment style={{marginTop: '50px'}}>
        <h3 style={{textAlign: "center"}}>Our Volunteers</h3>
        <Item.Group>
          {/* <img src='https://react.semantic-ui.com/images/wireframe/media-paragraph.png' alt="customer"/> */}
          { customers }
        </Item.Group>
        </Segment>
      </div>
    );
   }
  }

export default Customer;