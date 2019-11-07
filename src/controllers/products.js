import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('products',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const create = async data => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('products/create', data,
        { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'multipart/form-data' } })
    return res.data
}

export const update = async data => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('products/update', data,
        { headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'multipart/form-data' } })
    return res.data
}

export const find = async (id_product) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('products/find',
        JSON.stringify({ id_product })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const deleteProduct = async (id_product) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('products/delete', JSON.stringify({ id_product }),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}