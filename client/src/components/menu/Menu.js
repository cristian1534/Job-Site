import React from "react";
import { Container, Select, MenuItem, FormControl, Box, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Menu = () => {
  const [value, setValue] = React.useState("Technology");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const MenuBox = styled(Container)`
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 2rem;
  `;

  return (
    <MenuBox>
      <FormControl>
        <Box display="flex" alignItems="center" textAlign="center">
          <Typography variant="h5" color="primary" mr={2}>
            SELECT AREA
          </Typography>
          <Select value={value} onChange={handleChange}>
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Administration">Administration</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
          </Select>
        </Box>
      </FormControl>
    </MenuBox>
  );
};

export default Menu;
