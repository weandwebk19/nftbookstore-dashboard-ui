import { useEffect, useState } from "react";

import { Box, CircularProgress, Grid, Paper } from "@mui/material";

import authorRequestService from "services/authorRequestService";

import { AuthorRequestTable } from "components/ui/AuthorRequestTable";

import { ContentContainer } from "../../components/shared/ContentContainer";

const AuthorRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    (async () => {
      const authorRes = await authorRequestService.getListAuthorRequests();
      setAuthors(authorRes);
      setIsLoading(false);
    })();
  }, []);

  return (
    <ContentContainer titles={["Author Request"]}>
      <Grid container columns={{ xs: 4, sm: 8, md: 12, lg: 12 }}>
        <Paper sx={{ p: 3, width: "100%" }}>
          {(() => {
            if (isLoading) {
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                  }}
                >
                  <CircularProgress />
                </Box>
              );
            }
            return <AuthorRequestTable data={authors} />;
          })()}
        </Paper>
      </Grid>
    </ContentContainer>
  );
};

export default AuthorRequest;
