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
import { get, create, update, find, deleteUser } from '../controllers/users'

const Users = props => {
    document.title = 'Palmeral - Usuarios'

    const [users, setUsers] = useState({
        columns: [
            {
                label: 'Código',
                field: 'id_user',
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

    const [form, setValues] = useState({ id_user: 0, email: '', password: '' })

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
                    setValues({ id_user: 0, email: '', password: '' })
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
                    setValues({ id_user: 0, email: '', password: '' })
                })
        } else {
            swal('Error', res.message, 'error')
        }
    }

    const handleEditClick = async id_user => {
        const res = await find(id_user)
        if (res.status) {
            setValues(res.data)
            toggleUpdateModal()
        }
    }

    const handleDeleteClick = id_user => {
        swal({
            title: "Atención",
            text: "¿Quieres eliminar el usuario?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then(async (accept) => {
                if (accept) {
                    const res = await deleteUser(id_user)
                    if (res.status) {
                        swal('Correcto', res.message, 'success')
                            .then(() => {
                                setIsLoading(true)
                            })
                    }
                }
            })
    }

    useEffect(() => {
        const validate = async () => {
            let res = await auth.validateToken()
            !res && props.history.push('/')
        }

        const getUsers = async () => {
            let res = await get()
            if (typeof res == 'object') {
                res.map(item =>
                    item.handle =
                    <div className="d-flex justify-content-center">
                        <MDBBtn size="sm" color="warning" onClick={() => handleEditClick(item.id_user)}>Editar</MDBBtn>
                        <MDBBtn size="sm" color="danger" onClick={() => handleDeleteClick(item.id_user)}>Eliminar</MDBBtn>
                    </div>
                )
                setUsers(prevState => {
                    return { ...prevState, rows: res }
                })
                setIsLoading(false)
            } else {
                getUsers()
            }
        }

        validate()
        isLoading && getUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props, isLoading])

    return (
        <React.Fragment>
            <Navbar showOptions />
            <MDBContainer>
                <MDBRow center>
                    <h1 className="text-center w-100 mt-3">Usuarios</h1>
                    <MDBCol size="12" className="d-flex justify-content-center">
                        <MDBBtn size="sm" color="success" onClick={toggleModal}>Crear</MDBBtn>
                    </MDBCol>
                    <MDBCol size="10" md="8">
                        {
                            isLoading
                                ?
                                <div className="d-flex justify-content-center mt-4">
                                    <div className="spinner-border" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                <Datatable data={users} />
                        }
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            <MDBModal isOpen={createModal} toggle={toggleModal} centered>
                <form onSubmit={handleCreateSubmit}>
                    <MDBModalHeader toggle={toggleModal}>Agregar Usuario</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label="Correo"
                            icon="envelope"
                            className="mb-5"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <MDBInput
                            label="Contraseña"
                            icon="lock"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                    </MDBModalBody>
                    <MDBModalFooter>
                        <MDBBtn type="submit" color="primary">Crear</MDBBtn>
                    </MDBModalFooter>
                </form>
            </MDBModal>
            <MDBModal isOpen={updateModal} toggle={toggleUpdateModal} centered>
                <form onSubmit={handleUpdateSubmit}>
                    <MDBModalHeader toggle={toggleUpdateModal}>Modificar Usuario</MDBModalHeader>
                    <MDBModalBody>
                        <MDBInput
                            label="Correo"
                            icon="envelope"
                            className="mb-5"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
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

export default Users