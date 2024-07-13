import React from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'
import './Reviews.css';

const ReviewForm = () => {
    const initialValues = {
      user_id: '',
      room_id: '',
      rating: '',
      comment: ''
    };