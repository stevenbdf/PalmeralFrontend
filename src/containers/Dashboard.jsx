import React, { useEffect } from 'react'
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact'
import Navbar from '../components/Navbar'
import MenuItem from '../components/MenuItem'
import auth from '../utils/auth'

const Dashboard = props => {
    document.title = 'Palmeral - Dashboard'

    const items = [
        { title: 'Inventario', icon: 'warehouse', link: '/inventory' },
        { title: 'Productos', icon: 'shopping-cart', link: '/products' },
        { title: 'Categorias', icon: 'list-ul', link: '/categories' },
        { title: 'Proveedores', icon: 'truck-moving', link: '/suppliers' },
        { title: 'Usuarios', icon: 'user-friends', link: '/users' }
    ]

    useEffect(() => {
        const validate = async () => {
            let res = await auth.validateToken()
            !res && props.history.push('/')
        }
        validate()
    }, [props])

    return (
        <React.Fragment>
            <Navbar />
            <MDBContainer>
                <h1 className="text-center mt-3">¡Bienvenido!</h1>
                <MDBRow center>
                    {
                        items.map((item, index) =>
                            <MDBCol key={index + 1} size="12" md="6" lg="4" className="mt-3">
                                <MenuItem {...item} />
                            </MDBCol>
                        )
                    }
                </MDBRow>
            </MDBContainer>
        </React.Fragment>
    )
}

export default Dashboard