import React, { useState } from 'react'

const SignupForm = () => {


    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [formDetails, setFormDetails] = useState({
        name: '',
        // email: '',
        semester: '',
        section: '',
        aadharNumber: '',
        password: '',
        errors: {
            email: '',
            name: '',
            section: '',
            aadharNumber: '',
            password: '',
            semester: ''
        }
    });



    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    }

    const formatAadhar = (e) => {
        let { value } = e.target;
        if (e.keyCode !== 8) {
            console.log("if")
            if (value.length === 4 || value.length === 9 || value.length === 14) {
                value = value += ' ';
                console.log(value)

            }
        }

        setFormDetails({ ...formDetails, aadharNumber: value });
    }


    console.log(formDetails.aadharNumber)

    const handleChange = e => {
        const { name, value } = e.target;
        let errors = formDetails.errors;

        switch (name) {
            // case 'email':
            //     errors.email = value && !value.match(/^\S+@srmist\.edu\.in$/)
            //         ? 'Email must end in @srmist.edu.in'
            //         : '';
            //     break;
            case 'name':
                errors.name = value && !value.match(/^[a-zA-Z ]+$/)
                    ? 'Name can only contain letters and spaces'
                    : '';
                break;
            case 'section':
                errors.section = value && !value.match(/^[a-zA-Z0-9]+$/)
                    ? 'Section can only contain letters and numbers'
                    : '';
                break;
            case 'aadharNumber':

                errors.aadharNumber = value && !value.match(/^[0-9 ]{14}$/)
                    ? 'Aadhar number must be 12 digits'
                    : '';
                break;

            case 'password':
                errors.password = value && value.length < 8
                    ? 'Password must be at least 8 characters long'
                    : '';
                break;
            case 'year':
                errors.year = value && !value.match(/^[0-9]{4}$/)
                    ? 'Year must be a 4 digit number'
                    : '';
                break;
            case 'semester':
                errors.semester = value && !value.match(/^[0-9]{1, 2}$/)
                    ? 'Semester must be a number between 1 and 8'
                    : '';
                break;
            default:
                break;
        }

        setFormDetails({ ...formDetails, [name]: value, errors });
    };





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
        <form onSubmit={handleSubmit} className="form-container">
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
                <input
                    type="text"
                    id="aadharNumber"
                    name="aadharNumber"
                    value={formDetails.aadharNumber}
                    onChange={handleChange}
                    onKeyUp={formatAadhar}
                    required
                    pattern="(\d{4}\s?){4}"
                    maxLength={14}
                    placeholder="Aadhar Number"
                />

                {formDetails.errors.aadharNumber.length > 0 && (
                    <span className="error">{formDetails.errors.aadharNumber}</span>
                )}
            </div>


            <div className="d-flex-center gaps">

                <div className="form-inputs">
                    <input
                        type="text"
                        id="semester"
                        name="semester"
                        placeholder='semester'
                        value={formDetails.semester}
                        onChange={handleChange}
                        required
                    />
                    {formDetails.errors.semester.length > 0 && (
                        <span className="error">{formDetails.errors.semester}</span>
                    )}
                </div>

                <div className="form-inputs">
                    <input
                        type="text"
                        id="section"
                        name="section"
                        placeholder="section"
                        value={formDetails.section}
                        onChange={handleChange}
                        required
                    />
                    {formDetails.errors.section.length > 0 && (
                        <span className="error">{formDetails.errors.section}</span>
                    )}
                </div>
            </div>



            <div className="form-inputs">
                <div className="password-container">

                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        name="password"
                        id="password"
                        placeholder="password"
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


export default SignupForm