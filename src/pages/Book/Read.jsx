/* eslint-disable react/jsx-no-bind */
import React, { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/TextLayer.css";
import { IToc, ReactReader } from "react-reader";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  Box,
  Button,
  CircularProgress,
  IconButton,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";

import { Container } from "@mui/system";
import axios from "axios";
import { Rendition } from "epubjs";
// import Head from "next/head";
// import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { convertHexStringToUint8Array } from "utils/convert";
import { Crypto } from "utils/crypto";

// import { useNftBookMeta } from "@/components/hooks/web3";
// import { useWeb3 } from "@/components/providers/web3";
// import { ZenLayout } from "@/layouts/ZenLayout";
import PageIndicator from "./PageIndicator";

// let LINK_EPUB =
//   "https://altmshfkgudtjr.github.io/react-epub-viewer/files/Alices%20Adventures%20in%20Wonderland.epub";
// let LINK_PDF =
//   "https://cors-anywhere.herokuapp.com/http://www.pdf995.com/samples/pdf.pdf";

async function decryptPdfFile(cipherText, privateKey, iv) {
  let plainText;
  if (cipherText) {
    plainText = await Crypto.decryption(cipherText, privateKey, iv);
  }
  if (plainText) {
    const blob = new Blob([plainText], { type: "application/pdf" });
    return URL.createObjectURL(blob);
  }
  // URL.revokeObjectURL(link.href);
}

const SUPPORT_FILE_TYPE = ["epub", "pdf"];
const ReadBook = () => {
  const [tokenId, setTokenId] = useState();
  const [linkPdf, setLinkPdf] = useState();
  const [linkEpub, setLinkEpub] = useState();
  // const { bookStoreContract } = useWeb3();
  const [page, setPage] = useState();
  const [location, setLocation] = useState(0);
  const [firstRenderDone, setFirstRenderDone] = useState(false);

  const [numPages, setNumPages] = useState(2);
  const [pageNumber, setPageNumber] = useState(1);
  const [inputedPage, setInputedPage] = useState(1);

  const renditionRef = useRef(null);
  const tocRef = useRef(null);
  const [fileType, setFileType] = useState("epub");

  const navigate = useNavigate();
  // const { bookId } = router.query;
  // const { nftBookMeta } = useNftBookMeta(bookId);
  const [decrypting, setDecrypting] = useState(false);
  // const bookFileUrl = nftBookMeta.data?.bookFile; // Url of file on pinata
  // const metaDataType = nftBookMeta.data?.fileType;

  // const title = `${nftBookMeta.data?.title} - NFT Bookstore`;

  // useEffect(() => {
  //   (async () => {
  //     if (bookFileUrl) {
  //       setDecrypting(true);
  //       const dataFile = axios({
  //         method: "get",
  //         url: bookFileUrl,
  //         responseType: "arraybuffer",
  //         headers: {
  //           Accept: "application/pdf application/epub+zip",
  //         },
  //       })
  //         .then(async function (response) {
  //           const cipherText = new Uint8Array(response.data);
  //           if (tokenId) {
  //             const isReadable = await bookStoreContract.isBookReadableByUser(
  //               tokenId
  //             );

  //             if (isReadable) {
  //               const secrectKey = await bookStoreContract.getSecretKey(
  //                 tokenId
  //               );

  //               if (secrectKey.length === 2) {
  //                 const privateKey = await Crypto.generateKey(secrectKey[1]);
  //                 const iv = convertHexStringToUint8Array(secrectKey[0]);
  //                 const link = await decryptPdfFile(cipherText, privateKey, iv);
  //                 if (SUPPORT_FILE_TYPE.includes(metaDataType)) {
  //                   setFileType(metaDataType);
  //                   if (metaDataType === "pdf") {
  //                     setLinkPdf(link);
  //                   } else {
  //                     setLinkEpub(link);
  //                   }
  //                 }
  //               }
  //             } else {
  //               toast.error(t("errorPermission"), {
  //                 position: toast.POSITION.TOP_CENTER,
  //               });
  //               setDecrypting(false);
  //             }
  //           }

  //           setDecrypting(false);
  //         })
  //         .catch((err) => {
  //           if (err.code === "ERR_NETWORK") {
  //             toast.error(t("errorNetwork"), {
  //               position: toast.POSITION.TOP_CENTER,
  //             });
  //           }
  //           setDecrypting(false);
  //         });
  //     }
  //   })();
  // }, [bookFileUrl, bookStoreContract, tokenId, metaDataType, t]);

  // useEffect(() => {
  //   (async () => {
  //     try {
  //       if (bookId) {
  //         const tokenRes = await axios.get(`/api/books/${bookId}/tokenId`);

  //         if (tokenRes.data.success === true) {
  //           setTokenId(tokenRes.data.data);
  //         }
  //       }
  //     } catch (err) {
  //       console.log("Something went wrong, please try again later!");
  //     }
  //   })();
  // }, [bookId]);

  const locationChanged = (epubcifi) => {
    if (!firstRenderDone) {
      setLocation(localStorage.getItem("book-progress")); // getItem returns null if the item is not found.
      setFirstRenderDone(true);
      return;
    }
    localStorage.setItem("book-progress", epubcifi);
    setLocation(epubcifi);

    if (renditionRef.current && tocRef.current) {
      const { displayed, href } = renditionRef.current.location.start;
      const tocArray = Object.values(tocRef.current);
      const chapter = tocArray.find((item) => item.href === href);
      setPage(
        `Page ${displayed.page} of ${displayed.total} in chapter ${
          chapter ? chapter.label : "n/a"
        }`
      );
    }
  };

  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

  // /*To Prevent right click on screen*/
  // useEffect(() => {
  //   document.addEventListener("contextmenu", (event) => {
  //     event.preventDefault();
  //   });
  // }, []);

  // /*To Prevent F12*/
  // useEffect(() => {
  //   document.onkeydown = (event) => {
  //     if (event.key == "F12") {
  //       // Prevent F12
  //       return false;
  //     } else if (event.ctrlKey && event.shiftKey && event.key == "i") {
  //       // Prevent Ctrl+Shift+I
  //       return false;
  //     }
  //   };
  // }, []);

  useEffect(() => {
    document.addEventListener("keydown", handlePageNavigate);
    return () => {
      document.removeEventListener("keydown", handlePageNavigate);
    };
  }, [numPages]);

  const pageBlurHandler = (event, pageNumber) => {
    setPageNumber(pageNumber);
  };

  const pageChangeHandler = (event, pageNumber = 1) => {
    setPageNumber(parseInt(event.target.textContent, 10));
  };

  const handlePageNavigate = (event) => {
    if (!event.repeat) {
      switch (event.key) {
        case "ArrowLeft":
          setPageNumber((prevPageNumber) => Math.max(prevPageNumber - 1, 1));
          break;
        case "ArrowRight":
          setPageNumber((prevPageNumber) =>
            Math.min(prevPageNumber + 1, numPages)
          );
          break;
      }
    }
  };

  // When document gets loaded successfully
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber((prevPageNumber) => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <Container>
      <Stack>
        <ToastContainer />
        <Button
          variant="outlined"
          size="small"
          startIcon={<KeyboardBackspaceIcon />}
          sx={{ mb: 3 }}
          onClick={() => {
            // router.push("/account/bookshelf");
            navigate("/dashboard");
          }}
        >
          Return to Dashboard
        </Button>

        {decrypting && (
          <Stack spacing={2} justifyContent="center" alignItems="center">
            <CircularProgress />
            <Typography>Loading...</Typography>
          </Stack>
        )}

        {!decrypting && (
          <div className="text-scanning-disabled">
            {/* Render epub file into browser view */}
            {fileType === "epub" && linkEpub && (
              <Box
                sx={{
                  width: 600,
                  height: "88vh",
                }}
              >
                <ReactReader
                  loadingView={<CircularProgress />}
                  location={location}
                  locationChanged={locationChanged}
                  url={linkEpub}
                  swipeable
                  getRendition={(rendition) => {
                    renditionRef.current = rendition;
                  }}
                  tocChanged={(toc) => {
                    tocRef.current = toc;
                  }}
                  epubInitOptions={{
                    openAs: "epub",
                  }}
                />
                <PageIndicator page={page} />
              </Box>
            )}

            {/* Render pdf file into browser view */}
            {fileType === "pdf" && linkPdf && (
              <Box
                sx={{ position: "relative" }}
                onKeyPress={(event) => {
                  switch (event.key) {
                    case "ArrowLeft":
                      previousPage();
                      break;
                    case "ArrowRight":
                      alert("woe");
                      nextPage();
                      break;
                  }
                }}
              >
                <Document file={linkPdf} onLoadSuccess={onDocumentLoadSuccess}>
                  <Page pageNumber={pageNumber} renderAnnotationLayer={false} />
                </Document>
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <IconButton disabled={pageNumber <= 1} onClick={previousPage}>
                    <ChevronLeftIcon />
                  </IconButton>
                  <Typography sx={{ textAlign: "center", mt: 3 }}>
                    {pageNumber || (numPages ? 1 : "--")} / {numPages || "--"}
                  </Typography>
                  <IconButton
                    disabled={pageNumber >= numPages}
                    onClick={nextPage}
                  >
                    <ChevronRightIcon />
                  </IconButton>
                </Stack>
                <Stack spacing={1}>
                  <Pagination
                    sx={{ display: "flex", justifyContent: "center" }}
                    count={numPages}
                    shape="rounded"
                    page={pageNumber}
                    onChange={(event, pageNumber) =>
                      pageChangeHandler(event, pageNumber)
                    }
                    hideNextButton
                    hidePrevButton
                  />
                  <TextField
                    type="number"
                    id="outlined-basic"
                    label="Page selection"
                    variant="outlined"
                    onBlur={(event) =>
                      pageBlurHandler(event, parseInt(event.target.value, 10))
                    }
                    onKeyUp={(event) => {
                      if (event.key === "Enter") {
                        event.preventDefault();
                        const { target } = event;
                        target.blur();
                      }
                    }}
                    InputProps={{
                      inputProps: {
                        max: numPages,
                        min: 1,
                      },
                    }}
                  />
                </Stack>
              </Box>
            )}
          </div>
        )}
      </Stack>
    </Container>
  );
};

export default ReadBook;
