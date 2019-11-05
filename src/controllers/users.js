import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('users',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const create = async (data = {}) => {
    const res = await axios.post('users/create', JSON.stringify(data))
    return res.data
}

export const update = async (data = {}) => {
    const res = await axios.post('users/update', JSON.stringify(data))
    return res.data
}

export const find = async (id_user) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('users/find',
        JSON.stringify({ id_user })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const deleteUser = async (id_user) => {
    const res = await axios.post('users/delete', JSON.stringify({ id_user }))
    return res.data
}