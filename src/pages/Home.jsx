import { Link } from "react-router-dom"
import '../assets/styles/home.css'

const Home = () => {
  return (
    <div className="home">
      <h1>Library</h1>
      <div className="home-buttonsContainner">
        <button><Link to="/users">users</Link></button>
        <button><Link to="/books">All Books</Link></button>
        <button><Link to="/availables">Available books</Link></button>
        <button><Link to="/unavailable">Unavailable books</Link></button>
      </div>
    </div>
  )
}

export default Home