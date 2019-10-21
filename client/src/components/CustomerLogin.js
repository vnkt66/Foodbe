import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
// import { Menu } from 'semantic-ui-react';
// import toast from 'toasted-notes' 
// import 'toasted-notes/src/styles.css';
import SignIn from './CustLogin';

class CustomerLogin extends Component {
  state = {
    customerpassword: '',
    customeremail: '',
    loggedIncustomer: ''
    // activeItem: ''
  }
  componentDidMount() {
    console.log(localStorage.getItem('username'));
    var usermail = localStorage.getItem('username');
    if(usermail !== null) {
      this.props.history.push('/');
    }
    // axios.get('http://localhost:4000/logindetails', {
    //   params: {
    //     mail: usermail
    //   }
    // }
    //   ).then((res) => {
    //   console.log(res);
    //   console.log(res.data.details);
    //   this.setState({
    //     customermail: res.data.details.customermail,
    //     sellermail: res.data.details.sellermail
    //   })
    //   console.log(res.data.loggermail);
    //   if(res.data.details.customermail !== '') {
    //     this.props.history.push('/customerproducts');
    //   }
    // })
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
// onChangename = (event) => {
//   this.setState({
//       customername: event.target.value
//   })
// }
  
onChangepassword = (event) => {
 this.setState({
     customerpassword: event.target.value
 })
}

onChangeemail = (event) => {
  this.setState({
      customeremail: event.target.value
  })
 }

// onForgotPassword = () => {
//   this.props.history.push('/CustForgot');
// }

onSubmit = (event) => {
  event.preventDefault();

  console.log(`Form Submitted`);
  // console.log(this.state.customername);
  console.log(this.state.customerpassword);
  console.log(this.state.customeremail);

  const Login = {
      // username: this.state.customername,
      password: this.state.customerpassword,
      email: this.state.customeremail
  }

  axios.post('/portal/custlogin', Login)
  .then((res) => {
    console.log(res);
    // toast.notify('You are now logged in!!', {
    //   duration: 2000
    // });
    // if(res.data.loggers.customermail !== '' && res.data.loggers.customername !== '' && res.data.loggers.customerid !== '') {
      // this.props.history.push({pathname: '/customerproducts/' + res.data.loggers.customerid});
      const expirationDate = new Date(new Date().getTime() + new Date().getTime() * 2000)
      localStorage.removeItem('sellername');
      localStorage.setItem('username', res.data.loggers.customermail);
      localStorage.setItem('userplace', res.data.loggers.customerplace);
      localStorage.setItem('expirationDate', expirationDate);
      this.props.history.push('/Customer');
    // }
  });

  this.setState({
      // customername: '',
      customerpassword: '',
      customeremail: ''
  })
}

render() {
  // const { activeItem } = this.state;
  return (
    <div className="CustomerLogin">
      {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Customer" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/CustRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
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
        <li><Link to="/CustRegister" style={{outline: 'none'}}>Register</Link></li>
      </ul>
    </div>
  </div>
</nav>
        <div style={{marginTop: '50px'}}>
        <SignIn 
        submit={(event) => this.onSubmit(event)}
        onemailchange={(event) => this.onChangeemail(event)}
        onpasswordchange={(event) => this.onChangepassword(event)}
        />
      {/* <h1>Customer Login</h1>
      <form className="form-horizontal" onSubmit={this.onSubmit}>
         <div className="form-group">
           <label htmlFor="inputusername3" className="col-sm-2 control-label">UserName</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputusername3" onChange={this.onChangename} placeholder="Username" />
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
    </form> */}
  </div>
  </div>
  );
}
}

export default CustomerLogin;