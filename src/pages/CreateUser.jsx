import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import '../assets/styles/createuser.css'

const CreateUser = () => {
  const [user, setUser] = useState({})

  const getName = (e) => {
    setUser({ ...user, name: e.target.value })
  }

  const getEmail = (e) => {
    setUser({ ...user, email: e.target.value })
  }

  const getTel = (e) => {
    setUser({ ...user, tel: e.target.value })
  }

  const createUser = (e) => {
    e.preventDefault()
    axios.post("https://library365backend.herokuapp.com/users", user)
      .then(res => console.log(res, user))
      .catch(err => console.log(err, user))
  }

  return (
    <div className="createUser">
      <h1>Create User</h1>
      <form>
        <label>Name</label>
        <input type="text" name="name" onChange={getName}/>
        <label>Email</label>
        <input type="text" name="email" onChange={getEmail} />
        <label>Tel</label>
        <input type="text" name="tel" onChange={getTel}/>
        <button><Link to="/users">Cancel</Link></button>
        <button onClick={createUser}>Create</button>
      </form>
    </div>
  )
}

export default CreateUser