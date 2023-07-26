import React, { useState } from "react";
import {
  Container,
  Select,
  MenuItem,
  FormControl,
  Box,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";

const Menu = ({ handleFilterChange }) => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    setValue(selectedValue);
    handleFilterChange(selectedValue);
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
          <Select value={value} onChange={handleChange} variant="standard">
            <MenuItem value="Technology">Technology</MenuItem>
            <MenuItem value="Administration">Administration</MenuItem>
            <MenuItem value="Education">Education</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </Select>
        </Box>
      </FormControl>
    </MenuBox>
  );
};

export default Menu;
