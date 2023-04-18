import { createSlice,current, createAsyncThunk } from '@reduxjs/toolkit'
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
        state.collection.filter(item => item._id !== action.payload._id)
    },
    addViewPage: (state,action) => {
        if ( state.collection[0].views.length < 6){
            state.collection[0].views.push(action.payload)
        } else return
    },
    deleteViewPage: (state, action) => {
        state.collection[0].views = state.collection[0].views.filter(item => item.id !== action.payload.id)
        action.payload.setCurrentSlide("0")
    },
    addTitlePage: (state,action) => {
        const position = action.payload.position
        state.collection[0].views[position].title = action.payload
    },
    deleteTitlePage: (state, action) => {
        const position = action.payload.position
        state.collection[0].views[position].title.title = ""
    },
    addBlocks: (state,action) => {
        const position = action.payload.position
        state.collection[0].views[position].blocks = action.payload.stateClone
    },
    addBlock: (state,action) => {
        state.collection[0].views[action.payload.list[0].position].blocks.push(action.payload)
    },
    deleteBlock: (state, action) => {
        const id = action.payload.id
        const position = action.payload.positionPage
        state.collection[0].views[position].blocks = state.collection[0].views[position].blocks.filter(item => item.list[0].id !== id)
    },
    updateBlock: (state,action) => {
        const item = state.collection.views.filter(item => item._id === action.payload._id)
    },
    }
  },
)

export const { 
                addSet, 
                deleteSet, 
                addViewPage, 
                addTitlePage,
                deleteTitlePage,
                deleteViewPage, 
                addBlocks,
                addBlock, 
                deleteBlock, 
                updateBlock 
                                } = stateSlice.actions
export default stateSlice.reducer