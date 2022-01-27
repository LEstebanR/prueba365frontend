import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"

import '../assets/styles/availables.css'


const Availables = () => {
  const [availables, setAvailables] = useState([])

  useEffect(() => {
    const getAvailablesBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/availables")
      .then(res => {
        setAvailables(res.data)
      })
      .catch(err => console.log(err))
    }
    getAvailablesBooks()
  }, [])

  const deleteBook = (e) => {
    axios.delete(`https://library365backend.herokuapp.com/book/${e.target.value}`)
  .then(res => {
    window.location.reload()
  })
  .catch(err => console.log(err))
}

const goToLoanBook = (e) => {
  history.push(`/loanbook?book=${e.target.value}`)
  window.location.reload()
}

  return (
    <div className="availables">
      <div className="availables-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Availables</h1>
        <button><Link to="/createbook">Create Book</Link></button>
      </div>
      <div className="availables-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {availables.map(book => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>
                  <button onClick={deleteBook} value={book._id}>Delete</button>
                  <button onClick={goToLoanBook} value={book._id}>Loan Book</button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Availables