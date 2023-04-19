import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import PropTypes from "prop-types";

const authenticationFormSchema = Yup.object({
  login: Yup.string().required("Обязательное поле"),
  password: Yup.string().required("Обязательное поле"),
});

const AuthenticationForm = ({ onGetProfile }) => {
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);

  const initialValues = {
    login: "",
    password: "",
  };

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const logIn = async (values, actions) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth`,
        values
      );

      localStorage.setItem("token", data.token);
      actions.resetForm();
      await onGetProfile();
    } catch (err) {
      if (err?.response?.data?.message) {
        setError(err?.response?.data?.message);
      } else {
        setError(err.message);
      }
      handleClick();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
      validationSchema={authenticationFormSchema}
      onSubmit={logIn}
    >
      <Form className="authentication__form">
        <div className="form-group">
          <Field
            className="form-field"
            type="text"
            name="login"
            placeholder="Username"
          />
          <p className="error-text">
            <ErrorMessage name="login" />
          </p>
        </div>
        <div className="form-group">
          <Field
            className="form-field"
            type="password"
            name="password"
            placeholder="Password"
          />
          <p className="error-text">
            <ErrorMessage name="password" />
          </p>
        </div>
        <Button variant="outlined" color="success" type="submit">
          Login
        </Button>

        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {error}
          </Alert>
        </Snackbar>
      </Form>
    </Formik>
  );
};

AuthenticationForm.propTypes = {
  onGetProfile: PropTypes.func.isRequired,
};

export default AuthenticationForm;
