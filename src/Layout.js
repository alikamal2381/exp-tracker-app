import React, { useState } from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import TopNav from "./components/TopNav";
import Content from "./components/Content";
import BottomNav from "./components/BottomNav";

const containerStyles = {
  height: "calc(100vh - 112px)",
  overflow: "auto",
  textAlign: "center",
};

function Layout() {
  const [tab, setTab] = useState(0);

  function renderView() {
    switch (tab) {
      case 0:
        return <Content message={"Landing Page"} />;
      case 1:
        return <Content message={"People Page"} />;
      case 2:
        return <Content message={"Settings Page"} />;
      default:
        return new Error("This view doesnot exist");
    }
  }

  return (
    <div>
      <Grid container direction="column">
        <TopNav />
        <div style={containerStyles}>{renderView()}</div>
        <BottomNav value={tab} onChange={setTab} />
      </Grid>
      <CssBaseline />
    </div>
  );
}

export default Layout;
