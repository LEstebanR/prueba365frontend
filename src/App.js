import './App.css';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx'
import Users from './pages/Users.jsx'
import CreateUser from './pages/CreateUser.jsx'
import Availables from './pages/Availables.jsx'
import Books from './pages/Books.jsx'
import CreateBook from './pages/CreateBook.jsx'
import Unavailables from './pages/Unavailables.jsx'
import EditUser from './pages/EditUser.jsx'
import LoanBook from './pages/LoanBook.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/users" element={<Users/>}/>
      <Route path="/books" element={<Books/>}/>
      <Route path="/createBook" element={<CreateBook/>}/>
      <Route path="/createuser" element={<CreateUser/>}/>
      <Route path="/availables" element={<Availables/>}/>
      <Route path="/unavailables" element={<Unavailables/>}/>
      <Route path="/edituser/:id" element={<EditUser/>}/>
      <Route path="/loanbook" element={<LoanBook/>}/>
    </Routes>

  );
}

export default App;
