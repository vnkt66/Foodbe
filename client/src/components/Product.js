import React, { Component } from 'react';
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

    render() {
        return (

            <ListGroup className="list-group-flush">
            <Col xs={12} sm={4} md={4} lg={4}>
            <ListGroupItem>
             <Image src={this.props.picture} style={{width: '100%', height: '100%'}}/>
            </ListGroupItem>
            <ListGroupItem>ItemName: {this.props.name}</ListGroupItem>
            <ListGroupItem>ItemDescription: {this.props.description}</ListGroupItem>
            <ListGroupItem>Quantity: {this.props.quantity}</ListGroupItem>
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
                 type="submit">Send Query</Button>
            </ListGroupItem>
            </Col>
            </ListGroup>
        )
    }
};

export default withRouter(Product);