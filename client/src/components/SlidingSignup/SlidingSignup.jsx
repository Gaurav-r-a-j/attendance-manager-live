import React, {  } from 'react';
import LoginForm from './LoginForm';
import './Signup2.css'
import SignupForm from './SignupForm';

const SlidingSignup = ({ isOpen = true, setIsModalOpen }) => {


    isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"


    // const closeModal = () => {
    //     setIsModalOpen(false);
    // }



    const openSignup = () => {
        const container = document.getElementById('container');
        container.classList.add("right-panel-active");
    }
    const openSignin = () => {
        const container = document.getElementById('container');
        container.classList.remove("right-panel-active");
        console.log(container)

    }

    return (

        <div>
            {isOpen && (

                <div
                    onClick={() => setIsModalOpen(false)}
                    className="modal glassomorphism sliding-signup">


                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        className="container" id="container">
                        <div className="form-container sign-up-container">
                            <h1>Create Account</h1>

                            <SignupForm />




                        </div>
                        <div className="form-container sign-in-container">
                            <h1>Sign in</h1>


                            <LoginForm />


                        </div>



                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button
                                        onClick={openSignin}
                                        className="ghost" id="signIn">
                                        Sign In
                                    </button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your personal details and start journey with us</p>
                                    <button
                                        onClick={openSignup}
                                        className="ghost" id="signUp">
                                        Sign Up
                                    </button>
                                </div>
                            </div>
                        </div>



                    </div>
                </div>


            )}
        </div>
    );
};






export default SlidingSignup