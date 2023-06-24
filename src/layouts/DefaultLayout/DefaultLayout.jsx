import { Box, Container } from "@mui/material";

import { Footer } from "../components";
import PropTypes from "prop-types";

const DefaultLayout = ({ children }) => {
  return (
    <>
      <Box sx={{ minHeight: "100vh" }}>
        <Container maxWidth="xl" sx={{ pt: 8 }}>
          <Box className="content">{children}</Box>
        </Container>
      </Box>
      <Footer />
    </>
  );
};

export default DefaultLayout;

DefaultLayout.propTypes = {
  children: PropTypes.any
};
