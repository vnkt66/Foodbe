import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Loader, Message } from 'semantic-ui-react';
// import { withToastManager } from 'react-toast-notifications';
// import toast from 'toasted-notes';
// import 'toasted-notes/src/styles.css';
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from './Loader';
import SignUp from './Register';


import './SellerRegister.css';

class SellerRegister extends Component {
  state = {
    sellername: '',
    sellerpassword: '',
    selleremail: '',
    sellerphone: '',
    sellerplace: '',
    selectedFile: null,
    loggedInseller: '',
    error: '',
    loading: false,
    customermail: '',
    sellermail: '',
    visible: false
  }

componentDidMount() {
    // axios.get('http://localhost:4000/logindetails').then((res) => {
    //   this.setState({
    //     customermail: res.data.details.customermail,
    //     sellermail: res.data.details.sellermail
    //   })
    //   if(res.data.details.sellermail !== '') {
    //     this.props.history.push('/selleredit');
    //   }
    // })
    var usermail = localStorage.getItem('sellername');
    this.setState({
      sellermail: usermail
    })
    if(usermail !== null) {
      this.props.history.push('/Seller');
  }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
onChangename = (event) => {
  this.setState({
      sellername: event.target.value
  })
}
  
onChangepassword = (event) => {
 this.setState({
     sellerpassword: event.target.value
 })
}

onChangephone = (event) => {
  this.setState({
      sellerphone: event.target.value
  })
 }

 onChangeplace = (event) => {
  this.setState({
      sellerplace: event.target.value
  })
 }

onChangeemail = (event) => {
  this.setState({
      selleremail: event.target.value
  })
 }

onChangeimage = (event) => {
  console.log(event.target.files[0])
  this.setState({
      selectedFile: event.target.files[0]
  })
}

handleDismiss = () => {
  this.setState({ visible: false })
}

onSubmit = (event) => {
  event.preventDefault();

  // this.setState({
  //   loading: true
  // })

  const data = new FormData(); 
  data.append('file', this.state.selectedFile);
  data.append('username', this.state.sellername);
  data.append('password', this.state.sellerpassword);
  data.append('email', this.state.selleremail);
  data.append('phone', this.state.sellerphone);
  data.append('place', this.state.sellerplace);

  console.log(`Form Submitted`);
  console.log(this.state.sellername);
  console.log(this.state.sellerpassword);
  console.log(this.state.selleremail);

  // const Register = {
  //     username: this.state.sellername,
  //     password: this.state.sellerpassword,
  //     phone: this.state.sellerphone,
  //     place: this.state.sellerplace,
  //     email: this.state.selleremail
  // }
  this.setState({
    loading: true
  })

  axios.post('/portal/sellregister', data, { 
    // receive two    parameter endpoint url ,form data
  })
  .then((res) => {
    // toast.notify('Verfication Link has been sent to your email', {
    //   duration: 1000
    // });
    // withToastManager.add('Verfication Link has been sent to your email', {
    //   appearance: 'success',
    //   autoDismiss: true,
    //   pauseOnHover: false,
    // })
    // console.log(res.statusText);

    this.setState({
      visible: true
    })
    // if(!res.statusText) {
    //   this.setState({
    //     loading: true
    //   })
    // }
    console.log(this.state.loading);

    if(res.statusText) {
      this.setState({
        loading: false
      })
      this.props.history.push('/SellLogin');
  }
  });

  this.setState({
      sellername: '',
      sellerpassword: '',
      sellerphone: '',
      selleremail: '',
      sellerplace: ''
  })
}

 render() {
  var data;
  var k;
  if(this.state.visible) {
    // if(true) {
    k = <Message
       color='green'
       onDismiss={this.handleDismiss}
       header='Hello Customer,'
       content='Verification Link has been sent to your mail'
     />
 } else {
   k = '';
 }
  if(this.state.loading) {
    data = <Loader style={{marginTop: '190px'}} active inline='centered' size='massive'>Registering</Loader>
  } else {
    data =   <SignUp 
              onnamechange={(event) => this.onChangename(event)}
              onpasswordchange={(event) => this.onChangepassword(event)}
              onemailchange={(event) => this.onChangeemail(event)}
              onimagechange={(event) => this.onChangeimage(event)}
              onphonechange={(event) => this.onChangephone(event)}
              onplacechange={(event) => this.onChangeplace(event)}
              onsubmit={(event) => this.onSubmit(event)}
              />
            // <div>
            // <h1>Seller Register</h1>
            // <form className="form-horizontal">
            // <div className="form-group">
            // <label htmlFor="inputUser3" className="col-sm-2 control-label">UserName</label>
            // <div className="col-sm-8">
            // <input type="text" className="form-control" id="inputUser3" onChange={this.onChangename} placeholder="UserName"/>
            // </div>
            // </div> 
            // <div className="form-group">
            // <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
            // <div className="col-sm-8">
            // <input type="email" className="form-control" id="inputEmail3" onChange={this.onChangeemail} placeholder="Email" />
            // </div>
            // </div> 
            // <div className="form-group">
            // <label htmlFor="inputpicture3" className="col-sm-2 control-label">Image Upload</label>
            // <div className="col-sm-8">
            // <input type="file"  id="inputpicture3" name="file" onChange={this.onChangeimage} accept="image/*" placeholder="Image"/>
            // </div>
            // </div> 
            // <div className="form-group">
            // <label htmlFor="inputPhone3" className="col-sm-2 control-label">Phone</label>
            // <div className="col-sm-8">
            // <input type="text" className="form-control" id="inputphone3" onChange={this.onChangephone} placeholder="Phone" />
            // </div>
            // </div> 
            // <div className="form-group">
            // <label htmlFor="inputPlace3" className="col-sm-2 control-label">Place</label>
            // <div className="col-sm-8">
            // <input type="text" className="form-control" id="inputPlace3" onChange={this.onChangeplace} placeholder="Place" />
            // </div>
            // </div>
            // <div className="form-group">
            // <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
            // <div className="col-sm-8">
            // <input type="password" className="form-control" id="inputPassword3" onChange={this.onChangepassword} placeholder="Password"/>
            // </div>
            // </div>
            // <div className="form-group">
            // <div className="col-sm-offset-2 col-sm-10">
            // <button type="submit" className="btn btn-default">Sign in</button>
            // </div>
            // </div>
            // </form>
            // </div>
            
  }
  return (
    <div className="SellerRegister" onSubmit={this.onSubmit}>
            {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Seller" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/SellLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/>
            </Menu> */}
            <nav className="navbar navbar-inverse">
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
        <li><Link to="/" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/SellLogin" style={{outline: 'none'}}>Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
<div style={{marginTop: '20px'}}>
      {k}
      {data}
    </div>
    </div>
  );
}
}

export default SellerRegister;