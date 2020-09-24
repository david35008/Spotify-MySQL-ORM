import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { create } from '../Network/Ajax';

function LogIn() {

    const { register, handleSubmit, errors } = useForm();

    const location = useHistory()

    const onSubmit = (data) => {
        create('users/register', data)
            .then(res => { 
                console.log(res);
                location.push('/') 
            }
                )
            .catch(console.error)

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
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input name="name" type='text' placeholder='name..' ref={register({ required: true })} className="form-control" />
                                    {errors.name && 'Password is required.'}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-user"></i></span>
                                    </div>
                                    <input name="email" type='email' className="form-control" placeholder='email..' ref={register({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                                    {errors.email && 'Email is required.'}
                                </div>
                                <div className="input-group form-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text"><i className="fas fa-key"></i></span>
                                    </div>
                                    <input name="password" type='password' className="form-control" placeholder='password' ref={register({ required: true, pattern: /\d+/ })} />
                                    {errors.password && 'Password is required.'}
                                </div>
                                <div className="row align-items-center remember">
                                    <input type="checkbox" name="rememberToken" ref={register()} />Remember Me
                    </div>
                                <div className="form-group">
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
