import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import history from "../utils/history"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faShare, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Loader from "../components/loader ";
import '../assets/styles/books.css'


const Books = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/books")
      .then(res => {
        setBooks(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
    getBooks()
  }, [])

  const deleteBook = async (e) => {
    await axios.delete(`https://library365backend.herokuapp.com/book`,{data:{
      bookId : books[e.currentTarget.value]._id,
      userId : books[e.currentTarget.value].userID
    }})
  .then(res => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Book deleted!',
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
    history.push(`/loanbook?book=${e.currentTarget.value}`)
    window.location.reload()
  }

  const returnBook = async(e) => {
    await axios.put(`https://library365backend.herokuapp.com/return`,{
      bookID : books[e.currentTarget.value]._id,
      bookName : books[e.currentTarget.value].name,
      userID : books[e.currentTarget.value].userID,
      userName : books[e.currentTarget.value].userName,
    })
    .then(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Book returned!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        window.location.reload()
      } , 1500)
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
      {!loading ? 
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Status</th>
              <th>Place</th>
              <th>Actions<br/>(Delete, Loan, return)</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.status}</td>
                <td>{book.status === 'available' ? 'Library' : book.userName}</td>
                <td className="books-actions">
                  <button onClick={deleteBook} value={index}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  {book.status === 'available' ? 
                    <button onClick={goToLoanBook} value={book._id}><FontAwesomeIcon icon={faShare} onClick={goToLoanBook} value={book._id}/></button>
                    : <button onClick={returnBook} value={index}><FontAwesomeIcon icon={faArrowAltCircleDown}/></button>}
                  
                </td>
              </tr>))
            }
            
          </tbody>
        </table>
        : <Loader/> }


      </div>
    </div>
  )
}

export default Books