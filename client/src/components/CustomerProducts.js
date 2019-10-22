import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import PropTypes from 'prop-types'
import _ from 'lodash';
import { Menu, Search, Dropdown, Icon } from 'semantic-ui-react';
import Product from './Product';
import './CustomerProducts.css';
import './PriceModal.css';
import PriceModal from './PriceModal';
import RatingModal from './RatingModal';
import SearchModal from './SearchModel';

var source = ({})

const resultRenderer = ({ title }) => <p><Icon name="search" size="small"></Icon> {title}</p>

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

class CustomerProducts extends Component {
    state = {
        products: [],
        searchproducts: [],
        activeItem: 'products',
        customermail: '',
        search: '',
        isLoading: false, 
        results: [], 
        value: '',
        click : false,
        modalOpen: false,
        discountmodalOpen: false,
        ratingmodalOpen: false,
        searchmodalOpen: false,
        values: [0, 0],
        discountvalue: [0, 0],
        ratingvalue: 0,
        searchvalue: '',
        pricevaluestart: '',
        pricevalueend: '',
        discountvaluestart: '',
        discountvalueend: '',
        ratingvaluestart: '',
        ratingvalueend: ''
    }
    handleItemClick = (e, { name }) => this.setState({ activeItem: name });

    handleClose = () => {
    let changedproducts = [...this.state.products];

   var k = changedproducts.filter((product) => {
    console.log(product.price > this.state.pricevaluestart);
    console.log(product.price < this.state.pricevalueend);
    return (product.price > this.state.pricevaluestart && product.price < this.state.pricevalueend )
   })
   this.setState({
     products: k,
     modalOpen: false
   })
    }

    discounthandleClose = () => {
      let changedproducts = [...this.state.products];
     var k = changedproducts.filter((product) => {
      console.log(product.discount > this.state.discountvaluestart);
      console.log(product.discount < this.state.discountvalueend);
      return (product.discount > this.state.discountvaluestart && product.discount < this.state.discountvalueend )
     })
     this.setState({
       products: k,
       discountmodalOpen: false
     })
      }

      ratinghandleClose = () => {
        let changedproducts = [...this.state.products];
       var k = changedproducts.filter((product) => {
        return product.rating <= this.state.ratingvalue
       })
       this.setState({
         products: k,
         ratingmodalOpen: false
       })
        }

        searchonchange = (event) => {
          console.log(event.target.value);
          this.setState({
            searchvalue: event.target.value
          })
        }

        searchhandleClose = () => {
      axios.get('/portal/place', {
        params: {
          search: this.state.searchvalue
        }
      }).then((res) => {
        this.setState({
          products: res.data.products,
          searchmodalOpen: false
        })
      })
          }

    handleChange = (event, newValue) => {
      // console.log(newValue);
      console.log(event);
      console.log('hello');

     this.setState({
       values: newValue,
       pricevaluestart: newValue[0],
       pricevalueend: newValue[1]
     }, () => {
       console.log(this.state.values);
     });
    };

    discounthandleChange = (event, newValue) => {
      // console.log(newValue);
      console.log(event);
      console.log('hello');

     this.setState({
       discountvalue: newValue,
       discountvaluestart: newValue[0],
       discountvalueend: newValue[1]
     }, () => {
       console.log(this.state.discountvalue);
     });
    };

    ratinghandleChange = (event, newValue) => {
      console.log(newValue);
      // console.log(event);
      // console.log('hello');
    // console.log(event.target.value);
    this.setState({
      ratingvalue: newValue
    })
    
    };

    onInputChange = (event) => {
      var key = event.target.value;
      this.setState({
        search: key
      })
      console.log(this.state.search);
    }

    onkeydown = (event) => {
      var keycode = event.keyCode;
      console.log(event)
      if(keycode === 13) {
        axios.get('/portal/customerproducts', {
          params: {
            search: this.state.value
          }
        })
        .then((res) => {
          this.setState({
            products: res.data.products
        })
      })
    }
  }

  onDiscountChange = () => {
  
  this.setState({
    discountmodalOpen: true
  })
  }

  onPriceChange = () => {
  this.setState({
     modalOpen: true
  })
  }

  onDistanceChange = () => {
    this.setState({
      searchmodalOpen: true
    })
  
  }

  onRatingChange = () => {
  this.setState({
    ratingmodalOpen: true
 })
  }

    componentDidMount() {
        console.log(this.props);
        var usermail = localStorage.getItem('username');
        this.setState({
          customermail: usermail
        })
        axios.get('/portal/customerproducts')
        .then((res) => {
          var l = res.data.products.map((product) => {
            return ({
             "title": product.name,
             "description": product.description,
             "image": product.picture,
             "price": product.price + '₹'
            })
          })
          source = l;
            console.log(res);
              if(this.state.customermail === null || this.state.customermail !== null) {
                this.setState({
                  products: res.data.products
              })
              }
      })
    }

    handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    var key = e.target.value;
    this.setState({ isLoading: true, value, search: key })

    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState({ isLoading: false, results: [], value: ''})

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = (result) => re.test(result.title)

