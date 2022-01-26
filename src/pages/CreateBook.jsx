import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import history from "../utils/history"
import '../assets/styles/createbook.css'

const CreateBook = () => {
  const [book, setBook] = useState({})

  const getName = (e) => {
    setBook({ ...book, name: e.target.value })
  }

  const getAuthor = (e) => {
    setBook({ ...book, author: e.target.value })
  }

  const createBook = (e) => {
    e.preventDefault()
    axios.post("https://library365backend.herokuapp.com/books", book)
      .then(res => {
        console.log(res, book)
        history.push("/books")
        window.location.reload()
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="createBook">
      <h1>Create Book</h1>
      <form>
        <label>Title</label>
        <input type="text" name="name" onChange={getName}/>
        <label>Author</label>
        <input type="text" name="author" onChange={getAuthor} />
        <button><Link to="/books">Cancel</Link></button>
        <button onClick={createBook}>Create</button>
      </form>
    </div>
  )
}

export default CreateBook