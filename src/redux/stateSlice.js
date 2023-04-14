import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid';
//importar los objetos básicos
import { set, viewPage, block } from '../utils/functions';


const initialState = {
    config:[],
    usuario:[],
    collection:[set]
}

export const stateSlice = createSlice({
  name: 'state',
  initialState,
  reducers: {
    addSet: (state) => {
        state.collection.push(set)
    },
    deleteSet: (state, action) => {
        state.collection.filter(item => item._id === action.payload._id)
    },
    addViewPage: (state,action) => {
        state.collection.views.push(viewPage)
    },
    deleteViewPage: (state, action) => {
        state.collection.views.filter(item => item._id === action.payload._id)
    },
    addBlock: (state) => {
        state.collection.views.blocks.push(block)
    },
    deleteBlock: (state, action) => {
        state.collection.views.blocks.filter(item => item._id === action.payload._id)
    },
    updateBlock: (state,action) => {
        const item = state.collection.views.filter(item => item._id === action.payload._id)
        console.log(item)
    },
    }
  },
)

export const { 
                addSet, 
                deleteSet, 
                addViewPage, 
                deleteViewPage, 
                addBlock, 
                deleteBlock, 
                updateBlock 
                                } = stateSlice.actions
export default stateSlice.reducer