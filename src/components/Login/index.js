import {useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FidgetSpinner} from 'react-loader-spinner'
import axios from 'axios'
import './index.css'

//used to login with correct credentials
const Login = ()=>{
    const [username,setname] = useState('')
    const [password,setpassword] = useState('')
    const [error,setError] = useState('')
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()

    //below were triggered when the user enter the credentials
    const onUser = (event)=>{
        setname(event.target.value)
        setError('')
    }
    const onPassword = (event)=>{
        setpassword(event.target.value)
        setError('')
    }

    
    //credentials were matched it will redirect to posts page
    const onSuccess = jwtToken =>{
        Cookies.set('jwt_token',jwtToken,{expires:30})
        localStorage.setItem("username",username)
        navigate('/todos')
    }
   
    //verify the user when the click login
    const onVerify = async(event)=>{
        event.preventDefault()
        const userDetails = {
            username,password
        }
        setError('')
        setLoading(prevState=>!prevState)
        //if the credential were right it will go to try state or else catch before it checks user and password conditions
        if(username === '' && password === ''){
            setError('* Credentials were missing')
            setLoading(prevState => !prevState)
        }
        else if(username === ''){
            setLoading(prevState => !prevState)
            setError('* username is missing')
        }
        else if(password === ''){
            setLoading(prevState => !prevState)
            setError('* password is missing')
        }
        else{
            try{
                const loginApiUrl = `https://megadrivetodobackend.onrender.com/login`
                const response = await axios.post(loginApiUrl,userDetails)
                setLoading(prevState => !prevState)
                setError('')
                onSuccess(response.data.jwtToken)
            }
            catch{
                setLoading(prevState => !prevState)
                setError("Invalid username or password")
                setname('')
                setpassword('')
            }
        }
        
    }

    //loading the data 
    const onLoading = ()=>(
        <center style={{marginTop:10,marginBottom:10}}>
            <FidgetSpinner visible={true} height="30" width="30" ariaLabel="fidget-spinner-loading" wrapperStyle={{}} wrapperClass="fidget-spinner-wrapper"/>
        </center>
    )

    //aestrik mark
    const star = () => (
        <span style={{color:"#ed154f",fontWeight:'bolder'}}>*</span>
    )

    return(
        <div>
        <div className='login-container'>
        <div className='login-background'>
            <img src="https://wallpapercave.com/wp/wp7881177.jpg" alt="login" className='login-img'/>
            <form className="login-form" onSubmit={onVerify}>
                <h1 className='login-head'>Login</h1>
                <label className='title' htmlFor='username'>Username {star()}</label>
                <input id="username" type="text" placeholder="Enter username" onChange={onUser} value={username} className='login-input'/>
                <label className='title' htmlFor='password'>password {star()}</label>
                <input id = "password" type="password" placeholder='Enter password' onChange={onPassword} value={password} className='login-input'/>
                {loading?onLoading():null}
                <center>
                {error===''?null:<p className='error'>{error}</p>}
                <button className="login-button" type="submit">Login</button>
                </center>
                <Link to="/signup" className='blink'>Are you a new user?</Link>
            </form>
        </div>
        </div>
        </div>
    )
}

export default Login