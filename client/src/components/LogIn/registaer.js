import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { create } from '../Network/Ajax';

function LogIn() {

    const { register, handleSubmit, errors } = useForm();

    const location = useHistory()

    const onSubmit = (data) => {
        create('users/register', data)
            .then(res => { location.push('/') })
            .catch(console.error)

    };

    return (
        <div className='enteryForm' >
            <div class="container">
                <div class="d-flex justify-content-center h-100">
                    <div class="card">
                        <div class="card-header">
                            <h3>Sign Up</h3>
                        </div>
                        <div class="card-body">
                            <form onSubmit={handleSubmit(onSubmit)} >
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input name="name" type='text' placeholder='name..' ref={register({ required: true })} class="form-control" />
                                    {errors.name && 'Password is required.'}
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-user"></i></span>
                                    </div>
                                    <input name="email" type='email' class="form-control" placeholder='email..' ref={register({ required: true, pattern: /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ })} />
                                    {errors.email && 'Email is required.'}
                                </div>
                                <div class="input-group form-group">
                                    <div class="input-group-prepend">
                                        <span class="input-group-text"><i class="fas fa-key"></i></span>
                                    </div>
                                    <input name="password" type='password' class="form-control" placeholder='password' ref={register({ required: true, pattern: /\d+/ })} />
                                    {errors.password && 'Password is required.'}
                                </div>
                                <div class="row align-items-center remember">
                                    <input type="checkbox" name="remember_token" ref={register()} />Remember Me
                    </div>
                                <div class="form-group">
                                    <input type="submit" value="Sign Up" class="btn float-right login_btn" />
                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <div class="d-flex justify-content-center links">
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
