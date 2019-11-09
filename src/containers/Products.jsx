import React, { useState, useEffect } from 'react'
import {
    MDBContainer, MDBRow, MDBCol, MDBBtn,
    MDBModal, MDBModalHeader, MDBModalBody,
    MDBModalFooter
} from 'mdbreact'
import swal from 'sweetalert'
import Navbar from '../components/Navbar'
import Datatable from '../components/Datatable'
import auth from '../utils/auth'
import { get, create, update, find, deleteProduct } from '../controllers/products'
import { get as getSuppliers } from '../controllers/suppliers'
import { get as getCategories } from '../controllers/categories'

const IMAGE_URL = 'https://melodic-park-237401.appspot.com/images/'

const Products = props => {
    document.title = 'Palmeral - Productos'

    const [products, setProducts] = useState({
        columns: [
            {
                label: 'Código',
                field: 'id_product',
                sort: 'asc'
            },
            {
                label: 'Imagen',
                field: 'image',
                sort: 'asc'
            },
            {
                label: 'Descripción',
                field: 'description',
                sort: 'asc'
            },
            {
                label: 'Categoria',
                field: 'category',
                sort: 'asc'
            },
            {
                label: 'Proveedor',
                field: 'supplier',
                sort: 'asc'
            },
            {
                label: 'Acciónes',
                field: 'handle',
                sort: 'asc'
            }
        ],
        rows: []
    })

    const [suppliers, setSuppliers] = useState([])

    const [categories, setCategories] = useState([])

    const [isLoading, setIsLoading] = useState(true)

    const [createModal, setCreateModal] = useState(false)

    const [updateModal, setUpdateModal] = useState(false)

    const toggleUpdateModal = () => setUpdateModal(!updateModal)

    const [form, setValues] = useState({
        id_product: 0,
        id_supplier: 0,
        id_category: 0,
        description: '',
        image: null
    })

    const toggleModal = () => setCreateModal(!createModal)

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleNewImage = value => {
        setValues({
            ...form,
            image: value
        })
    }

    const handleCreateSubmit = async e => {
        e.preventDefault()
        let data = new FormData()
        data.append('id_supplier', form.id_supplier)
        data.append('id_category', form.id_category)
        data.append('description', form.description)
        data.append('image', form.image)

        const res = await create(data)
        if (res.status) {
            toggleModal()
            swal('Correcto', res.message, 'success')
                .then(value => {
                    setIsLoading(true)
                    setValues({
                        id_product: 0,
                        id_supplier: 0,
                        id_category: 0,
                        description: '',
                        image: null
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleUpdateSubmit = async e => { 
        e.preventDefault()
        let data = new FormData()
        data.append('id_product', form.id_product)
        data.append('id_supplier', form.id_supplier)
        data.append('id_category', form.id_category)
        data.append('description', form.description)
        if (typeof form.image == 'object') {
            data.append('image', form.image)
        }

        const res = await update(data)
        if (res.status) {
            toggleUpdateModal()
            swal('Correcto', res.message, 'success')
                .then(value => {
                    setIsLoading(true)
                    setValues({
                        id_product: 0,
                        id_supplier: 0,
                        id_category: 0,
                        description: '',
                        image: null
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleEditClick = async id_product => {
        const res = await find(id_product)
        if (res.status) {
            setValues(res.data)
            toggleUpdateModal()
        }
    }

    const handleDeleteClick = id_product => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar el producto?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteProduct(id_product)
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

        const getProducts = async () => {
            let res = await get()
            if (typeof res == 'object') {
                res.map(item => {
                    item.image = <img src={IMAGE_URL + item.image} width="150" height="150" alt={item.image} />
                    item.handle =
                        <div className="d-flex justify-content-center">
                            <MDBBtn size="sm" color="warning" onClick={() => handleEditClick(item.id_product)}>Editar</MDBBtn>
                            <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(item.id_product)}>Eliminar</MDBBtn>
                        </div>
                    return item
                })
                setProducts(prevState => {
                    return { ...prevState, rows: res }
                })
                setIsLoading(false)
            } else {
                getProducts()
            }
        }

        const loadSuppliers = async () => {
            let res = await getSuppliers()
            if (typeof res == 'object') {
                setSuppliers(res)
            } else {
                loadSuppliers()
            }
        }

        const loadCategories = async () => {
            let res = await getCategories()
            if (typeof res == 'object') {
                setCategories(res)
            } else {
                loadCategories()
            }
        }

        validate()
        isLoading && getProducts()
        loadSuppliers()
        loadCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isLoading])

    return (
        <React.Fragment>
            <Navbar showOptions products />
            <MDBContainer>
                <MDBRow center>
                    <h1 className="text-center w-100 mt-3">Productos</h1>
                    <MDBCol size="12" className="d-flex justify-content-center">
                        <MDBBtn size="sm" color="success" onClick={toggleModal}>Crear</MDBBtn>
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
                                <Datatable data={products} />
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal isOpen={createModal} toggle={toggleModal} centered>
                <form onSubmit={handleCreateSubmit}>
                    <MDBModalHeader toggle={toggleModal}>Agregar Producto</MDBModalHeader>
                    <MDBModalBody>
                        <p className="small">Proveedor</p>
                        <select
                            className="browser-default custom-select"
                            name="id_supplier"
                            value={form.id_supplier}
                            onChange={handleChange}
                        >
                            <option value="0">Seleccióna una opción</option>
                            {
                                suppliers.map(item =>
                                    <option key={item.id_supplier} value={item.id_supplier}>{item.name}</option>
                                )
                            }
                        </select>
                        <p className="small mt-3">Categoria</p>
                        <select
                            className="browser-default custom-select"
                            name="id_category"
                            value={form.id_category}
                            onChange={handleChange}
                        >
                            <option value="0">Seleccióna una opción</option>
                            {
                                categories.map(item =>
                                    <option key={item.id_category} value={item.id_category}>{item.name}</option>
                                )
                            }
                        </select>
                        <p className="small mt-3">Descripción</p>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={form.description}
                            onChange={handleChange}
                        />
                        <p className="small mt-3">Imagen</p>
                        <input
                            type="file"
                            name="image"
                            onChange={value => handleNewImage(value.target.files[0])}
                        />
                        <p className="small mt-3">**La imagen debe tener relación de aspecto 1:1 , desde 300x300px hasta 500x500px</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Crear</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
            <MDBModal isOpen={updateModal} toggle={toggleUpdateModal} centered>
                <form onSubmit={handleUpdateSubmit}>
                    <MDBModalHeader toggle={toggleUpdateModal}>Modificar Producto</MDBModalHeader>
                    <MDBModalBody>
                        <p className="small">Proveedor</p>
                        <select
                            className="browser-default custom-select"
                            name="id_supplier"
                            value={form.id_supplier}
                            onChange={handleChange}
                        >
                            <option value="0">Seleccióna una opción</option>
                            {
                                suppliers.map(item =>
                                    <option key={item.id_supplier} value={item.id_supplier}>{item.name}</option>
                                )
                            }
                        </select>
                        <p className="small mt-3">Categoria</p>
                        <select
                            className="browser-default custom-select"
                            name="id_category"
                            value={form.id_category}
                            onChange={handleChange}
                        >
                            <option value="0">Seleccióna una opción</option>
                            {
                                categories.map(item =>
                                    <option key={item.id_category} value={item.id_category}>{item.name}</option>
                                )
                            }
                        </select>
                        <p className="small mt-3">Descripción</p>
                        <input
                            type="text"
                            name="description"
                            className="form-control"
                            value={form.description}
                            onChange={handleChange}
                        />
                        <p className="small mt-3">Imagen</p>
                        <input
                            type="file"
                            name="image"
                            onChange={value => handleNewImage(value.target.files[0])}
                        />
                        <p className="small mt-3">**La imagen debe tener relación de aspecto 1:1 , desde 300x300px hasta 500x500px</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Modificar</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </React.Fragment>
    )
}

export default Products