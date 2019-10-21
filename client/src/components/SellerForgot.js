import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Grid } from 'semantic-ui-react';
// import { Menu } from 'semantic-ui-react';
// import toast from 'toasted-notes';
// import 'toasted-notes/src/styles.css';

class SellerForgot extends Component {

    state = {
        selleremail: '',
        activeItem: '',
        customermail: '',
        sellermail: '' 
    }

  componentDidMount() {
      // axios.get('http://localhost:4000/logindetails').then((res) => {
      //   console.log(res.data.details);
      //   this.setState({
      //     customermail: res.data.details.customermail,
      //     sellermail: res.data.details.sellermail
      //   })
      //   if(res.data.details.sellermail !== '') {
      //     this.props.history.push('/selleredit');
      //   }
      // })
      var usermail = localStorage.getItem('sellername');
      if(usermail !== null) {
         this.props.history.push('/Seller');
       }
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name })
    onChangeemail = (event) => {
        this.setState({
            selleremail: event.target.value
        })
       }


    onSubmit = (event) => {
      event.preventDefault();

      const Forgot = {
        email: this.state.selleremail
    }

      axios.post('/portal/sellerforgot', Forgot)
  .then((res) => {
    // toast.notify('Password Reset Link has been sent to your email', {
    //   duration: 2000
    // });
    console.log(res);
     })
    }
    render() {
        // const { activeItem } = this.state;
        return (
          <div className="Forgot" onSubmit={this.onSubmit}>
           {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Seller" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/SellRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
            <Menu.Item as={Link} to="/SellLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/>
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
      <li><Link to="/SellRegister" style={{outline: 'none'}}>Register</Link></li>
      <li><Link to="/SellLogin" style={{outline: 'none'}}>Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
          <div style={{marginTop: '80px'}}>
            <Grid>
             <Grid.Column width={14}>
             <form className="form-horizontal">
           <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
           <div className="col-sm-8">
           <input type="email" className="form-control" id="inputEmail3" onChange={this.onChangeemail} placeholder="Email" />
           </div>
           </div>    
           <div className="form-group">
           <div className="col-sm-offset-2 col-sm-10">
           <button type="submit" className="btn btn-default">Forgot Password</button>
           </div>
           </div>
           </form>
             </Grid.Column>
            </Grid>
          </div>
          </div>
        )
    }
}

export default SellerForgot;



