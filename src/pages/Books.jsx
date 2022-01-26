import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../assets/styles/books.css'


const Books = () => {
  const [books, setBooks] = useState([])

  useEffect(() => {
    const getBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/books")
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => console.log(err))
    }
    getBooks()
  }, [])

  return (
    <div className="books">
      <div className="books-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Books</h1>
        <button><Link to="/createbook">Create Book</Link></button>
      </div>
      <div className="books-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Status</th>
              <th>Place</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td></td>
                <td>
                  <button>Delete</button>
                  <button>Loan</button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Books