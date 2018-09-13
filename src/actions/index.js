import Web3 from 'web3';
import { FETCH_BLOCKNUMBER, FETCH_BLOCKS, FETCH_BLOCK } from './types';
import api from "../api/api";

export const fetchBlockNumber = () =>  async dispatch => {
  console.log('fetchBlockNumber action');
  
  api.block.fetch().then(blocks => {
    dispatch({ type: FETCH_BLOCKS, payload: blocks });
  })
};

export const fetchBlock = (hash) => async dispatch => {
  console.log('fetchBlock action', hash);
  api.block.search(hash).then(block => {
    console.log('Got block', block);
    dispatch({ type: FETCH_BLOCK, payload: block });
  })
};
