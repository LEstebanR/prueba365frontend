import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import history from "../utils/history"
import '../assets/styles/createuser.css'

const EditUser = () => {
  const [newUser, setNewUser] = useState({})
  const [user, setUser] = useState({})
  const { id } = useParams()

  useEffect(() => {
    const getUser = async () => {
      await axios.get(`https://library365backend.herokuapp.com/user/${id}`)
      .then(res => {
        setUser(res.data)
        setNewUser(res.data)
      })
      .catch(err => console.log(err))
    }
    getUser()
  }, [id])

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
    e.preventDefault()
    axios.put(`https://library365backend.herokuapp.com/user/${id}`, newUser)
    .then(res => {
      history.push("/users")
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="createUser">
      <h1>Edit User</h1>
      <form>
        <label>Name</label>
        <input type="text" name="name" onChange={getName} placeholder={user.name}/>
        <label>Email</label>
        <input type="text" name="email" onChange={getEmail} placeholder={user.email} />
        <label>Tel</label>
        <input type="text" name="tel" onChange={getTel} placeholder={user.tel}/>
        <button><Link to="/users">Cancel</Link></button>
        <button onClick={updateUser}>Update</button>
      </form>
    </div>
  )
}

export default EditUser