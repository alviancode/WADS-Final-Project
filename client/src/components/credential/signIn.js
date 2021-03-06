import React, { useState, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signIn.css';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '../../App';

/*
Reference template
https://jsfiddle.net/e0tbqp9L/1/
*/

// sign in function to connect with backend.
const SignIn = () => {
    const { state, dispatch } = useContext(UserContext);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const history = useHistory();

    // Fetch '/signin' from backend
    const postData = () => {
        fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            // Send email and password as request body.
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => res.json())
            .then(data => {
                if (data.error) {
                    // show alert if backend return error.
                    alert(data.error);
                } else {
                    // If backend return code 200, it will save jwt and user to local storage.
                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    dispatch({ type: "USER", payload: data.user });
                    // Next, it will go to the home page.
                    history.push("/");
                }
            }).catch(err => {
                console.log(err);
                alert("Oops! Something went wrong.");
            });
    }

    // This is the 'HTML' part for sign in page.
    return (
        <div className='signIn'>
            <div className="container">
                <div className="row">
                    <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                        <div className="card card-signin my-5 bg-dark text-white">
                            <div className="card-body">
                                <div className="d-flex justify-content-center mb-5">
                                    <img src='https://res.cloudinary.com/redgram/image/upload/v1621665209/Untitled-2_c9icpj.png' height="80" />
                                </div>
                                <div className="form-label-group">
                                    <input type="email" id="inputEmail"
                                        value={email} onChange={(e) => setEmail(e.target.value)}
                                        className="form-control" placeholder="Email address" />
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>

                                <div className="form-label-group">
                                    <input type="password" id="inputPassword"
                                        value={password} onChange={(e) => setPassword(e.target.value)}
                                        className="form-control" placeholder="Password" />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>

                                <div className="d-flex justify-content-center flex-column">
                                    <button className="btn btn-lg btn-outline-light text-uppercase form-btn"
                                        onClick={() => postData()}>Sign in</button>
                                    <Link to='signup' className="text-center mt-3 text-white">Don't have an account?</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignIn;