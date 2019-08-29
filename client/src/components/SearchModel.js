import React, { Component } from 'react'
import { Button, Icon, Modal } from 'semantic-ui-react'
// import PriceRangeSlider from './PriceRangeSlider';
import InputExampleIconElement from './Search';
import './SearchModal.css';
// import './PriceRangeSlider.css';
// import './Search.css';

export default class SearchModal extends Component {
  render() {
    return (
          <Modal
        // trigger={<Button onClick={this.handleOpen}>Show Modal</Button>}
        open={this.props.modalOpen}
        onClose={this.props.handleClose}
        basic
        size='small'
        style={{position: 'absolute', top: '50px'}}
      >
        {/* <Header icon='browser' content='Cookies policy' /> */}
        <Modal.Header id="modalheaderprice">{this.props.name}</Modal.Header>
        <Modal.Content id="modalcontentprice">
          {/* <h3>Select the Price Range</h3> */}
          {/* <PriceRangeSlider 
           value={this.props.value}
           handlecchange={this.props.handlechange}
           min={this.props.min}
           max={this.props.max}/> */}
           <InputExampleIconElement
            id="inp"
            onchange={(event) => this.props.onchange(event)}
            value={this.props.value}/>
        </Modal.Content>
        <Modal.Actions id="modalactionsprice">
          <Button color='green' onClick={this.props.handleClose} inverted style={{left: '0px'}}>
            <Icon name='checkmark' /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }
}
