import { combineReducers } from 'redux';
import blockNumberReducer from './blockNumberReducer';
import blocksReducer from './blocksReducer';
import blockReducer from './blockReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: 'root',
  storage: storage
}

export default persistReducer(rootPersistConfig, combineReducers({
  blockNumber: blockNumberReducer,
  blocks: blocksReducer,
  block: blockReducer,
}));
