import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import './bookingform.css';

const BookingSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  check_in_date: Yup.date().required('Check-in date is required'),
  check_out_date: Yup.date().required('Check-out date is required'),
});

const BookingForm = () => {
  const { roomId } = useParams();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5555/users/me', { credentials: 'include' });
        console.log('Response:', response);
        
        if (!response.ok) {
          console.error('Failed to fetch user data:', response.statusText);
          return;
        }
    
        const data = await response.json();
        console.log('Data:', data);
        
        // Assuming you want the first user or need to adjust based on actual logic
        if (data.users && data.users.length > 0) {
          setUserId(data.users[0].id); // or however you determine which user to use
        } else {
          console.error('No user found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const handleSubmit = async (values) => {
    if (!userId) {
      console.error('User ID is not set yet.');
      return;
    }

    const bookingData = {
      ...values,
      user_id: userId,
      room_id: roomId,
    };

    try {
      const response = await fetch('http://localhost:5555/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      console.log('Booking successful:', data);
      alert('Booking successful!');
    } catch (error) {
      console.error('Error:', error);
      alert('Error submitting the form. Please try again.');
    }
  };

  return (
    <div className="container">
      <div className="form_area">
        <h1 className="title">Booking Form</h1>
        <Formik
          initialValues={{
            name: '',
            email: '',
            check_in_date: '',
            check_out_date: '',
          }}
          validationSchema={BookingSchema}
          onSubmit={async (values, { setSubmitting }) => {
            await handleSubmit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div className="form_group">
                <label htmlFor="name" className="sub_title">Name</label>
                <Field type="text" name="name" className="form_style" />
                <ErrorMessage name="name" component="div" className="error_message" />
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
              <button type="submit" className="btn" disabled={isSubmitting || userId === null}>
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
