import * as React from "react";
import Card from "@mui/material/Card";
import {
  Button,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  Box,
  styled,
  Avatar,
} from "@mui/material";
import GradeIcon from "@mui/icons-material/Grade";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 5px;
  align-items: center;
`;

const ProfileAvatar = styled(Avatar)`
  width: 70px;
  height: 70px;
  background-color: #ef6c00;
  border: 2px solid #ef6c00;
`;

const CustomCard = styled(Card)`
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 30px;
  padding: 1rem;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);
  width: 250px;
  height: 300px;
`;

const CustomCardHeader = styled(CardHeader)`
  height: 70px;
  margin-top: 15px;
`;

const CardUser = ({ id, name, title, subheader, photo, range }) => {
  const router = useRouter();

  return (
    <motion.div
      variants={fadeIn("down", 0.3)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
    >
      <CustomCard>
        <CustomCardHeader
          action={
            <IconButton>
              <GradeIcon style={{ color: "#ffc400" }} />
            </IconButton>
          }
          title={title}
          subheader={subheader}
        />
        <IconContainer>
          <ProfileAvatar src={photo} alt="avatar" />
        </IconContainer>
        <CardContent>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography mb={1}>
                u$d {range}/hour
            </Typography>
            <Typography variant="body2" color="textSecondary" mb={1}>
              {name}
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={() => router.push(`/profile/${id}`)}
              style={{ borderRadius: "50px" }}
            >
              <ManageSearchIcon />
              More
            </Button>
          </Box>
        </CardContent>
      </CustomCard>
    </motion.div>
  );
};

export default CardUser;
