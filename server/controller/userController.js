import userModel from "../model/userModel.js";
import asyncHandler from "express-async-handler";
import errorHandler from "../utils/errorHandler.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import nodemailer from 'nodemailer';

const transport = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 465,
    secure: true,
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    }
});

export const getUser = asyncHandler(async (req, res, next) => {
    try {
        const countUser = await userModel.countDocuments();
        const startIndex = parseInt(req.query.page) || 1;
        const showUserPerPage = parseInt(req.query.user) || 9;
        const sortUser = req.query.sortUser === "asc" ? 1 : -1;
        const skipUser = (startIndex - 1) * showUserPerPage;

        const query = {};
        if (req.query.role) query.role = req.query.role;
        if (req.query.department) query.department = req.query.department;
        if (req.query.passOutYear) query.passOutYear = req.query.passOutYear;
        if (req.query.name) query.name = { $regex: req.query.name, $options: 'i' };

        const userInfo = await userModel.find(query)
            .skip(skipUser)
            .sort({ updatedAt: sortUser })
            .limit(showUserPerPage);

        const oneMonthAgo = new Date();
        oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

        const lastMonthUsers = await userModel.countDocuments({
            createdAt: { $gte: oneMonthAgo }
        });

        const userWithoutPassword = userInfo.map(({ _doc: { password, ...rest } }) => rest);

        return res.status(200).json({
            success: true,
            message: "user has been fetched",
            lastMonthUsers,
            user: userWithoutPassword,
            countUser: countUser,
        });
    } catch (error) {
        return next(errorHandler("An unexpected error occurred", 400));
    }
});

export const registerUser = asyncHandler(async (req, res, next) => {
    const {
        name, email, password, enrollmentNumber, department, passOutYear
    } = req.body;

    const userExist = await userModel.findOne({
        $or: [ { email }, { enrollmentNumber } ]
    });

    if (userExist) {
        return next(errorHandler("User already exists with this email or enrollment number", 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const registerUserInfo = new userModel({
            name, email, password: hashedPassword, enrollmentNumber, department, passOutYear
        });

        await registerUserInfo.save();

        const { password, ...rest } = registerUserInfo._doc;

        return res.status(201).json({
            success: true,
            message: "User registered successfully. Please verify your email to activate the account.",
            user: rest
        });

    } catch (error) {
        return next(errorHandler("Failed to register user", 500));
    }
});

export const loginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const existUser = await userModel.findOne({ email }).select('+password');;

    if (!existUser || !(await bcrypt.compare(password, existUser.password))) {
        return next(errorHandler("Invalid credentials", 401));
    }

    const createToken = JWT.sign({ id: existUser.id }, process.env.JWT_SECRET, { expiresIn: "30d" });

    existUser.token = createToken;
    await existUser.save();

    const { password: pwd, ...rest } = existUser._doc;

    return res.status(200).cookie("accessToken", createToken, { httpOnly: true, secure: true }).json({
        success: true,
        message: "Login successful",
        createToken,
        user: rest,
    });
});

export const updateUser = asyncHandler(async (req, res, next) => {
    const { id: userId } = req.user;
    const { id: paramsId } = req.params;

    if (paramsId !== userId) {
        return next(errorHandler("Unauthorized user!", 401));
    }

    const userInfo = {
        name: req.body.name,
        enrollmentNumber: req.body.enrollmentNumber,
        department: req.body.department,
        passOutYear: req.body.passoutYear
    };

    if (req.body.password) {
        userInfo.password = await bcrypt.hash(req.body.password, 10);
    }

    const updateUserInfo = await userModel.findByIdAndUpdate(paramsId, { $set: userInfo }, { new: true });
    const { password, ...rest } = updateUserInfo._doc;

    return res.status(200).json({
        message: "User has been updated",
        success: true,
        user: rest,
    });
});

export const signOutUser = asyncHandler(async (req, res, next) => {
    res.clearCookie("accessToken").json({
        success: true,
        message: "User has been signedOut",
    });
});
