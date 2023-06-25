import { Box, Typography } from "@mui/material";

import PropTypes from "prop-types";

const PageIndicator = ({ page }) => {
  return (
    <Box
      sx={{
        mt: 3,
        textAlign: "center",
        zIndex: 1,
      }}
    >
      <Typography>{page}</Typography>
    </Box>
  );
};

export default PageIndicator;

PageIndicator.propTypes = {
  page: PropTypes.string.isRequired,
};
