import React, { Component } from 'react';
import { ListGroup, ListGroupItem, Image, Col, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import './SellerProduct.css';

class SellerProduct extends Component {
    state = {
        price: this.props.price - this.props.discount
    }

    onProduct = () => {
        this.props.history.push(this.props.location.pathname + '/' + this.props.id);
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
            {/* <ListGroupItem>Price: {this.state.price}₹<Badge variant="secondary">AddedDiscount:{this.props.discount}</Badge></ListGroupItem> */}
            <ListGroupItem>Quantity: {this.props.quantity}</ListGroupItem>
            <ListGroupItem>
            <Button 
                 className="btn btn-success btn-lg btn-block" 
                 onClick={this.onProduct}
                 variant="primary" 
                 type="submit">Edit</Button>
            </ListGroupItem>
            </Col>
            </ListGroup>
        )
    }
};

export default withRouter(SellerProduct);