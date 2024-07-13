import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './bookingform.css'; 

const BookingSchema = Yup.object().shape({
  username: Yup.string().required('Username is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  check_in_date: Yup.date().required('Check-in date is required'),
  check_out_date: Yup.date().required('Check-out date is required'),
});

const BookingForm = ({ onSubmit, roomId }) => {
  return (
    <div className="container">
      <div className="form_area">
        <h1 className="title">Booking Form</h1>
        <Formik
          initialValues={{
            username: '',
            email: '',
            room_id: roomId,
            check_in_date: '',
            check_out_date: '',
          }}
          validationSchema={BookingSchema}
          onSubmit={(values, { setSubmitting }) => {
            onSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form_group">
                <label htmlFor="username" className="sub_title">Username</label>
                <Field type="text" name="username" className="form_style" />
                <ErrorMessage name="username" component="div" className="error_message" />
              </div>
              <div className="form_group">
                <label htmlFor="email" className="sub_title">Email</label>
                <Field type="email" name="email" className="form_style" />
                <ErrorMessage name="email" component="div" className="error_message" />
              </div>
              <div className="form_group">
                <label htmlFor="check_in_date" className="sub_title">Check-in Date</label>
                <Field type="date" name="check_in_date" className="form_style" />
                <ErrorMessage name="check_in_date" component="div" className="error_message" />
              </div>
              <div className="form_group">
                <label htmlFor="check_out_date" className="sub_title">Check-out Date</label>
                <Field type="date" name="check_out_date" className="form_style" />
                <ErrorMessage name="check_out_date" component="div" className="error_message" />
              </div>
              <button type="submit" className="btn" disabled={isSubmitting}>
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
