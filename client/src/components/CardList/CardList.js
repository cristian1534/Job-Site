import React, { useState } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import CardUser from "@/components/card";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import Menu from "../menu/Menu";

const CardList = ({ cardData }) => {
  const PaginationContainer = styled(Box)`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  `;

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState(cardData);

  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;
  endIndex = Math.min(endIndex, filteredData.length);
  const visibleCards = filteredData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (selectedValue) => {
    const filteredProfiles = cardData.filter(
      (profile) => profile.category === selectedValue
    );
    setFilteredData(filteredProfiles);
    setCurrentPage(1);
  };

  return (
    <Box display="flex" flexDirection="column" justifyContent="center">
      <Menu handleFilterChange={handleFilterChange} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        mb={2}
        mt={5}
      >
        <Typography variant="h5" color="primary" align="center">
          TOP CANDIDATES
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" m={2}>
          Check out the most relevant profiles to match your need.
        </Typography>
        <EmojiEventsIcon color="warning" fontSize="large" />
      </Box>

      <Box
        display="flex"
        flexDirection="row"
        justifyContent="center"
        mb={5}
        p={5}
        style={{ gap: "20px" }}
        sx={{
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {visibleCards.map((card) => (
          <CardUser
            key={card.id}
            id={card.id}
            name={card.name}
            photo={card.photo}
            title={card.experienceOne}
            subheader={card.category}
          />
        ))}
      </Box>

      <PaginationContainer>
        <Button
          variant="outlined"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          style={{ marginRight: "10px" }}
        >
          <KeyboardDoubleArrowLeftIcon />
        </Button>
        <Button
          variant="outlined"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <KeyboardDoubleArrowRightIcon />
        </Button>
      </PaginationContainer>
    </Box>
  );
};

export default CardList;
