import { Link } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import history from "../utils/history"
import Swal  from 'sweetalert2'
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
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Book created!',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          history.push("/books")
          window.location.reload()
        } , 1500)
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
        <div className="createBook-buttons">
          <button className="createBook-button"><Link to="/books">Cancel</Link></button>
          <button className="createBook-button" onClick={createBook}>Create</button>
        </div>
      </form>
    </div>
  )
}

export default CreateBook