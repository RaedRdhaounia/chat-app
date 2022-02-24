import React, { useState, useEffect, useRef } from "react";
import {
  MenuItem,
  Select,
  Fade,
  Backdrop,
  Modal,
  Grid,
  Typography,
  TextField,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Paper,
  Fab,
} from "@material-ui/core";
import ClearIcon from "@material-ui/icons/Clear";
import ColorLensIcon from "@material-ui/icons/ColorLens";
import { backgroundColors, textColors } from "./colors/backgroundColors";
import "./style.css";
import { makeStyles } from "@material-ui/core/styles";
import SendIcon from "@material-ui/icons/Send";
import socketIOClient from "socket.io-client";
import classnames from "classnames";
import commonUtilites from "../Utilities/common";
import {
  useGetGlobalMessages,
  useSendGlobalMessage,
  useGetConversationMessages,
  useSendConversationMessage,
} from "../Services/chatService";
import { authenticationService } from "../Services/authenticationService";
import Userdetail from "./Userdetails";
import { useDetUsers } from "../Services/getUserDetails";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  headerRow: {
    maxHeight: 60,
    zIndex: 5,
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    color: theme.palette.primary.dark,
  },
  messageContainer: {
    height: "100%",
    display: "flex",
    alignContent: "flex-end",
  },
  messagesRow: {
    maxHeight: "calc(100vh - 184px)",
    overflowY: "auto",
  },
  newMessageRow: {
    width: "100%",
    padding: theme.spacing(0, 2, 1),
  },
  messageBubble: {
    padding: 10,
    border: "1px solid white",
    backgroundColor: "white",
    borderRadius: "0 10px 10px 10px",
    boxShadow: "-3px 4px 4px 0px rgba(0,0,0,0.08)",
    marginTop: 8,
    maxWidth: "40em",
  },
  messageBubbleRight: {
    borderRadius: "10px 0 10px 10px",
  },
  inputRow: {
    display: "flex",
    alignItems: "flex-end",
  },
  form: {
    width: "100%",
  },
  avatar: {
    margin: theme.spacing(1, 1.5),
  },
  listItem: {
    display: "flex",
    width: "100%",
  },
  listItemRight: {
    flexDirection: "row-reverse",
  },
}));

