import { useState , useContext ,useEffect } from "react"
import UserContext from "../context/UserContext"
import '../styles/login.css'

const Login = () => {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  
  const {login} = useContext(UserContext)

  const handleEmailChange = (e)=>{
    setEmail(e.target.value)
  }
  const handlePassChange = (e)=>{
    setPassword(e.target.value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    login(email , password)

  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input name="email" id="email" type="text" value={email} onChange={handleEmailChange} />

        <label htmlFor="password">Password</label>
        <input name="password" id="password" type="text" value={password} onChange={handlePassChange} />
        <a  href="/">Go to Register Page</a>
        <br />
        <button type="submit">Login</button>
      </form>
</div>
  )
}

export default Login
