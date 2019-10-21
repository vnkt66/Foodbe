import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import { Menu } from 'semantic-ui-react';
// import Logo from '../components/Logo.png';
// import toast from 'toasted-notes' 
import SignIn from './Login';
// import 'toasted-notes/src/styles.css';

class SellerLogin extends Component {
  state = {
    // sellername: '',
    sellerpassword: '',
    selleremail: '',
    loggedInseller: '',
    error: '',
    // activeItem: '',
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
    console.log(localStorage.getItem('sellername'));
    var usermail = localStorage.getItem('sellername');
    if(usermail !== null) {
      this.props.history.push('/Seller');
    }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
// onChangename = (event) => {
//   this.setState({
//       sellername: event.target.value
//   })
// }
  
onChangepassword = (event) => {
  console.log(event.target.value);
 this.setState({
     sellerpassword: event.target.value
 })
}

onChangeemail = (event) => {
  console.log(event.target.value);
  this.setState({
      selleremail: event.target.value
  })
 }

//  onForgotPassword = () => {
//   this.props.history.push('/SellForgot');
// }

onSubmit = (event) => {
  event.preventDefault();

  console.log(`Form Submitted`);
  // console.log(this.state.sellername);
  console.log(this.state.sellerpassword);
  console.log(this.state.selleremail);

  const Register = {
      // username: this.state.sellername,
      password: this.state.sellerpassword,
      email: this.state.selleremail
  }

  axios.post('/portal/selllogin', Register)
  .then((res) => {
    // toast.notify('You are now logged in!!', {
    //   duration: 2000
    // });
    console.log(res);
    // if(res.data.loggers.sellermail !== '' && res.data.loggers.sellername !== '' && res.data.loggers.sellerid !== '') {
    //   this.props.history.push({pathname: '/Seller'});
    // }
    const expirationDate = new Date(new Date().getTime() + new Date().getTime() * 2000)
      localStorage.setItem('sellername', res.data.loggers.sellermail);
      localStorage.setItem('expirationDate', expirationDate);
      localStorage.removeItem('username');
      localStorage.removeItem('userplace');
      this.props.history.push('/Seller');
  });

  this.setState({
      // sellername: '',
      sellerpassword: '',
      selleremail: ''
  })
}
 render() {
  // const { activeItem } = this.state;
  return (
    <div className="SellerLogin">
      {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Seller" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/SellRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
      </Menu> */}
  <nav className="navbar navbar-inverse navbar-top-fixed">
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
        <li><Link to="/SellRegister" style={{outline: 'none'}}>Register</Link></li>
      </ul>
    </div>
  </div>
</nav>
      {/* <h1>Seller Login</h1> */}
      <div style={{marginTop: '50px'}}>
      <SignIn 
      submit={(event) => this.onSubmit(event)}
      onemailchange={(event) => this.onChangeemail(event)}
      onpasswordchange={(event) => this.onChangepassword(event)}
      />
      {/* <form className="form-horizontal" onSubmit={() => this.onSubmit}>
         <div className="form-group">
           <label htmlFor="inputUser3" className="col-sm-2 control-label">UserName</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputUser3" onChange={this.onChangename} placeholder="Username" />
         </div>
         </div> 
         <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputEmail3" onChange={this.onChangeemail} placeholder="Email" />
           </div>
         </div> 
       <div className="form-group">
         <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
         <div className="col-sm-8">
        <input type="password" className="form-control" id="inputPassword3" onChange={this.onChangepassword} placeholder="Password" />
        </div>
      </div>
      <div className="form-group">
        <div className="col-sm-offset-2 col-sm-10">
        <button type="submit" className="btn btn-default">Sign in</button>
      </div>
     </div>
     <div className="form-group">
      <div className="col-sm-offset-2 col-sm-10">
      <button type="submit" className="btn btn-default" onClick={this.onForgotPassword}>Forgot Password</button>
      </div>
    </div>
    </form>
     */}
     </div>
     </div>
  );
}
}

export default SellerLogin;