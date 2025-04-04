import { Request, Response } from "express";
import userModel, { User } from "../../models/user";
import { validateUser } from "../../utils/zod";
import { generateToken } from "../../utils/token";
import { comparePassword, hashPassword } from "../../utils/password";

export async function signupHandler(req: Request, res: Response) {
  const payload: User = req.body;

  try {
    const result = validateUser(payload);
    if (!result.success) {
      res.status(400).json({
        status: false,
        message: result.error.issues[0].message,
      });
      return;
    }

    const password = await hashPassword(payload.password);

    if (!password) {
      res.status(500).json({
        status: false,
        message: "Unable to hash password",
      });
      return;
    }

    payload.password = password;

    const user = await new userModel(payload).save();
    if (!user) {
      res.status(500).json({
        status: false,
        message: "Unable to create user",
      });
      return;
    }

    const savedUser = await user.save();
    if (!savedUser) {
      res.status(500).json({
        status: false,
        message: "Unable to save user",
      });
      return;
    }

    const token = generateToken(savedUser.username);

    if (!token) {
      res.status(500).json({
        status: false,
        message: "Unable to generate token",
      });
      return;
    }

    res.status(201).json({
      status: true,
      message: "User created successfully",
      data: {
        user: savedUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to create user",
      error: error,
    });
    return;
  }
}

export async function loginHandler(req: Request, res: Response) {
  const payload: User = req.body;

  try {
    const result = validateUser(payload);

    if (!result.success) {
      res.status(400).json({
        status: false,
        message: result.error.issues[0].message,
      });
      return;
    }

    const fetchedUser = await userModel.findOne({
      username: payload.username,
    });

    if (!fetchedUser) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
      return;
    }
    const isMatch = await comparePassword(
      fetchedUser.password,
      payload.password
    );
    if (!isMatch) {
      res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
      return;
    }

    const token = generateToken(fetchedUser.username);

    if (!token) {
      res.status(500).json({
        status: false,
        message: "Unable to generate token",
      });
      return;
    }

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      data: {
        user: fetchedUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "Unable to login user",
    });
    return;
  }
}
