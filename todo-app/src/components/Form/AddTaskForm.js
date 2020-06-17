import React from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import MenuItem from "@material-ui/core/MenuItem";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Box from "@material-ui/core/Box";

const AddTaskForm = (props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.close}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">TASK FORM</DialogTitle>
      <DialogContent>
        <form noValidate autoComplete="off">
          <TextField
            disabled={props.taskDetails.disabled}
            autoFocus
            margin="dense"
            id="title"
            label="Summary"
            fullWidth
            onChange={props.handleTextChange}
            value={props.taskDetails.title}
            error={props.errors.title}
            helperText={props.errors.title}
          />
          <br />
          <TextField
            disabled={props.taskDetails.disabled}
            autoFocus
            margin="dense"
            id="description"
            label="Description"
            multiline
            rowsMax={4}
            fullWidth
            onChange={props.handleTextChange}
            value={props.taskDetails.description}
            error={props.errors.description}
            helperText={props.errors.description}
          />
          <TextField
            disabled={props.taskDetails.disabled}
            select
            name="priority"
            label="Priority"
            value={props.taskDetails.priority}
            onChange={props.handleOptionsChange}
            fullWidth
          >
            {props.options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disabled={props.taskDetails.disabled}
              disableToolbar
              format="MM/dd/yyyy"
              margin="normal"
              id="dueDate"
              label="Due date"
              fullWidth
              value={props.taskDetails.dueDate}
              onChange={props.handleDateChange}
            />
          </MuiPickersUtilsProvider>

          <Box component="span" display={props.taskDetails.display}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                disabled={true}
                disableToolbar
                format="MM/dd/yyyy"
                margin="normal"
                id="createdAt"
                label="Created On"
                fullWidth
                value={props.taskDetails.createdAt}
              />
            </MuiPickersUtilsProvider>
          </Box>
          <Box component="span" display={props.taskDetails.display}>
            <FormLabel component="legend">Current Status</FormLabel>
            <RadioGroup
              name="taskStatus"
              value={props.radioValue}
              onChange={props.handleChange}
            >
              <FormControlLabel
                disabled={true}
                value="open"
                control={<Radio />}
                label="Open"
              />
              <FormControlLabel
                disabled={true}
                value="done"
                control={<Radio />}
                label="Done"
              />
            </RadioGroup>
          </Box>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color="primary"
          disabled={props.taskDetails.disabled}
          onClick={props.handleCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          disabled={props.taskDetails.disabled}
          onClick={props.handleSave}
        >
          Save Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddTaskForm;
