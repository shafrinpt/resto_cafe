import { createStore } from 'redux';
import rootReducer from './reducers/main'; // You'll need to import your root reducer here

// Create the Redux store
const store = createStore(rootReducer); // You can also pass initial state or middleware here if needed

export default store;