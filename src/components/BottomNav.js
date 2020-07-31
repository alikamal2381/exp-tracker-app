import React from "react";
import { BottomNavigation, BottomNavigationAction } from "@material-ui/core";
import { Home, People, Settings } from "@material-ui/icons";

const BottomNav = ({ value, onChange }) => {
  return (
    <BottomNavigation value={value} onChange={(e, tab) => onChange(tab)}>
      <BottomNavigationAction icon={<Home />} />
      <BottomNavigationAction icon={<People />} />
      <BottomNavigationAction icon={<Settings />} />
    </BottomNavigation>
  );
};

export default BottomNav;
