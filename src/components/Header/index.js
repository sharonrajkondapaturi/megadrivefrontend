import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
const Header = ()=>{
    const navigate = useNavigate()
    const onLogout = ()=>{
        Cookies.remove('jwt_token')
        navigate('/login')
    }

    return(
    <header className='navLink'>
    <nav className="link-rows">
    <li className='nav-option'><a className='anchor-option' href="/todos">user todos</a></li>
        <li className='nav-option'><a className='anchor-option' href="/newTodo">newTodo</a></li>
        <li className='nav-option'><a className='anchor-option' href="/userdetails">userDetails</a></li>
        <li className='nav-option' onClick={onLogout}><a className='anchor-option'>logout</a></li>
    </nav>
    </header>
    )
}

export default Header
