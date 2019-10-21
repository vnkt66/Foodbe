import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Button,  Container, Col, Image, Row, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { Loader } from 'semantic-ui-react';
import axios from 'axios';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

class CustomerProduct extends Component {
    state = {
        product: [],
        Information: [],
        custemail: '',
        custpassword: '',
        custaddress: '',
        custaddress1: '',
        custcity: '',
        custstate: 'TamilNadu',
        custzip: '',
        customermail: '',
        sellermail: '' ,
        loading: false
    }

    onChangeemail = (event) => {
        this.setState({
            custemail: event.target.value
        })
       }
    
    onChangepassword = (event) => {
        this.setState({
            custpassword: event.target.value
        })
       }

    onChangeaddress = (event) => {
        this.setState({
            custaddress: event.target.value
        })
       }

    onChangeaddress1 = (event) => {
        this.setState({
            custaddress1: event.target.value
        })
       }
    
    onChangecity = (event) => {
        this.setState({
            custcity: event.target.value
        })
       }

    onChangestate = (event) => {
        this.setState({
            custstate: event.target.value
        })
       }
    onChangezip = (event) => {
        this.setState({
             custzip: event.target.value
         })
        }

    onQuantityChange = (event) => {
        var maxquantity = this.state.product.quantity;
        var minquantity = 1;
        console.log(maxquantity);
        console.log(event.target.value);
        if(event.target.value >= minquantity && event.target.value <= maxquantity) {
            var changedproduct = {...this.state.product};
            changedproduct.quantity = event.target.value;
            this.setState({
                product: changedproduct
            })
        }
        console.log(this.state.product);
        console.log(this.state.product.quantity);
        // console.log(event.target.value);
    }

