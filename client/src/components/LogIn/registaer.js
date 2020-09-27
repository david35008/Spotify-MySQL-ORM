import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { create } from '../Network/Ajax';
import userName from '../../images/userName.png';
import admin from '../../images/admin.png';

function LogIn() {

    const { register, handleSubmit, errors } = useForm();
    const [error, setError] = useState(<span></span>)

    const location = useHistory()

    const onSubmit = (data) => {
        create('users/register', data)
            .then(res => {
                location.push('/')
            }
            )
            .catch(e => {
                setError(e.message)
                console.error(e.message)
            })

    };

    return (
        <div className='enteryForm' >
            <div className="container">
                <div className="d-flex justify-content-center h-100">
                    <div className="card">
                        <div className="card-header">
                            <h3>Sign Up</h3>
                        </div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><img src={userName} height='24px' alt='user' className="fas fa-user" /></span>
                                    </div>
                                    <input name="name" type='text' placeholder='name..' ref={register({ required: true })} className="form-control" />
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key email" >@</i></span>
                                    </div>
                                    <input name="email" type='email' className="form-control" placeholder='email..' ref={register({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />

                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><img src={admin} height='24px' alt='user' className="fas fa-user negetiveColor" /></span>
                                    </div>
                                    <input name="password" type='password' className="form-control" placeholder='password' ref={register({ required: true, pattern: /\d+/ })} />

                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" name="rememberToken" ref={register()} />Remember Me
                    </div>
                                <div className="form-group">
                                    {error} {errors.name && 'name is required.'} {errors.email && 'Email is required.'} {errors.password && 'Password is required.'}
                                    <input type="submit" value="Sign Up" className="btn float-right loginBtn" />
                                </div>
                            </form>
                        </div>
                        <div className="card-footer">
                            <div className="d-flex justify-content-center links">
                                Already have an account? <Link to={'/'}><div>Sign In</div></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LogIn;
