
export const TableRow = ({el, setDataParaEditar, borrarData}) =>{
    return(
        <>
         <tr>
            <td>{el.nombre}</td>
            <td>{el.email}</td>
            <td><button onClick={() => setDataParaEditar(el)}>Editar</button>
            <button onClick={()=>borrarData(el.id)}>Borrar</button></td>
        </tr>
        
        </>
    )
}