import React, { useState, useEffect } from 'react'
import {
    MDBContainer, MDBRow, MDBCol, MDBBtn,
    MDBModal, MDBModalHeader, MDBModalBody,
    MDBModalFooter, MDBInput
} from 'mdbreact'
import swal from 'sweetalert'
import Navbar from '../components/Navbar'
import Datatable from '../components/Datatable'
import auth from '../utils/auth'
import { get, create, update, find, deleteCategory } from '../controllers/categories'

const Categories = props => {
    document.title = 'Palmeral - Categorias'

    const [categories, setCategories] = useState({
        columns: [
            {
                label: 'Código',
                field: 'id_category',
                sort: 'asc'
            },
            {
                label: 'Nombre',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Descripción',
                field: 'description',
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

    const [isLoading, setIsLoading] = useState(true)

    const [createModal, setCreateModal] = useState(false)

    const [updateModal, setUpdateModal] = useState(false)

    const [form, setValues] = useState({
        id_category: 0,
        name: '',
        description: ''
    })

    const toggleModal = () => setCreateModal(!createModal)

    const toggleUpdateModal = () => setUpdateModal(!updateModal)

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
            toggleModal()
            swal('Correcto', res.message, 'success')
                .then(value => {
                    setIsLoading(true)
                    setValues({
                        id_category: 0,
                        name: '',
                        description: ''
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleUpdateSubmit = async e => {
        e.preventDefault()
        const res = await update(form)
        if (res.status) {
            toggleUpdateModal()
            swal('Correcto', res.message, 'success')
                .then(value => {
                    setIsLoading(true)
                    setValues({
                        id_category: 0,
                        name: '',
                        description: ''
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleEditClick = async id_category => {
        const res = await find(id_category)
        if (res.status) {
            setValues(res.data)
            toggleUpdateModal()
        }
    }

    const handleDeleteClick = id_category => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar la categoria?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteCategory(id_category)
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

        const getCategories = async () => {
            let res = await get()
            if (typeof res == 'object') {
                res.map(item => {
                    item.handle =
                        <div className="d-flex justify-content-center">
                            <MDBBtn size="sm" color="warning" onClick={() => handleEditClick(item.id_category)}>Editar</MDBBtn>
                            <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(item.id_category)}>Eliminar</MDBBtn>
                        </div>
                    return item
                })
                setCategories(prevState => {
                    return { ...prevState, rows: res }
                })
                setIsLoading(false)
            } else {
                getCategories()
            }
        }

        validate()
        isLoading && getCategories()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isLoading])

    return (
        <React.Fragment>
            <Navbar showOptions categories />
            <MDBContainer>
                <MDBRow center>
                    <h1 className="text-center w-100 mt-3">Categorias</h1>
                    <MDBCol size="12" className="d-flex justify-content-center">
                        <MDBBtn size="sm" color="success" onClick={toggleModal}>Crear</MDBBtn>
                    </MDBCol>
                    <MDBCol size="10">
                        {
                            isLoading
                                ?
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <Datatable data={categories} />
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal isOpen={createModal} toggle={toggleModal} centered>
                <form onSubmit={handleCreateSubmit}>
                    <MDBModalHeader toggle={toggleModal}>Agregar Categoria</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label="Nombre"
                            icon="address-card"
                            className="mb-5"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Descripción"
                            icon="address-card"
                            className="mb-5"
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Crear</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
            <MDBModal isOpen={updateModal} toggle={toggleUpdateModal} centered>
                <form onSubmit={handleUpdateSubmit}>
                    <MDBModalHeader toggle={toggleUpdateModal}>Modificar Categoria</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label="Nombre"
                            icon="address-card"
                            className="mb-5"
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Descripción"
                            icon="address-card"
                            className="mb-5"
                            type="text"
                            name="description"
                            onChange={handleChange}
                            value={form.description}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Modificar</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </React.Fragment>
    )
}

export default Categories