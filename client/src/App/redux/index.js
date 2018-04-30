import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import itemReducer from './item-reducer';

const store = createStore(combineReducers({items: itemReducer}), 
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
applyMiddleware(thunk));

// store.subscribe(() => {
//     console.log(store.getState());
// })

export default store;