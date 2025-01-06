import { Link,useNavigate  } from "react-router-dom";
import { useState } from "react";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/axios";
const Registrar = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [repetirPassword,setRepetirPassword] = useState('');
  const [alerta,setAlerta] = useState({})
  const navigate = useNavigate(); 
  const handleSubmit =  async (e) =>{

    e.preventDefault();
    if([email,password,repetirPassword].includes('')){
        setAlerta({msg : "Todos los campos son obligatorios",error: true})
      return;
    }
    if(password !== repetirPassword){
      setAlerta({msg : "Las contraseñas deben ser iguales",error: true})
      return;
    }
    if(password.length < 6){
      setAlerta({msg : "La contraseña debe tener mas de 6 caracteres",error: true})
      return;
    }
    setAlerta({})

    //Crear el usuario en la api
    try{
      await clienteAxios.post("/user/register", {email,password})
      setAlerta({msg: "Usuario creado correctamente",error: false})
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }catch(error){
      setAlerta({msg : error.response.data ,error: true})
    }
  }

  const {msg} = alerta;

  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Crea tu cuenta y administra tus
          <span className="text-black "> playlists</span>
        </h1>
      </div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-5 rounded-xl bg-white">
        
        {msg && <Alerta 
          alerta = {alerta}  
        />}
        <form 
          onSubmit={handleSubmit}
        >
          <div className="mt-5">
            <label
              className=" text-gray-500 block text-xl font-bold my-3
                           outline-green-400"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Ingresa tu email"
              className="border w-full p-3 bg-gray-50 rounded-xl
                             outline-green-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label
              className=" text-gray-500 block text-xl font-bold my-3
                           outline-green-400"
            >
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Ingresa tu contraseña"
              className="border w-full p-3 bg-gray-50 rounded-xl
                            outline-green-400"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-5">
            <label
              className=" text-gray-500 block text-xl font-bold my-3
                          outline-green-400"
            >
              Repetir contraseña
            </label>
            <input
              type="password"
              placeholder="Repite tu contraseña"
              className="border w-full p-3 bg-gray-50 rounded-xl
                            outline-green-400"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Crear cuenta"
            className="bg-indigo-700 mt-7 py-3 px-10 rounded-xl
                            text-white w-full uppercase font-bold hover:cursor-pointer
                            hover:bg-indigo-800 md:w-auto "
          />
        </form>

        <nav className="mt-3 lg:flex lg:justify-between">
          <Link
            to="/"
            className="block text-center my-5 text-gray-500 hover:underline"
          >
            ¿Ya tienes una cuenta?{" "}
            <span className="text-indigo-600">Inicia sesión!</span>
          </Link>
        </nav>
      </div>
    </>
  );
};

export default Registrar;
