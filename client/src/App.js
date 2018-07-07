import React, { Component } from 'react';
import AppBar from './components/UI/AppBar';
import { fetchItems } from './actions';
import { connect } from 'react-redux';

import AddItemForm from './components/AddItemForm';
import ItemList from './components/ItemList';
import Spinner from './components/UI/Spinner';
import SlideModal from './components/UI/SlideModal';
import Modal from './components/UI/Modal';

import { Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import EditItemForm from './components/EditItemForm';


class App extends Component {
   state = {
      selectedItem: '',
      selectedID: '',
      showAddModal: false,
      showEditModal: false,
   }
   componentWillMount() {
      this.props.fetchItems();
   }

   componentWillReceiveProps(nextProps) {
      const { selectedID } = this.state;
      // fetch Items in case of adding/ removing items
      if(nextProps.items.length !== this.props.items.length) {
         this.props.fetchItems();
      }

      // fetch items in case of updating item
      if(selectedID && this.props.items[selectedID].name !== nextProps.items[selectedID].name) {
         this.props.fetchItems();
      }
   }

   showEditModal = () => {
      this.setState({ showEditModal: true });
   }

   handleCloseModal = () => {
      this.setState({ showAddModal: false, showEditModal: false })
   }

   handleEditItem = (name, id) => {
      this.setState({ selectedItem: name, selectedID: id })

   }

   render() {
      let itemList = this.props.items
                     ?
                     <ItemList 
                        items={this.props.items}
                        showEditModal={this.showEditModal}
                        handleEditItem={this.handleEditItem} />
                     :
                     <Spinner />
      return (
         <div className="App">
            {/* Main */}
            <AppBar />
            {itemList}

            {/* Add button */}
            <div style={{
               display: 'flex', justifyContent: 'flex-end', marginRight: '10%'
            }}>
            <Button variant="fab" 
               onClick={() => this.setState({ showAddModal: true })} 
               color="secondary" aria-label="add"
               style={{
                  marginTop: 20,
               }}
            >
               <AddIcon />
            </Button>
            </div>

            {/* Add Modal */}
            {
               this.state.showAddModal
               ?
               <Modal handleClickBackDrop={this.handleCloseModal}>
                  <SlideModal showModal={this.state.showAddModal} handleCloseModal={this.handleCloseModal}>
                     <AddItemForm handleCloseModal={this.handleCloseModal} />
                  </SlideModal>
               </Modal>
               : null
            }

            {/* Edit Modal */}
            {
               this.state.showEditModal
               ?
               <Modal handleClickBackDrop={this.handleCloseModal}>
                  <SlideModal showModal={this.state.showEditModal} handleCloseModal={this.handleCloseModal}>
                     <EditItemForm 
                        name={this.state.selectedItem}
                        handleCloseModal={this.handleCloseModal} />
                  </SlideModal>
               </Modal>
               : null
            }
         </div>
      );
   }
}

const mapStateToProps = ({ items }) => {
   return { items };
}

export default connect(mapStateToProps, {fetchItems} )(App);
