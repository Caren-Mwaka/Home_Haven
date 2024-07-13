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

    const validationSchema = Yup.object({
        user_id: Yup.string().required('User ID is required'),
        room_id: Yup.string().required('Room ID is required'),
        rating: Yup.number().required('Rating is required').min(1).max(5),
        comment: Yup.string().required('Comment is required').min(10, 'Comment must be at least 10 characters')
      });
    
      const onSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
          const response = await fetch('/api/reviews', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
    
          const data = await response.json();
          console.log('Review submitted:', data);
          resetForm();
        } catch (error) {
          console.error('Error submitting review:', error);
        } finally {
          setSubmitting(false);
        }
      };
      return (<div className="pic">
        <div className="form-container">
          <h2>We appreciate all Feedback</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="user_id">User ID:</label>
                  <Field type="text" name="user_id" />
                  <ErrorMessage name="user_id" component="div" className="error" />
                </div>
    
                <div>
                  <label htmlFor="room_id">Room ID:</label>
                  <Field type="text" name="room_id" />
                  <ErrorMessage name="room_id" component="div" className="error" />
                </div>
    
                <div>
                  <label htmlFor="rating">Rating:</label>
                  <Field type="number" name="rating" min="1" max="5" />
                  <ErrorMessage name="rating" component="div" className="error" />
                </div>
    
                <div>
                  <label htmlFor="comment">Comment:</label>
                  <Field as="textarea" name="comment" />
                  <ErrorMessage name="comment" component="div" className="error" />
                </div>
    
                <button type="submit" disabled={isSubmitting}>
                  Submit Review
                </button>
              </Form>
            )}
          </Formik>
        </div>
        </div>
      );
    };
    
    export default ReviewForm;
    