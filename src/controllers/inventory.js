import axios from './index'

export const get = async () => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.get('transactions',
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const create = async (data = {}) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('transactions/create', JSON.stringify(data),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}

export const deleteTransaction = async (id_transaction) => {
    const TOKEN = localStorage.getItem('token')
    const res = await axios.post('transactions/delete', JSON.stringify({ id_transaction }),
        { headers: { Authorization: `Bearer ${TOKEN}` } })
    return res.data
}