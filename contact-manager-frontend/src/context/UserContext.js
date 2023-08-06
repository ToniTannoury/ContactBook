import { createContext , useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserContext = createContext()

export const UserProvider = ({children})=>{
  const [isLoading,setIsLoading] = useState(true)
  const [user , setUser] = useState('')
  const navigate = useNavigate()

  const registerUser = async(name,email,password, gender)=>{
    const response = await fetch("http://127.0.0.1:8000/api/guest/register",{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        name,
        gender,
        email,
        password,
      })
    })
    const data = await response.json()
    console.log(data)
  }
  const login = async(email,password)=>{
    const response = await fetch("http://127.0.0.1:8000/api/guest/login",{
      method:"POST",
      headers:{
        "Accept":"application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        email,
        password,
      })
    })
    const data = await response.json()
    localStorage.setItem("token" , data.data.token)
    localStorage.setItem("id" , data.data.id)
    navigate("/landing")
    console.log(data)
  }


  return<UserContext.Provider 
    value={{
      registerUser,
      login
    }}>
      {children}
    </UserContext.Provider> 
    
}
export default UserContext