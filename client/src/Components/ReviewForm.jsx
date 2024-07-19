import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "./reviews.css";
import { Link } from "react-router-dom";
import "./Navbar/Navbar";
import LogoutButton from "./LogoutButton";

const ReviewForm = ({ user }) => {
  const { roomId } = useParams(); 

  const initialValues = {
    username: user?.username || "", 
    room_id: roomId || "",
    rating: "",
    comment: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"), 
    room_id: Yup.string().required("Room ID is required"),
    rating: Yup.number().required("Rating is required").min(1).max(5),
    comment: Yup.string()
      .required("Comment is required")
      .min(10, "Comment must be at least 10 characters"),
  });

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("https://home-haven-7.onrender.com/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Review submitted:", data);
      resetForm();
    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <nav className="nav">
        <h1 className="nav-logo">Home Haven</h1>
        <ul className="nav-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/bookings">Bookings</Link>
          </li>
          <li>
            <Link to="/rooms">Rooms</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <LogoutButton />
          </li>
        </ul>
      </nav>
      <div className="pic">
        <div className="form-container">
          <h2>We Appreciate Your Feedback</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize 
          >
            {({ isSubmitting }) => (
              <Form>
                <div>
                  <label htmlFor="username">Username:</label>
                  <Field
                    type="text"
                    name="username"
                    
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="room_id">Room ID:</label>
                  <Field type="text" name="room_id" readOnly />
                  <ErrorMessage
                    name="room_id"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="rating">Rating:</label>
                  <Field type="number" name="rating" min="1" max="5" />
                  <ErrorMessage
                    name="rating"
                    component="div"
                    className="error"
                  />
                </div>

                <div>
                  <label htmlFor="comment">Comment:</label>
                  <Field as="textarea" name="comment" />
                  <ErrorMessage
                    name="comment"
                    component="div"
                    className="error"
                  />
                </div>

                <button type="submit" disabled={isSubmitting} id="submit">
                  Submit Review
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ReviewForm;
