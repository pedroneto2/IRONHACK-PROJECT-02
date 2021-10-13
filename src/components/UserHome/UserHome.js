import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import UserDetails from "./UserDetails";
import Calendar from "./Calender/Calender";
import DoubtManager from "../DoubtManager/DoubtManager";
import WorkingSettings from "../WorkingSettings/WorkingSettings";
import ManageServices from "../ManageServices/ManageServices";

import AuthContext from "../../store/contexts/AuthContext";
import { Redirect } from "react-router";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

export default function VerticalTabs(props) {
  const [value, setValue] = React.useState(Number(props.defaultTab));

  const { authentication } = React.useContext(AuthContext);

  const isProfessional = authentication === "professionals";

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!authentication) {
    return <Redirect to={"/home"} />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
      }}
    >
      <Box
        sx={{
          width: "100%",
          minWidth: "325px",
          bgcolor: "background.paper",
          margin: "auto",
        }}
      >
        <Tabs
          orientation="horizontal"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            margin: "auto",
            maxWidth: "750px",
          }}
        >
          <Tab label="Detalhes" {...a11yProps(0)} />
          <Tab label="Agenda" {...a11yProps(1)} />
          {isProfessional && <Tab label="Serviços" {...a11yProps(2)} />}
          {isProfessional && <Tab label="Dúvidas" {...a11yProps(3)} />}
          {isProfessional && (
            <Tab label="Configurações de Trabalho" {...a11yProps(4)} />
          )}
        </Tabs>
        <TabPanel value={value} index={0}>
          <UserDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Calendar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ManageServices />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <DoubtManager />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <WorkingSettings />
        </TabPanel>
      </Box>
    </div>
  );
}
