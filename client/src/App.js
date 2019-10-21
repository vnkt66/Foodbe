import React from 'react';
import './App.css';
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';

import Home from './components/Home';
import Customer from './components/Customer';
import Seller from './components/Seller';
import CustomerLogin from './components/CustomerLogin';
import CustomerRegister from './components/CustomerRegister';
import SellerLogin from './components/SellerLogin';
import SellerRegister from './components/SellerRegister';
import CustomerForgot from './components/Forgot';
import SellerForgot from './components/SellerForgot';
import CustomerProducts from './components/CustomerProducts';
import SellerEditHome from './components/SellerEditHome';
import SellerAddProducts from './components/SellerAddProducts';
import CustomerProduct from './components/CustomerProduct';
import SellerEditProduct from './components/SellerEditProduct';
import CustomerOrders from './components/CustomerOrders';
import SellerOrders from './components/SellerOrders';
import CustomerProductOne from './components/CustomerProductOne';
import CustomerConfirmation from './components/CustomerConfirmation';
import SellerConfirmation from './components/SellerConfirmation';
// import CustomerProfile from './components/CustomerProfile';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
    <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/Customer" exact component={Customer}/>
    <Route path="/Seller" exact component={Seller}/>
    <Route path="/CustLogin" exact component={CustomerLogin}/>
    <Route path="/CustRegister" exact component={CustomerRegister}/>
    <Route path="/SellLogin" exact component={SellerLogin}/>
    <Route path="/SellRegister" exact component={SellerRegister}/>
    <Route path="/CustForgot" exact component={CustomerForgot}/>
    <Route path="/SellForgot" exact component={SellerForgot} />
    <Route path="/confirmation/:id" exact component={CustomerConfirmation}/>
    <Route path="/sellerconfirmation/:id" exact component={SellerConfirmation}/>
    {/* <Route path='/customerproducts/:id' exact component={CustomerProducts} /> */}
    <Route path='/customerproducts' exact component={CustomerProducts} />
    {/* <Route path='/selleredit/:id' exact component={SellerEditHome} /> */}
    <Route path='/selleredit' exact component={SellerEditHome} />
    <Route path='/SellerAdd' exact component={SellerAddProducts} />
    {/* <Route path='/customerproducts/:id1/:id2' exact component={CustomerProduct} /> */}
    <Route path='/customerproducts/:id2' exact component={CustomerProduct} />
    <Route path='/customerproduct/:id2' exact component={CustomerProductOne} />
    <Route path='/selleredit/:id2' exact component={SellerEditProduct} />
    <Route path='/CustOrders' exact component={CustomerOrders} />
    <Route path='/SellOrders' exact component={SellerOrders} />
    <Route  render={() => 
    <div>
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
         Zerinth
        </a>
      </div>
  
      <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
        <ul className="nav navbar-nav navbar-right">
          <li><Link to="/" style={{outline: 'none'}}>Home</Link></li>
          <li><Link to="/" style={{outline: 'none'}}>Company</Link></li>
          <li><Link to="/Customer" style={{outline: 'none'}}>Volunteer</Link></li>
          <li><Link to="/Seller" style={{outline: 'none'}}>Donate</Link></li>
        </ul>
      </div>
    </div>
  </nav>
    <div style={{marginTop: '70px', textAlign: 'center'}}>
    <h3>Page Not Found</h3>
    </div>
    </div>
    }></Route>
    </Switch>
    {/* <Route path='/CustProfile' exact component={CustomerProfile} /> */}
    </div>
    </BrowserRouter>
  );
}

export default App;
