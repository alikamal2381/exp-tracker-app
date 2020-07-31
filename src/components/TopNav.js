import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  SwipeableDrawer,
  Dialog,
  Slide,
} from "@material-ui/core";
import { Menu, KeyboardBackspace } from "@material-ui/icons";

const SlideTransition = React.forwardRef(function TransitionComp(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TopNav = () => {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton color="inherit" onClick={() => setOpen(!open)}>
          <Menu />
        </IconButton>
        <div style={{ flexGrow: 1 }} />
        <Avatar onClick={() => setDialogOpen(true)}>EZ</Avatar>
      </Toolbar>
      <SwipeableDrawer
        open={open}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        disableSwipeToOpen={false}
        PaperProps={{ style: { minWidth: "30vw" } }}
      >
        <span>
          <h3>Expense Traker App</h3>
        </span>
        <ul>
          <li>Home</li>
          <li>Income</li>
          <li>Expense</li>
        </ul>
      </SwipeableDrawer>
      <Dialog
        open={dialogOpen}
        fullScreen
        TransitionComponent={SlideTransition}
      >
        <IconButton onClick={() => setDialogOpen(false)}>
          <KeyboardBackspace />
        </IconButton>
        <span>Hello Dialog!</span>
      </Dialog>
    </AppBar>
  );
};

export default TopNav;
