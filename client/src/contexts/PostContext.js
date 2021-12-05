import { createContext, useReducer, useState } from 'react';
import { postReducer } from '../reducers/postReducer';
import {
    apiUrl,
    POSTS_LOADED_SUCCESS,
    POSTS_LOADED_FAILED,
    ADD_POST,
    DELETE_POST,
    UPDATE_POST,
    FIND_POST,
} from './constants';
import axios from 'axios';

export const PostContext = createContext();

const PostProvider = ({ children }) => {
    const [postState, dispatch] = useReducer(postReducer, {
        postEdit: null,
        posts: [],
        postLoading: true,
    });
    const [showAddPostModal, setShowAddPostModal] = useState(false);
    const [showUpdatePostModal, setShowUpdatePostModal] = useState(false);
    const [showToast, setShowToast] = useState({
        show: false,
        message: '',
        type: null,
    });
    const getPosts = async () => {
        try {
            const response = await axios.get(`${apiUrl}/posts`);
            if (response.data.success) {
                dispatch({
                    type: POSTS_LOADED_SUCCESS,
                    payload: response.data.posts,
                });
            }
        } catch (error) {
            dispatch({
                type: POSTS_LOADED_FAILED,
            });
        }
    };
    //  ADD POST
    const addPost = async (newPost) => {
        try {
            const response = await axios.post(`${apiUrl}/posts`, newPost);
            if (response.data.success) {
                dispatch({ type: ADD_POST, payload: response.data.post });
            }
            return response.data;
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };
    // Delete post
    const deletePost = async (postId) => {
        try {
            const response = await axios.delete(`${apiUrl}/posts/${postId}`);
            if (response.data.success) {
                dispatch({ type: DELETE_POST, payload: postId });
            }
        } catch (error) {
            console.log(error);
        }
    };
    // Find post to update
    const findPostEdit = (postId) => {
        const postEdit = postState.posts.find((post) => post._id === postId);
        dispatch({ type: FIND_POST, payload: postEdit });
    };
    // Update post
    const updatePost = async (updatedPost) => {
        try {
            const response = await axios.put(
                `${apiUrl}/posts/${updatedPost._id}`,
                updatedPost
            );
            if (response.data.success) {
                dispatch({ type: UPDATE_POST, payload: response.data.post });
                return response.data;
            }
        } catch (error) {
            return error.response.data
                ? error.response.data
                : { success: false, message: 'Server error' };
        }
    };
    const postData = {
        postState,
        getPosts,
        showAddPostModal,
        setShowAddPostModal,
        showUpdatePostModal,
        setShowUpdatePostModal,
        addPost,
        showToast,
        setShowToast,
        deletePost,
        updatePost,
        findPostEdit,
    };
    return (
        <PostContext.Provider value={postData}>{children}</PostContext.Provider>
    );
};

export default PostProvider;
