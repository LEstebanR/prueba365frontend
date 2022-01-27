import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom"
import '../styles/LeanBook.css'

const LeanBook = () => {
  const [books, setBooks] = useState([])
  const [user, setUser] = useState({})
  const [lean, setLean] = useState({})
  const userid = new URLSearchParams(window.location.search).get("user")
  
  useEffect(() => {
    const getBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/availables")
      .then(res => {
        setBooks(res.data)
      })
      .catch(err => console.log(err))
    }

    const getUser = async () => {
      await axios.get(`https://library365backend.herokuapp.com/user/${userid}`)
      .then(res => {
        setUser(res.data)
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

  const leanBook = (e) => {
    e.preventDefault()
    setLean({
      userID: user._id,
      userName: user.name,
    })
  }

  const handleBook = (e) => {
    const index = e.target.value
    e.preventDefault()
    setLean({
      ...lean,
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
          {books.map((book, i) => (
            <option key={i} value={i}>{book.name}</option>
          ))}
        </select>
        <button><Link to="/users">Cancel</Link></button>
        <button type="submit"onClick={leanBook}>Submit</button>
        
      </form>

    </div>
  )
}

export default LeanBook