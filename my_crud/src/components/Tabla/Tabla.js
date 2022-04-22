import { TableRow } from "../tableRow/TableRow"

export const Tabla= ({data,  setDataParaEditar, borrarData})=>{
    return(
        <>
        <h3>Tabla de datos</h3>
        <table className='striped bordered hover'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>E-mail</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {data.length > 0 ? (
                data.map((el) => (
                    <TableRow
                     key={el.id}
                     el={el}
                     setDataParaEditar={setDataParaEditar}
                     borrarData={borrarData}
                     />
                     ))
                    ):(
                <tr>
                  <td colSpan="3">Sin datos</td>
                </tr>
                )}
             
            </tbody>
        </table>
        
        </>
    )
}