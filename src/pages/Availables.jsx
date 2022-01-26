import { Link } from "react-router-dom"
import '../assets/styles/availables.css'

const Availables = () => {
  return (
    <div className="">
      <div className="availables-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Availables Books</h1>
        <button><Link to="/createuser">Create Book</Link></button>
      </div>
    </div>
  )
}

export default Availables