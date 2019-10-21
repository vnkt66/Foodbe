import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import { Menu } from 'semantic-ui-react';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';

class SellerEditProduct extends Component {
    state = {
        name: '',
        description: '',
        price: 0,
        selectedFile: null,
        quantity: 0,
        discount: 0,
        activeItem: '',
        sellermail: ''
      }
    onChangename = (event) => {
      this.setState({
          name: event.target.value
      })
    }
    onChangedescription = (event) => {
        this.setState({
            description: event.target.value
        })
      }
    onChangeprice = (event) => {
        this.setState({
            price: event.target.value
        })
      }
    onChangeimage = (event) => {
        console.log(event.target.files[0])
        this.setState({
            selectedFile: event.target.files[0]
        })
      }
    onChangequantity = (event) => {
        this.setState({
            quantity: event.target.value
        })
      }
    onChangediscount = (event) => {
        this.setState({
            discount: event.target.value
        })
      }

    

    componentDidMount() {
        console.log(this.props);
        var usermail = localStorage.getItem('sellername');
        this.setState({
          sellermail: usermail
        })
        if(usermail === null) {
          this.props.history.push('/SellLogin');
      }
      axios.get('/portal/sellerproduct/' + this.props.match.params.id2, {
        params: {
          sellermail: usermail
        }
      })
      .then((res) => {
          console.log(res);
          // if(usermail === null) {
          //     this.props.history.push('/SellLogin');
          // }
          if(usermail !== null) {
            this.setState({
                name: res.data.sproduct[0].name,
                description: res.data.sproduct[0].description,
                price: res.data.sproduct[0].price,
                quantity: res.data.sproduct[0].quantity,
                discount: res.data.sproduct[0].discount,
                selectedFile: res.data.sproduct[0].picture
            })
          }
      })
    }



    onSubmit = (event) => {
        event.preventDefault();

        const data = new FormData(); 
        data.append('file', this.state.selectedFile);
        data.append('name', this.state.name);
        data.append('description', this.state.description);
        data.append('price', this.state.price);
        data.append('discount', this.state.discount);
        data.append('quantity', this.state.quantity);
        data.append('sellermail', this.state.sellermail);

        console.log(this.props);
        console.log(this.state.picture);
        console.log(this.props.location.pathname);

        axios.post( '/portal/' + this.props.location.pathname, data, { 
            // receive two parameter endpoint url ,form data
        })
        .then((res) => {
            console.log(res.statusText);
        })
    }

    onAddProducts = () => {
        this.props.history.push('/SellerAdd');
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

    render() {
        // const { activeItem } = this.state;
        return (
            <div onSubmit={this.onSubmit}>
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
        <li><Link to="/SellerAdd"  style={{outline: 'none'}}>Add Item</Link></li>
        <li><Link to="/SellOrders" style={{outline: 'none'}}>Orders</Link></li>
        <li id="logoutli"><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li>
      </ul>
    </div>
  </div>
</nav>
           <div style={{width: '80%', margin: '50px 30px'}}>
            <h2>Edit Item</h2>
            <form className="form-horizontal" encType="multipart/form-data">
            <div className="form-group">
            <label htmlFor="inputusername3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>ItemName</label>
            <div className="col-sm-8">
            <input type="text" className="form-control" id="inputusername3" value={this.state.name} onChange={this.onChangename} placeholder="Name" />
            </div>
            </div> 
            <div className="form-group">
            <label htmlFor="inputdesc3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>ItemDescription</label>
            <div className="col-sm-8">
            <input type="text" className="form-control" id="inputdesc3"value={this.state.description} onChange={this.onChangedescription} placeholder="Description" />
            </div>
            </div> 
            {/* <div className="form-group">
            <label htmlFor="inputprice3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>Price</label>
            <div className="col-sm-8">
            <input type="number" className="form-control" id="inputprice3" value={this.state.price} onChange={this.onChangeprice} placeholder="Price" />
            </div>
            </div>  */}
            <div className="form-group">
            <label htmlFor="inputpicture3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>upload Image</label>
            <div className="col-sm-8">
            <input type="file"  id="inputpicture3" name="file"  onChange={this.onChangeimage} accept="image/*" placeholder="Image" required/>
            </div>
            </div> 
            <div className="form-group">
            <label htmlFor="inputquantity3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>Quantity</label>
            <div className="col-sm-8">
            <input type="number" className="form-control" id="inputquantity3" value={this.state.quantity} onChange={this.onChangequantity} placeholder="Quantity" />
            </div>
            </div> 
            {/* <div className="form-group">
            <label htmlFor="inputdiscount3" className="col-sm-2 control-label" style={{marginRight: '35px'}}>Discount</label>
            <div className="col-sm-8">
            <input type="number" className="form-control" id="inputdiscount3" value={this.state.discount} onChange={this.onChangediscount} placeholder="Discount" />
            </div>
            </div>  */}
            <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Submit</button>
            </div>
            </div>
            </form>
            </div>
            </div>
        )
    }
};

export default SellerEditProduct;