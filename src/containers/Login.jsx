import React, { useState, useEffect } from 'react'
import swal from 'sweetalert'
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBInput, MDBBtn } from 'mdbreact'
import { login as LoginRequest } from '../controllers/login'
import auth from '../utils/auth'

const Login = props => {

    const [form, setValues] = useState({ email: '', password: '' })

    const handleChange = e => {
        setValues({
            ...form,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const res = await LoginRequest(form)
        if (res.status) {
            localStorage.setItem('token', res.token)
            localStorage.setItem('id_user', res.id_user)
            swal(res.message, 'Presiona para continuar', 'success')
                .then(value => props.history.push('/dashboard'))
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
                    <h1 className="text-center mt-3">Inventario Palmeral</h1>
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
                        <MDBInput
                            label="Contraseña"
                            icon="lock"
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                        />
                        <div className="d-flex justify-content-center">
                            <MDBBtn type="submit" color="elegant">Ingresar</MDBBtn>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Login