import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Register from './components/Register';
import Login from './components/Login'
import UserDetails from './components/UserDetails'
import Todo from './components/Todo'
import UpdateTodo from './components/UpdateTodo'
import EditTodo from './components/EditTodo'
import './App.css';

const App = ()=>(
  <BrowserRouter>
  <Routes>
    <Route path="/signup" element={<Register/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route element={<ProtectedRoute/>}>
      <Route path="/userdetails" element={<UserDetails/>}/>
      <Route path="/todos" element={<Todo/>}/>
      <Route path="/updateTodo" element={<UpdateTodo/>}/>
      <Route path="/editTodo" element={<EditTodo/>}/>
    </Route>
  </Routes>
  </BrowserRouter>
)

export default App;
