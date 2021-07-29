import { combineReducers } from 'redux'

import alertProviderReducer from '../Stores/Alerts/reducer';
import userProviderReducer from '../Stores/User/reducer';

const rootReducers = combineReducers({
    userProviderReducer: userProviderReducer,
    alertProviderReducer: alertProviderReducer
})

export default rootReducers