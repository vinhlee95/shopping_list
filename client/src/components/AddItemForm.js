import React, { Component } from 'react';
import {Typography, Input, Button} from '@material-ui/core';
import { addItem } from '../actions';
import { connect } from 'react-redux';

class AddItemForm extends Component {
   state = { name: '' }

   handleAddItem = (e) => {
      e.preventDefault();
      this.props.addItem(this.state.name, () => {
         this.props.handleCloseModal();
      });
   }

   render() {
      return(
         <form style={{ backgroundColor: 'white', zIndex: 1000}} onSubmit={e => this.handleAddItem(e)}>
            <Typography variant="title" id="modal-title">
               ADD ITEM
            </Typography>
            <Input
               placeholder="Name"
               style={{ width: '100%', marginTop: 20,}}
               onChange={e => this.setState({ name: e.target.value })}
            />
            <Button 
               type="submit"
               variant="contained" color="primary" fullWidth
               style={{
                  marginTop: 20,
                  backgroundColor: '#59a5f2',
               }}>
               Add
            </Button>
         </form>
      );
   }
}

export default connect(null, { addItem} )(AddItemForm);