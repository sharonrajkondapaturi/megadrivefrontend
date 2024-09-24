import {useState,useEffect} from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import {ThreeDots} from 'react-loader-spinner'

//check the status of the Api
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}

const todo = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [todoDetails,setTodoDetails] = useState([])

    const onRender = ()=>{
        setApiStatus(apiStatus.loading)
        const jwtToken = Cookies.get('jwt_token')
        const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
        }
        const todoApiUrl = `https://megadrivetodobackend.onrender.com/todos`
        try{
            const response = axios.get(todoApiUrl,config)
            const responseDetails = response.data.map(eachResponse=>({
                id:eachResponse.id,
                userId:eachResponse.user_id,
                todo:eachResponse.todo,
                description:eachResponse.description,
                priority:eachResponse.priority
            }))
            setTodoDetails(responseDetails)
            setApiStatus(apiStatus.success)
        }
        catch{
            setApiStatus(apiStatus.failure)
        }
    }

    const onRenderLoading = ()=>(
        <center style={{marginTop:100}}>
            <ThreeDots visible={true} height="80" width="80"/>
        </center>
    )

    const onRenderSuccess = ()=>{
        const todoLength = todoDetails.length 
        return(
            <div>
                {todoLength !== 0 ? <ul>{
                todoDetails.map(eachTodo=> 
                    <TodoList key={eachTodo.id} todos={eachTodo}/>
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
            <header>
                <nav>
                    <li><a>userDetails</a></li>
                    <li><a>logout</a></li>
                </nav>
                <div>
                    {onRenderStatus()}
                </div>
            </header>
        </div>
    )
}

export default todo