import React from 'react';
import { List, ListItem, ListItemText, Button } from '@material-ui/core';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'; // ES6


import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import { fetchItems, deleteItem } from '../actions';

class ItemList extends React.Component {

   handleClickItem = (name, id) => {
      this.props.handleEditItem(name, id)
      this.props.showEditModal();
   }

   componentDidMount() {
      this.props.fetchItems();
      console.log('ItemList  mounted')
   }

   render() {
      let listItem = this.props.items.map((item, id) => {
         let marginTop = id === 0 ? 10 : 0;
         const styles = {
            listItemContainer: {
               backgroundColor: 'white',
               marginTop,
               marginBottom: 10,
               width: "80%",
               marginLeft: 'auto',
               marginRight: 'auto',
               display: 'flex',
               justifyContent: 'space-between',
               alignItems: 'center',
            }
         }
         return (
            <ListItem button 
               onClick={() => this.handleClickItem(item.name, id)}
               key={id}
               style={styles.listItemContainer} >
               <ListItemText primary={item.name} />
               <Button
                  onClick={(e) => {
                     this.props.deleteItem(item);
                     // window.location.reload();

                     e.stopPropagation();
                  }} 
                  variant="fab" aria-label="delete" 
                  style={{ 
                     backgroundColor:"red" }}>
                  <DeleteIcon style={{ color: 'white' }}/>
               </Button>
            </ListItem>
         );
      });
      return(
         <List component="nav">
            {/* <ReactCSSTransitionGroup
            transitionName="example"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={300}> */}
               {listItem}
            {/* </ReactCSSTransitionGroup> */}
         </List>
      );
   }
}

const mapStateToProps = ({ items }) => {
   return { items };
}

export default connect(mapStateToProps, {deleteItem, fetchItems })(ItemList);