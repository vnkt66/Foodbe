import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import toast from 'toasted-notes';
// import 'toasted-notes/src/styles.css';
import { List, Item, Image, Segment } from 'semantic-ui-react';

class SellerOrders extends Component {
    state = {
       activeItem: 'customerorders',
       customermail: '',
       sellermail: '' ,
       orders : [],
       open: false
    }
    componentDidMount() {
       var usermail = localStorage.getItem('sellername');
       this.setState({
         sellermail: usermail
       })
       if(usermail === null) {
        this.props.history.push('/');
    }
        axios.get('/portal/sellorders', {
          params: {
            sellermail: usermail
          }
        }).then((res) => {
            console.log(res);
            // if(usermail === null) {
            //     this.props.history.push('/Seller');
            // }
            if(usermail !== null) {
            this.setState({
               orders: res.data.orders
            })
        }
        })
    }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name });
  handleClick = () => this.setState(prevState => ({ open: !prevState.open }));
  handleClose = () => this.setState({ open: false });
  onAddProducts = () => {
    this.props.history.push('/SellerAdd');
  } 
  onLogout = () => {
    // axios.post('http://localhost:4000/portal/logout').then((res) => {
    //   if(res.data.details.sellermail === '') {
    //     this.props.history.push('/Seller');
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
        // toast.notify('You are now logged out!!', {
        //   duration: 2000
        // });
        if(username === null) {
          this.props.history.push('/Seller');
        }
  }
    render() {
        // const { activeItem } = this.state;
        // const { open } = this.state;
        let orders = this.state.orders.map((order) => {
            return (
            <List.Item key={order._id} id="listitem" style={{ textAlign: 'center'}}>
             <Image avatar src={order.picture} />
             <List.Content>
             {/* <List.Header>{order.name}</List.Header> */}
             <List.Description>
             Your Customer have ordered { order.name }{' '}
            with the price of <b>{ order.price - order.discount}₹</b>.
             </List.Description>
             <Item.Meta>
              <span className='quantity'>Quantity: {order.quantity}</span>
             </Item.Meta>
             <Item.Meta>
              <span className='mail'>Customermail: {order.clientemail}</span>
             </Item.Meta>
             <Item.Meta>
              <span className='phone'>Customerphone: {order.clientphone}</span>
             </Item.Meta>
             </List.Content>
             {/* <Icon 
              onClick={this.handleClick}
              name='plus circle' 
              style={{cursor:'pointer'}}
              size='small' />
             </List.Content>
             <div>
             <TransitionablePortal onClose={this.handleClose} open={open}>
               <Segment style={{ left: '10%', position: 'fixed', top: '30%', zIndex: 1000 }}>
               <Header>Customer Details</Header>
               <p>{order.clientemail}</p>
               <p>{order.clientphone}</p>
               </Segment>
             </TransitionablePortal> 
             </div> */}
             <hr />
             </List.Item>
            );
        })
        return (
          <div>
              {/* <Menu pointing secondary>
               <Menu.Item as={Link} to="/Seller" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
               <Menu.Item as={Link} to="/Selleredit" name='products' onClick={this.handleItemClick}></Menu.Item>
               <Menu.Item name='addproduct' onClick={this.onAddProducts}/>
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
       Zerinth
      </a>
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
      <li><Link to="/Seller" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/selleredit" style={{outline: 'none'}}>Products</Link></li>
        <li><Link to="SellerAdd" style={{outline: 'none'}}>Add Product</Link></li>
        <li><Link to="/SellOrders" style={{outline: 'none'}}>Orders</Link></li>
        <li id="logoutli"><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
      </ul>
    </div>
  </div>
</nav>
              <Segment style={{marginTop: '50px'}}>
              <h2 style={{textAlign: "center"}}>Your Customer Orders:</h2>
                <List animated verticalAlign='middle'>
                    {orders}
                </List>
              </Segment>
          </div>
        )
    }
}

export default SellerOrders;