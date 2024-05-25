'use server';

import connectDB from '@/database';
import User from '@/models';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

export async function userSignupAction(userFormData) {
  await connectDB();

  try {
    const { userName, email, password } = userFormData;
    const checkUser = await User.findOne({
      email,
    });

    if (checkUser) {
      return {
        success: false,
        message: 'User already exits! Try with a different ',
      };
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newlyCreatedUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newlyCreatedUser.save();

    if (savedUser) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(savedUser)),
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong!',
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
}

export async function userSignInAction(userFormData) {
  //connect to db
  await connectDB();

  try {
    const { email, password } = userFormData;

    //check user is present in DB
    const checkUser = await User.findOne({ email });

    if (!checkUser) {
      return {
        success: false,
        message: 'User does not exit! Try again with another user',
      };
    }

    //check password is correct
    const checkPassword = await bcryptjs.compare(password, checkUser.password);

    if (!checkPassword) {
      return {
        success: false,
        message: 'Password is wrong! Try again',
      };
    }

    //token data
    const userToken = {
      id: checkUser._id,
      userName: checkUser.userName,
      email: checkUser.email,
    };

    //create token
    const token = jwt.sign(userToken, process.env.NEXT_PUBLIC_SECRET_KEY, { expiresIn: '1d' });

    //store token in cookies
    const getCookies = cookies();
    getCookies.set('token', token);

    return {
      success: true,
      message: 'Login successfull',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
}

export async function getUsersAction() {
  await connectDB();

  try {
    const getCookies = cookies();
    //get token
    const token = getCookies.get('token')?.value || '';

    //check token
    if (token === '') {
      return {
        success: false,
        message: 'Token is invalid!',
      };
    }

    //get user details
    const decodedToken = jwt.verify(token, process.env.NEXT_PUBLIC_SECRET_KEY);

    const getUserInfo = await User.findOne({ _id: decodedToken.id });

    if (getUserInfo) {
      return {
        success: true,
        data: JSON.parse(JSON.stringify(getUserInfo)),
      };
    } else {
      return {
        success: false,
        message: 'Something went wrong!',
      };
    }
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: 'Something went wrong!',
    };
  }
}

export async function logoutAction() {
  const getCookies = cookies();
  getCookies.set('token', '');
}
