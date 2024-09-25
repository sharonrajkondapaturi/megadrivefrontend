import {useState} from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import './index.css'

const TodoList = (props)=>{
    const [toggle,setToggle] = useState(false)
    const {todos,onRender} = props
    const {id,userId,todo,description,priority,status} = todos
    const todoData = {
        id,userId,todo,description,priority,status
    }
    //const navigate = useNavigate() 

    // to delete the todo
    const onDelete = async() =>{
        const todoApiUrl = `https://megadrivetodobackend.onrender.com/todos/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
         headers : {Authorization: `Bearer ${jwtToken}` }
        }
        await axios.delete(todoApiUrl,config)
        onRender()
     }


    //change status of the todo
     const onChangeStatus = async(event)=>{
        const todoStatusApiUrl = `https://megadrivetodobackend.onrender.com/status/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
         headers : {Authorization: `Bearer ${jwtToken}` }
        }
        const changedStatus={
            status:event.target.value
        }
        await axios.put(todoStatusApiUrl,changedStatus,config)
        setToggle(false)
        onRender()
     }
     const onStatus = () =>{
        setToggle(prevState=> !prevState)
     }

    return(
        <li className='list-container'>
            <h1>{todo}</h1>
            <p className='todo-detail'>Description: {description}</p>
            <p className='todo-detail'>Priority: {priority}</p>
            {toggle?(
            <div>
            <span className='todo-span'>Status: </span>
            <select className='todo-select' value={status} onChange={onChangeStatus}>
                <option value="in progress">pending</option>
                <option value="in progress">in progress</option>
                <option value="done">done</option>
            </select>
            </div>
             ):<p className='todo-detail'>Status: {status}</p>}
            <div>
                <Link to={`/editTodo/${id}`} state={todoData} style={{textDecoration:"none",padding:0}}>
                <button type="button" style={{backgroundColor:"#27a614"}} className='todo-button'>edit</button>
                </Link>
                <button type="button" onClick={onDelete} style={{backgroundColor:"#e31e3e"}} className='todo-button'>delete</button>
                <button type="button" onClick={onStatus} style={{backgroundColor:"#f59211"}} className='todo-button'>status</button>
            </div>
        </li>
    )
}

export default TodoList