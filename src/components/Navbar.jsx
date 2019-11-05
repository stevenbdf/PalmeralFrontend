import React, { useState } from 'react'
import {
    MDBNavbar, MDBNavbarBrand, MDBCollapse,
    MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler
} from 'mdbreact';
import { Link} from 'react-router-dom';

const NavbarPage = props => {
    const [isOpen, setOpen] = useState(false)

    const toggleCollapse = () => {
        setOpen(!isOpen)
    }

    return (
        <MDBNavbar color="special-color" dark expand="md">
            <MDBNavbarBrand>
                <strong className="white-text"><Link style={{ textDecoration: 'none', color: 'white' }} to="/dashboard">Inventario Palmeral</Link></strong>
            </MDBNavbarBrand>
            {
                props.showOptions
                &&
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
                    </MDBCollapse>
                </React.Fragment>
            }
        </MDBNavbar>
    )

}

export default NavbarPage;