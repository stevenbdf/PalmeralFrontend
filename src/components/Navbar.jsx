import React, { useState } from 'react'
import swal from 'sweetalert'
import {
    MDBNavbar, MDBNavbarBrand, MDBCollapse,
    MDBNavbarNav, MDBNavItem, MDBNavLink,
    MDBNavbarToggler, MDBIcon
} from 'mdbreact';
import { Link } from 'react-router-dom';

const NavbarPage = props => {
    const [isOpen, setOpen] = useState(false)

    const toggleCollapse = () => {
        setOpen(!isOpen)
    }

    const handleLogOut = () => {
        swal({
            title: "Atención",
            text: "¿Quieres cerrar sesión?",
            icon: "warning",
            buttons: ['Cancelar', 'Aceptar'],
            dangerMode: true,
        })
            .then((close) => {
                if (close) {
                    console.log('entro')
                    localStorage.removeItem('token')
                    localStorage.removeItem('id_user')
                    window.location.href = '/'
                }
            })
    }

    return (
        <MDBNavbar color="special-color" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text"><Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">Inventario Palmeral</Link></strong>
            </MDBNavbarBrand>
            {
                props.showOptions
                    ?
                    <React.Fragment>
                        <MDBNavbarToggler onClick={toggleCollapse} />
                        <MDBCollapse isOpen={isOpen} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active={props.products}>
                                    <MDBNavLink to="/inventory">Inventario</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={props.products}>
                                    <MDBNavLink to="/products">Productos</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={props.categories}>
                                    <MDBNavLink to="/categories">Categorias</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={props.suppliers}>
                                    <MDBNavLink to="/suppliers">Proveedores</MDBNavLink>
                                </MDBNavItem>
                                <MDBNavItem active={props.users}>
                                    <MDBNavLink to="/users">Usuarios</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right>
                                <MDBNavItem>
                                    <MDBIcon
                                        className="text-white mr-md-4 mt-4 mt-md-0"
                                        icon="power-off"
                                        size="lg"
                                        style={{ cursor: 'pointer'}}
                                        onClick={handleLogOut}
                                    />
                                </MDBNavItem>
                            </MDBNavbarNav>
                        </MDBCollapse>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <MDBNavbarNav right>
                            <MDBNavItem>
                                <MDBIcon
                                    className="text-white mr-md-4"
                                    icon="power-off"
                                    size="lg"
                                    style={{ cursor: 'pointer'}}
                                    onClick={handleLogOut}
                                />
                            </MDBNavItem>
                        </MDBNavbarNav>
                    </React.Fragment>
            }
        </MDBNavbar>
    )

}

export default NavbarPage;