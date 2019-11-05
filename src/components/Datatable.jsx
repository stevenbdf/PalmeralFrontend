import React from 'react'
import { MDBDataTable } from 'mdbreact'

const Datatable = ({ data }) => {
    if (data.rows.length) {
        return (
            <MDBDataTable
                responsive
                searchLabel="Buscar"
                entriesLabel="Mostrar entradas"
                paginationLabel={["Anterior", "Siguiente"]}
                infoLabel={["Mostrando de", "a", "de", "entradas"]}
                striped
                entriesOptions={[5, 10, 20, 50, 100]}
                entries={5}
                bordered
                data={data}
            />)
    } else {
        return (<p className="text-center">Nada que mostrar</p>)
    }
}

export default Datatable