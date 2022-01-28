import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/loader ";
import Swal from "sweetalert2";
import '../assets/styles/users.css'


const Users = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUsers = async () => {
      await axios.get("https://library365backend.herokuapp.com/users")
      .then(res => {
        setUsers(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
    getUsers()
  }, [])

  const goToEditPage = (e) => {
    e.preventDefault()
    history.push(`/edituser/${e.currentTarget.value}`)
    window.location.reload()
  }

  const deleteUser = (e) => {
    axios.delete(`https://library365backend.herokuapp.com/user`,{data:{
      userId : users[e.currentTarget.value]._id,
      bookId : users[e.currentTarget.value].bookID
      }})
    .then(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'User deleted!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.reload()
      } , 1500)
    })
    .catch(err => console.log(err))
  }

  const goToLoanBook = (e) => {
     history.push(`/loanbook?user=${e.currentTarget.value}`)
    window.location.reload()
  }

  return (
    
    <div className="users">
      <div className="users-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Users</h1>
        <button><Link to="/createuser">Create user</Link></button>
      </div>
      
      <div className="users-tableContainer">
        {!loading ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Books</th>
              <th>Actions<br/>(Edit, delete, Loan book)</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.tel}</td>
                <td>
                  {user.books.map(book => (
                    <ul>
                      <li className="users-bookslist"key={book._id}>{book.bookName}</li>
                    </ul>
                  ))}
                </td>
                <td className="users-actions">
                  <button type="submit" onClick={goToEditPage} value={user._id}><FontAwesomeIcon className="icon" icon={faPen} /></button>
                  <button onClick={deleteUser} value={index}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  <button onClick={goToLoanBook} value={user._id}><FontAwesomeIcon icon={faShare}/></button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>
      ) : <Loader />}
      </div>
      
    </div>
  )
}

export default Users