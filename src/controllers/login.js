import axios from './index'

export const login = async (data = {}) => {
    const res = await axios.post('users/login', JSON.stringify(data))
    return res.data
}

export const resetPassword = async (data = {}) => {
    const res = await axios.post('users/resetPassword', JSON.stringify(data))
    return res.data
}
