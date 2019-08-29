import React, { Component } from 'react';
// import axios from 'axios';
import { ListGroup, ListGroupItem, Col, Image, Button, Badge } from 'react-bootstrap';
import { Rating } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import './Product.css';

class Product extends Component {
    state = {
        price: this.props.price
    }

    onProduct = () => {
        this.props.history.push('/customerproduct/' + this.props.name);
    }

    // handleRate = (e, { rating, maxRating }) => {
    //     console.log(this.props.id);
    //     this.setState({ rating, maxRating })
    // }

    render() {
        return (

            <ListGroup className="list-group-flush">
            <Col xs={12} sm={4} md={4} lg={4}>
            <ListGroupItem>
             <Image src={this.props.picture} style={{width: '100%', height: '100%'}}/>
            </ListGroupItem>
            <ListGroupItem>Name: {this.props.name}</ListGroupItem>
            <ListGroupItem>Description: {this.props.description}</ListGroupItem>
            <ListGroupItem>Quantity: {this.props.quantity}</ListGroupItem>
            <ListGroupItem>Price: {this.state.price}₹<Badge variant="secondary">Discount:{this.props.discount}</Badge></ListGroupItem>
            <ListGroupItem>Status: {this.props.status}</ListGroupItem>
            <ListGroupItem>Rating:
            <Rating 
             maxRating={5} 
             onRate={this.handleRate} 
             rating={this.props.rating}/>
            </ListGroupItem>
            <ListGroupItem>
            <Button 
                 className="btn btn-success btn-lg btn-block" 
                 disabled={!this.props.buy}
                 onClick={this.onProduct}
                 variant="primary" 
                 type="submit">Checkout</Button>
            </ListGroupItem>
            </Col>
            </ListGroup>
        )
    }
};

export default withRouter(Product);