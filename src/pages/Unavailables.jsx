import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import '../assets/styles/unavailables.css'


const Unavailables = () => {
  const [unavailables, setUnavailables] = useState([])


  useEffect(() => {
    const getUnavailablesBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/unavailables")
      .then(res => {
        setUnavailables(res.data)
      })
      .catch(err => console.log(err))
    }
    getUnavailablesBooks()
  }, [])

  const deleteBook = (e) => {
    axios.delete(`https://library365backend.herokuapp.com/book`,{
      bookId : unavailables[e.target.id]._id,
      userId : unavailables[e.target.id].userID
    })
  .then(res => {
    window.location.reload()
  })
  .catch(err => console.log(err))
}
console.log(unavailables)

const returnBook = async(e) => {
  await axios.put(`https://library365backend.herokuapp.com/return`,{
    bookID : unavailables[e.target.value]._id,
    bookName : unavailables[e.target.value].name,
    userID : unavailables[e.target.value].userID,
    userName : unavailables[e.target.value].userName,
  })
  .then(res => {
    window.location.reload()
  })
  .catch(err => console.log(err))
}

  return (
    <div className="unavailables">
      <div className="unavailables-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Unavailables books</h1>
        <button><Link to="/createbook">Create Book</Link></button>
      </div>
      <div className="unavailables-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>User</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {unavailables.map((book, i) => (
              <tr key={book._id}>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.userName}</td>
                <td>
                  <button onClick={deleteBook} value={book._id}>Delete</button>
                  <button onClick={returnBook} value={i}>Return Book</button>
                </td>
              </tr>))
            }
            
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Unavailables