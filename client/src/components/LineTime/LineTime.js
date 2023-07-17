import * as React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import { Typography, Box } from "@mui/material";
import { motion } from "framer-motion";
import { fadeIn } from "@/variants";

const LineTime = () => {
  return (
    <Box m={5}>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="primary" />
            <TimelineConnector />
          </TimelineSeparator>
          <motion.Box
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <TimelineContent>
              <Typography variant="h5" component="span" color="primary" p={3}>
                CREATE PROFILE
              </Typography>
              <Typography variant="body1" color="textSecondary" mb={2}>
                This will help you to be known and be part of many candidates,
                many opportunities are still opened for you.
              </Typography>
            </TimelineContent>
          </motion.Box>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="secondary" />
            <TimelineConnector />
          </TimelineSeparator>
          <motion.Box
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <TimelineContent>
              <Typography variant="h5" component="span" color="primary" p={3}>
                GET OFFERINGS
              </Typography>
              <Typography variant="body1" color="textSecondary" mt={2} mb={2}>
                You will receive an email when someone is interested in your
                profile.
              </Typography>
            </TimelineContent>
          </motion.Box>
        </TimelineItem>
        <TimelineItem>
          <TimelineSeparator>
            <TimelineDot color="success" />
          </TimelineSeparator>
          <motion.Box
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: false, amount: 0.7 }}
          >
            <TimelineContent>
              <Typography variant="h5" component="span" color="primary" p={3}>
                GET HIRED
              </Typography>
              <Typography variant="body1" color="textSecondary" mt={2}>
                Congratulations! You've reached the goal and we will not get any
                fee or payment from your side if you get hired.
              </Typography>
            </TimelineContent>
          </motion.Box>
        </TimelineItem>
      </Timeline>
    </Box>
  );
};

export default LineTime;
