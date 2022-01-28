import { Link } from "react-router-dom"
import '../assets/styles/home.css'

const Home = () => {
  return (
    <div className="home">
      <h1>Library</h1>
      <div className="home-buttonsContainner">
        <button className="home-button"><Link to="/users" className="link">Users</Link></button>
        <button className="home-button"><Link to="/books">All Books</Link></button>
        <button className="home-button"><Link to="/availables">Available books</Link></button>
        <button className="home-button"><Link to="/unavailables">Unavailable books</Link></button>
      </div>
    </div>
  )
}

export default Home