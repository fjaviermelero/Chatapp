import React, { FC, ReactElement } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import Link from "@mui/material/Link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

export default function Footer() {
  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        backgroundColor: "primary.main",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        position: "fixed",
        bottom: 0,
      }}
    >
      <Container maxWidth="lg">
        <Grid container direction="column" alignItems="center">
          <Grid item xs={12}>
            <Typography color="black" variant="h5">
              Chatapp Forum
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography color="textSecondary" variant="subtitle1">
              {`${new Date().getFullYear()} | `}
              Developed by:
              <Link
                color="inherit"
                href="https://www.linkedin.com/in/francisco-javier-melero-bb4337147"
              >
                <LinkedInIcon />
                {" Francisco Melero"}
              </Link>{" "}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
