import axios from 'axios';

const initialState = {
    data: [],
    loading: true,
    errMsg: ""
}

const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING':
            return {
                ...state,
                loading: true
            }
        case 'ERR_MSG':
            return {
                ...state,
                loading: false,
                errMsg: action.errMsg
            }
        case 'GET_ITEMS':
            return {
                ...state,
                loading: false,
                data: action.data
            }
        case 'ADD_ITEM':
            return {
                ...state,
                loading: false,
                data: [...state.data, action.newItem]
            }
        case 'EDIT_ITEM':
            return {
                ...state,
                loading: false,
                data: state.data.map(item => {
                    if (item._id === action.id) {
                        return action.editedItem;
                    } else return item;
                })
            }
        case 'DELETE_ITEM':
            return {
                ...state,
                loading: false,
                data: state.data.filter(item => item._id !== action.id)
            }
        case 'DELETE_COMMENT':
            return {
                ...state,
                loading: false,

            }
        default:
            return state;
    }
}

export const getItems = () => {
    return dispatch => {
        axios.get("/items")
            .then(response => {
                dispatch({
                    type: 'GET_ITEMS',
                    data: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: `GET: ${err}`
                })
            })
    }
}

export const addItem = (newItem) => {
    return dispatch => {
        axios.post('/items/', newItem)
            .then(response => {
                dispatch({
                    type: 'ADD_ITEM',
                    newItem: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: `POST: ${err}`
                })
            })
    }
}

export const deleteItem = (id) => {
    return dispatch => {
        axios.delete('/items/' + id)
            .then(response => {
                dispatch({
                    type: 'DELETE_ITEM',
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: `DELETE: ${err}`
                })
            })
    }
}

export const editItem = (id, editedItem, commentEdit = false) => {
    return dispatch => {
        let url = '/items/' + id;
        if (commentEdit) url += "/comments";
        axios.put(url, editedItem)
            .then(response => {
                dispatch({
                    type: 'EDIT_ITEM',
                    editedItem: response.data,
                    id
                })
            })
            .catch(err => {
                dispatch({
                    type: 'ERR_MSG',
                    errMsg: `PUT: ${err}`
                })
            })
    }
}


export const deleteComment = (index) => {
    return {
        type: 'DELETE_COMMENT',
        index
    }
}

export default itemReducer;