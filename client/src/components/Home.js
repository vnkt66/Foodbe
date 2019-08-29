import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import PropTypes from 'prop-types'
import _ from 'lodash';
import axios from 'axios';
import './Home.css';
import { Search, Grid, Image, Icon, Segment, Button, Container, Card } from 'semantic-ui-react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';
// import { Card, Button } from 'react-bootstrap';

// import logo from './Logo.png';
// import comm from './communication-portal.png';

var source = ({})

const resultRenderer = ({ title }) => <p><Icon name="search" size="small"></Icon> {title}</p>

resultRenderer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

class Home extends React.Component {

  state = {
    isLoading: false, 
    results: [], 
    value: '',
    products: [],
    allproducts: [],
    productsslider: [{
      name: 'Books Under 199₹',
      image: 'http://bgfons.com/uploads/books/books_texture3031.jpg',
      quoteimage: 'https://images.gr-assets.com/authors/1362814142p2/3389.jpg',
      quote: 'Good books don\'t give up all their secrets at once.'
    },
    {
      name: 'Books Under 499₹',
      image: 'http://bgfons.com/uploads/books/books_texture3031.jpg',
      quoteimage: 'https://images.gr-assets.com/authors/1322103868p2/1244.jpg',
      quote: 'Good friends, good books, and a sleepy conscience: this is the ideal life.'
    },
    {
      name: 'Books Under 999₹',
      image: 'http://bgfons.com/uploads/books/books_texture3031.jpg',
      quoteimage: 'https://images.gr-assets.com/authors/1243291789p2/11563.jpg',
      quote: 'There are worse crimes than burning books. One of them is not reading them.'
    }
  ],
  search: false,
  rotate: false,
  toggle: false
  }

  componentWillMount() {
    this.setState({
      children: [],
      activeItemIndex: 0,
    });

  var createChildren = (n) => range(n).map(i => <div key={i} style={{ height: 200, background: '#333' }}>{i}</div>);

  setTimeout(() => {
    this.setState({
      children: createChildren(6),
    })
  }, 100);
}

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  componentDidMount() {
    axios.get('/portal/customerproducts').then((res) => {
      console.log(res.data.products);
     var l = res.data.products.map((product) => {
           return ({
            "title": product.name,
            "description": product.description,
            "image": product.picture,
            "price": product.price + '₹'
           })
      })
      var j = res.data.products;
  //  })
      this.setState({
        products: l,
        allproducts: j
      })
      source = l;
    })
  }

