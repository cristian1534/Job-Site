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

const IconContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
`;

const ProfileAvatar = styled(Avatar)`
  width: 70px;
  height: 70px;
  background-color: #1976d2;
`;

const CustomCard = styled(Card)`
  border: 1px solid rgba(150, 150, 150, 0.5);
  border-radius: 5px;
  box-shadow: 5px 5px 5px rgb(220, 220, 220);
  width: 250px;
  height: 300px;
`;

const CardUser = ({ id, name, title, subheader }) => {
  const router = useRouter();

  return (
    <CustomCard>
      <CardHeader
        action={
          <IconButton>
            <GradeIcon color="warning" />
          </IconButton>
        }
        title={title}
        subheader={subheader}
      />
      <IconContainer>
        <ProfileAvatar src="" alt="" />
      </IconContainer>
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Typography variant="body2" color="textSecondary" mb={1}>
            {name}
          </Typography>
          <Button
            variant="contained"
            size="small"
            onClick={() => router.push(`/profile/${id}`)}
          >
            Contact
          </Button>
        </Box>
      </CardContent>
    </CustomCard>
  );
};

export default CardUser;
