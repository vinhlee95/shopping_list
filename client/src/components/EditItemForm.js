import React, { Component } from 'react';
import {Typography, Input, Button} from '@material-ui/core';
import { addItem, updateItem } from '../actions';
import { connect } from 'react-redux';

class EditItemForm extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: this.props.name ? this.props.name : '',
         originalName: this.props.name ? this.props.name : '',
      }
   }

   handleChangeName = (e) => {
      e.preventDefault();
      this.props.updateItem(this.state.originalName, this.state.name);
      // window.location.reload();
      this.props.handleCloseModal();
   }

   render() {
      return(
         <form style={{ backgroundColor: 'white', zIndex: 1000}} onSubmit={e => this.handleChangeName(e)}>
            <Typography variant="title" id="modal-title">
               EDIT ITEM
            </Typography>
            <Input
               value={this.state.name}
               style={{ width: '100%', marginTop: 20,}}
               onChange={e => this.setState({ name: e.target.value })}
            />
            <Button 
               onClick={this.handleChangeName}
               variant="contained" color="primary" fullWidth
               style={{
                  marginTop: 20,
                  backgroundColor: '#59a5f2',
               }}>
               CHANGE
            </Button>
         </form>
      );
   }
}

export default connect(null, { addItem, updateItem} )(EditItemForm);