import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import history from "../utils/history"
import Swal from "sweetalert2"
import '../assets/styles/LoanBook.css'


const LoanBook = () => {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({})
  const [users, setUsers] = useState([])
  const [user, setUser] = useState({})
  const [loan, setLoan] = useState({})
  const userid = new URLSearchParams(window.location.search).get("user")
  const bookid = new URLSearchParams(window.location.search).get("book")
  
  useEffect(() => {
    const getBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/availables")
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => console.log(err))
    }

    const getBook = async () => {
      await axios.get(`https://library365backend.herokuapp.com/book/${bookid}`)
      .then(res => {
        setBook(res.data)
        setLoan({
          ...loan,
          bookID : res.data._id,
          bookName : res.data.name,
        })
      })
      .catch(err => console.log(err))
    }

    const getUser = async () => {
      await axios.get(`https://library365backend.herokuapp.com/user/${userid}`)
      .then(res => {
        setUser(res.data)
        setLoan({
          ...loan,
          userID : res.data._id,
          userName : res.data.name,
        })
      })
      .catch(err => console.log(err))
    }

    const getUsers = async () => {
      await axios.get("https://library365backend.herokuapp.com/users")
      .then(res => {
        setUsers(res.data)
      })
      .catch(err => console.log(err))
    }

    bookid ? getBook() : getBooks()
    userid ? getUser() : getUsers() 
    
  }, [userid])

  const loanBook = async(e) => {
    e.preventDefault()
    setLoan({
      ...loan, 
      userID: user._id,
      userName: user.name,
    })
    console.log(loan)
    await axios.put("https://library365backend.herokuapp.com/loans", loan)
    .then(res => {
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'The book has been loaned!',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
        userid ? history.push("/users") : history.push("/books")
        window.location.reload()
      } , 1500)
      
 
    })
    .catch(err => console.log(err))

  }

  const handleBook =  (e) => {
    const index = e.target.value
    e.preventDefault()
    setLoan({
      ...loan,
      bookID: books[index]._id,
      bookName: books[index].name,
    })
  }

  const handleUser =  (e) => {
    const index = e.target.value
    e.preventDefault()
    setLoan({
      ...loan,
      userID: users[index]._id,
      userName: users[index].name,
    })
  }

  return (
    <div className="loanBook">
      <h1>Loan Book</h1>
      <form>
        {user.name ? <h2>{user.name}</h2> : 
          <div>
            <label>User:</label>
            <select name="book" onChange={handleUser}>
            <option></option>
              {users.map((user, i) => (
            <option key={user._id} value={i}>{user.name}</option>
          ))}
        </select>
          </div>
        }
        {book.name ? <h2>{book.name}</h2> :
        <div> 
          <label>Book</label>
          <select name="book" onChange={handleBook}>
            <option></option>
              {books.map((book, i) => (
            <option key={book.bookID} value={i}>{book.name}</option>
          ))}
        </select>
        </div>}
        <div className="loan-buttons">
          <button className="loan-button"><Link to="/">Cancel</Link></button>
          <button className="loan-button" type="submit"onClick={loanBook}>Submit</button>
        </div>
      </form>

    </div>
  )
}

export default LoanBook