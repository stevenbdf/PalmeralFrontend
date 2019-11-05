import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('suppliers',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('suppliers/create', JSON.stringify(data),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const update = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('suppliers/update', JSON.stringify(data),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const find = async (id_supplier) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('suppliers/find',
        JSON.stringify({ id_supplier })
        , { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const deleteSupplier = async (id_supplier) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('suppliers/delete', JSON.stringify({ id_supplier }),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}