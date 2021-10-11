import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ProfessionalDetails from "./ProfessionalDetails";
import Calendar from "./Calender/Calender";

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
          flexGrow: 1,
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

            width: "fit-content",
            margin: "auto",
          }}
        >
          <Tab label="Detalhes" {...a11yProps(0)} />
          <Tab label="Agenda" {...a11yProps(1)} />
          <Tab label="Serviços" {...a11yProps(2)} />
          <Tab label="Dúvidas" {...a11yProps(3)} />
        </Tabs>
        <TabPanel value={value} index={0}>
          <ProfessionalDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Calendar />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Serviços
        </TabPanel>
        <TabPanel value={value} index={3}>
          Duvidas
        </TabPanel>
      </Box>
    </div>
  );
}
