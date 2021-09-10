import { GET_QUERY, POST_QUERY } from './actions';

export const reducer = (state, action) => {
    console.log(state, action)
    switch (action.type) {
        case GET_QUERY:
            return {
                ...state,
                articals: action.payload,
            };
        case POST_QUERY:
            return {
                ...state,
            };
        default:
            return {
                ...state,
            };
    };
};