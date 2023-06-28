/* eslint-disable react/prop-types */
import { useMemo } from "react";
import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import { DataGrid as MUIDataGrid, enUS } from "@mui/x-data-grid";

const DataGrid = ({ columns, rows, getRowId, components }) => {
  const theme = useTheme();
  // const { locale } = useRouter();

  // const localeText = useMemo(() => {
  //   if (locale === "en") {
  //     return enUS.components.MuiDataGrid.defaultProps.localeText;
  //   } else if (locale === "vi") {
  //     return {
  //       ...viVN.components.MuiDataGrid.defaultProps.localeText,
  //       columnMenuManageColumns: "Quản lí các cột",
  //       filterOperatorIsAnyOf: "Một trong số"
  //     };
  //   }
  // }, [locale]);

  const localeText = useMemo(() => {
    return enUS.components.MuiDataGrid.defaultProps.localeText;
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        "& .MuiDataGrid-columnHeaders": {
          height: "50px",
          backgroundColor: theme.palette.background.default,
          color: theme.palette.primary.main
        },
        "& .MuiDataGrid-columnSeparator": {
          display: "none"
        },
        "& .MuiDataGrid-columnHeaderTitle": {
          lineHeight: "1.5 !important",
          fontWeight: "bold"
        },
        "& .MuiDataGrid-cell:focus": {
          outline: "none !important"
        },
        "& .MuiDataGrid-cell:focus-within": {
          outline: "none !important"
        }
      }}
    >
      <MUIDataGrid
        getRowId={getRowId}
        autoHeight
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10
            }
          }
        }}
        pageSizeOptions={[10]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowHeight={() => "auto"}
        localeText={localeText}
        components={components}
      />
    </Box>
  );
};

export default DataGrid;
