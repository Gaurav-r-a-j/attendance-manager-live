import React, { useState } from 'react';
import api from '../../axios';
import { useNotificationContext } from '../../context/NotificationContext';
import { useUserContext } from '../../context/UserContext';
import './Signup.css'



const intitalFormValue = {
    aadharNumber: '',
    password: '',
    errors: {
        aadharNumber: '',
        password: '',
    }
}


const Login = ({ isOpen, setIsModalOpen }) => {
    console.log(isOpen)

    // const intitalFormValue = {aadharNumber: '',
    // password: '',
    // errors: {
    //     aadharNumber: '',
    //     password: '',
    // }}

    const { dispatch } = useUserContext()
    const { showNotification } = useNotificationContext()
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formDetails, setFormDetails] = useState(intitalFormValue)

    isOpen ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"

    const closeModal = () => {
        setIsModalOpen(false);
    }

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    // const formatAadharNumber = (aadharNumber) => {
    //     return aadharNumber.replace(/(\d{4})/g, '$1 ').trim();
    // }


    // const handleBlur = e => {
    //     const { value } = e.target;
    //     let formattedValue = value.replace(/(\d{4})/g, '$1 ');
    //     setFormDetails({ ...formDetails, aadharNumber: formattedValue });
    // }


    // this is use to format addhar number in spaces
    // const formatAadhar = (e) => {
    //     let { value } = e.target;
    //     if (e.keyCode !== 8) {
    //         console.log("if")
    //         if (value.length === 4 || value.length === 9 || value.length === 14) {
    //             value = value += ' ';
    //             console.log(value)

    //         }
    //     }

    //     setFormDetails({ ...formDetails, aadharNumber: value });
    // }




    const handleChange = e => {
        const { name, value } = e.target;
        let errors = formDetails.errors;

        switch (name) {
            // case 'name':
            //     errors.name = value && !value.match(/^[a-zA-Z ]+$/)
            //         ? 'Name can only contain letters and spaces'
            //         : '';
            //     break;
            case 'aadharNumber':
                errors.aadharNumber = value && !value.match(/^[0-9 ]{12}$/)
                    ? 'Aadhar number must be 12 digits'
                    : '';
                break;

            case 'password':
                errors.password = value && value.length < 8
                    ? 'Password must be at least 8 characters long'
                    : '';
                break;

            default:
                break;
        }

        setFormDetails({ ...formDetails, [name]: value, errors });
    };





    //Simple Login
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm(formDetails.errors)) {
            console.log('Valid Form');
        } else {
            console.error('Invalid Form');
        }

        try {
            // const { data } = await api.post('https://qsearch.onrender.com/api/auth/login', form)
            const params = {
                aadharNumber: formDetails.aadharNumber,
                password: formDetails.password,
            }
            const { data } = await api.post('/auth/login', params)
            localStorage.setItem('token', JSON.stringify(data.token));
            dispatch({ type: 'UPDATE_USER', payload: data.user });
            showNotification('success', 'Login Success!', 2000, 'top', 'Login Success!');
            closeModal()
            setFormDetails(intitalFormValue);
        } catch (error) {
            console.log(error)
            showNotification('error', 'Login Failed!', 2000, 'top', 'Login Failed!');

        }

    }

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    return (

        <div>
            {isOpen && (
                <div
                    onClick={() => setIsModalOpen(false)}
                    className="modal ">
                    <div
                        onClick={(e) => {
                            e.stopPropagation()
                        }}
                        className="modal-content">
                        <span className="close-button" onClick={closeModal}>&times;</span>
                        <h2 className="modal-title">LOGIN</h2>
                        <div className="form-container">
                            <form onSubmit={handleSubmit} className="form-container">

                                {/* <div className="form-control">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        id='name'
                                        type="text"
                                        name="name"
                                        placeholder="name"
                                        value={formDetails.name}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formDetails.errors.name.length > 0 && (
                                        <span className="error">{formDetails.errors.name}</span>
                                    )}
                                </div> */}

                                <div className="form-control">
                                    <label htmlFor="aadharNumber">Aadhar Number</label>
                                    <input
                                        type="text"
                                        id="aadharNumber"
                                        name="aadharNumber"
                                        placeholder="aadhar number"
                                        value={formDetails?.aadharNumber}
                                        onChange={handleChange}
                                        required
                                    // onKeyUp={formatAadhar}
                                    // pattern="(\d{4}\s?){4}"
                                    // maxLength={14}
                                    />

                                    {formDetails?.errors?.aadharNumber?.length > 0 && (
                                        <span className="error">{formDetails?.errors?.aadharNumber}</span>
                                    )}
                                </div>


                                {/* 
                                <div className="form-control">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        type="email"
                                        name="email"
                                        value={formDetails.email}
                                        onChange={handleChange}
                                        required
                                    />
                                    {formDetails.errors.email.length > 0 && (
                                        <span className="error">{formDetails.errors.email}</span>
                                    )}
                                </div> */}






                                <div className="form-control">
                                    <label htmlFor="password">Password</label>
                                    <div className="password-container">

                                        <input
                                            type={isPasswordVisible ? 'text' : 'password'}
                                            name="password"
                                            placeholder="password"
                                            id="password"
                                            value={formDetails.password}
                                            onChange={handleChange}
                                        />
                                        {/* <button type="button" onClick={togglePasswordVisibility}></button> */}
                                        {(!isPasswordVisible) ?
                                            (
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="material-icons button">
                                                    visibility_off
                                                </span>
                                            )
                                            :
                                            (
                                                <span
                                                    onClick={togglePasswordVisibility}
                                                    className="material-icons button">
                                                    visibility
                                                </span>
                                            )
                                        }
                                    </div>
                                    {formDetails?.errors?.password.length > 0 && (
                                        <span className="error">{formDetails?.errors?.password}</span>
                                    )}
                                </div>

                                <div className="form-actions">
                                    <button type="submit" className='primary-button'>Submit</button>
                                    {/* <button disabled={true} type="button" className="secondary-button">Login With Google</button> */}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Login;


