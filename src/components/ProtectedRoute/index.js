import {Outlet,Navigate} from 'react-router-dom'
import Cookies from 'js-cookie'

//Protect Route is used in order to route the home page if the user logs in otherwise it redirect to Login page
//By using jwt-token it will checks the condition
const ProtectedRoute = ()=>{
    const token = Cookies.get('jwt_token')
    return token === undefined?<Navigate to="/login"/>:<Outlet/>
}

export default ProtectedRoute