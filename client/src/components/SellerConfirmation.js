import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Grid } from 'semantic-ui-react';

class SellerConfirmation extends Component {

    state = {
        selleremail: '',
        customermail: '',
        sellermail: '' 
    }
    // componentDidMount() {
    //     var usermail = localStorage.getItem('sellername');
    //     this.setState({
    //        sellermail: usermail
    //      })
    //     if(usermail === null) {
    //        this.props.history.push('/');
    //      }
    //   }
    
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

      axios.post('/portal/sellerconfirmation/' + this.props.match.params.id, Forgot)
  .then((res) => {
    // toast.notify('Password Reset Link has been sent to your email', {
    //   duration: 2000
    // });
         this.props.history.push('/SellLogin');
     })
    }
    render() {
        // const { activeItem } = this.state;
        return (
          <div className="Forgot" onSubmit={this.onSubmit}>
          {/* <Menu pointing secondary>
            <Menu.Item as={Link} to="/" name='home' active={activeItem === 'home'} onClick={this.handleItemClick}></Menu.Item>
            <Menu.Item as={Link} to="/CustRegister" name='Register' active={activeItem === 'Register'} onClick={this.handleItemClick}/>
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
      <li><Link to="/Customer" style={{outline: 'none'}}>Home</Link></li>
      <li><Link to="/CustRegister" style={{outline: 'none'}}>Register</Link></li>
      <li><Link to="/CustLogin" style={{outline: 'none'}}>Login</Link></li>
      </ul>
    </div>
  </div>
</nav>
           <div style={{margin: '80px 40px'}}>
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
           <button type="submit" className="btn btn-default">Submit</button>
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

export default SellerConfirmation;