  handleResultSelect = (e, { result }) => this.setState({ value: result.title })

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value })
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

  onSearchClick = () => {
    this.setState({
      search: !this.state.search,
      toggle: !this.state.toggle,
      rotate: false
    })
  }

  onkeydown = (event) => {
    var keycode = event.keyCode;
    console.log(event)

    if(keycode === 13) {
      this.props.history.push('/customerproduct/' + this.state.value)
    }
}
  render() {
    const { isLoading, value, results } = this.state
    // const { rotate, toggle } = this.state;
    var sortedbefore = [...this.state.allproducts];
    var sortedafter = sortedbefore.slice(0, 4);

    // const {
    //   activeItemIndex,
    //   children,
    // } = this.state;

    var all = sortedafter.map((item, i) => {
      return (
       <Card id="smalleritems" key={item._id} style={{cursor: 'pointer'}} onClick={() => this.props.history.push('/customerproduct/' + item.name)}>
       <Image src={item.picture} wrapped ui={false} />
       <Card.Content>
         <Card.Header>{item.name}</Card.Header>
         <Card.Description style={{fontSize: '17px'}}>
           Description: {item.description}
         </Card.Description>
         <Card.Description style={{color: 'green'}}>
           Price: {item.price}
         </Card.Description>
       </Card.Content>
       </Card>
      )
     })

    
  return (
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
      <Search
      input={{ icon: 'search' }}
      style={{visibility: this.state.search ? 'visible' : 'hidden'}}
      loading={isLoading}
      onResultSelect={this.handleResultSelect}
      placeholder="Search for Books"
      onSearchChange={_.debounce(this.handleSearchChange, 500, {
        leading: true,
      })}
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
    </div>

    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul className="nav navbar-nav navbar-right">
        {/* <li>
        <Search
      input={{ icon: 'search', iconPosition: 'left' }}
      loading={isLoading}
      onResultSelect={this.handleResultSelect}
      placeholder="Search for Books"
      onSearchChange={_.debounce(this.handleSearchChange, 500, {
        leading: true,
      })}
      results={results}
      value={value}
      resultRenderer={resultRenderer}
      // {...this.props}
    />
        </li> */}
        <li><Link to="/" style={{outline: 'none'}}>Home</Link></li>
        <li><Link to="/" style={{outline: 'none'}}>Company</Link></li>
        <li><Link to="/Customer" style={{outline: 'none'}}>Customer</Link></li>
        <li><Link to="/Seller" style={{outline: 'none'}}>Seller</Link></li>
      </ul>
    </div>
  </div>
</nav>
<div>

<Slider>
	{this.state.productsslider.map((item, index) => (
		<div
			key={index}
      // style={{ background:  `url('${item.image}') no-repeat center center`}}
      style={{ background: `linear-gradient(to right, #3c3b3f, #605c3c)`}}
		>
			<div className="center">
        <Image src={item.quoteimage} id="avatar" avatar/>
				<p id="p">"{item.quote}"</p>
			</div>
		</div>
	))}
</Slider>
      <Segment>
      <Grid>
      <Grid.Column floated='left' width={5}>
       <h3>Books</h3>
      </Grid.Column>
      <Grid.Column floated='right' width={2}>
      <Button primary id="view" onClick={() => this.props.history.push('/customerproducts')}>View All</Button>
      </Grid.Column>
      </Grid>
      </Segment>
      
      <div style={{"padding":"0 0px","maxWidth":"100%", "margin": "0px 0px"}} id="itemcarvis">
  <ItemsCarousel
    placeholderItem={<div style={{ height: 200, background: '#EEE' }} />}
    enablePlaceholder={true}
    numberOfPlaceholderItems={3}
    numberOfCars={3}
    id="itemscarousel"
    gutter={12}
    slidesToScroll={2}
    chevronWidth={24}
    outsideChevron={true}
    showSlither={false}
    firstAndLastGutter={false}
    activeItemIndex={this.state.activeItemIndex}
    requestToChangeActive={value => this.setState({ activeItemIndex: value })}
    rightChevron={<button id="right"><Icon name="chevron right" size="large" /></button>}
    leftChevron={<button id="left"><Icon name="chevron left" size="large" /></button>}
  >
    {this.state.allproducts.map((item, i) =>
      <Container style={{margin: '0 0', padding: '0 0', cursor: 'pointer'}} id="item" key={i} onClick={() => this.props.history.push('/customerproduct/' + item.name)}>
      <div
        key={i}
        style={{
          height: 250,
          background: `url('${item.picture}') no-repeat center center`
        }}
      />
      <h5 style={{textAlign: 'center', margin: '0 0'}}>{item.name}</h5>
      <h4 style={{textAlign: 'center', margin: '0 0', color: 'green'}}>₹{item.price}</h4>
      </Container>
    )}
  </ItemsCarousel>
</div>
{/* <Container id="smallerproducts"> */}
  {all}
{/* </Container> */}

{/* <div id="topc">
        <div id="topco">
        <Grid>
    <Grid.Row columns={2} only='computer'>
      <Grid.Column width={8}>
        <h3 style={{marginTop: '120px'}}>Customer Web Portal</h3>
      </Grid.Column>
      <Grid.Column width={8}>
      <Image src={comm} alt="Customer"/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2} only='tablet'>
      <Grid.Column width={8}>
        <h3 style={{marginTop: '120px'}}>Customer Web Portal</h3>
      </Grid.Column>
      <Grid.Column width={8}>
      <Image src={comm} alt="Customer"/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2} only='widescreen'>
      <Grid.Column width={8}>
        <h3 style={{marginTop: '120px'}}>Customer Web Portal</h3>
      </Grid.Column>
      <Grid.Column width={8}>
      <Image src={comm} alt="Customer"/>
      </Grid.Column>
    </Grid.Row>
    <Grid.Row columns={2} only='mobile'>
      <Grid.Column width={16} style={{height: '50px', textAlign: 'center'}}>
       <h4>Customer Web Portal</h4>
      </Grid.Column>
      <Grid.Column width={16}>
      <Image src={comm} alt="Customer"/>
      </Grid.Column>
    </Grid.Row>

  </Grid>
        </div>
      </div>
      */}
</div>
  </div>
  );
}
}
export default Home;