      this.setState({
        isLoading: false,
        results: _.filter(source, isMatch),
      })
    }, 300)
  }

    onLogout = () => {
            localStorage.removeItem('username');
            localStorage.removeItem('expirationDate');
            localStorage.removeItem('token');
            localStorage.removeItem('userId');
            var username = localStorage.getItem('username');
            if(username === null) {
              this.props.history.push('/Customer');
            }
      }

    onTrendingNow = () => {
      let changedproducts = [...this.state.products];
      console.log('Trnd');
      changedproducts.sort(function(a, b){
        return b.viewcount-a.viewcount
    })
     this.setState({
       products: changedproducts
     })
    }

    onTrendingAroundYou = () => {
      let changedproducts = [...this.state.products];
      console.log('TrndArndYou');
      changedproducts.sort(function(a, b){
        return b.checkoutcount-a.checkoutcount
    })
     this.setState({
       products: changedproducts
     })
    }

    // inputchange = (e) => {
    //   console.log(e.target.value);
    // }

    onSearchClick = () => {
      this.setState({
        click: !this.state.click
      })
    }

    onRecommendedToYou = () => {
      let changedproducts = [...this.state.products];
      console.log('recommeded');
      changedproducts.sort(function(a, b){
        return b.boughtcount-a.boughtcount
    })
     this.setState({
       products: changedproducts
     })
    }
    render() {
        const { isLoading, value, results } = this.state;
        const { activeItem } = this.state;
        if(this.state.customermail !== null || this.state.customermail === null) {
          var categories = <Menu stackable style={{marginTop: '50px'}}>
          <Menu.Item header>Sort By</Menu.Item>
          {/* <Menu.Item
            name='Trending Now'
            active={activeItem === 'Trending Now'}
            onClick={this.onTrendingNow}
          />
          <Menu.Item
            name='Trending around you'
            active={activeItem === 'Trending around you'}
            onClick={this.onTrendingAroundYou}
          /> */}
          <Menu.Item
            name='Recommended to you'
            active={activeItem === 'Recommended to you'}
            onClick={this.onRecommendedToYou}
          />
          <Menu.Item>
          <Dropdown text='Filter' icon='filter' floating labeled button className='icon'>
          <Dropdown.Menu>
              <Dropdown.Header icon='tags' content='Filter Products'/>
              {/* <Dropdown.Item onClick={this.onDiscountChange}>Discount</Dropdown.Item> */}
              <Dropdown.Item onClick={this.onDistanceChange}>Distance</Dropdown.Item>
              {/* <Dropdown.Item onClick={this.onPriceChange}>Price</Dropdown.Item> */}
              <Dropdown.Item onClick={this.onRatingChange}>Rating</Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </Menu.Item>

        </Menu>
        }
        let products = this.state.products.map((product) => {
        return (
          <Product 
             name = {product.name}
             id={product._id}
             key={product._id}
             picture={product.picture}
             description = {product.description}
             price={product.price}
             quantity={product.quantity}
             discount={product.discount}
             status={product.quantity > 0 ? 'Available' : 'NotAvailable'}
             buy={product.quantity > 0 ? true : false}
             rating={product.rating}/>  )
        })
        return (
           <div>
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
       Foodbe
      </a>
      <Search
      input={{ icon: 'search' }}
      style={{visibility: this.state.click ? 'visible' : 'hidden'}}
      loading={isLoading}
      onResultSelect={this.handleResultSelect}
      placeholder="Search for Items"
      onSearchChange={_.debounce(this.handleSearchChange, 500, {
        leading: true,
      })}
      onInput={this.inputchange}
      onKeyDown={this.onkeydown}
      results={results}
      value={value}
      resultRenderer={resultRenderer}
      // {...this.props}
    />
    <Icon 
     name='search' 
     size='small' 
     style={{color: 'white', fontSize: '19px', position: 'absolute', left: '180px', top: '5px', cursor: 'pointer'}} 
     onClick={this.onSearchClick}
     className={this.state.toggle ? 'rotate': ''}
     id="icon"
     circular 
     />
      {/* <Input id="inputsearch" size='mini' icon='search' name="search" onChange={this.onInputChange} placeholder='Search books' onKeyDown={this.onkeydown}/> */}
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        {this.state.customermail ? '' : <li><Link to="/CustLogin" style={{outline: 'none'}}>Login</Link></li>}
        {this.state.customermail ? '' : <li><Link to="/CustRegister" style={{outline: 'none'}}>Register</Link></li>}
        <li><Link to="/Customer" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/customerproducts" style={{outline: 'none'}}>Items</Link></li>
        {this.state.customermail ? <li><Link to="/CustOrders" style={{outline: 'none'}}>Orders</Link></li> : ''}
        {this.state.customermail ? <li id="logoutli"><Link to="" onClick={this.onLogout} style={{outline: 'none'}}>Logout</Link></li> : '' }
      </ul>
    </div>
  </div>
</nav>
        {categories}
      </div>
        <div>
        {products}
        <PriceModal 
       name='Pick Price Value Range'
       modalOpen={this.state.modalOpen}
       handleClose={() => this.handleClose()}
       value={this.state.values}
       handlechange={this.handleChange}
       min={0}
       max={1000}
       />
       <PriceModal 
       name='Pick Discount Range'
       modalOpen={this.state.discountmodalOpen}
       handleClose={() => this.discounthandleClose()}
       value={this.state.discountvalue}
       handlechange={this.discounthandleChange}
       min={0}
       max={1000}
       />

      <RatingModal  
       name='Pick Rating Range'
       modalOpen={this.state.ratingmodalOpen}
       handleClose={() => this.ratinghandleClose()}
      //  value={this.state.ratingvalue}
       handlechange={this.ratinghandleChange}
      //  min={0}
      //  max={5}
       />

      <SearchModal  
       name='Search Items nearby'
       modalOpen={this.state.searchmodalOpen}
       handleClose={() => this.searchhandleClose()}
       onchange={(event) => this.searchonchange(event)}
       value={this.state.searchvalue}
      //  handlechange={this.ratinghandleChange}
      //  min={0}
      //  max={5}
       />
       </div>
      </div>
        )
    }
};

export default CustomerProducts;