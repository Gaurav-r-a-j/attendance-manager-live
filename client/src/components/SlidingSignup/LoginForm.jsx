import React, { useState } from 'react'

const LoginForm = () => {

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: '',
        password: '',
        errors: {
            name: '',
            password: '',
        }
    });



    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }



    const handleChange = e => {
        const { name, value } = e.target;
        let errors = formDetails.errors;

        switch (name) {
            case 'name':
                errors.name = value && !value.match(/^[a-zA-Z ]+$/)
                    ? 'Name can only contain letters and spaces'
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

    console.log(formDetails.password)
    console.log(formDetails.errors)





    // console.log(formDetails)

    const handleSubmit = e => {
        e.preventDefault();
        if (validateForm(formDetails.errors)) {
            console.log('Valid Form');
        } else {
            console.error('Invalid Form');
        }
    };

    const validateForm = errors => {
        let valid = true;
        Object.values(errors).forEach(val => val.length > 0 && (valid = false));
        return valid;
    };

    return (
        <form onSubmit={handleSubmit}>


            <div className="form-inputs">
                <input
                    id='name'
                    type="text"
                    name="name"
                    value={formDetails.name}
                    onChange={handleChange}
                    required
                    placeholder='username'
                />
                {formDetails.errors.name.length > 0 && (
                    <span className="error">{formDetails.errors.name}</span>
                )}
            </div>

            <div className="form-inputs">

                <div className="password-container d-flex-center ">

                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formDetails.password}
                        onChange={handleChange}
                        placeholder="password"
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
                {formDetails.errors.password.length > 0 && (
                    <span className="error">{formDetails.errors.password}</span>
                )}
            </div>


            <div className="form-actions">
                <button type="submit" className='primary-button'>Submit</button>
                {/* <button disabled={true} type="button" className="secondary-button">Login With Google</button> */}
            </div>
        </form>
    )
}


export default LoginForm