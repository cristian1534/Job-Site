import React, { useState } from "react";
import CardUser from "@/components/card";
import { Container, Grid, Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material";
import Menu from "../components/menu/Menu";
import Banner from "@/components/Banner/Banner";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ContactForm from "@/components/Contact/ContactForm";
import LineTime from "@/components/LineTime/LineTime";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";

// Styles...
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
`;

const HomeContainer = styled(Container)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const GridContainer = styled(Grid)`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  padding: 2rem;
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const PaginationContainer = styled(Box)`
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: center;
`;

const Index = () => {
  const content = {
    title: "We're excited to have you here! Today holds great potential.",
    subTitle:
      "At WORK WISE, we offer top-notch freelancers across various categories, ensuring exceptional experience and quality.",
    url: "https://img.freepik.com/free-vector/builders-construction-workers-helmets_107791-12576.jpg",
    redirection: true,
  };

  const process = {
    title: "How it works?",
    subTitle:
      "Keep showing your Skills and Portfolio regarding your Profession, so more chances will come to match potential jobs.",
    url: "https://icsblog.s3.ap-south-1.amazonaws.com/blog/wp-content/uploads/2021/08/12163637/ICS-Blog-simon-page.com_.jpg",
    redirection: false,
  };

  const cardData = [
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
    { id: 4, name: "User 4" },
    { id: 5, name: "User 5" },
    { id: 6, name: "User 6" },
    { id: 7, name: "User 7" },
    { id: 8, name: "User 8" },
    { id: 9, name: "User 9" },
    { id: 10, name: "User 10" },
  ];

  const itemsPerPage = 2;
  const totalPages = Math.ceil(cardData.length / itemsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleCards = cardData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <HomeContainer>
      <Banner {...content} />
      <Menu />
      <GridContainer>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Typography variant="h5" color="primary" align="center">
            TOP CANDIDATES
          </Typography>
          <Typography
            variant="body2"
            color="textSecondary"
            align="center"
            m={2}
          >
            Check out the most relevant profiles to match your need.
          </Typography>
          <EmojiEventsIcon color="warning" fontSize="large" />
        </Box>
        {visibleCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <CardBox p={5} mb={5}>
              <CardUser id={card.id} name={card.name} />
            </CardBox>
          </Grid>
        ))}
      </GridContainer>

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
      <Banner {...process} />
      <LineTime />
      <ContactForm />
      <CookieConsent
        debug={true}
        location="bottom"
        style={{
          textAlign: "center",
          color: "#fff",
          backgroundColor: "#00AAEF",
          font: "14px",
        }}
        buttonStyle={{
          background: "#fff",
          color: "#00AAEF",
          fontSize: "14px",
          borderRadius: "10px",
          padding: "1rem",
        }}
        buttonText="UNDERSTAND"
      >
        THIS SITE USES COOKIES. SEE OUR{" "}<Link href="/" style={{color: "blue"}}>POLICY</Link>.
      </CookieConsent>
    </HomeContainer>
  );
};

export default Index;
