/* eslint-disable react/prop-types */
import { Box, Stack, Typography } from "@mui/material";

import decoLine from "assets/deco-line.svg";

import styles from "../../../styles/ContentContainer.module.scss";

const ContentContainer = (props) => {
  const { titles = [], children, button, width } = props;

  return (
    <Stack
      spacing={8}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        margin: "auto",
      }}
      className={styles.content__container}
    >
      <Box
        component="section"
        sx={{
          marginTop: "100px",
          width: width || "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Box sx={{ textAlign: "center", position: "relative", mb: 8 }}>
          {titles?.map((title) => (
            <Typography variant="h2" key={title}>
              {title}
            </Typography>
          ))}
          <Box
            component="img"
            src={decoLine}
            sx={{
              position: "absolute",
              maxWidth: "385px",
              transform: "translateX(-50%) translateY(-40%)",
            }}
          />
        </Box>
        {button && <Box sx={{ width: "100%", textAlign: "end" }}>{button}</Box>}
      </Box>
      {children}
    </Stack>
  );
};

export default ContentContainer;
