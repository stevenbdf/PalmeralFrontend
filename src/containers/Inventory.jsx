import React, { useState, useEffect } from 'react'
import {
    MDBContainer, MDBRow, MDBCol, MDBBtn
} from 'mdbreact'
import swal from 'sweetalert'
import Navbar from '../components/Navbar'
import Datatable from '../components/Datatable'
import auth from '../utils/auth'
import { get, create, deleteTransaction } from '../controllers/inventory'
import { get as getProducts } from '../controllers/products'

const Inventory = props => {
    document.title = 'Palmeral - Inventario'

    const [transactions, setTransactions] = useState({
        columns: [
            {
                label: 'Fecha',
                field: 'date',
                sort: 'asc'
            },
            {
                label: 'Producto',
                field: 'product',
                sort: 'asc'
            },
            {
                label: 'Descripción',
                field: 'description',
                sort: 'asc'
            },
            {
                label: 'Venta',
                field: 'sale_price',
                sort: 'asc'
            },
            {
                label: 'Stock',
                field: 'stock',
                sort: 'asc'
            },
            {
                label: 'Tipo',
                field: 'type',
                sort: 'asc'
            },
            {
                label: 'Compra',
                field: 'purchase_price',
                sort: 'asc'
            },
            {
                label: 'Ganancia',
                field: 'profit',
                sort: 'asc'
            },
            {
                label: 'Cantidad',
                field: 'quantity',
                sort: 'asc'
            },
            {
                label: 'Acciónes',
                field: 'handle',
                sort: 'disabled'
            }
        ],
        rows: []
    })

    const [products, setProducts] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [form, setValues] = useState({
        id_product: 0,
        description: '',
        type: -1,
        date: '',
        purchase_price: 0,
        profit: 0,
        quantity: 0
    })

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }


    const handleCreateSubmit = async e => {
        e.preventDefault()
        const res = await create(form)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(value => {
                    setIsLoading(true)
                    setValues({
                        id_product: 0,
                        description: '',
                        type: -1,
                        date: '',
                        purchase_price: 0,
                        profit: 0,
                        quantity: 0
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleDeleteClick = id_transaction => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar la transacción?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteTransaction(id_transaction)
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                setIsLoading(true)
                            })
                    } else {
                        swal('Error', res.message, 'error')
                    }
                }
            })
    }

    useEffect(() => {
        const validate = async () => {
            let res = await auth.validateToken()
            !res && props.history.push('/')
        }

        const getTransactions = async () => {
            let res = await get()
            if (typeof res == 'object') {
                res.map(item => {
                    item.type ? item.type = 'ENTRADA' : item.type = 'SALIDA'
                    item.sale_price = '$ ' + item.sale_price
                    item.purchase_price = '$ ' + item.purchase_price
                    item.profit = '% ' + item.profit
                    item.handle =
                        <div className="d-flex justify-content-center">
                            <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(item.id_transaction)}>Eliminar</MDBBtn>
                        </div>
                    return item
                })
                setTransactions(prevState => {
                    return { ...prevState, rows: res }
                })
                setIsLoading(false)
            } else {
                getTransactions()
            }
        }

        const loadProducts = async () => {
            let res = await getProducts()
            if (typeof res == 'object') {
                setProducts(res)
            } else {
                loadProducts()
            }
        }

        validate()
        isLoading && getTransactions()
        loadProducts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isLoading])

    return (
        <React.Fragment>
            <Navbar showOptions inventory />
            <MDBContainer>
                <MDBRow center>
                    <h1 className="text-center w-100 mt-3">Inventario</h1>
                    <MDBCol size="12" md="6" lg="4" className="mb-4">
                        <p className="small">Producto</p>
                        <select
                            className="browser-default custom-select"
                            name="id_product"
                            value={form.id_product}
                            onChange={handleChange}
                        >
                            <option value="-1">Seleccióna una opción</option>
                            {
                                products.map(item =>
                                    <option key={item.id_product} value={item.id_product}>{item.description}</option>
                                )
                            }
                        </select>
                    </MDBCol>
                    <MDBCol size="12" md="6" lg="4" className="mb-4">
                        <p className="small">Descripción</p>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={form.description}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol size="12" md="6" lg="4" className="mb-4">
                        <p className="small">Tipo de Transacción</p>
                        <select
                            className="browser-default custom-select"
                            name="type"
                            value={form.type}
                            onChange={handleChange}
                        >
                            <option value="-1">Seleccióna una opción</option>
                            <option value="0">SALIDA</option>
                            <option value="1">ENTRADA</option>
                        </select>
                    </MDBCol>
                    <MDBCol size="12" md="6" lg="4" className="mb-4">
                        <p className="small">Fecha Transacción</p>
                        <input
                            type="date"
                            name="date"
                            className="form-control"
                            value={form.date}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol className="mb-4">
                        <p className="small">Precio de compra</p>
                        <input
                            type="number"
                            name="purchase_price"
                            className="form-control"
                            value={form.purchase_price}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol className="mb-4">
                        <p className="small">% de Ganancia</p>
                        <input
                            type="number"
                            name="profit"
                            className="form-control"
                            value={form.profit}
                            onChange={handleChange}
                        />
                    </MDBCol>
                    <MDBCol className="mb-4">
                        <p className="small">Cantidad</p>
                        <input
                            type="number"
                            name="quantity"
                            className="form-control"
                            value={form.quantity}
                            onChange={handleChange}
                            step="1"
                        />
                    </MDBCol>
                    <MDBCol size="12" className="d-flex justify-content-center mb-4">
                        <MDBBtn onClick={handleCreateSubmit} color="success">Crear Transacción</MDBBtn>
                    </MDBCol>
                    <MDBCol size="12">
                        {
                            isLoading
                                ?
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <Datatable data={transactions} />
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </React.Fragment>
    )
}

export default Inventory