import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

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
    axios.delete(`https://library365backend.herokuapp.com/book/${e.currentTarget.value}`)
  .then(res => {
    window.location.reload()
  })
  .catch(err => console.log(err))
}

const goToLoanBook = (e) => {
  history.push(`/loanbook?book=${e.currentTarget.value}`)
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
                <td className="availables-actions">
                  <button onClick={deleteBook} value={book._id}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  <button onClick={goToLoanBook} value={book._id}><FontAwesomeIcon icon={faShare}/></button>
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