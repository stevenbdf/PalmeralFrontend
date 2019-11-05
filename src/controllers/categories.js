import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('categories',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('categories/create', JSON.stringify(data),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('categories/update', JSON.stringify(data),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const find = async (id_category) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('categories/find',
        JSON.stringify({ id_category })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const deleteCategory = async (id_category) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('categories/delete', JSON.stringify({ id_category }),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}