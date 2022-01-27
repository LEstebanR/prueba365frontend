import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import history from "../utils/history"
import '../styles/LeanBook.css'

const LeanBook = () => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState({})
  const [loan, setLoan] = useState({})
  const userid = new URLSearchParams(window.location.search).get("user")
  
  useEffect(() => {
    const getBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/availables")
      .then(res => {
        setBooks(res.data)
        // setLoan({
        //   ...loan,
        //   bookID : res.data[0]._id,
        //   bookName : res.data[0].name,
        // })
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
        setUser(res.data)
      })
      .catch(err => console.log(err))
    }

    getBooks()
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
      history.push("/users")
      window.location.reload()
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


  return (
    <div className="leanBook">
      <h1>Lean Book</h1>
      <form>
        {user ? <h2>{user.name}</h2> : <h2>Guest</h2>}
        <label>Book</label>
        <select name="book" onChange={handleBook}>
          <option></option>
          {books.map((book, i) => (
            <option key={book.bookID} value={i}>{book.name}</option>
          ))}
        </select>
        <button><Link to="/users">Cancel</Link></button>
        <button type="submit"onClick={loanBook}>Submit</button>
        
      </form>

    </div>
  )
}

export default LeanBook