import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";

import axios from "axios";

export default class TableComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      people: [],
      editablePeople: [],
      networkError: false,
      openDialog: false,
      selectedRow: 0,
    };
  }

  componentDidMount() {
    axios
      .get("https://localhost:5001/peopleList")
      .then((res) => {
        this.setState({ people: res.data });
      })
      .catch((err) => {
        this.setState({ networkError: true });
      });
  }

  selectRow = (event, id) => {
    this.setState({ selectedRow: id - 1, openDialog: true });
  };

  onSetEdit = (id) => {
    const { editablePeople } = this.state;
    let addEditable = editablePeople;
    addEditable.push(id);
    this.setState({ editablePeople: addEditable });
  };

  oncancelEdit = (id) => {
    const { editablePeople } = this.state;
    let reduceEditable = editablePeople;
    let idToRemove = reduceEditable.indexOf(id);
    reduceEditable.splice(idToRemove, 1);
    this.setState({ editablePeople: reduceEditable });
  };

  handleClose() {
    this.setState({ openDialog: false });
  }

  render() {
    const { people, networkError, openDialog, selectedRow, editablePeople } =
      this.state;
    return (
      <>
        <TableContainer style={{ width: "80%" }} component={Paper}>
          {!networkError ? (
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Id number</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {people.map((row) => (
                  <TableRow hover key={row.id}>
                    {editablePeople.length > 0 &&
                    editablePeople.includes(row.id) ? (
                      <>
                        <TableCell component="th" scope="row">
                          <Input value={row.id} />
                        </TableCell>
                        <TableCell component="th" scope="row">
                          <Input value={row.name} />
                        </TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell
                          onClick={(event) => this.selectRow(event, row.id)}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell
                          onClick={(event) => this.selectRow(event, row.id)}
                        >
                          {row.name}
                        </TableCell>
                      </>
                    )}

                    <TableCell>
                      {editablePeople.length > 0 &&
                      editablePeople.includes(row.id) ? (
                        <>
                          <IconButton
                            aria-label="done"
                            onClick={() =>
                              window.alert(
                                "This feature will be available soon"
                              )
                            }
                          >
                            <DoneIcon />
                          </IconButton>
                          <IconButton
                            aria-label="revert"
                            onClick={() => this.oncancelEdit(row.id)}
                          >
                            <RevertIcon />
                          </IconButton>
                        </>
                      ) : (
                        <IconButton
                          aria-label="delete"
                          onClick={() => this.onSetEdit(row.id)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div>{"can't connect to the server"}</div>
          )}
        </TableContainer>
        <Dialog
          fullScreen
          open={openDialog}
          onClose={() => {
            this.handleClose();
          }}
        >
          <AppBar style={{ position: "relative" }}>
            <Toolbar>
              <IconButton
                edge="start"
                color="inherit"
                onClick={() => {
                  this.handleClose();
                }}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          {people.length > 0 ? (
            <List>
              <ListItem button>
                <ListItemText primary={people[selectedRow].id} secondary="Id" />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary={people[selectedRow].name}
                  secondary="Name"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary={people[selectedRow].bornDate}
                  secondary="Born date"
                />
              </ListItem>
              <Divider />
              <ListItem button>
                <ListItemText
                  primary={people[selectedRow].age}
                  secondary="Age"
                />
              </ListItem>
              <Divider />
            </List>
          ) : null}
        </Dialog>
      </>
    );
  }
}
