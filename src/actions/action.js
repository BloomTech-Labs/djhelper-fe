export const SET_NAME = 'SET_NAME';
export const SET_USERNAME = 'SET_USERNAME';

export const setName = name => {
    return {type: SET_NAME, payload: name}
}

export const setUsername = username => {
    return {type: SET_USERNAME, payload: username}
}