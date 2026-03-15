import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  likedItems: JSON.parse(localStorage.getItem("likedItems")) || []
}

export const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {
   toggleLike :(state , action)=>{
    const id = action.payload;
    if(state.likedItems.includes(id)){
        state.likedItems=state.likedItems.filter((item)=>item !==id)
    }else{
      state.likedItems.push(id)
    }
    localStorage.setItem("likedItems" , JSON.stringify(state.likedItems))
   }
   
  },
})


export const {toggleLike  } = likeSlice.actions

export default likeSlice.reducer