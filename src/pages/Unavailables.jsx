import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Loader from '../components/loader'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleDown, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import '../assets/styles/unavailables.css'


const Unavailables = () => {
  const [unavailables, setUnavailables] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUnavailablesBooks = async () => {
      await axios.get("https://library365backend.herokuapp.com/unavailables")
      .then(res => {
        setUnavailables(res.data)
        setLoading(false)
      })
      .catch(err => console.log(err))
    }
    getUnavailablesBooks()
  }, [])

  const deleteBook = async (e) => {
    await axios.delete('https://library365backend.herokuapp.com/book',{data:{
      bookId : unavailables[e.currentTarget.value]._id,
      userId : unavailables[e.currentTarget.value].userID
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

const returnBook = async(e) => {
  await axios.put(`https://library365backend.herokuapp.com/return`,{
    bookID : unavailables[e.currentTarget.value]._id,
    bookName : unavailables[e.currentTarget.value].name,
    userID : unavailables[e.currentTarget.value].userID,
    userName : unavailables[e.currentTarget.value].userName,
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
    <div className="unavailables">
      <div className="unavailables-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Unavailables books</h1>
        <button><Link to="/createbook">Create Book</Link></button>
      </div>
      <div className="unavailables-tableContainer">
        {!loading ? 
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
                <td className="unavailables-actions">
                  <button onClick={deleteBook} value={i}><FontAwesomeIcon icon={faTrashAlt}/></button>
                  <button onClick={returnBook} value={i}><FontAwesomeIcon icon={faArrowAltCircleDown}/></button>
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

export default Unavailables