    componentDidMount() {
        // console.log(this.props);
        // if(this.props.match.params.id2 === '') {
        //     this.props.history.push('/CustLogin');
        // }
        var usermail = localStorage.getItem('username');
        if(usermail === null) {
          this.props.history.push('/CustLogin');
      }
      this.setState({
          customermail: usermail
        })
      axios.get('/portal/customerproduct/' + this.props.match.params.id2, {
          params: {
              customermail: usermail
          }
      })
      .then((res) => {
        console.log(res);
        // if(usermail === null) {
        //     this.props.history.push('/CustLogin');
        // }
        // if(res.data.details.customermail === '') {
        //     this.props.history.push('/CustLogin');
        // }
          console.log(res);
          if(usermail !== null) {
            this.setState({
                product: res.data.sproduct,
                Information: res.data.clientsellerdetail,
                custemail: res.data.clientsellerdetail.clientmail,
                custpassword: res.data.clientsellerdetail.custpassword
            })
          }
      })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    onLogout = () => {
        // axios.post('http://localhost:4000/portal/logout').then((res) => {
        //   if(res.data.details.customermail === '') {
        //     this.props.history.push('/Customer');
        //   }
        // })
        // toast.notify('Hope to see you again Bye!!', {
        //     duration: 2000
        //   });
        localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            var username = localStorage.getItem('username');
            if(username === null) {
              this.props.history.push('/Customer');
            }
      }

    onSubmit = (event) => {
        event.preventDefault();

        const details = {
           product: this.state.product,
           clientemail: this.state.Information.clientmail,
           clientaddress: this.state.custaddress,
           clientaddress1: this.state.custaddress1,
           clientcity: this.state.custcity,
           clientstate: this.state.custstate,
           clienzip: this.state.custzip,
           selleremail: this.state.Information.sellermail,
           clientphone: this.state.Information.clientphone,
           sellerphone: this.state.Information.sellerphone
        }
        this.setState({
          loading: true
        })
        axios.post('/portal/checkout/' + this.props.match.params.id2, details)
        .then((res) => {
            console.log(res);
            if(res) {
              this.setState({
                loading: false
              })
            }
            this.props.history.push('/customerproducts');
        })

        this.setState({
            product: [],
            Information: [],
            custemail: '',
            custpassword: '',
            custaddress: '',
            custaddress1: '',
            custcity: '',
            custstate: '',
            custzip: ''
        })
    }
    render() {
        var data;
        if(this.state.loading) {
          // if(true) {
          data = <Loader style={{marginTop: '190px'}} active inline='centered' size='massive'>Hola, Your Order has started Processing</Loader>
        } else {
          data =  <ListGroup className="list-group-flush" style={{marginTop: '50px'}}>
          <Container>
          <Row className="justify-content-md-center">
          <Col xs={12} sm={4} md={4} lg={4} style={{paddingRight: '10px'}}>
          <h3>Item Details:</h3>
          <Image src={this.state.product.picture} style={{width: '100%'}}/>
          <ListGroupItem>Name: {this.state.product.name}</ListGroupItem>
          <ListGroupItem>ItemDescription: {this.state.product.description}</ListGroupItem>
          {/* <ListGroupItem>Price: {this.state.product.price - this.state.product.discount}</ListGroupItem> */}
          <ListGroupItem>
            <Form.Control type="number" placeholder="Quantity" min="1" onChange={this.onQuantityChange} max={this.state.product.quantity}/>
          </ListGroupItem>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
          <h3>Delivery Details:</h3>
          <Form onSubmit={this.onSubmit}>
           <Form.Row>
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Email"  onChange={this.onChangeemail}/>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password"  onChange={this.onChangepassword}/>
           </Form.Group>
           </Form.Row>

           <Form.Group controlId="formGridAddress1">
           <Form.Label>Address</Form.Label>
           <Form.Control placeholder="1234 Main St"  onChange={this.onChangeaddress}/>
           </Form.Group>

           <Form.Group controlId="formGridAddress2">
           <Form.Label>Address 2</Form.Label>
           <Form.Control placeholder="Apartment, studio, or floor"  onChange={this.onChangeaddress1}/>
           </Form.Group>

           <Form.Row>
           <Form.Group as={Col} controlId="formGridCity">
           <Form.Label>City</Form.Label>
           <Form.Control  onChange={this.onChangecity}/>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridState">
           <Form.Label>State</Form.Label>
           <Form.Control as="select" value={this.state.custstate} onChange={this.onChangestate}>
           <option value="TamilNadu">TamilNadu</option>
           <option value="Maharastra">Maharastra</option>
           </Form.Control>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridZip">
           <Form.Label>Zip</Form.Label>
           <Form.Control value={this.state.custzip} onChange={this.onChangezip}/>
           </Form.Group>
           </Form.Row>

          <Button variant="primary" type="submit">Submit</Button>
          </Form>
          </Col>
          </Row>
          </Container>
          </ListGroup>
        }
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
        <li><Link to="/CustOrders" style={{outline: 'none'}}>Orders</Link></li>
        <li><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
      </ul>
    </div>
  </div>
</nav>
         { data }
          {/* <ListGroup className="list-group-flush" style={{marginTop: '50px'}}>
          <Container>
          <Row className="justify-content-md-center">
          <Col xs={12} sm={4} md={4} lg={4} style={{paddingRight: '10px'}}>
          <h3>Product Details:</h3>
          <Image src={this.state.product.picture} style={{width: '100%'}}/>
          <ListGroupItem>Name: {this.state.product.name}</ListGroupItem>
          <ListGroupItem>Description: {this.state.product.description}</ListGroupItem>
          <ListGroupItem>Price: {this.state.product.price - this.state.product.discount}</ListGroupItem>
          <ListGroupItem>
            <Form.Control type="number" placeholder="Quantity" min="1" onChange={this.onQuantityChange} max={this.state.product.quantity}/>
          </ListGroupItem>
          </Col>
          <Col xs={12} sm={8} md={8} lg={8}>
          <h3>Delivery Details:</h3>
          <Form onSubmit={this.onSubmit}>
           <Form.Row>
           <Form.Group as={Col} controlId="formGridEmail">
           <Form.Label>Email</Form.Label>
           <Form.Control type="email" placeholder="Email"  onChange={this.onChangeemail}/>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridPassword">
           <Form.Label>Password</Form.Label>
           <Form.Control type="password" placeholder="Password"  onChange={this.onChangepassword}/>
           </Form.Group>
           </Form.Row>

           <Form.Group controlId="formGridAddress1">
           <Form.Label>Address</Form.Label>
           <Form.Control placeholder="1234 Main St"  onChange={this.onChangeaddress}/>
           </Form.Group>

           <Form.Group controlId="formGridAddress2">
           <Form.Label>Address 2</Form.Label>
           <Form.Control placeholder="Apartment, studio, or floor"  onChange={this.onChangeaddress1}/>
           </Form.Group>

           <Form.Row>
           <Form.Group as={Col} controlId="formGridCity">
           <Form.Label>City</Form.Label>
           <Form.Control  onChange={this.onChangecity}/>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridState">
           <Form.Label>State</Form.Label>
           <Form.Control as="select" value={this.state.custstate} onChange={this.onChangestate}>
           <option value="TamilNadu">TamilNadu</option>
           <option value="Maharastra">Maharastra</option>
           </Form.Control>
           </Form.Group>

           <Form.Group as={Col} controlId="formGridZip">
           <Form.Label>Zip</Form.Label>
           <Form.Control value={this.state.custzip} onChange={this.onChangezip}/>
           </Form.Group>
           </Form.Row>

          <Button variant="primary" type="submit">Submit</Button>
          </Form>
          </Col>
          </Row>
          </Container>
          </ListGroup> */}
        </div>
        )
    }
};

export default CustomerProduct;