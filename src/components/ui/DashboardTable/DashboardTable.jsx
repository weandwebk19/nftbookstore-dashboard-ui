/* eslint-disable no-unused-vars */
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IconButton, Stack, Tooltip, Typography } from "@mui/material";

import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

import BookTempService from "services/bookTempService";
import { StyledButton } from "styles/components/Button";

import DataGrid from "components/shared/DataGrid/DataGrid";

import styles from "../../../styles/Dashboard.module.scss";
import { truncate } from "../../../utils/truncate";
import { Dialog } from "../../shared/Dialog";

// eslint-disable-next-line react/prop-types
const DashboardTable = ({ data = [] }) => {
  const navigate = useNavigate();
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
    const { action, ...bookTemp } = item;
    (async () => {
      const res = await BookTempService.acceptPublishBook(bookTemp);
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
    const { action, ...bookTemp } = item;

    (async () => {
      const res = await BookTempService.refusePublishBook(bookTemp);
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

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 100,
      renderCell: (params) => (
        <Tooltip title={params.value}>
          <Typography className={styles.text__truncate}>
            {params.value}
          </Typography>
        </Tooltip>
      ),
    },
    {
      field: "bookSample",
      headerName: "Book Sample",
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
      field: "bookCover",
      headerName: "Book Cover",
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
      field: "nftUri",
      headerName: "Metadata",
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
      field: "author",
      headerName: "Author",
      flex: 1,
      minWidth: 180,
      sortable: false,
      renderCell: (params) => (
        <Typography>{truncate(params.value, 12, -4)}</Typography>
      ),
    },
    {
      field: "timestamp",
      headerName: "Time",
      width: 180,
      renderCell: (params) => (
        <Typography>
          {`${new Date(params.value).toLocaleDateString("vi-VN")}, ${new Date(
            params.value
          ).toLocaleTimeString("vi-VN")}`}
        </Typography>
      ),
    },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      width: 180,
      renderCell: (params) => {
        return (
          <Stack direction="row" spacing={1}>
            <Tooltip title="Read book">
              <IconButton
                component="label"
                onClick={() => {
                  // navigate("/read/:bookId");
                }}
              >
                {params?.value?.read}
              </IconButton>
            </Tooltip>
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
        read: <VisibilityOutlinedIcon />,
        accept: <CheckOutlinedIcon />,
        refuse: <CloseOutlinedIcon />,
      };
    });
  }, [data]);

  return (
    <Stack spacing={3}>
      <DataGrid getRowId={(row) => row.tokenId} columns={columns} rows={data} />
      <Dialog
        title="Accept the request"
        open={openAcceptDialog}
        onClose={handleAcceptClose}
      >
        <Stack spacing={3}>
          <Typography>
            Are you sure you want to accept to publish the book?
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1">
              <b>Title:</b> {targetItem?.title}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Book Sample:</b>{" "}
              <Tooltip title={targetItem?.bookSample}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookSample}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Book Cover:</b>{" "}
              <Tooltip title={targetItem?.bookCover}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookCover}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Metadata:</b>{" "}
              <Tooltip title={targetItem?.nftUri}>
                <Typography variant="body1" component="span">
                  {targetItem?.nftUri}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>Author:</b>{" "}
              {targetItem?.author ? truncate(targetItem?.author, 12, -4) : ""}
            </Typography>
            <Typography variant="body1">
              <b>Time:</b>{" "}
              {targetItem.timestamp &&
                `${new Date(targetItem?.timestamp).toLocaleDateString(
                  "vi-VN"
                )}, ${new Date(targetItem?.timestamp).toLocaleTimeString(
                  "vi-VN"
                )}`}
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
            Are you sure you want to refuse to publish the book?
          </Typography>
          <Stack direction={{ xs: "column" }} spacing={{ xs: 1 }}>
            <Typography variant="body1">
              <b>Title:</b> {targetItem?.title}
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Book Sample:</b>{" "}
              <Tooltip title={targetItem?.bookSample}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookSample}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Book Cover:</b>{" "}
              <Tooltip title={targetItem?.bookCover}>
                <Typography variant="body1" component="span">
                  {targetItem?.bookCover}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1" className={styles.text__truncate}>
              <b>Metadata:</b>{" "}
              <Tooltip title={targetItem?.nftUri}>
                <Typography variant="body1" component="span">
                  {targetItem?.nftUri}
                </Typography>
              </Tooltip>
            </Typography>
            <Typography variant="body1">
              <b>Author:</b>{" "}
              {targetItem?.author ? truncate(targetItem?.author, 12, -4) : ""}
            </Typography>
            <Typography variant="body1">
              <b>Time:</b>{" "}
              {targetItem.timestamp &&
                `${new Date(targetItem?.timestamp).toLocaleDateString(
                  "vi-VN"
                )}, ${new Date(targetItem?.timestamp).toLocaleTimeString(
                  "vi-VN"
                )}`}
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

export default DashboardTable;
