import {Link, useNavigate } from 'react-router-dom'
import useAuth from '../hooks/useAuth';
import {useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from '../config/axios';


const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPassowrd] = useState("");
  const [alerta,setAlerta] = useState({})
  const navigate = useNavigate();
  const {setAuth} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if([email,password].includes('')){
        setAlerta({
          msg: "Todos los campos son obligatorios",
          error: true
        })
        return;
    }

    try {
      const {data} = await clienteAxios.post("/login",{email,password})
      localStorage.setItem("token",data.token)
      setAuth(data)
      navigate("/playlists")
      
    } catch (error) {
      setAlerta({
               msg: "Email o contraseña incorrecta",
               error: true
      })
    }



  } 

  const {msg} = alerta


  return (
    <>
          
    <div>
          <h1 className="text-indigo-600 font-black text-6xl">Inicia Sesión y administra tus 
          <span className="text-black "> playlists</span></h1>
    </div>
    <div className='mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white'>

          {msg && 
          
          <Alerta
          alerta= {alerta}
          />}
          
          <form onSubmit={handleSubmit}>

            <div className="mt-5">
                <label
                  className=" text-gray-500 block text-xl font-bold my-3"
                >
                  Email
                </label>
                <input 
                    type="email" 
                    placeholder="Ingresa tu email"
                    className="border w-full p-3 bg-gray-50 rounded-xl outline-green-400"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-5">
                <label
                  className=" text-gray-500 block text-xl font-bold my-3"
                >
                  Contraseña
                </label>
                <input 
                    type="password" 
                    placeholder="Ingresa tu contraseña"
                    className="border w-full p-3 bg-gray-50 rounded-xl outline-green-400"
                    value={password}
                    onChange={e => setPassowrd(e.target.value)}
                />
            </div>
              <input type="submit" 
                    value="Iniciar Sesión"
                    className="bg-indigo-700 mt-7 py-3 px-10 rounded-xl
                     text-white w-full uppercase font-bold hover:cursor-pointer
                     hover:bg-indigo-800 md:w-auto "                      
              
              />
          </form>
          
          <nav className='mt-3 lg:flex lg:justify-between'>

            <Link to="/registrar"
            className='block text-center my-5 text-gray-500 hover:underline'
            >¿No tienes una cuenta? <span className='text-indigo-600'>Regístrate!</span></Link>

          </nav>

    </div>
  
</>
  )
}

export default Login