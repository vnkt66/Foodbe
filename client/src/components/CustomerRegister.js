import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Loader, Message } from 'semantic-ui-react';
// import toast from 'toasted-notes';
// import 'toasted-notes/src/styles.css';
// import Loader from './Loader';
// import notify from 'msg-notify';
import SignUp from './CustRegister';

class CustomerRegister extends Component {
  state = {
    customername: '',
    customerpassword: '',
    customeremail: '',
    customerphone: '',
    customerplace: '',
    selectedFile: null,
    loggedIncustomer: '',
    error: '',
    activeItem: '',
    customermail: '',
    sellermail: '' ,
    Loading: false,
    loading: false,
    visible: false
  }
  componentDidMount() {
    // axios.get('http://localhost:4000/logindetails').then((res) => {
      // this.setState({
      //   customermail: res.data.details.customermail,
      //   sellermail: res.data.details.sellermail
      // })
      // if(res.data.details.customermail !== '') {
      //   this.props.history.push('/customerproducts');
      // }
    // })
    var usermail = localStorage.getItem('username');
    this.setState({
      customermail: usermail
    })
    if(usermail !== null) {
      this.props.history.push('/Customer');
  }
  }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
onChangename = (event) => {
  this.setState({
      customername: event.target.value
  })
}
  
onChangepassword = (event) => {
 this.setState({
     customerpassword: event.target.value
 })
}

onChangephone = (event) => {
  this.setState({
      customerphone: event.target.value
  })
 }

 onChangeplace = (event) => {
  this.setState({
      customerplace: event.target.value
  })
 }

onChangeemail = (event) => {
  this.setState({
      customeremail: event.target.value
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

  const data = new FormData(); 
  data.append('file', this.state.selectedFile);
  data.append('username', this.state.customername);
  data.append('password', this.state.customerpassword);
  data.append('email', this.state.customeremail);
  data.append('phone', this.state.customerphone);
  data.append('place', this.state.customerplace);

  console.log(`Form Submitted`);
  console.log(this.state.customername);
  console.log(this.state.customerpassword);
  console.log(this.state.customeremail);

  // const Register = {
  //     username: this.state.customername,
  //     password: this.state.customerpassword,
  //     email: this.state.customeremail,
  //     phone: this.state.customerphone,
  //     place: this.state.customerplace
  // }

  this.setState({
    loading: true
  })

  axios.post('/portal/custregister', data, { 
    // receive two    parameter endpoint url ,form data
  })
  .then((res) => {
    // console.log(res);
    // console.log(res.statusText);
    // toast.notify('Verfication Link has been sent to your email', {
    //   duration: 2000
    // });
    // notify('notification msg', 'success');
    this.setState({
      visible: true
    })
    if(res.statusText) {
      this.setState({
        loading: false
      })

      // this.props.history.push('/CustLogin');
  }
    // if(res.data.username) {
    //   this.setState({
    //     loggedIncustomer: res.data.username
    //   })
    //   this.props.history.push({pathname: '/'});
    // } else {
    //   console.log(res.data.error.message);
    //   this.setState({
    //     error: res.data.error.message
    //   })
    // }
  });

  this.setState({
      customername: '',
      customerpassword: '',
      customeremail: '',
      customerphone: '',
      customerplace: ''
  })
}

render() {
  // const { activeItem } = this.state;
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
  }
  return (
    <div className="CustomerRegister" onSubmit={this.onSubmit}>
      {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/Customer" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/CustLogin" name='Login' active={activeItem === 'Login'} onClick={this.handleItemClick}/>
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
        <li><Link to="/CustLogin" style={{outline: 'none'}}>Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
        <div style={{marginTop: '50px'}}>
        {k}
        {data}
      {/* <h1>Customer Register</h1>
      <form className="form-horizontal">
         <div className="form-group">
           <label htmlFor="inputusername3" className="col-sm-2 control-label">UserName</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputusername3" onChange={this.onChangename} placeholder="UserName" />
          </div>
         </div> 
         <div className="form-group">
           <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
           <div className="col-sm-8">
           <input type="email" className="form-control" id="inputEmail3" onChange={this.onChangeemail} placeholder="Email" />
          </div>
         </div> 
         <div className="form-group">
            <label htmlFor="inputpicture3" className="col-sm-2 control-label">Image Upload</label>
            <div className="col-sm-8">
            <input type="file"  id="inputpicture3" name="file" onChange={this.onChangeimage} accept="image/*" placeholder="Image"/>
            </div>
            </div> 
         <div className="form-group">
           <label htmlFor="inputPhone3" className="col-sm-2 control-label">Phone</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputPhone3" onChange={this.onChangephone} placeholder="Phone" />
          </div>
         </div> 
         <div className="form-group">
           <label htmlFor="inputPlace3" className="col-sm-2 control-label">Place</label>
           <div className="col-sm-8">
           <input type="text" className="form-control" id="inputPlace3" onChange={this.onChangeplace} placeholder="Place" />
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
        <button type="submit" className="btn btn-default">Register</button>
      </div>
     </div>
    </form> */}
    </div>
    </div>
  );
}
}

export default CustomerRegister;