import React, { useState } from "react";
import { Box, styled, Typography, Button } from "@mui/material";
import CardUser from "@/components/card";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const CardList = ({ cardData }) => {
  const CardBox = styled(Box)`
    display: flex;
    margin-top: 2rem;
    gap: 1rem;
    width: 100%;
    padding: 1rem;

    @media (min-width: 768px) {
      margin-top: 5rem;
      padding: 2rem;
    }

    @media (max-width: 767px) {
      flex-direction: column;
    }
  `;

  const PaginationContainer = styled(Box)`
    margin-top: 2rem;
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  `;

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleCards = cardData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(cardData.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center">
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

      <CardBox p={5} mb={5}>
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
      </CardBox>

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
