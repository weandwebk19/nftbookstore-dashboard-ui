import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import { login } from "../../../redux/actions/auth";

// import GoogleAuthButton from "./GoogleAuthButton";

const LoginForm = () => {
  const [isError, setIsError] = useState("");
  // const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const res = await dispatch(login(data));
      if (res.success === true) {
        // setMessage(res.message);
        setIsError(false);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        // setMessage(res.message);
        setIsError(true);
      }
    } catch (err) {
      setIsError(true);
      // setMessage(err.message);
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        setIsError("");
      }, 5000);
    }
  }, [isError]);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            p: 3,
          }}
        >
          <Typography variant="h3" gutterBottom>
            Log in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  id="username"
                  label="username"
                  name="username"
                  autoComplete="username"
                  {...register("username", {
                    required: "required",
                    // validate: (value) => value !== "admin" || "nice try!",
                  })}
                />
                {errors.username ? (
                  <>
                    {errors.username.type === "required" && (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.username.message}
                      </div>
                    )}
                    {/* {errors.username.type === "validate" && (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.username.message}
                      </div>
                    )} */}
                  </>
                ) : null}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  sx={{ mt: 2 }}
                  variant="outlined"
                  customvariant="light"
                  required
                  fullWidth
                  name="password"
                  label="password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  {...register("password", {
                    required: "required",
                  })}
                />
                <Grid container justifyContent="space-between">
                  <Grid item>
                    {errors.password ? (
                      <div
                        style={{
                          color: "darkred",
                          fontSize: "0.88rem",
                          position: "absolute",
                        }}
                      >
                        {errors.password.message}
                      </div>
                    ) : null}
                  </Grid>
                  {/* <Grid item>
                    <Link href="/reset-password" variant="body2">
                      forgot password?
                    </Link>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 6 }}>
              Log In
            </Button>
            {/* <Typography sx={{ mt: 4, mb: 4, textAlign: "center" }}>
              or
            </Typography> */}
            {/* <GoogleAuthButton /> */}
            <Grid
              container
              justifyContent="flex-end"
              alignItems="flex-end"
              sx={{ mt: 6 }}
            >
              <Grid item>
                {/* <Link href="/register" variant="body2">
                  Don&apos;t have an account? <b>sign up</b>
                </Link> */}
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
      {/* {(() => {
        if (isError === false) {
          return <InstantMessage variant="success" message={message} />;
        } else if (isError === true) {
          return <InstantMessage variant="error" message={message} />;
        }
      })()} */}
    </Box>
  );
};

export default LoginForm;
