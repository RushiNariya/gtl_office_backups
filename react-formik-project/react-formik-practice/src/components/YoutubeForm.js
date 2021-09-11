import React, { useState } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FieldArray,
  FastField,
} from "formik";
import * as Yup from "yup";
import TextError from "./TextError";

function YoutubeForm() {
  const [formValues, setFormValues] = useState(null);

  const initialValues = {
    name: "Rushi",
    email: "",
    channel: "",
    comment: "",
    address: "",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };
  const onSubmit = (values, onSubmitProps) => {
    console.log("Form Data", values);
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
    console.log("submit props", onSubmitProps);
  };

  const savedValues = {
    name: "Rushi",
    email: "rushi@gmail.com",
    channel: "codevaluation",
    comment: "loading saved data",
    address: "Rajkot, Gujarat.",
    social: {
      facebook: "",
      twitter: "",
    },
    phoneNumbers: ["", ""],
    phNumbers: [""],
  };

  const validate = (values) => {
    let errors = {};

    if (!values.name) {
      errors.name = "required";
    }

    if (!values.email) {
      errors.email = "required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email format";
    }
    if (!values.channel) {
      errors.channel = "required";
    }
    return errors;
  };

  const validateComments = (value) => {
    let error;

    if (!value) {
      error = "required";
    }
    return error;
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Required!"),
    email: Yup.string().email("Invalid email format").required("Required"),
    channel: Yup.string().required("Required"),
  });

  // const formik = useFormik({
  //   initialValues,
  //   onSubmit,
  //   // validate,
  //   validationSchema,
  // });

  //   console.log(formik.values);
  //   console.log(formik.errors.name);
  //   console.log("visited feilds", formik.touched);
  return (
    <Formik
      initialValues={formValues || initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize
      // validateOnMount
      // validateOnChange={false}
      // validateOnBlur={false}
    >
      {(formik) => {
        console.log("formik props", formik);

        return (
          <Form>
            <div className="form-control">
              <label htmlFor="name">Name</label>
              <Field
                type="text"
                id="name"
                name="name"
                placeholder="enter your name"

                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.name}
              />
              {/* {formik.touched.name && formik.errors.name ? (
                <div className="error">{formik.errors.name}</div>
              ) : null} */}
              <ErrorMessage name="name" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="email">Email</label>
              <Field
                type="email"
                id="email"
                name="email"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.email}
              />
              {/* {formik.touched.email && formik.errors.email ? (
                <div className="error">{formik.errors.email}</div>
              ) : null} */}
              <ErrorMessage name="email">
                {(errorMessage) => {
                  return <div className="error">{errorMessage}</div>;
                }}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="channel">Channel</label>
              <Field
                type="text"
                id="channel"
                name="channel"
                placeholder="enter your name"
                // onBlur={formik.handleBlur}
                // onChange={formik.handleChange}
                // value={formik.values.channel}
              />
              {/* {formik.touched.channel && formik.errors.channel ? (
                <div className="error">{formik.errors.channel}</div>
              ) : null} */}
              {/* <ErrorMessage name="channel" /> */}
              <ErrorMessage name="channel">
                {(errorMessage) => {
                  return <div className="error">{errorMessage}</div>;
                }}
              </ErrorMessage>
            </div>

            <div className="form-control">
              <label htmlFor="comments">Comments</label>
              <Field
                name="comments"
                id="comments"
                as="textarea"
                validate={validateComments}
              />
              <ErrorMessage name="comments" component={TextError} />
            </div>

            <div className="form-control">
              <label htmlFor="address">Address</label>
              <FastField name="address">
                {(props) => {
                  // console.log("Render props", props);
                  // console.log("fdgdfdfdf");
                  const { field, form, meta } = props;
                  return (
                    <div>
                      <input id="address" type="text" {...field} />
                      {meta.touched && meta.error ? (
                        <div>{meta.error};</div>
                      ) : null}
                    </div>
                  );
                }}
              </FastField>
            </div>

            <div className="form-control">
              <label htmlFor="facebook">Facebook profile</label>
              <Field type="text" id="facebook" name="social.facebook" />
            </div>

            <div className="form-control">
              <label htmlFor="twitter">Twitter profile</label>
              <Field type="text" id="twitter" name="social.twitter" />
            </div>

            <div className="form-control">
              <label htmlFor="primaryPh">Primary phone number</label>
              <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
            </div>

            <div className="form-control">
              <label htmlFor="secondaryPh">Secondary phone number</label>
              <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
            </div>

            <div className="form-control">
              <label>List of phone numbers</label>
              <FieldArray name="phNumbers">
                {(fieldArrayProps) => {
                  const { push, remove, form } = fieldArrayProps;
                  const { values } = form;
                  const { phNumbers } = values;
                  console.log("form errors", form.errors);
                  // console.log('fieldArrayProps', fieldArrayProps)
                  // console.log('Form errors', form.errors)
                  return (
                    <div>
                      {phNumbers.map((phNumber, index) => (
                        <div key={index}>
                          <Field name={`phNumbers[${index}]`} />
                          {index > 0 && (
                            <button type="button" onClick={() => remove(index)}>
                              -
                            </button>
                          )}
                          <button type="button" onClick={() => push("")}>
                            +
                          </button>
                        </div>
                      ))}
                    </div>
                  );
                }}
              </FieldArray>
            </div>

            {/* <button
              type="button"
              onClick={() => formik.validateField("comments")}
            >
              Validate comments
            </button>

            <button
              type="button"
              onClick={() => formik.setFieldTouched("comments")}
            >
              Visit comments
            </button>

            <button
              type="button"
              onClick={() =>
                formik.setTouched({
                  name: true,
                  email: true,
                  channel: true,
                  comments: true,
                })
              }
            >
              Visit all
            </button>

            <button type="button" onClick={() => formik.validateForm()}>
              Validate all
            </button> */}

            <button type="button" onClick={() => setFormValues(savedValues)}>
              Load saved data
            </button>

            <button type="reset">Reset</button>

            <button
              type="submit"
              // disabled={!(formik.dirty && formik.isValid)}
              disabled={!formik.isValid || formik.isSubmitting}
            >
              Submit
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}

export default YoutubeForm;
