import { FETCH_ITEMS, ADD_ITEM, DELETE_ITEM, UPDATE_ITEM } from './types';
import axios from 'axios';

export const fetchItems = () => async (dispatch) => {
   const collection = await axios.get('http://localhost:5000');
   // console.log(collection);
   dispatch({
      type: FETCH_ITEMS,
      payload: collection.data
   })
}

export const addItem = (name, callback) => async (dispatch) => {
   const newItem = await axios.post('http://localhost:5000/new', { name });
   // console.log(newItem)
   dispatch({
      type: ADD_ITEM,
      payload: newItem.data
   });
   callback();
}

export const deleteItem = (item) => async (dispatch) => {
   // console.log(item)
   const response = await axios.post('http://localhost:5000/remove', { id: item._id });
   console.log(response)
   
   dispatch({
      type: DELETE_ITEM,
      payload: response.data
   });
}

export const updateItem = (originalName, name) => async (dispatch) => {
   const response = await axios.post('http://localhost:5000/update', { originalName, name });
   console.log(response.data)
   dispatch({
      type: UPDATE_ITEM,
      payload: response.data
   })
}