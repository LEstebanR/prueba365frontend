import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import history from "../utils/history"
import '../assets/styles/createuser.css'

const EditUser = () => {
  const [newUser, setNewUser] = useState({})

  const getName = (e) => {
    setNewUser({ ...newUser, name: e.target.value })
  }

  const getEmail = (e) => {
    setNewUser({ ...newUser, email: e.target.value })
  }

  const getTel = (e) => {
    setNewUser({ ...newUser, tel: e.target.value })
  }

  const updateUser = (e) => {
    // e.preventDefault()
    // axios.post("https://library365backend.herokuapp.com/users", user)
    //   .then(res => {
    //     console.log(res, user)
    //     history.push("/users")
    //     window.location.reload()
    //   })
    //   .catch(err => console.log(err, user))
  }

  return (
    <div className="createUser">
      <h1>Edit User</h1>
      <form>
        <label>Name</label>
        <input type="text" name="name" onChange={getName}/>
        <label>Email</label>
        <input type="text" name="email" onChange={getEmail} />
        <label>Tel</label>
        <input type="text" name="tel" onChange={getTel}/>
        <button><Link to="/users">Cancel</Link></button>
        <button onClick={updateUser}>Update</button>
      </form>
    </div>
  )
}

export default EditUser