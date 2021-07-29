import { createStore, compose, applyMiddleware } from 'redux'

import rootReducers from './reducers'



const composeEnhancers =
  (typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware()),
)



export default store