import React, {  useState } from "react";
import Header from "../Layout/Header";
import { makeStyles } from "@material-ui/styles";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Grid,
  Typography,
  TextField,
  Chip,
  Paper,
} from "@material-ui/core";
import { Formik } from "formik";
import * as Yup from "yup";
import history from "../Utilities/history";
import { authenticationService } from "../Services/authenticationService";
import { useUpdateuser } from "../Services/updateuser";
import { countryList } from "./countries/contry";

// Style page 
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// component profile
const Profile = () => {
  const updateUser = useUpdateuser();
  const [currentUser] = useState(authenticationService.currentUserValue);
  const username = currentUser.name;
// hobbies react hooks
  const [chipData, setChipData] = React.useState([
    { key: 0, label: "sports" },
    { key: 1, label: "travelling" },
    { key: 2, label: "reading" },
    { key: 3, label: "chatting" },
    { key: 4, label: "cooking" },
  ]);
  const [hobbies, setHobbies] = React.useState(chipData);
  
// delate elemnet of the hobbies ( onClick)
  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
    setHobbies(chipData)
  };
  
console.log(hobbies)
console.log(chipData);

// declaration of classenames of css
  const classes = useStyles();

  return (
    <div>
      
      <Header />
      <div
        className={classes.paper}
        style={{
          flexDirection: "row",
          alignContent: "space-between",
          justifyContent: "space-evenly",
          marging: "auto",
          marginTop: "50px",
        }}
      >
        <div>
          <Grid container>
            <Grid item>
              <Typography component="h1" variant="h5" align="center">
                Edit profile
              </Typography>
              <Formik
                initialValues={{
                  name: `${username}`,
                  pic: "",
                  bio: "",
                  age: 12,
                  gender: true,
                  location: "tunisia",
                  hobbies: chipData,
                }}
                validationSchema={Yup.object().shape({
                  name: Yup.string()
                    .required("Name is required")
                    .max(40, "Too Long!"),
                  pic: Yup.string()
                    .required("pic is required")
                    .min(6, "url too short"),
                  bio: Yup.string()
                    .required("bio is required")
                    .min(25, "you should write 25 caracters"),
                  age: Yup.number()
                    .required("age is required")
                    .min(12, "your age have to be at least 12 years old")
                    .max(60, "your age have not passed 60 YEARS old"),
                })}
                onSubmit={(
                  { name, pic, age, gender, bio, location, hobbies },
                  { setStatus, setSubmitting }
                ) => {
                  setStatus();
                  updateUser(
                    name,
                    pic,
                    age,
                    gender,
                    bio,
                    location,
                    hobbies 
                  ).then(
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
                    <TextField
                      id="name"
                      className={classes.textField}
                      name="name"
                      label="Name"
                      fullWidth={true}
                      variant="outlined"
                      margin="normal"
                      value={values.name}
                      onChange={handleChange}
                      helperText={touched.name ? errors.name : ""}
                      error={touched.name && Boolean(errors.name)}
                    />

                    <TextField
                      id="pic"
                      className={classes.textField}
                      name="pic"
                      label="picture url"
                      fullWidth={true}
                      variant="outlined"
                      margin="normal"
                      value={values.pic}
                      onChange={handleChange}
                      helperText={touched.pic ? errors.pic : ""}
                      error={touched.pic && Boolean(errors.pic)}
                    />

                    <FormControl
                      variant="standard"
                      sx={{ m: 1, minWidth: 120 }}
                    >
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ marginRight: 50, marginTop: 15 }}>
                          <InputLabel id="demo-simple-select-standard-label">
                            Gender
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-standard-label"
                            id="gender"
                            name="gender"
                            value={MenuItem.value}
                            onChange={handleChange}
                            label="Gender"
                            helperText={touched.gender ? errors.gender : ""}
                            error={touched.gender && Boolean(errors.gender)}
                          >
                            <MenuItem value={true}><img src="https://img.icons8.com/doodle/16/000000/male.png" alt="male logo"/>male</MenuItem>
                            <MenuItem value={false}><img src="https://img.icons8.com/office/16/000000/female.png" alt="female logo"/>female</MenuItem>
                          </Select>
                        </div>
                        <div style={{ marginRight: 50 }}>
                          <InputLabel style={{ position: "unset" }}>
                            city
                          </InputLabel>
                          <Select
                            id="location"
                            name="location"
                            value={MenuItem.value}
                            onChange={handleChange}
                            label="location"
                            helperText={touched.location ? errors.location : ""}
                            error={touched.location && Boolean(errors.location)}
                          >
                            {countryList.map((country) => (
                              <MenuItem value={country}>{country}</MenuItem>
                            ))}
                          </Select>
                        </div>
                        <div>
                          <TextField
                            id="number"
                            name="age"
                            label="age"
                            fullWidth={true}
                            margin="normal"
                            type="number"
                            InputProps={{ inputProps: { min: 12, max: 60 } }}
                            value={values.age}
                            onChange={handleChange}
                            helperText={touched.age ? errors.age : ""}
                            error={touched.age && Boolean(errors.age)}
                          />
                        </div>
                        <Paper
                          component="ul"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            flexWrap: "wrap",
                            listStyle: "none",
                            padding: 0.5,
                            marginLeft: 50,
                            backgroundColor: "transparent",
                            boxShadow: "unset",
                          }}
                        >
                          <ul
                          name='hobbies'
                          id ='hobbies' 
                          label='hobbies'
                          value ={hobbies}
                          onChange={handleChange}
                          helperText={touched.hobbies ? errors.hobbies : ""}
                            error={touched.hobbies && Boolean(errors.hobbies)}>
                          {chipData.map((data) => {
                            let icon;
                            if (data.label === "chatting") {
                              icon = <TagFacesIcon />;
                            }

                            return (
                              <li key={data.key} value={data} >
                                <Chip
                                  icon={icon}
                                  label={data.label}
                                  onDelete={
                                    data.label === "React"
                                      ? undefined
                                      : handleDelete(data)
                                  }
                                  className={classes.chip}
                                  style={{ margin: 5 }}
                                />
                              </li>
                            );
                          })}
                          </ul>
                        </Paper>
                      </div>
                    </FormControl>
                    <TextField
                      id="bio"
                      className={classes.textField}
                      name="bio"
                      label="bio"
                      fullWidth={true}
                      variant="outlined"
                      margin="normal"
                      value={values.bio}
                      onChange={handleChange}
                      helperText={touched.bio ? errors.bio : ""}
                      error={touched.bio && Boolean(errors.bio)}
                    />

                    <Button
                      type="submit"
                      fullWidth={true}
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Register
                    </Button>
                  </form>
                )}
              </Formik>
            </Grid>
          </Grid>
        </div>
        <div className={classes.paper}>
          <Grid container>
            <Grid item></Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};
export default Profile;
