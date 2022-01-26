import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../assets/styles/unavailables.css'


const Unavailables = () => {
  const [unavailables, setUnavailables] = useState([])

  useEffect(() => {
    const getUnavailablesBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/unavailables")
      .then(res => {
        setUnavailables(res.data)
      })
      .catch(err => console.log(err))
    }
    getUnavailablesBooks()
  }, [])

  return (
    <div className="unavailables">
      <div className="unavailables-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Unavailables books</h1>
        <button><Link to="/createbook">Create Book</Link></button>
      </div>
      <div className="unavailables-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unavailables.map(book => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.userName}</td>
                <td>
                  <button>Delete</button>
                  <button>Receive</button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Unavailables