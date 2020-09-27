import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { create } from '../Network/Ajax';
import { Logged } from '../Services/useContextComp';
import './forms.css';
import { Modal } from 'react-bootstrap';
import Hilarious from '../../images/Hilarious.gif';
import userName from '../../images/userName.png';
import admin from '../../images/admin.png';

function LogIn() {
    const { register: logIn, handleSubmit, errors } = useForm();
    const [error, setError] =useState(<span></span>)
    const value = useContext(Logged);
    const onSubmit = (data) => {
        create('users/logIn', data)
            .then(res => {
                value.setIsLogged(true);
            })
            .catch(e=>{
                setError(e.message)
                console.error(e.message)})
    };
    const [openModal, setOpenModal] = useState(false);
    const handleClose = () => setOpenModal(false);

    return (
        <div className='enteryForm' >
            <Modal show={openModal} onHide={handleClose} onEscapeKeyDown={handleClose} backdrop="static" keyboard={false} className='modalForget' >
                <Modal.Header closeButton>
                    <Modal.Title>Ha Ha you Forgot Your Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={Hilarious} alt={' '} width='450px' />
                </Modal.Body>
            </Modal>
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign In</h3>
                            <div className="d-flex justify-content-end socialIcon">
                                <span><i className="fab fa-facebook-square"></i></span>
                                <span><i className="fab fa-google-plus-square"></i></span>
                                <span><i className="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><img src={userName} height='24px' alt='user' className="fas fa-user"/></span>
                                    </div>
                                    <input name="email" type='email' className="form-control" placeholder='email..' ref={logIn({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><img src={admin} height='24px' alt='user' className="fas fa-user negetiveColor"/></span>
                                    </div>
                                    <input name="password" type='password' className="form-control" placeholder='password' ref={logIn({ required: true, pattern: /\d+/ })} />
                                    
                                </div>
                                <div className="row align-items-center remember">
                                    <input name="rememberToken" type="checkbox" ref={logIn()} />Remember Me
                        </div>
                                <div className="form-group">
                                {errors.email && 'Email is required.'}<br/>
                                {errors.password && 'Password is required.'}
                                {error}
                                    <input type="submit" value="Login" className="btn float-right loginBtn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Don't have an account? <Link to={'/register'}><div>Sign Up</div></Link>
                            </div>
                            <div className="d-flex justify-content-center">
                                <div className='forgetPassword' onClick={() => setOpenModal(true)} >Forgot your password?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
