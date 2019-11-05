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
import { get, create, update, find, deleteSupplier } from '../controllers/suppliers'

const Suppliers = props => {
    document.title = 'Palmeral - Proveedores'

    const [suppliers, setSuppliers] = useState({
        columns: [
            {
                label: 'Código',
                field: 'id_supplier',
                sort: 'asc'
            },
            {
                label: 'Nombre',
                field: 'name',
                sort: 'asc'
            },
            {
                label: 'Dirección',
                field: 'address',
                sort: 'asc'
            },
            {
                label: 'Teléfono',
                field: 'phone',
                sort: 'asc'
            },
            {
                label: 'Correo',
                field: 'email',
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
        id_supplier: 0,
        name: '',
        address: '',
        phone: '',
        email: ''
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
                        id_supplier: 0,
                        name: '',
                        address: '',
                        phone: '',
                        email: ''
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
                        id_supplier: 0,
                        name: '',
                        address: '',
                        phone: '',
                        email: ''
                    })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleEditClick = async id_supplier => {
        const res = await find(id_supplier)
        if (res.status) {
            setValues(res.data)
            toggleUpdateModal()
        }
    }

    const handleDeleteClick = id_supplier => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar el proveedor?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteSupplier(id_supplier)
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

        const getSuppliers = async () => {
            let res = await get()
            if (typeof res == 'object') {
                res.map(item => {
                    !item.email && (item.email = ' - ')
                    item.handle =
                        <div className="d-flex justify-content-center">
                            <MDBBtn size="sm" color="warning" onClick={() => handleEditClick(item.id_supplier)}>Editar</MDBBtn>
                            <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(item.id_supplier)}>Eliminar</MDBBtn>
                        </div>
                    return item
                })
                setSuppliers(prevState => {
                    return { ...prevState, rows: res }
                })
                setIsLoading(false)
            } else {
                getSuppliers()
            }
        }

        validate()
        isLoading && getSuppliers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isLoading])

    return (
        <React.Fragment>
            <Navbar showOptions />
            <MDBContainer>
                <MDBRow center>
                    <h1 className="text-center w-100 mt-3">Proveedores</h1>
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
                                <Datatable data={suppliers} />
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal isOpen={createModal} toggle={toggleModal} centered>
                <form onSubmit={handleCreateSubmit}>
                    <MDBModalHeader toggle={toggleModal}>Agregar Proveedor</MDBModalHeader>
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
                            label="Dirección"
                            icon="map-marker-alt"
                            className="mb-5"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            value={form.address}
                        />
                        <MDBInput
                            label="Teléfono"
                            icon="phone-alt"
                            className="mb-5"
                            type="number"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Correo"
                            icon="envelope"
                            className="mb-5"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <p className="small">**Correo no obligatorio</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Crear</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
            <MDBModal isOpen={updateModal} toggle={toggleUpdateModal} centered>
                <form onSubmit={handleUpdateSubmit}>
                    <MDBModalHeader toggle={toggleUpdateModal}>Modificar Proveedor</MDBModalHeader>
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
                            label="Dirección"
                            icon="map-marker-alt"
                            className="mb-5"
                            type="text"
                            name="address"
                            onChange={handleChange}
                            value={form.address}
                        />
                        <MDBInput
                            label="Teléfono"
                            icon="phone-alt"
                            className="mb-5"
                            type="number"
                            name="phone"
                            value={form.phone}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Correo"
                            icon="envelope"
                            className="mb-5"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <p className="small">**Correo no obligatorio</p>
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Modificar</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
        </React.Fragment>
    )
}

export default Suppliers