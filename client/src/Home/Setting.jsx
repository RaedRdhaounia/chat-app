import React from "react";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import { Formik } from "formik";
import * as Yup from "yup";

import history from "../Utilities/history";
import { useDelate } from "../Services/changepassword";
import Header from "../Layout/Header";

const useStyles = makeStyles((theme) => ({
  paper: {
  
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft : '200px',
    backgroundImage : 'url("https://images3.alphacoders.com/853/thumb-1920-85305.jpg")'
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  Setting = (props) => {
  const delate = useDelate();
  const classes = useStyles();
  return (
  <div> 
    <Header />
    <div className={classes.paper}  style={{ paddingTop: "90px" , paddingBottom:'114px'}} >
      <Grid container>
        <Grid item>
          <Typography component="h1" variant="h5" align="center">
            update
          </Typography>
          <Formik
            initialValues={{
                oldpassword:"",
              password: "",
              password2: "",
            }}
            validationSchema={Yup.object().shape({
              oldpassword : Yup.string().required('current password is required'),
              password: Yup.string()
                  .required('Password is Required')
                  .max(100, 'Password too long')
                  .min(
                      6,
                      'Password should be at least 6 characters long'
                  ),
              password2: Yup.string().oneOf(
                  [Yup.ref('password'), null],
                  'Passwords do not match'
              ),
              
          })}
            
            onSubmit={(
              { oldpassword, password, password2 },
              { setStatus, setSubmitting }
            ) => {
              delate(oldpassword, password, password2).then(
                (user) => {const { from } = history.location.state || {
                  from: { pathname: "/chat" },
                };
                },
                (error) => {
                  setSubmitting(false);
                  setStatus(error);
                }
              );
            }}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {({
              handleSubmit,
              handleChange,
              values,
              touched,
              isValid,
              errors,
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                
                <TextField
                  id="oldpassword"
                  className={classes.textField}
                  name="oldpassword"
                  label="current password"
                  fullWidth={true}
                  variant="outlined"
                  margin="normal"
                  required={true}
                  helperText={touched.oldpassword ? errors.oldpassword : ""}
                  error={touched.oldpassword && Boolean(errors.oldpassword)}
                  value={values.oldpassword}
                  onChange={handleChange}
                  type="password"
                />
                <TextField
                  id="password"
                  className={classes.textField}
                  name="password"
                  label="Password"
                  fullWidth={true}
                  variant="outlined"
                  margin="normal"
                  required={true}
                  helperText={touched.password ? errors.password : ""}
                  error={touched.password && Boolean(errors.password)}
                  value={values.password}
                  onChange={handleChange}
                  type="password"
                />

                <TextField
                  id="password2"
                  className={classes.textField}
                  name="password2"
                  label="Confirm Password"
                  fullWidth={true}
                  variant="outlined"
                  margin="normal"
                  required={true}
                  helperText={touched.password2 ? errors.password2 : ""}
                  error={touched.password2 && Boolean(errors.password2)}
                  value={values.password2}
                  onChange={handleChange}
                  type="password"
                />

                <Button
                  type="submit"
                  fullWidth={true}
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  change password
                </Button>
              </form>
            )}
          </Formik>
        </Grid>
      </Grid>
    </div></div>
  );
};
export default Setting
