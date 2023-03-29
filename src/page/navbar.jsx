import {Link} from "react-router-dom";
import User_context from "../User_context";
import {useContext, useEffect, useState} from "react";
import {backend_url} from "../url";

export default function Navbar() {
    const [userLogin, setLogin] = useContext(User_context)

    function admin_login(e) {
        e.preventDefault()
        if(userLogin===false) {
            fetch(`${backend_url}/admin/login`, {
                method: 'post', mode: 'cors', credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    email: document.querySelector('#email').value,
                    password: document.querySelector('#password').value,
                })
            })
                .then(res => res.json()).then(data => {
                localStorage.setItem('admin', true)
                console.log(data)
                setLogin(data.isAdmin)
                window.location.reload() // load lại page
            })
            return
        }
        if(userLogin===true){
            fetch(`${backend_url}/admin/signout`, {
                method: 'get', mode: 'cors', credentials: 'include',
                headers: {'Content-Type': 'application/json'}
            })
                .then(res => res.json()).then(data => {
                localStorage.setItem('admin', false)
                console.log(data)
                setLogin(data.isAdmin)
                window.location.reload() // load lại page
            })
            return
        }
    }

    useEffect(() => {

        if (localStorage.getItem('admin')==='true') setLogin(true)
        else setLogin(false)
            }, [])
    return <nav>
        <ul className="nav flex-column text-bg-light p-3" style={{padding: '1em', width: '13em'}}>
            <h3 style={{textAlign: 'center',}}>Admin Page</h3>
            <small>Main</small>
            <Link to='/' style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-tachometer" aria-hidden="true"></i>
                <span>Dash Board</span>
            </Link>
            <small>List</small>

            <Link to='/hotel' style={{display: 'flex', gap : '0.5em', padding: '0.5em'}}>
                <i className="fa fa-building" aria-hidden="true"></i>
                <span>Hotel</span>
            </Link>
            <Link to='/room' style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-bed" aria-hidden="true"></i>
                <span>Room</span>
            </Link>
            <Link to='/transaction' style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-money" aria-hidden="true"></i>
                <span>Transaction</span>
            </Link>
            <small>New</small>
            <Link to='/hotel_new' style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-building" aria-hidden="true"></i>
                <span>New Hotel</span>
            </Link>
            <Link to='/room_new' style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-bed" aria-hidden="true"></i>
                <span>New Room</span>
            </Link>
            <small>User</small>
            <Link style={{display: 'flex', gap: '0.5em', padding: '0.5em'}}>
                <i className="fa fa-sign-out" aria-hidden="true"></i>
                <span onClick={admin_login}>{userLogin ? 'Sign out' : 'Sign in'}</span>
            </Link>

            <form>
                <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className="form-control" id="email" aria-describedby="emailHelp"/>
                    <label>Password</label>
                    <input type="password" className="form-control" id="password"/>
                </div>

            </form>
        </ul>

    </nav>
}
