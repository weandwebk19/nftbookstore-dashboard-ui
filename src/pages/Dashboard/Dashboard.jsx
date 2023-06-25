import { useState } from "react";

import { Box, CircularProgress, Grid, Paper } from "@mui/material";

import { ContentContainer } from "../../components/shared/ContentContainer";
import { DashboardTable } from "../../components/ui/DashboardTable";

const Dashboard = () => {
  const data = [
    {
      tokenId: 1,
      title: "Harry Potter",
      bookSample:
        "https://gateway.pinata.cloud/ipfs/QmVfJR8tQwLTxs8dpMQDbfe1SdWD5bo2prUc98EgQpaXKu",
      bookCover:
        "https://gateway.pinata.cloud/ipfs/QmVfJR8tQwLTxs8dpMQDbfe1SdWD5bo2prUc98EgQpaXKu",
      nftUri:
        "https://gateway.pinata.cloud/ipfs/QmRha8zUx4SNEgNoV7PEV5DogFALhidduSbsm8UjtPn4Kk",
      author: "0xA63d2d15E6cA7F4fB9E693Ea37a283F7cB50AB25",
      timestamp: new Date("2023-10-25T14:48:00").getTime(),
    },
    {
      tokenId: 2,
      title: "Titanic",
      bookSample:
        "https://gateway.pinata.cloud/ipfs/QmVfJR8tQwLTxs8dpMQDbfe1SdWD5bo2prUc98EgQpaXKu",
      bookCover:
        "https://gateway.pinata.cloud/ipfs/QmVfJR8tQwLTxs8dpMQDbfe1SdWD5bo2prUc98EgQpaXKu",
      nftUri:
        "https://gateway.pinata.cloud/ipfs/QmRha8zUx4SNEgNoV7PEV5DogFALhidduSbsm8UjtPn4Kk",
      author: "0xA63d2d15E6cA7F4fB9E693Ea37a283F7cB50AB25",
      timestamp: new Date("2023-06-20T06:22:36.732Z").getTime(),
    },
  ];
  const [isLoading] = useState(false);

  return (
    <ContentContainer titles={["Dashboard"]}>
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
            return <DashboardTable data={data} />;
          })()}
        </Paper>
      </Grid>
    </ContentContainer>
  );
};

export default Dashboard;
