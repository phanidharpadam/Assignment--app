import React from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import useSortableData from "./useSortableData";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    width: 1295,
  },
});

export default function List(props) {
  const classes = useStyles();
  const [sort, setSort] = React.useState(false);
  const rows = props.data.filter((data) => {
    if (
      props.search === "" ||
      props.search === null ||
      props.search === undefined
    ) {
      return data;
    } else if (
      data.title.toLowerCase().includes(props.search.toLowerCase()) ||
      data.description.toLowerCase().includes(props.search.toLowerCase())
    ) {
      return data;
    }
  });

  const { items, requestSort, sortConfig } = useSortableData(props.data);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                onClick={() => {
                  setSort(true);
                  requestSort("title");
                }}
                className={getClassNamesFor("title")}
              >
                Summary{" "}
              </StyledTableCell>{" "}
              <StyledTableCell
                align="right"
                onClick={() => {
                  setSort(true);
                  requestSort("priority");
                }}
                className={getClassNamesFor("priority")}
              >
                Priority{" "}
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => {
                  setSort(true);
                  requestSort("createdAt");
                }}
                className={getClassNamesFor("createdAt")}
              >
                Created On
              </StyledTableCell>
              <StyledTableCell
                align="right"
                onClick={() => {
                  setSort(true);
                  requestSort("dueDate");
                }}
                className={getClassNamesFor("dueDate")}
              >
                Due Date
              </StyledTableCell>
              <StyledTableCell align="right">Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          {sort ? (
            <TableBody>
              {items.map((row) => (
                <StyledTableRow
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.currentState === false ? "	#4CAF50" : null,
                  }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.priority}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.dueDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        if (window.confirm("Are you sure, want to delete! ")) {
                          props.handleDelete(row.id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        props.handleEditForm(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {row.currentState ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          props.handleDone(row.id);
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        style={{ background: "white" }}
                        onClick={() => {
                          props.handleReOpen(row.id);
                        }}
                      >
                        Re-Open
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow
                  key={row.id}
                  style={{
                    backgroundColor:
                      row.currentState === false ? "	#4CAF50" : null,
                  }}
                >
                  <StyledTableCell
                    component="th"
                    scope="row"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.title}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.priority}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.createdAt}
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    onClick={() => {
                      props.handleViewForm(row);
                    }}
                  >
                    {row.dueDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton
                      aria-label="delete"
                      onClick={() => {
                        if (window.confirm("Are you sure, want to delete! ")) {
                          props.handleDelete(row.id);
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="edit"
                      onClick={() => {
                        props.handleEditForm(row);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    {row.currentState ? (
                      <Button
                        color="primary"
                        onClick={() => {
                          props.handleDone(row.id);
                        }}
                      >
                        Done
                      </Button>
                    ) : (
                      <Button
                        color="primary"
                        style={{ background: "white" }}
                        onClick={() => {
                          props.handleReOpen(row.id);
                        }}
                      >
                        Re-Open
                      </Button>
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
