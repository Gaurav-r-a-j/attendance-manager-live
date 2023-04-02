import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { check, validationResult } from 'express-validator'
import User from '../models/User.js';






const authController = {
    // Login method
    login: [

        // Validate the request body
        // check('email').isEmail().withMessage('Please enter a valid email'),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        check('aadharNumber', 'Aadhar number must be 12 digits').isLength({ min: 12, max: 12 }),



        async (req, res) => {

            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }

            // console.log(req.body)
            try {
                // Find the user by aadharNumber
                const user = await User.findOne({ aadharNumber: req.body.aadharNumber });
                // console.log(user)
                if (!user) {
                    return res.status(401).json({ error: 'Invalid aadharNumber or password' });
                }

                // Check the password
                const isMatch = await bcrypt.compare(req.body.password, user.password);
                if (!isMatch) {
                    return res.status(401).json({ error: 'Invalid  or password' });
                }

                // Create a JWT
                const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
                    expiresIn: "365d" // 365 days 
                });

                // Send the JWT in the response
                res.status(200).json({
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        semester: user.semester,
                        section: user.section,
                        aadharNumber: user.aadharNumber,
                        role: user.role
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
        }
    ],

    // Signup Method
    signup: [
        // Validate the request body
        check('name').isLength({ min: 3 }).withMessage('Name must be at least 3 characters long'),
        // check('email').isEmail().withMessage('Please enter a valid email'),
        check('aadharNumber', 'Aadhar number must be 12 digits').isLength({ min: 12, max: 12 }),
        check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
        async (req, res) => {
            console.log(req.body)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(404).json({ errors: errors.array() });
            }

            // console.log(req.body)

            try {
                console.log('req')
                // Check if the email is already in use
                const existingUserByaadharNumber = await User.findOne({ aadharNumber: req.body.aadharNumber });
                if (existingUserByaadharNumber) {
                    return res.status(409).json({ error: 'Aadhar Number is already in use' });
                }


                // Hash the password
                const hashedPassword = await bcrypt.hash(req.body.password, 10);

                // Create a new user
                const newUser = new User({
                    name: req.body.name,
                    section: req.body.section,
                    semester: req.body.semester,
                    aadharNumber: req.body.aadharNumber,
                    password: hashedPassword,
                    role: req.body.role
                });

                // Save the new user
                const savedUser = await newUser.save();

                // Create a JWT
                const token = jwt.sign({ id: savedUser._id, role: savedUser.role }, process.env.JWT_SECRET, {
                    expiresIn: "365d" // 10 day
                });

                // Send the JWT in the response
                res.status(201).json({
                    token: token,
                    user: {
                        id: savedUser._id,
                        name: savedUser.name,
                        semester: savedUser.semester,
                        section: savedUser.section,
                        aadharNumber: savedUser.aadharNumber,
                        role: savedUser.role
                    }
                });
            } catch (error) {
                console.log(error);
                res.status(500).json({ error: 'Server error' });
            }
        }
    ]



    ,




    authUser: async (req, res) => {
        try {
            // Find the user with the matching id
            // console.log(req)

            const user = await User.findById(req.user.id).select(` -password -createdAt -updatedAt `);
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while retrieving the user' });
        }
    },



};

export default authController;

