import { Link } from "react-router-dom"
import '../assets/styles/users.css'

const Users = () => {
  return (
    <div className="users">
      <div className="users-titleContainer">
        <button><Link to="/">Back</Link></button>
        <h1>Users</h1>
        <button>Create user</button>
      </div>
      <div className="users-tableContainer">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Tel</th>
              <th>Books</th>
            </tr>
          </thead>
          <tbody>
          </tbody>
        </table>

      </div>
    </div>
  )
}

export default Users