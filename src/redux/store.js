import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './userReducer'; // Подставьте свой корневой редюсер, если он у вас есть

const store = createStore(userReducer, applyMiddleware(thunk));

export default store;
