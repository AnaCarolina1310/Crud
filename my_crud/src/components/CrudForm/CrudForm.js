import { useEffect, useState } from 'react'


const dataInicial={
    nombre: '',
    email: '',
    id: null
}


export const CrudForm =({editarData, crearData, setDataParaEditar, dataParaEditar})=>{


    const [form, setForm] = useState(dataInicial)
     useEffect(()=>{
       if(dataParaEditar){
           setForm(dataParaEditar)
       }else{
           setForm(dataInicial)
       }
     },[dataParaEditar])
   
    const handleChange = (e)=>{
       setForm({
           ...form,
           [e.target.name]: e.target.value,
       })
   }
  const handleSubmit = (e)=>{
    e.preventDefault()
    if(form.id === null){
        crearData(form)
    }else{
        editarData(form)
    }
    handleReset()
   }
   const handleReset = (e)=>{
      setForm(dataInicial)
      setDataParaEditar(null)
}
   
    return (
        <>
        {dataParaEditar?<h3>Modificar</h3>:<h3>Agregar</h3>}
        <form onSubmit={handleSubmit}>
           <input type='text' 
           name='nombre' 
           placeholder='Nombre y apellido'
           onChange={handleChange}
           value={form.nombre}
         
           />
           <input type='email' 
           name='email' 
           placeholder='E-mail'
           onChange={handleChange}
           value={form.email}
           
           />
           <input 
           type='submit' 
           value='Enviar'
          
           />
           <input 
           type='reset' 
           value='limpiar'
           onClick={handleReset}
           />
        </form>
        
        </>
    )
}