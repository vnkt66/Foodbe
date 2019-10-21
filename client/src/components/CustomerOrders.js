import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { List, Item, Image, Header, Segment, TransitionablePortal, Icon, Button, Rating } from 'semantic-ui-react';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

class CustomerOrders extends Component {
    state = {
       customermail: '',
       orders : [],
       open: false
    }
    componentDidMount() {
      var usermail = localStorage.getItem('username');
      if(usermail === null) {
        this.props.history.push('/');
    }
      this.setState({
        customermail: usermail
      })
        axios.get('/portal/custorders', {
          params: {
            customermail: usermail
          }
        }).then((res) => {
            // console.log(res);
            // if(usermail === null) {
            //     this.props.history.push('/');
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
  handleRate = (e, { rating, maxRating }) => {
    this.setState({ rating, maxRating });
  }
  onLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    var username = localStorage.getItem('username');
    if(username === null) {
      this.props.history.push('/Customer');
    }
  }

  onRating = (productid) => {
    console.log(this.state.rating);
    axios.post('/portal/rating/' + productid, {rating: this.state.rating}).then((res) => {
      console.log(res);
      if(res.data.msg) {
        // toast.notify('You rating has been recorded successfully kudos!!', {
        //   duration: 2000
        // });
         this.props.history.push('/Customer');
      }
    })
  }
    render() {
        const { open } = this.state;
        let orders = this.state.orders.map((order) => {
            return (
            <List.Item key={order._id}>
             <Image avatar src={order.picture} />
             <List.Content>
             {/* <List.Header>{order.name}</List.Header> */}
             <List.Description>
             You have ordered { order.name }{' '}
            {/* with the price of <b>{ order.price - order.discount}₹</b>. */}
             </List.Description>
             <Item.Meta>
              <span className='quantity'>Quantity: {order.quantity}</span>
             </Item.Meta>
             <List.Item>
              Rate the Item
             <Button 
              circular 
              animated='vertical' 
              compact 
              onClick={() => this.onRating(order.productid)}
              style={{width: '20px', height: '20px', padding: '2px', textAlign: 'center', margin: '0px 4px'}}>
               {/* <Button.Content hidden>Rate</Button.Content> */}
               <Button.Content visible>
                 <Icon name='smile' />
               </Button.Content>
               </Button>
               <Rating maxRating={5} onRate={this.handleRate} />
               </List.Item>
             <Icon 
              onClick={this.handleClick}
              name='plus circle' 
              style={{cursor:'pointer'}}
              size='small' />
             </List.Content>
             <div>
             <TransitionablePortal onClose={this.handleClose} open={open}>
               <Segment style={{ left: '10%', position: 'fixed', top: '30%', zIndex: 1000 }}>
               <Header>Donator Details</Header>
               <p>{order.selleremail}</p>
               <p>{order.sellerphone}</p>
               </Segment>
             </TransitionablePortal>
             </div>
             </List.Item>
            );
        })
        return (
          <div>
              {/* <Menu pointing secondary>
               <Menu.Item as={Link} to="/Customer" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
               <Menu.Item as={Link} to="/customerproducts" name='products' onClick={this.handleItemClick}></Menu.Item>
               <Menu.Item as={Link} to="/CustOrders" name='orders' active={activeItem === 'orders'} onClick={this.handleItemClick}></Menu.Item>
               <Menu.Menu position='right'>
                 <Menu.Item
                   name='logout'
                   style={{ cursor: 'pointer'}}
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
        <li><Link to="/Customer" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/customerproducts" style={{outline: 'none'}}>Items</Link></li>
        <li><Link to="/CustOrders" style={{outline: 'none'}}>Orders</Link></li>
        <li><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
      </ul>
    </div>
  </div>
</nav>
              <div style={{marginTop: '40px'}}>
              <Segment>
              <h1 style={{textAlign: "center"}}>Your Orders:</h1>
                <List animated verticalAlign='middle'>
                    {orders}
                    {/* <hr /> */}
                </List>
              </Segment>
              </div>
          </div>
        )
    }
}

export default CustomerOrders;