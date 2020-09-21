import React, { useState,useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { create } from '../Network/Ajax';
import { Logged } from '../Services/Aouthorizetion';
import { useCookies } from 'react-cookie';
import './forms.css';
import { Modal } from 'react-bootstrap';
import Hilarious from '../../images/Hilarious.gif'

function LogIn() {
    const { register: logIn, handleSubmit, errors } = useForm();

    const [cookies, setCookie] = useCookies();

    const value = useContext(Logged);

    const onSubmit = (data) => {
        console.log(data);
        create('users/logIn', data)
            .then(res => {
                setCookie('name', res.name)
                setCookie('token', res.token)
                value.setIsLogged(true);
            })
            .catch(console.error)
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
                <img src={Hilarious}  width='450px' />
                </Modal.Body>
            </Modal>
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header">
                            <h3>Sign In</h3>
                            <div class="d-flex justify-content-end social_icon">
                                <span><i class="fab fa-facebook-square"></i></span>
                                <span><i class="fab fa-google-plus-square"></i></span>
                                <span><i class="fab fa-twitter-square"></i></span>
                            </div>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input name="email" type='email' class="form-control" placeholder='email..' ref={logIn({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                                    {errors.email && 'Email is required.'}
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input name="password" type='password' class="form-control" placeholder='password' ref={logIn({ required: true, pattern: /\d+/ })} />
                                    <div>  {errors.password && 'Password is required.'}</div>
                                </div>
                                <div class="row align-items-center remember">
                                    <input name="remember_token" type="checkbox" ref={logIn()} />Remember Me
                        </div>
                                <div class="form-group">
                                    <input type="submit" value="Login" class="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center links">
                                Don't have an account? <Link to={'/register'}><div>Sign Up</div></Link>
                            </div>
                            <div class="d-flex justify-content-center">
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
