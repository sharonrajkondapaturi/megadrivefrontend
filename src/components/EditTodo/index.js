import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {FidgetSpinner} from 'react-loader-spinner'
import {useNavigate,useLocation,useParams} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const EditTodo = ()=>{
    const [todo,setTodo] = useState('')
    const [description,setDesciption] = useState('')
    const [priority,setPriority] = useState('Action')
    const [todoError,setTodoError] = useState('')
    const [contentError,setContentError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const {id} = useParams()

    const onRender = async(event)=>{
        event.preventDefault()
        const todoApiurl = `https://megadrivetodobackend.onrender.com/todos/${id}`
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const todoData = {
            todo:todo,
            description:description,
            priority:priority,
        }

        if(description !== "" && priority !== "" && todo !== ""){
            if(todo.length < 10 && description.length < 10){
                setTodoError(true)
                setContentError(true)
            }
            else if(todo.length < 10){
                setTodoError(true)
                setContentError(false)
            }
            else if(description.length < 10){
                setTodoError(false)
                setContentError(true)
            }
            else{
                setLoading(true)
                await axios.put(todoApiurl,todoData,config)
                navigate('/todos')
            } 
        }
        else{
            alert("Fill the details")
        }
        
    }

    const onTodo = event => {
        setTodoError(false)
        setTodo(event.target.value)
    }

    const onDesciption = event => {
        setContentError(false)
        setDesciption(event.target.value)
    }

    const onPriority = event => {
        setPriority(event.target.value)
    }

    const star = () => (
        <span style={{color:"#ed154f",fontWeight:'bolder'}}>*</span>
    )

    const onLoading = ()=>(
        <center style={{marginTop:10,marginBottom:10}}>
            <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
        </center>
    )

    const onRenderSuccess = ()=>(
        <form className='edit-post' onSubmit={onRender}>
            <label htmlFor='todo'>todo {star()}</label>
            <textarea type="text" id = "todo" className="todo-text" value={todo} onChange={onTodo}/>
            {todoError?<p className='filled-error'>* todo length should be minium 10</p>:null}
            <label style={{marginTop:10}}>Priority {star()}</label>
            <select value={priority} onChange={onPriority}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
            </select>
            <label htmlFor='content' style={{marginTop:10}}>Description {star()}</label>
            <textarea id = "content" value={description} className='todo-content' onChange={onDesciption}/>
            {contentError?<p className='filled-error'>* Content length should be minium 10</p>:null}
            {loading?onLoading():null}
            <button type="submit" style={{marginTop:10}} className='add-post-button'>Add Todo</button>
        </form>
    )

    useEffect(()=>{
        setTodo(location.state.todo)
        setDesciption(location.state.description)
        setPriority(location.state.priority)
    },[location.state.todo,location.state.description,location.state.priority])


    return(
    <>
        <Header/>
        <div className='wall'>
           {onRenderSuccess()}  
        </div>
    </>
    )
}

export default EditTodo