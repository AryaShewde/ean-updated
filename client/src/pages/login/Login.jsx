import { useContext, useRef, useState } from 'react'
import "./login.css"
import { Link } from 'react-router-dom'
import { Context } from '../../context/Context';
import axios from 'axios';

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const [success, setSuccess] = useState(false);
    const { dispatch } = useContext(Context)

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({
            type: "LOGIN_START"
        });
        try {

            
            const res = await axios.post('https://eventsandnewsapi.onrender.com/api/auth/login', {
                username: userRef.current.value,
                password: passwordRef.current.value,
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            window.location.replace("/");
        } catch (error) {
            dispatch({ type: "LOGIN_FAILURE" });
            setSuccess(true);
        }
    };
    return (
        <>
            <div className='login'>
                <span className="loginTitle">Login</span>
                <form className='loginForm' onSubmit={handleSubmit}>
                    <label>Username</label>
                    <input type="text" className='loginInput' placeholder='Enter your username...' ref={userRef} required/>
                    <label>Password</label>
                    <input type="password" className='loginInput' placeholder='Enter your password...' ref={passwordRef} required/>
                    <button className='loginButton' type="submit">Login</button>
                </form>
                <button type='submit' className='loginRegisterButton'>
                    <Link to="/register" style={{ textDecoration: "none", color: "inherit" }}>Register</Link>
                </button>
                {success && <span style={{ color: "red" }}>Invalid Credentials. Try Again</span>}
            </div>
        </>
    )
}

export default Login