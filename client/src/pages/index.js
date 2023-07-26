import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Button, Card } from "@mui/material";
import { styled } from "@mui/material";
import Banner from "@/components/Banner/Banner";
import ContactForm from "@/components/Contact/ContactForm";
import LineTime from "@/components/LineTime/LineTime";
import CookieConsent from "react-cookie-consent";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Nav from "@/components/Nav/Nav";
import CardList from "@/components/CardList/CardList";
import { fetchProfiles } from "@/redux/reducers/profile";
import store from "@/redux/store";
import Loader from "../components/Loader/Loader";

// Styles...

const HomeContainer = styled(Container)`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;

const Index = ({ cardData }) => {
  const content = {
    title: "We're excited to have you here!",
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

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, []);

  return (
    <HomeContainer>
      {loading && <Loader />}
      <section id="top">
        <Banner {...content} />
      </section>
      <section id="candidates">
        <CardList cardData={cardData} />
      </section>

      <section id="how">
        <Banner {...process} />
      </section>
      <LineTime />
      <section id="contact">
        <ContactForm />
      </section>
      <CookieConsent
        debug={true}
        location="bottom"
        style={{
          textAlign: "center",
          color: "#fff",
          backgroundColor: "#00AAEF",
          fontSize: "18px",
          padding: "1rem",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          display: "flex",
          alignItems: "center",
          alignContent: "center",
          maxHeight: "150px",
          overflow: "auto",
        }}
        buttonStyle={{
          background: "#FFF",
          color: "#00AAEF",
          fontSize: "14px",
          borderRadius: "180px",
          padding: "0.5rem 1rem",
          fontWeight: "bold",
          marginTop: "0.5rem",
        }}
        buttonText="Understand"
      >
        <div style={{ marginBottom: "1rem" }}>
          We use cookies. See our{" "}
          <Link href="/" style={{ color: "#fff" }}>
            policy
          </Link>
        </div>
      </CookieConsent>
      <Nav />
    </HomeContainer>
  );
};

export default Index;

export async function getServerSideProps() {
  await store.dispatch(fetchProfiles());

  const cardData = store.getState().profile.profiles;

  return {
    props: {
      cardData,
    },
  };
}
