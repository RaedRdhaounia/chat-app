import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, Select } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
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

export default function BackGround() {
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
      <button type="button" onClick={handleOpen}>
        profile
      </button>
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
              HELLOLLL
            </span>

            <div class="buttons">
              <Select
                labelId="demo-simple-select-standard-label"
                id="Color"
                name="Color"
                value={MenuItem.value}
                label="Color"
              >
                <MenuItem value="red">red</MenuItem>
                <MenuItem value="green">green</MenuItem>
              </Select>
            </div>
            <div class="skills">
              <h6>hobbies</h6>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
