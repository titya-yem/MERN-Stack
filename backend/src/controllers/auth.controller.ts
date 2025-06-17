import { compare } from 'bcrypt';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import User from '../models/user.model.js';

// User login
export const loginUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        const isMatchPassword = await compare(password, user.password)
        if (!isMatchPassword) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Get JWT secret
        const secret = process.env.JWT_SECRET
        if (!secret) {
            return res.status(500).json({ message: 'JWT secret is not set' })
        }

        const payload = _.pick(user, ["_id", "email", "role"])
        const token = jwt.sign(payload, secret, { expiresIn: '7h' })

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 1000 * 60 * 60 * 24 * 7,
        })
        
        res.status(200).json({ message: 'Login successful', token })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: process.env.NODE_ENV === "production" ? "Server error" : "Failed to login user",
        })
    }
}

// User logout
export const logoutUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        // clear cookie
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        })

        res.status(200).json({ message: "Logout successful" })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: process.env.NODE_ENV === "production" && error instanceof Error ? error.message : "Failed to logout user"
        })
    }
}