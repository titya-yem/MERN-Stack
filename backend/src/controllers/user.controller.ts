import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import _ from 'lodash';
import User from '../models/user.model';
import userValidation from '../validations/user.validation';

// Create a new user
export const createUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { error, value } = userValidation.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const existingUser = await User.findOne({ email: value.email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(value.password, 10);
        const newUser = new User({ ...value, password: hashedPassword });

        await newUser.save();
        const userResponse = _.omit(newUser.toObject(), ["password", "__v", "role"]);

        res.status(201).json(userResponse);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create user' });
    }
};

// Get all users
export const getAllUsers = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const users = await User.find().select("-password -__v");
        
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(500).send("Failed to get users");
    }
}

// Update user
export const updateUser = async (req: Request, res: Response): Promise<void | any> => {
  try {
    const { id } = req.params;
    const { error, value } = userValidation.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    if (!id) {
      return res.status(400).json({ message: "User id is required" });
    }

    const existingUser = await User.findById(id);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // If email is present in update and changed, check uniqueness
    if (value.email && value.email !== existingUser.email) {
      const emailExists = await User.findOne({ email: value.email, _id: { $ne: id } });
      if (emailExists) {
        return res.status(400).json({ message: "Email already in use by another user" });
      }
    }

    // If password is present, hash it before update
    if (value.password) {
      const saltRounds = 10;
      value.password = await bcrypt.hash(value.password, saltRounds);
    }

    // Only update the fields provided (partial update)
    const updatedUser = await User.findByIdAndUpdate(id, value, { new: true });

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// Delete a user
export const deleteUser = async (req: Request, res: Response): Promise<void | any> => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({ message: "User id is required" });
        }
        
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: "User not found" });   
        }

        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to delete user" });
    }
}