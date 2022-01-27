import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"
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

  const deleteBook = async (e) => {
    await axios.delete(`https://library365backend.herokuapp.com/book`,{data:{
      bookId : books[e.target.value]._id,
      userId : books[e.target.value].userID
    }})
  .then(res => {
    window.location.reload()
  })
  .catch(err => console.log(err))
}

  const goToLoanBook = (e) => {
    history.push(`/loanbook?book=${e.target.value}`)
    window.location.reload()
  }

  const returnBook = async(e) => {
    await axios.put(`https://library365backend.herokuapp.com/return`,{
      bookID : books[e.target.value]._id,
      bookName : books[e.target.value].name,
      userID : books[e.target.value].userID,
      userName : books[e.target.value].userName,
    })
    .then(res => {
      window.location.reload()
    })
    .catch(err => console.log(err))
  }

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
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td>{book.status === 'available' ? 'Library' : book.userName}</td>
                <td>
                  <button onClick={deleteBook} value={index}>Delete</button>
                  {book.status === 'available' ? 
                    <button onClick={goToLoanBook} value={book._id}>Loan Book</button> 
                    : <button onClick={returnBook} value={index}>Return Book</button>}
                  
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