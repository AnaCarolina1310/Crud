import { useEffect, useState } from "react"
import { helpHttp } from "../../helpers/helpHttp"
import { CrudForm } from "../CrudForm/CrudForm"
import { Loader } from "../Loader/Loader"
import { Tabla } from "../Tabla/Tabla"



export const CrudApp =()=>{
   const [db, setDb]= useState(null)
   const [dataParaEditar, setDataParaEditar]= useState(null)
   const [loading, setLoading]= useState(false)

   let api = helpHttp();
   let url ='http://localhost:5000/clientes'

 useEffect(()=>{
    setLoading(true) 
    helpHttp().get(url)
      .then((res)=>{
        if(!res.err){ 
           setDb(res)   
        }else{
          setDb(null)
        }
      setLoading(false)
    })  
 },[url])

   const crearData = (data) =>{
    data.id = Date.now(); 
    let options ={
      body:data,
      headers:{'content-type':'application/json'}
    }
    api.post(url,options).then((res)=>{
      if(!res.err){ 
        db.map((el)=>{
          if(el.email !== res.email){
            return setDb([...db,res])
          }else{
            alert('El email ya esta cargado')
           return setDb([...db])
          }
        }) 
      }else{
        setDb(null)
      }
    })
   }

   const editarData = (data) =>{
    let endPoint = `${url}/${data.id}`;
    let options ={
      body:data,
      headers:{'content-type':'application/json'}
    }
    api.put(endPoint, options).then((res)=>{
      if(!res.err){
        let newData = db.map((el)=> el.id === data.id?data: el)
        setDb(newData)
      }else{
        setDb(null)
      }
    })
   }

const borrarData = (id)=>{
    let isDelete = window.confirm('Esta seguro de eliminar este item?')
  if(isDelete){
    let endPoint =`${url}/${id}`
    let options ={
      headers:{'content-type':'application/json'}
    };
  api.del(endPoint, options).then((res)=>{
    let newData = db.filter((el)=>el.id !== id)
    setDb(newData)
   })
  } else{
  return;
}
}
    return(
        <>
        <h2>Crud App</h2>
        <CrudForm 
        crearData={crearData} 
        editarData={editarData}
        dataParaEditar={dataParaEditar} 
        setDataParaEditar={setDataParaEditar}/>

        {loading&& <Loader/>}
     
        {db && ( 
        <Tabla 
        data={db} 
        borrarData={borrarData}
        setDataParaEditar={setDataParaEditar}/>
        
       )}
        </>
    
    
        )

}