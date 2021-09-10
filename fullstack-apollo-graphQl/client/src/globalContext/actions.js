export const GET_QUERY = 'GET_QUERY';
export const POST_QUERY = 'POST_QUERY';

export const getQuery = (payload) => ({
    type: GET_QUERY,
    payload,
});

export const postQuery = (payload) => ({
    type: POST_QUERY,
    payload,
});