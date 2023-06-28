/* eslint-disable no-unused-vars */
import * as React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { Box } from "@mui/system";
import authorRequestService from "services/authorRequestService";
import BookTempService from "services/bookTempService";
import { StyledButton } from "styles/components/Button";

import DataGrid from "components/shared/DataGrid/DataGrid";

import styles from "../../../styles/AuthorRequest.module.scss";
import { truncate } from "../../../utils/truncate";
import { Dialog } from "../../shared/Dialog";

// eslint-disable-next-line react/prop-types
const AuthorRequestTable = ({ data = [] }) => {
  const [targetItem, setTargetItem] = React.useState([]);

  const [anchorAcceptButton, setAnchorAcceptButton] = React.useState(null);
  const [anchorRefuseButton, setAnchorRefuseButton] = React.useState(null);

  const openAcceptDialog = Boolean(anchorAcceptButton);
  const openRefuseDialog = Boolean(anchorRefuseButton);

  const handleOpenAcceptDialogClick = (e, params) => {
    e.preventDefault();
    setAnchorAcceptButton(e.currentTarget);
    setTargetItem(params.row);
  };

  const handleOpenRefuseDialogClick = (e, params) => {
    e.preventDefault();
    setAnchorRefuseButton(e.currentTarget);
    setTargetItem(params.row);
  };

  const handleAcceptClick = (e, item) => {
    e.preventDefault();
    const { action, ...authorInfo } = item;

    (async () => {
      const res = await authorRequestService.acceptBecomeAuthor(authorInfo);
      if (res) {
        toast.success("Successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })();
  };

  const handleCancelAcceptClick = (e) => {
    e.preventDefault();
    setAnchorAcceptButton(null);
  };

  const handleRefuseClick = (e, item) => {
    e.preventDefault();
    const { action, ...authorInfo } = item;

    (async () => {
      const res = await authorRequestService.refuseBecomeAuthor(authorInfo);
      if (res) {
        toast.success("Successfully.");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    })();
  };

  const handleCancelRefuseClick = (e) => {
    e.preventDefault();
    setAnchorRefuseButton(null);
  };

  const handleAcceptClose = () => {
    setAnchorAcceptButton(null);
  };

  const handleRefuseClose = () => {
    setAnchorRefuseButton(null);
  };

  const handleClickNewTab = (url) => {
    window.open(url, "_blank", "noreferrer");
  };

  const columns = [
    {
      field: "picture",
      headerName: "Avatar",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Box sx={{ p: 1, ml: -1 }}>
          <img
            src={params.value?.secureUrl}
            alt={params.value?.secureUrl}
            style={{
              flexShrink: 0,
              aspectRatio: "3 / 2",
              width: "90px",
              borderRadius: "0 10px 10px 0",
            }}
          />
        </Box>
      ),
    },
    {
      field: "pseudonym",
      headerName: "Pseudonym",
      sortable: false,
      width: 130,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "about",
      headerName: "About",
      sortable: false,
      width: 180,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "email",
      headerName: "Email",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      sortable: false,
      width: 120,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "walletAddress",
      headerName: "Wallet Address",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (
        <Typography>{truncate(params.value, 12, -4)}</Typography>
      ),
    },
    {
      field: "website",
      headerName: "Website",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            className={styles.text__truncate}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickNewTab(params.value)}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "facebook",
      headerName: "Facebook",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            className={styles.text__truncate}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickNewTab(params.value)}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "instagram",
      headerName: "Instagram",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            className={styles.text__truncate}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickNewTab(params.value)}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "linkedIn",
      headerName: "LinkedIn",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            className={styles.text__truncate}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickNewTab(params.value)}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "twitter",
      headerName: "Twitter",
      flex: 1,
      minWidth: 130,
      sortable: false,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography
            className={styles.text__truncate}
            style={{ cursor: "pointer" }}
            onClick={() => handleClickNewTab(params.value)}
          >
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 120,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Accept this request">
              <IconButton
                component="label"
                onClick={(e) => handleOpenAcceptDialogClick(e, params)}
              >
                {params?.value?.accept}
              </IconButton>
            </Tooltip>
            <Tooltip title="Refuse this request">
              <IconButton
                component="label"
                onClick={(e) => handleOpenRefuseDialogClick(e, params)}
              >
                {params?.value?.refuse}
              </IconButton>
            </Tooltip>
          </Stack>
        );
      },
    },
  ];

  React.useEffect(() => {
    data.forEach((object) => {
      object.action = {
        accept: <CheckOutlinedIcon />,
        refuse: <CloseOutlinedIcon />,
      };
    });
  }, [data]);

  return (
    <Stack spacing={3}>
      <DataGrid
        getRowId={(row) => row.pseudonym + row.email}
        columns={columns}
        rows={data}
      />
      <Dialog
        title="Accept the request"
        open={openAcceptDialog}
        onClose={handleAcceptClose}
      >
        <Stack spacing={3}>
          <Typography>
            Are you sure you want to accept to the request?
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Pseudonym:</b>{" "}
              <Tooltip title={targetItem?.pseudonym}>
                <Typography variant="body1" component="span">
                  {targetItem?.pseudonym}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>About:</b>{" "}
              <Tooltip title={targetItem?.about}>
                <Typography variant="body1" component="span">
                  {targetItem?.about}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Email:</b>{" "}
              <Tooltip title={targetItem?.email}>
                <Typography variant="body1" component="span">
                  {targetItem?.email}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Phone Number:</b>{" "}
              <Tooltip title={targetItem?.phoneNumber}>
                <Typography variant="body1" component="span">
                  {targetItem?.phoneNumber}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>Wallet Address:</b>{" "}
              {targetItem?.walletAddress
                ? truncate(targetItem?.walletAddress, 12, -4)
                : ""}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Website:</b>{" "}
              <Tooltip title={targetItem?.website}>
                <Typography variant="body1" component="span">
                  {targetItem?.website}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Facebook:</b>{" "}
              <Tooltip title={targetItem?.facebook}>
                <Typography variant="body1" component="span">
                  {targetItem?.facebook}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Instagram:</b>{" "}
              <Tooltip title={targetItem?.instagram}>
                <Typography variant="body1" component="span">
                  {targetItem?.instagram}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>LinkedIn:</b>{" "}
              <Tooltip title={targetItem?.linkedIn}>
                <Typography variant="body1" component="span">
                  {targetItem?.linkedIn}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Twitter:</b>{" "}
              <Tooltip title={targetItem?.twitter}>
                <Typography variant="body1" component="span">
                  {targetItem?.twitter}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography
              variant="body1"
              className={styles.text__truncate}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <b>Avatar:</b>{" "}
              <Box sx={{ p: 1, ml: 1 }}>
                <img
                  src={targetItem?.picture?.secure_url}
                  alt={targetItem?.picture?.secure_url}
                  style={{
                    flexShrink: 0,
                    aspectRatio: "3 / 2",
                    width: "90px",
                    borderRadius: "0 10px 10px 0",
                  }}
                />
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="end">
            <StyledButton
              customVariant="secondary"
              onClick={(e) => handleCancelAcceptClick(e)}
            >
              Cancel
            </StyledButton>
            <StyledButton onClick={(e) => handleAcceptClick(e, targetItem)}>
              Accept
            </StyledButton>
          </Stack>
        </Stack>
      </Dialog>
      <Dialog
        title="Refuse the request"
        open={openRefuseDialog}
        onClose={handleRefuseClose}
      >
        <Stack spacing={3}>
          <Typography>
            Are you sure you want to refuse to the request?
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Pseudonym:</b>{" "}
              <Tooltip title={targetItem?.pseudonym}>
                <Typography variant="body1" component="span">
                  {targetItem?.pseudonym}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>About:</b>{" "}
              <Tooltip title={targetItem?.about}>
                <Typography variant="body1" component="span">
                  {targetItem?.about}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Email:</b>{" "}
              <Tooltip title={targetItem?.email}>
                <Typography variant="body1" component="span">
                  {targetItem?.email}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Phone Number:</b>{" "}
              <Tooltip title={targetItem?.phoneNumber}>
                <Typography variant="body1" component="span">
                  {targetItem?.phoneNumber}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>Wallet Address:</b>{" "}
              {targetItem?.walletAddress
                ? truncate(targetItem?.walletAddress, 12, -4)
                : ""}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Website:</b>{" "}
              <Tooltip title={targetItem?.website}>
                <Typography variant="body1" component="span">
                  {targetItem?.website}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Facebook:</b>{" "}
              <Tooltip title={targetItem?.facebook}>
                <Typography variant="body1" component="span">
                  {targetItem?.facebook}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Instagram:</b>{" "}
              <Tooltip title={targetItem?.instagram}>
                <Typography variant="body1" component="span">
                  {targetItem?.instagram}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>LinkedIn:</b>{" "}
              <Tooltip title={targetItem?.linkedIn}>
                <Typography variant="body1" component="span">
                  {targetItem?.linkedIn}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Twitter:</b>{" "}
              <Tooltip title={targetItem?.twitter}>
                <Typography variant="body1" component="span">
                  {targetItem?.twitter}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography
              variant="body1"
              className={styles.text__truncate}
              sx={{ display: "flex", alignItems: "center" }}
            >
              <b>Avatar:</b>{" "}
              <Box sx={{ p: 1, ml: 1 }}>
                <img
                  src={targetItem?.picture?.secure_url}
                  alt={targetItem?.picture?.secure_url}
                  style={{
                    flexShrink: 0,
                    aspectRatio: "3 / 2",
                    width: "90px",
                    borderRadius: "0 10px 10px 0",
                  }}
                />
              </Box>
            </Typography>
          </Stack>
          <Stack direction="row" spacing={3} justifyContent="end">
            <StyledButton
              customVariant="secondary"
              onClick={(e) => handleCancelRefuseClick(e)}
            >
              Cancel
            </StyledButton>
            <StyledButton onClick={(e) => handleRefuseClick(e, targetItem)}>
              Refuse
            </StyledButton>
          </Stack>
        </Stack>
      </Dialog>
      <ToastContainer />
    </Stack>
  );
};

export default AuthorRequestTable;
