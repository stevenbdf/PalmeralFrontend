import React from 'react'
import { Link } from 'react-router-dom'
import { MDBIcon, MDBCard, MDBCardBody, MDBCardTitle } from 'mdbreact'

const MenuItem = props => {

    return (
        <Link to={props.link} style={{ textDecoration: 'none', color: 'black' }}>
            <MDBCard>
                <MDBCardBody>
                    <MDBCardTitle className="text-center">{props.title}</MDBCardTitle>
                    <div className="d-flex justify-content-center pb-4">
                        <MDBIcon icon={props.icon} size="6x" />
                    </div>
                </MDBCardBody>
            </MDBCard>
        </Link>
    )
}

export default MenuItem

