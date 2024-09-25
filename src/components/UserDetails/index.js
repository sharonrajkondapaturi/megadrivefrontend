import {useState,useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {ThreeDots} from 'react-loader-spinner'
import { MdModeEdit, MdOutlineDoneOutline  } from "react-icons/md";
import Cookies from 'js-cookie'
import axios from 'axios'
import Header from '../Header'
import './index.css'

//check the status of the Api
const apiStatus = {
    initial:"INITIAL",
    loading:"LOADING",
    success:"SUCCESS",
    failure:"FAILURE"
}
const UserDetails = ()=>{
    const [currentApiStatus,setApiStatus] = useState(apiStatus.initial)
    const [toggleUser,setToggleUser] = useState(false)
    const [togglePassword,setTogglePassword] = useState(false)
    const [toggleEmail,setToggleEmail] = useState(false)
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
    const [userDetails,setDetails] = useState([])
    const jwtToken = Cookies.get('jwt_token')
    const config = {
            headers: {Authorization:`Bearer ${jwtToken}`}
    }
    const navigate = useNavigate()

    const onRender= async()=>{
        setApiStatus(apiStatus.loading)
        const userApiUrl = `https://megadrivetodobackend.onrender.com/getuser`
        try{
            const response = await axios.get(userApiUrl,config)
            setDetails(...response.data)
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

    const onEdit = ()=>{
        setToggleEmail(false)
        setTogglePassword(false)
        setToggleUser(false)
    }
    const onEditUser = ()=>{
        setToggleUser(prevState=> !prevState)
    }

    const onEditPassword = ()=>{
        setTogglePassword(prevState=> !prevState)
    }

    const onEditEmail = ()=>{
        setToggleEmail(prevState=> !prevState)
    }

    const onSubmitUser = async()=>{
        console.log(userDetails.id)
        const userEditApiUrl = `https://megadrivetodobackend.onrender.com/edituser/${userDetails.id}`
        const tempData = {
            username:username
        }
        await axios.put(userEditApiUrl,tempData,config)
        onRender()
        setToggleUser(false)
    }

    const onSubmitPassword = async()=>{
        const userEditApiUrl = `https://megadrivetodobackend.onrender.com/editpassword/${userDetails.id}`
        const tempData = {
            password:password,
        }
        await axios.put(userEditApiUrl,tempData,config)
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    const onSubmitEmail = async()=>{
        const userEditApiUrl = `https://megadrivetodobackend.onrender.com/editemail/${userDetails.id}`
        const tempData = {
            email:email,
        }
        await axios.put(userEditApiUrl,tempData,config)
        onRender()
        setToggleEmail(false)
    }

    const onUser = (event)=>{
        setUsername(event.target.value)
    }

    const onPassword = (event)=>{
        setPassword(event.target.value)
    }

    const onEmail = (event)=>{
        setEmail(event.target.value)
    }

    const onDelete = ()=>{
        const deleteApiUrl = `https://megadrivetodobackend.onrender.com/deleteuser/${userDetails.id}`
        axios.delete(deleteApiUrl,config)
        navigate('/login')
    }

    const onRenderSuccess = ()=>(
        <center>
        <ul className='user-container'>
            {toggleUser?<li className='user-list'>Username: <input type="text" value={username} onChange={onUser}/> <button  className="new-buttons" type="button" onClick={onSubmitUser}><MdOutlineDoneOutline/></button></li>
            :<li className='user-list'>Username: {userDetails.username} <button className="edit-buttons" type="button" onClick={onEditUser}><MdModeEdit/></button></li>}
            {togglePassword?<li className='user-list'>Password: <input type="password" value={password} onChange={onPassword}/> <button  className="new-buttons" type="button" onClick={onSubmitPassword}><MdOutlineDoneOutline/></button></li>
            :<li className='user-list'>Password: **** <button className="edit-buttons" type="button" onClick={onEditPassword}><MdModeEdit /></button></li>}
            {toggleEmail?<li className='user-list'>Email: <input type="email" value={email} onChange={onEmail}/> <button  className="new-buttons" type="button" onClick={onSubmitEmail}><MdOutlineDoneOutline/></button></li>
            :<li className='user-list'>Email: {userDetails.email} <button className="edit-buttons" type="button" onClick={onEditEmail}><MdModeEdit /></button></li>}
            <div>
                <button  className="new-buttons" onClick={onEdit} type="cancel">Cancel</button>
                <button  className="new-buttons" type="button" onClick={onDelete}>delete</button>
            </div>
        </ul>
        </center>
        
    )

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
        <>
        <Header/>
        {onRenderStatus()}
        </>
    )
}

export default UserDetails