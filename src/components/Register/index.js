import {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {FidgetSpinner} from 'react-loader-spinner'
import axios from 'axios'
import './index.css'

//used to register for the new user
const Register = ()=>{
    const [username,setname] = useState('')
    const [email,setEmail] = useState('')
    const [password,setpassword] = useState('')
    const [confirmPassword,setconfirm] = useState('')
    const [error,setError] = useState('')
    const [passwordError,setPassError] = useState(false)
    const [confirmError,setConfirmError] = useState(false)
    const [userError,setuserError] = useState(false)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
  
   
    //after submitting it validates the new user credentials
    const onCredentials = async(event) =>{
        event.preventDefault()
        const userDetails = {
            username,password,email
        }
        setError('')
        setLoading(prevState => !prevState)
        //if the password and confirm password is same it will fetch the data
        if(username.length < 4 && password.length < 8 && confirmPassword.length < 8){
            setLoading(prevState => !prevState)
            setuserError(true)
            setPassError(true)
            setConfirmError(true)
            setError('')
        }
        else if(username.length < 4 && password.length < 8 && confirmPassword.length >= 8){
            setLoading(prevState => !prevState)
            setuserError(true)
            setPassError(true)
            setConfirmError(false)
            setError('')
        }
        else if(username.length < 4 && confirmPassword.length < 8 && password.length >= 8){
            setLoading(prevState => !prevState)
            setuserError(true)
            setPassError(false)
            setConfirmError(true)
            setError('')
        }
        else if(username.length < 4){
            setLoading(prevState => !prevState)
            setuserError(true)
            setPassError(false)
            setConfirmError(false)
            setError('')
        }
        else if(password === '' && confirmPassword === ''){
            setLoading(prevState => !prevState)
            setuserError(false)
            setPassError(true)
            setConfirmError(true)
            setError('')
        }
        else if(confirmPassword.length < 8 && password.length < 8){
            setLoading(prevState => !prevState)
            setuserError(false)
            setPassError(true)
            setConfirmError(true)
            setError('')
        }
        else if(password.length < 8 && confirmPassword.length >= 8){
            setLoading(prevState => !prevState)
            setuserError(false)
            setPassError(true)
            setConfirmError(false)
            setError('')
        }
        else if(confirmPassword.length < 8 && password.length >= 8){
            setLoading(prevState => !prevState)
            setuserError(false)
            setPassError(false)
            setConfirmError(true)
            setError('')
        }
        //if the password and confirm password is same it will fetch the data
        else if(password.length >= 8 && confirmPassword.length >= 8){
            if(password === confirmPassword){
                //try method will fetch the data if the username is not present in user Database
                try{
                    setError('')
                    setuserError(false)
                    setConfirmError(false)
                    setPassError(false)
                    const loginUrl = "https://megadrivetodobackend.onrender.com/register"
                    await axios.post(loginUrl,userDetails)
                    navigate('/login')
                }
                //catch occurs when the username is already present in the dataBase and errorMessage occurs
                catch{
                    setLoading(prevState => !prevState)
                    setError("User already exists")
                    setuserError(false)
                    setPassError(false)
                    setConfirmError(false)
                }
            }
            //if the password is not Match errorMessage occurs
            else{
                setLoading(prevState => !prevState)
                setPassError(false)
                setuserError(false)
                setConfirmError(false)
                setError("password is not matched")
            }  
        } 
    else{
        setLoading(prevState => !prevState)
        setuserError(false)
        setPassError(true)
    }
    }

    //credentials of user,password,confirmPassword where user enters in input area
    const onUser = event =>{
            setname(event.target.value)
            setuserError(false)
            setError('')
        }

    const onEmail = (event)=>{
            setEmail(event.target.value)
            setError('')
        }
    
        const onPassword = event =>{
            setpassword(event.target.value)
            setPassError(false)
            setError('')
        }
    
        const onConfirm = event =>{
            setconfirm(event.target.value)
            setConfirmError(false)
            setError('')
        }
    
        const onLoading = ()=>(
            <center style={{marginTop:10,marginBottom:10}}>
                <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
            </center>
        )

        const star = () => (
            <span style={{color:"#ed154f",fontWeight:"bolder"}}>*</span>
        )
    
    return(
        <div>
        <div className='register-container'>
        <div className='register-background'>
            <img src="https://c0.wallpaperflare.com/preview/34/705/139/tasks-plan-target-list.jpg" alt="login" className='register-img'/>
            <form className="register-form" onSubmit={onCredentials}>
                <h1 className='register-head'>Sign Up</h1>
                <label className='title' htmlFor='username'>Username {star()}</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username} className='register-input'/>
                {userError?<p className='register-error'>* username length should be minium 4</p>:null}
                <label className='title' htmlFor='email'>Email</label>
                <input id="username" type="email" placeholder="Enter Email" onChange={onEmail} value={email} className='login-input'/>
                <label className='title' htmlFor='password'>password {star()}</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='register-input'/>
                {passwordError?<p className='register-error'>* password length should be minimum 8</p>:null}
                <label className='title' htmlFor='confirmpassword'>Confirm Password {star()}</label>
                <input id = "confirmpassword" type="password" placeholder='Enter password' onChange={onConfirm} value={confirmPassword} className='register-input'/>
                {confirmError?<p className='register-error'>* password length should be minimum 8</p>:null}
                {loading?onLoading():null}
                <center>
                <button className="register-button" type="submit">Confirm</button>
                </center>
                {error===''?null:<p className='error'>{error}</p>}
                <Link to="/login" className='blink'>Already an user?</Link>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Register