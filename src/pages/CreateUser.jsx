import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import history from "../utils/history"
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
      .then(res => {
        console.log(res, user)
        history.push("/users")
        window.location.reload()
      })
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
        <div className="editUser-buttons">
          <button className="editUser-button"><Link to="/users">Cancel</Link></button>
          <button className="editUser-button" onClick={createUser}>Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateUser