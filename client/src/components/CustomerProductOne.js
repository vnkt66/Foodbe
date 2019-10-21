import React, { Component } from 'react';
// import {Image, Row, Form} from 'react-bootstrap';
// import {Form} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { Grid, Image, Item } from 'semantic-ui-react';
import axios from 'axios';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

class CustomerProduct extends Component {
    state = {
        product: [],
        // quantity: '',
        Information: [],
        customermail: '',
        sellermail: '' 
    }

    componentDidMount() {
        // console.log(this.props);
        // if(this.props.match.params.id2 === '') {
        //     this.props.history.push('/CustLogin');
        // }
    var usermail = localStorage.getItem('username');
  //   if(usermail === null) {
  //     this.props.history.push('/CustLogin');
  // }
    this.setState({
      customermail: usermail
    })
      axios.get('/portal/customerproductone/' + this.props.match.params.id2)
      .then((res) => {
        console.log(res);
        // if(usermail === null) {
        //     this.props.history.push('/CustLogin');
        // }
        // // if(res.data.details.customermail === '') {
        // //     this.props.history.push('/CustLogin');
        // // }
        //   console.log(res);
          if(usermail !== null || usermail === null) {
            this.setState({
                product: res.data.product[0]
            })
          }
      })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  //   onQuantityChange = (event) => {
  //     var maxquantity = this.state.product.quantity;
  //     var minquantity = 1;
  //     console.log(maxquantity);
  //     console.log(event.target.value);
  //     if(event.target.value >= minquantity && event.target.value <= maxquantity) {
  //         var changedproduct = {...this.state.product};
  //         changedproduct.quantity = event.target.value;
  //         this.setState({
  //             quantity: event.target.value,
  //             product: changedproduct
  //         })
  //     }
  //     console.log(this.state.product);
  //     console.log(this.state.product.quantity);
  //     // console.log(event.target.value);
  // }

  onImageClicked = () => {
    this.props.history.push('/customerproducts/' + this.props.match.params.id2, { quantity: this.state.quantity})
  }

    onLogout = () => {
        // toast.notify('Hope to see you again Bye!!', {
        //   duration: 2000
        // });
        localStorage.removeItem('username');
        localStorage.removeItem('expirationDate');
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        var username = localStorage.getItem('username');
         if(username === null) {
            this.props.history.push('/Customer');
         }
      }

    // onSubmit = (event) => {
    //     event.preventDefault();

    //     const details = {
    //        product: this.state.product,
    //        clientemail: this.state.Information.clientmail,
    //        clientaddress: this.state.custaddress,
    //        clientaddress1: this.state.custaddress1,
    //        clientcity: this.state.custcity,
    //        clientstate: this.state.custstate,
    //        clienzip: this.state.custzip,
    //        selleremail: this.state.Information.sellermail,
    //        clientphone: this.state.Information.clientphone,
    //        sellerphone: this.state.Information.sellerphone
    //     }
    //     axios.post('http://localhost:4000/checkout', details)
    //     .then((res) => {
    //         console.log(res);
    //         this.props.history.push('/customerproducts');
    //     })

    //     this.setState({
    //         product: [],
    //         Information: [],
    //         custemail: '',
    //         custpassword: '',
    //         custaddress: '',
    //         custaddress1: '',
    //         custcity: '',
    //         custstate: '',
    //         custzip: ''
    //     })
    // }
    render() {
        return (
        <div>
          {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Customer" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/customerproducts" name='products' onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/CustOrders" name='orders' onClick={this.handleItemClick}></Menu.Item>
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
        {this.state.customermail ? <li><Link to="/CustOrders" style={{outline: 'none'}}>Orders</Link></li> : ''}
        {this.state.customermail ? <li><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li> : ''}
      </ul>
    </div>
  </div>
</nav>
          <div style={{marginTop: '50px'}}>
          <h1 style={{textAlign: 'center'}}>Item Information</h1>
          <Grid columns='equal'>
          <Grid.Column></Grid.Column>
          <Grid.Column width={12}>
          <Item.Group>
           <Item>
            <Item.Image 
             size='medium' 
             src={this.state.product.picture} 
             style={{cursor: 'pointer'}}
             label={{ as: 'a', corner: 'left', icon: 'shop' }} 
             onClick={this.onImageClicked}/>
            <Item.Content>
               <Item.Header as='a'>ItemName: {this.state.product.name}</Item.Header>
               <Item.Description>
               <p>ItemDescription: {this.state.product.description}</p>
               {/* <p>Price: {this.state.product.price}₹</p>
               <p>Discount: {this.state.product.discount}₹</p> */}
               <p>Quantity: {this.state.product.quantity}</p>
               {/* <p>Quantity:
               <Form.Control type="number" placeholder="Quantity" min="1" onChange={this.onQuantityChange} max={this.state.product.quantity}/>
               </p>    */}
               </Item.Description>      
            </Item.Content>
            </Item>
           </Item.Group>
          </Grid.Column>
          <Grid.Column></Grid.Column>
          </Grid>
          <hr/>
          <h3>Donator Information:</h3>
          <Grid columns='equal'>
          <Grid.Column width={7}>
          <Item.Group>
           <Item>
            <Image src={this.state.product.sellerimage} size='tiny'/>
            <Item.Content>
               <Item.Description>
                  <h5>Name: {this.state.product.sellername}</h5>
                  <p/>
                  <h6>Contact Details:</h6>
               </Item.Description>    
               <Item.Meta>
                  <span className='mail'>{this.state.product.sellermail}</span>
               </Item.Meta>
               <Item.Meta>
                  <span className='phone'>{this.state.product.sellerphone}</span>
               </Item.Meta>      
            </Item.Content>
           </Item>
           </Item.Group>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
          </Grid>
        </div>
        </div>
        )
    }
};

export default CustomerProduct;