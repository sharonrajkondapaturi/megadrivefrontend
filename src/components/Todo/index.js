import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'
import Header from '../Header'
import TodoList from "../TodoList"
import {ThreeDots} from 'react-loader-spinner'
import './index.css'

//check the status of the Api
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const Todo = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [todoDetails,setTodoDetails] = useState([])
    const navigate = useNavigate()

    const onRender = async()=>{
        setApiStatus(apiStatus.loading)
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const todoApiUrl = `https://megadrivetodobackend.onrender.com/todos`
        try{
            const response = await axios.get(todoApiUrl,config)
            console.log(response)
            const responseDetails = response.data.map(eachResponse=>({
                id:eachResponse.id,
                userId:eachResponse.user_id,
                todo:eachResponse.todo,
                description:eachResponse.description,
                priority:eachResponse.priority,
                status:eachResponse.status
            }))
            setTodoDetails(responseDetails)
            setApiStatus(apiStatus.success)
        }
        catch(error){
            setApiStatus(apiStatus.failure)
        }
    }

    const onRenderLoading = ()=>(
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )

    const triggered = ()=>{
        onRender()
    }

    const onRenderSuccess = ()=>{
        const todoLength = todoDetails.length 
        return(
            <div>
                {todoLength !== 0 ?
                <ul className='todo-list'>{
                todoDetails.map(eachTodo=> 
                    <TodoList key={eachTodo.id} todos={eachTodo} onRender={triggered}/>
                )    
                }</ul>:<h1>No current Todo List</h1>}
            </div>
        )
    }

    const onRenderStatus = ()=>{
        switch(currentApiStatus){
            case apiStatus.loading:
                return onRenderLoading()
            case apiStatus.success:
                return onRenderSuccess()
            default:
                return null
        }
    }

    useEffect(()=>{
        onRender()
    },[])

    
    return(
        <div>
            <Header/>
            <div className='todo-container'>
                    {onRenderStatus()}
            </div>
        </div>
    )
}

export default Todo