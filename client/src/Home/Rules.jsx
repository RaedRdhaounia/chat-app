import React from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "../Layout/Header";
import Link from '@material-ui/core/Link';
import logo from '../Layout/logo.png';
import "./style.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft : '100px',
    backgroundColor : '#473f3d'
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const  Rules = (props) => {
  const classes = useStyles();
  return (
  <div> 
    <Header />
    <div className={classes.paper}  style={{ paddingTop: "50px" , paddingBottom:'74px', backgroundImage :"url('https://wallpapercave.com/wp/zerkNR9.jpg')", backgroundRepeat: "no-repeat", backgroundSize: '2500px'}} >
            <Link href="/chat"  style ={{paddingBottom: 9, borderBottomStyle: "solid",borderColor :'white', marginTop: 40, marginBottom:20, width :900}}>
                <img src={logo} alt="Logo" style={{display: "block", marginLeft: "auto", marginRight: "auto"}}  />
            </Link> 
            <div  style={{paddingTop: 70}}>
<img src="https://www.chatiw.com/Tips/images/10-basic-rules-chat.png" alt="Logo" style={{display: "block", marginLeft: "auto", marginRight: "auto"}} /> 
<h1>10 Great rules to be followed in a Basic Chat</h1>   
<p>Simple, honest and clear answers to simple questions are the base of chat. If you don't know what a word means do not use it. Try to write accurately. Misspelling can cause misunderstanding and lead to bad impression!</p>
<p>2) The secret is to inspire confidence to your chat-friend. Be honest on what you are and what you like and make him/her feel comfortable and laugh.</p>
<p>3)  Do not insist if the person on the other side doesn't want to send you something you would like to see or give you information like phone number and address. The most you insist on things, the more the possibility to get rejected</p>
<p>4) Chat is between two people. More people in the same conversation is not chat, it is a party.</p>
<p>5) Do not use a lot of exclamation points, ellipses, or many emoticons. Chat is to talk to each other and discuss. If you use many of them, your friend may be bored with this game and leave..</p>
<p>6) In chat as in relationships, things do not get better with time. If you don't match with the other from the beginning, you'd better forget it and try someone else...</p>
<p>7) Just because you're online, does not mean that you should always be available to chat with a person. When you cannot talk, do not talk..</p>
<p>8) The chat is not equivalent to a phone-call. You can start chatting with each other and tell some things about you but remember that when you have chatted enough and see that you match, you could exchange phone numbers and get ready to meet face by face.  </p>
<p>9) If you feel like falling asleep, tell him/her that it is time to go to sleep and talk again the next day. If you fall asleep on the keyboard, you will feel awkward in the morning when you will see on your pc "wake up" messages, sad faces and so on. Moreover, being like a zombie at work the next day is not a thing that you would like. That is why it is better to continue your chat the next day. You will also see if the other person is interested to talk to you again ... which is a good sign...</p>
<p>10) Beware there are wicked out there. Do not reveal your address or if you are going to leave home for some time. Do not reveal what your daily program is and where you keep your secret and personal things. There are many stories that people had their homes robbed because they told to their new chat-friends information that they wouldn't know otherwise. Wanna tell you one?</p>      
            </div>
    </div>

    </div>
  )}
  export default Rules