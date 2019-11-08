import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import swal from 'sweetalert'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import { resetPassword } from '../controllers/login'
import auth from '../utils/auth'

const Password = props => {

    const [form, setValues] = useState({ email: '' })

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await resetPassword(form)
        if (res.status) {
            swal('Correcto', res.message, 'success')
                .then(value => props.history.push('/'))
        } else {
            swal('Error', res.message, 'error')
        }
    }

    useEffect(() => {
        const validate = async () => {
            let res = await auth.validateToken()
            res && props.history.push('/dashboard')
        }
        validate()
    }, [props])

    return (
        <MDBContainer>
            <MDBRow center className="pt-5">
                <MDBCol size="12" md="6">
                    <div className="d-flex justify-content-center">
                        <MDBIcon className="d-block" icon="warehouse" size="8x" />
                    </div>
                    <h1 className="text-center mt-3">Inventario Palmeral - Recuperar Contraseña</h1>
                    <form className="form-group" onSubmit={handleSubmit}>
                        <MDBInput
                            label="Correo"
                            icon="envelope"
                            className="mb-5"
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-content-center mb-4">
                            <MDBBtn type="submit" color="elegant">Enviar</MDBBtn>
                        </div>
                        <div className="d-flex justify-content-center">
                            <Link to="/">Volver a login</Link>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Password