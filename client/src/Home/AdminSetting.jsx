import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "../Layout/Header";
import { Container, Grid, Typography, Fab, Link } from "@material-ui/core";
import NavigationIcon from "@material-ui/icons/Navigation";
import { useAllUsers } from "../Services/getallusers";
import RecipeReviewCard from "./UserCard";
import { useAllRequests } from "../Services/getRequest";
import OutlinedCard from "./RequestCard";

const useStyles = makeStyles((theme) => ({
  paper: {
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

const AdminSetting = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [allRequests, setAllRequests] = useState([]);
  const [requests, setRequests] = useState([]);
  const [succes, setSucces] = useState(false);
  const [succesReq, setSuccesReq] = useState(false);
  const getAllUsers = useAllUsers();
  const getAllRequests = useAllRequests();
  useEffect(() => {
    getAllUsers();
    getAllRequests();
  }, []);

  const handlerequest = () => {
    const countReq = parseInt(JSON.parse(localStorage.getItem("issus")));
    for (let index = 0; index < countReq; index++) {
      var req = JSON.parse(localStorage.getItem(`request ${index}`));
      if (req.username != "raedrdh") {
        setAllRequests(allRequests.push(req));
      }
    }

    setSuccesReq(true);
    setRequests(allRequests);
  };
  const handleget = () => {
    const count = parseInt(JSON.parse(localStorage.getItem("client")));
    for (let index = 0; index < count; index++) {
      var newuser = JSON.parse(localStorage.getItem(`Users ${index}`));
      if (newuser.username != "raedrdh") {
        setAllUsers(allUsers.push(newuser));
      }
    }
    setSucces(true);
    setUsers(allUsers);
  };
  console.log(users);
  const classes = useStyles();

  return (
    <div>
      <Header />
      <div
        className={classes.paper}
        className="makeStyles-paper-1"
        style={{
          flexDirection: "row",
          alignContent: "space-between",
          justifyContent: "space-evenly",
          marging: "auto",
          marginTop: "50px",
        }}
      >
        <Grid maxWidth="lg">
          <Grid item>
            <Typography component="h1" variant="h5" align="center">
              Edit Chat Users
            </Typography>
          </Grid>

          <Grid
            style={{
              display: "flex",
              direction: "row",
              width: 1000,
              marginTop: 60,
            }}
          >
            <Container>
              <Typography
                component="div"
                style={{
                  backgroundImage:
                    "url(https://p4.wallpaperbetter.com/wallpaper/284/230/355/5bd202274391d-wallpaper-preview.jpg)",
                  height: "50vh",
                }}
              >
                {succes ? (
                  <Fab
                    variant="extended"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                    disable
                  >
                    <NavigationIcon className={classes.extendedIcon} />
                    Get all users
                  </Fab>
                ) : (
                  <Fab
                    variant="extended"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                    onClick={() => handleget()}
                  >
                    <NavigationIcon className={classes.extendedIcon} />
                    Get all users
                  </Fab>
                )}
              </Typography>
            </Container>
            <Container maxWidth="lg">
              <Typography
                component="div"
                style={{
                  backgroundImage:
                    "url(https://p4.wallpaperbetter.com/wallpaper/284/230/355/5bd202274391d-wallpaper-preview.jpg)",
                  height: "50vh",
                }}
              >
                {succesReq ? (
                  <Fab
                    variant="extended"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                    disable
                  >
                    <NavigationIcon className={classes.extendedIcon} />
                    Get Requests
                  </Fab>
                ) : (
                  <Fab
                    variant="extended"
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      boxShadow: "none",
                    }}
                    onClick={() => handlerequest()}
                  >
                    <NavigationIcon className={classes.extendedIcon} />
                    Get Requests
                  </Fab>
                )}{" "}
              </Typography>
            </Container>
          </Grid>
          {succes ? (
            <Link href="/AdminSetting" variant="body2">
              <Fab
                variant="extended"
                style={{ marginLeft: 400, marginTop: 25 }}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Hide Users
              </Fab>
            </Link>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
            {succes ? users.map((el) => <RecipeReviewCard el={el} />) : null}
            
          </div>
          {succesReq ? (
            <Link href="/AdminSetting" variant="body2">
              <Fab
                variant="extended"
                style={{ marginLeft: 400, marginTop: 25 }}
              >
                <NavigationIcon className={classes.extendedIcon} />
                Hide Requests
              </Fab>
            </Link>
          ) : null}

          <div style={{ display: "flex", flexWrap: "wrap", marginTop: 30 }}>
            {succesReq ? requests.map((el) => <OutlinedCard el={el} />) : null}
            
          </div>

        </Grid>
      </div>
    </div>
  );
};
export default AdminSetting;
