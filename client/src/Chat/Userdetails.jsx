import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Modal, Avatar, Backdrop, Fade } from "@material-ui/core";
import "./style.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Userdetail({ u }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Avatar src={u.pic} onClick={handleOpen} className="avatar"></Avatar>
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
            <span class="pro" style={{ backgroundColor: "transparent" }}>
              {u.gender ? (
                <img
                  src="https://img.icons8.com/doodle/48/000000/male.png"
                  alt="image"
                />
              ) : u.gender == undefined ? (
                "pro"
              ) : (
                <img
                  src="https://img.icons8.com/office/40/000000/female.png"
                  alt="image"
                />
              )}
            </span>
            <img class="round" src={u.pic} alt="user" />
            <h3>{u.name}</h3>
            <h6>{u.age}</h6>
            <p>{u.bio || null}</p>
            <div class="buttons">
              <button class="primary" onClick={() => handleClose()}>
                Message
              </button>
              <button class="primary ghost" style={{ border: "none" }}>
                {u.country || null}
              </button>
            </div>
            <div class="skills" >
              <ul style={{textAlign: 'center'}}>hobbies</ul>
               <div style={{display :'flex' , flexWarp:'warp',}}>
                {u.hobbies
                  ? u.hobbies.map((el) => <h4 style={{ marginRight:'10px'}}>{el.label}</h4>):
                  <h4>theris no this hobbies</h4> }
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
