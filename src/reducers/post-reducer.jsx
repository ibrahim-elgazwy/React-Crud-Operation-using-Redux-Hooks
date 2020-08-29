import { FETCH_POST, NEW_POST, DELETE_POST, EDIT_POST } from '../actions/types';

const intialState = {
    items: []
}

function _editPost(post, items){
    debugger
    let newItems = items.map(item => {
        if(post.id === item.id) item = post;
        return item;
    });
    return newItems;
}

export default function(state = intialState, action){
    debugger
    switch(action.type){
        case FETCH_POST:
            return {
                ...state,
                items: action.payload
            };

        case NEW_POST:
            return {
                ...state,
                items: [...[action.payload], ...state.items]
            };

        case EDIT_POST:
            return {
                ...state,
                items: _editPost(action.payload,state.items)
            };

        case DELETE_POST:
            return {
                ...state,
                items: state.items.filter(item => item.id !== action.payload)
            };

        default:
            return state;
    }
}