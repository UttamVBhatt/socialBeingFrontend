import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  post: {},
  comments: [],
  isVisible: false,
  likes: 0,
  likedPost: [],
};

const setPost = createAction("setPost");
const setComments = createAction("setComments");
const addComment = createAction("addComment");
const showDelete = createAction("showDelete");
const deleteComment = createAction("deleteComment");
const setLikes = createAction("setLikes");
const likePost = createAction("likePost");
const unlikePost = createAction("unlikePost");

const OnePostReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setPost, (state, action) => {
      state.post = action.payload;
    })
    .addCase(setComments, (state, action) => {
      state.comments = action.payload;
    })
    .addCase(addComment, (state, action) => {
      state.comments.unshift(action.payload);
    })
    .addCase(showDelete, (state) => {
      state.isVisible = !state.isVisible;
    })
    .addCase(deleteComment, (state, action) => {
      state.comments = state.comments.filter(
        (commentObj, i) => i !== action.payload.index
      );
    })
    .addCase(setLikes, (state, action) => {
      state.likes = action.payload;
    })
    .addCase(likePost, (state) => {
      state.likes = state.likes + 1;
    })
    .addCase(unlikePost, (state) => {
      state.likes = state.likes - 1;
    });
});

export default OnePostReducer;