const ChatBox = (props) => {
  const [currentUserId] = useState(
    authenticationService.currentUserValue.userId
  );

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessage, setLastMessage] = useState(null);
  const getGlobalMessages = useGetGlobalMessages();
  const sendGlobalMessage = useSendGlobalMessage();
  const getConversationMessages = useGetConversationMessages();
  const sendConversationMessage = useSendConversationMessage();
  const getDetUsers = useDetUsers();
  const [blockdet, setBlockdet] = useState("true");
  const [backGround, setBackGround] = useState("brown");
  const [text, setText] = useState("pink");
  const [loading, setLoading] = useState(true);
  let chatBottom = useRef(null);
  // style restraction
  const classes = useStyles();
  // look for block user
  useEffect(() => {}, []);
  useEffect(() => {
    getDetUsers();
  }, [ blockdet]);
  // popup classic
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  // reload messages
  const reloadMessages = () => {
    if (props.scope === "Global Chat") {
      getGlobalMessages().then((res) => {
        setMessages(res);
      });
    } else if (props.scope !== null && props.conversationId !== null) {
      getConversationMessages(props.user._id).then((res) => setMessages(res));
    } else {
      setMessages([]);
    }
  };
  // sumbit write a message
  const handleSubmit = (e) => {
    e.preventDefault();
    if(e.target.value == "") {setNewMessage("");}
    else {
    if (props.scope === "Global Chat") {
      sendGlobalMessage(newMessage).then(() => {
        setNewMessage("");
      });
    } else {
      sendConversationMessage(props.user._id, newMessage).then((res) => {
        setNewMessage("");
      });
    }
 } };
  // get new messages when there is new data change
  useEffect(() => {
    reloadMessages();
    setLoading(false);
    setBlockdet(JSON.parse(localStorage.getItem("Usersdet")));
  }, [
    messages,
    lastMessage,
    props.scope,
    props.conversation,
    blockdet,
  ]);
  console.log(blockdet);
  // get last messages
  useEffect(() => {
    const socket = socketIOClient(process.env.REACT_APP_API_URL);
    socket.on("messages", (data) => setLastMessage(data));
  }, []);
  // convert date from second to string date
  const convertDate = (olddate) => {
    var dateConvert = new Date(parseInt(olddate));
    return dateConvert.toString().slice(0, 24);
  };

  return (
    <Grid
      container
      className={classes.root}
      style={{ backgroundColor: `${backGround}` }}
    >
      <Grid item xs={12} className={classes.headerRow}>
        <Paper className={classes.paper} square elevation={2}>
          <Typography color="inherit" variant="h6">
            {props.scope}
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Grid container className={classes.messageContainer}>
          <Grid item xs={12} className={classes.messagesRow}>
            {messages && (
              <List>
                {messages.map((m) => (
                  <ListItem
                    key={m._id}
                    className={classnames(classes.listItem, {
                      [`${classes.listItemRight}`]:
                        m.fromObj[0]._id === currentUserId,
                    })}
                    alignItems="flex-start"
                  >
                    <ListItemAvatar className={classes.avatar}>
                      <Userdetail u={m.fromObj[0]} />
                    </ListItemAvatar>
                    <ListItemText
                      style={{ backgroundColor: "transparent" }}
                      classes={{
                        root: classnames(classes.messageBubble, {
                          [`${classes.messageBubbleRight}`]:
                            m.fromObj[0]._id === currentUserId,
                        }),
                      }}
                      primary={m.fromObj[0] && m.fromObj[0].name}
                      secondary={
                        <React.Fragment>
                          <p style={{ color: "blue" }}>{m.body}</p>
                          <h5 className="date">{convertDate(m.date)}</h5>
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            )}
            <div ref={chatBottom} />
          </Grid>
          {blockdet? null:<Grid item xs={12} className={classes.inputRow}>
            <form onSubmit={(e) => handleSubmit(e)} className={classes.form}>
              <Grid
                container
                className={classes.newMessageRow}
                alignItems="flex-end"
              >
                <Grid item xs={10}>
                  <TextField
                    id="message"
                    label="Message"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    style={{ backgroundColor: `${text}` }}
                  />
                </Grid>
                <Grid item xs={1}>
                  {" "}
                  <div>
                    <Fab variant="extended" className="fb">
                      <ColorLensIcon
                        className="ico"
                        fontSize="large"
                        color="secondary"
                        onClick={handleOpen}
                      />
                    </Fab>
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      className={classes.modal}
                      open={open}
                      onClose={handleClose}
                      closeAfterTransition
                      BackdropComponent={Backdrop}
                      BackdropProps={{
                        timeout: 500,
                      }}
                    >
                      <Fade in={open}>
                        <div class="card-container">
                          <br />
                          <span
                            class="pro"
                            style={{ backgroundColor: "transparent" }}
                          >
                            <ClearIcon
                              onClick={() => handleClose()}
                              className="ico"
                            />
                            choose your color
                          </span>
                          <br />
                          <div class="buttons">
                            <h3>chat color</h3>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="Color"
                              name="Color"
                              value={MenuItem.value}
                              label="Color"
                              onChange={(e) => setBackGround(e.target.value)}
                              style={{ backgroundColor: `${MenuItem.value}` }}
                            >
                              {backgroundColors.map((el) => (
                                <MenuItem
                                  value={el}
                                  style={{ backgroundColor: `${el}` }}
                                >
                                  {el}
                                </MenuItem>
                              ))}
                            </Select>
                            <h3>message background</h3>
                            <Select
                              labelId="demo-simple-select-standard-label"
                              id="textColor"
                              name="textColor"
                              value={MenuItem.value}
                              label="Color"
                              onChange={(e) => setText(e.target.value)}
                              style={{ Color: `${MenuItem.value}` }}
                            >
                              {textColors.map((el) => (
                                <MenuItem
                                  value={el}
                                  style={{ backgroundColor: `${el}` }}
                                >
                                  {el}
                                </MenuItem>
                              ))}
                            </Select>
                          </div>
                          <div class="skills">
                            {" "}
                            enjoy to change every color you like in your privet
                            chat{" "}
                          </div>
                        </div>
                      </Fade>
                    </Modal>
                  </div>
                </Grid>
                <Grid item xs={1}>
                  <IconButton
                    type="submit"
                    fontSize="large"
                    size="medium"
                    style={{ color: "#0277bd" }}
                  >
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </form>
          </Grid>}
          
          )
        </Grid>
      </Grid>
    </Grid>
  );
};

export default ChatBox;
