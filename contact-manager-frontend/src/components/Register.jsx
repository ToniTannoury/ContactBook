import { useState , useContext ,useEffect } from "react"
import UserContext from "../context/UserContext"
import { useNavigate } from "react-router-dom";
const Register = () => {
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [gender , setGender] = useState('')
  const navigate = useNavigate()

  const {registerUser} = useContext(UserContext)
  const handleNameChange = (e)=>{
    setName(e.target.value)
  }
  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassChange = (e)=>{
    setPassword(e.target.value)
  }
  const handleGenderChange = (e)=>{
    setGender(e.target.value)
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    console.log(1788888)
    try{
      registerUser(name , email , password , gender)
      navigate("/login")
    }catch(e){
      console.log(e)
    }
   
   
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input name="username" id="username" type="text" value = {name} onChange={handleNameChange}/>
        <label htmlFor="email">Email</label>
        <input name="email" id="email"  type="text" value = {email} onChange={handleEmailChange}/>
        <label htmlFor="password">Password</label>
        <input  name="password" id="password" type="text" value = {password} onChange={handlePassChange}/>
        <label htmlFor="gender">Gender</label>
        <input  name="gender" id="gender" type="text" value = {gender} onChange={handleGenderChange}/>
        <a  href="/login">Go to Login Page</a>
        <br />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
