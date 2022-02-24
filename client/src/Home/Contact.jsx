import React, { useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Avatar,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import history from "../Utilities/history";
import { authenticationService } from "../Services/authenticationService";
import Header from "../Layout/Header";
import { useRequest } from "../Services/request";
const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundImage:
      'url("https://thumbs.dreamstime.com/b/tile-floor-brick-wall-background-lights-night-hd-image-large-resolution-can-be-used-as-desktop-wallpaper-real-zise-184215885.jpg")',
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Contact() {
  const [currentUser] = useState(authenticationService.currentUserValue);
  const username = currentUser.name;
  const classes = useStyles();
  const request = useRequest();

  return (
    <div>
      <Header />
      <Container
        className={classes.paper}
        style={{ paddingTop: "90px", paddingBottom: "54px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            style={{ width: 70, height: 70 }}
            src="https://scontent.ftun2-1.fna.fbcdn.net/v/t39.30808-6/240388976_1494644964234453_4181690474521778820_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=174925&_nc_ohc=8XLpzKkKlXgAX8Li95n&_nc_ht=scontent.ftun2-1.fna&oh=00_AT_hHlamwq3HiYs3OFYSe_czqRiOYGEdLrZgdvBin_gdbg&oe=61F4B44E"
          />
          <Typography component="h1" variant="h5">
            fill out this simple form
          </Typography>

          <Formik
            initialValues={{
              name: `${username}`,
              body: "",
              email: "@gmail.com",
              username: "",
            }}
            validationSchema={Yup.object().shape({
              username: Yup.string()
                .required("Name is required")
                .max(40, "Too Long!"),
              email: Yup.string()
                .required("email is required")
                .min(6, "url too short"),
              body: Yup.string()
                .required("bio is required")
                .min(25, "you should write 25 caracters"),
              name: Yup.string().min(4, "your name too short"),
            })}
            onSubmit={(
              { username, email, body, name },
              { setStatus, setSubmitting }
            ) => {
              setStatus();
              request(username, email, body, name).then(
                (user) => {
                  const { from } = history.location.state || {
                    from: { pathname: "/chat" },
                  };
                  history.push(from);
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
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        autoComplete="given-name"
                        name="name"
                        id="name"
                        required
                        value={values.name}
                        onChange={handleChange}
                        helperText={touched.name ? errors.name : ""}
                        error={touched.name && Boolean(errors.name)}
                        fullWidth
                        id="firstName"
                        label="First Name"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        required
                        fullWidth
                        label="User Name"
                        id="username"
                        name="username"
                        value={values.username}
                      onChange={handleChange}
                      helperText={touched.username ? errors.username : ""}
                      error={touched.username && Boolean(errors.username)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={values.email}
                      onChange={handleChange}
                      helperText={touched.email ? errors.email : ""}
                      error={touched.email && Boolean(errors.email)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        name="body"
                        id="body"
                        label="request"
                        value={values.body}
                      onChange={handleChange}
                      helperText={touched.body ? errors.body : ""}
                      error={touched.body && Boolean(errors.body)}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Checkbox value="allowExtraEmails" color="primary" />
                        }
                        label="I want to receive your updates via email."
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 1 }}
                    color="primary"
                  >
                    send
                  </Button>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="#" variant="body2">
                        have a problem contact at my e-mail directly
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            )}
          </Formik>
        </Box>
      </Container>
    </div>
  );
}
