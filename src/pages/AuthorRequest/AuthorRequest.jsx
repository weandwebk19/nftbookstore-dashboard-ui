import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Box, CircularProgress, Grid, Paper } from "@mui/material";

import { logout } from "redux/actions/auth";
import { StyledButton } from "styles/components/Button";

import { AuthorRequestTable } from "components/ui/AuthorRequestTable";

import { ContentContainer } from "../../components/shared/ContentContainer";

const AuthorRequest = () => {
  const data = [
    {
      pseudonym: "LongHuynh",
      about: "I'm long. I'm come from Vietnam.",
      email: "longhuynh95652626@gmail.com",
      website: "https://github.com/longhuynhpyn01",
      walletAddress: "0xeB273c9069eeCCf7EdEf715d4aD1ad115Fa93330",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      linkedIn: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
      phoneNumber: "0989123456",
      picture: {
        secure_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7dwvoHnphDcfGGPzikvK5LbQRyFRRIfVdVQ&usqp=CAU",
        public_id: "",
      },
    },
    {
      pseudonym: "lNEG coutner",
      about:
        "Streamline media management and improve user experience by automatically delivering images and videos, enhanced and optimized for every user.",
      email: "abwwihtbau12939mnop@gmail.com",
      website: "",
      walletAddress: "0xeB273c9069eeCCf7EdEf715d4aD1ad115Fa93330",
      facebook: "https://www.facebook.com",
      instagram: "https://www.instagram.com",
      linkedIn: "https://www.linkedin.com",
      twitter: "https://www.twitter.com",
      phoneNumber: "0979686868",
      picture: {
        secure_url:
          "https://i0.wp.com/thatnhucuocsong.com.vn/wp-content/uploads/2023/02/Hinh-anh-avatar-Facebook.jpg?ssl=1",
        public_id: "",
      },
    },
  ];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  // const [authors, setAuthors] = useState([]);

  // useEffect(() => {
  //   (async () => {
  //     const authorRes = await BookTempService.getListAuthorRequest();
  //     setAuthors(authorRes);
  //     setIsLoading(false);
  //   })();
  // }, []);

  return (
    <ContentContainer
      titles={["Author Request"]}
      button={
        <>
          <StyledButton
            customVariant="secondary"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Dashboard
          </StyledButton>
          <StyledButton
            customVariant="secondary"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
            style={{ marginLeft: "8px" }}
          >
            Log out
          </StyledButton>
        </>
      }
    >
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
            return <AuthorRequestTable data={data} />;
          })()}
        </Paper>
      </Grid>
    </ContentContainer>
  );
};

export default AuthorRequest;
