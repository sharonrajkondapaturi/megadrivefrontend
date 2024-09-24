import './index.css'

const TodoList = (props)=>{
    const {todos} = props
    const {id,userId,todo,description,priority,status} = todos

    return(
        <li className='list-container'>
            <h1>{todo}</h1>
            <p className='todo-detail'>Description: {description}</p>
            <p className='todo-detail'>Priority: {priority}</p>
            <p className='todo-detail'>Status: {status}</p>
        </li>
    )
}

export default TodoList