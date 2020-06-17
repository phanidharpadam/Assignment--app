import React from "react";
import { useState, Fragment } from "react";
import { Tabs, Tab, Button } from "react-bootstrap";
import AddTaskForm from "../Form/AddTaskForm";
import List from "../List/List";
import Search from "../Search/Search";
import data from "../../MockData/data.json";

const options = [
  { value: "None", label: "None" },
  { value: "Low", label: "Low" },
  { value: "Medium", label: "Medium" },
  { value: "High", label: "High" },
];

let idValue = 5;

const App = () => {
  const [errors, setErrors] = useState({});

  const [key, setKey] = useState("allTasks");

  const [open, setOpen] = useState(false);

  const [radioValue, setRadioValue] = useState("open");

  const [search, setSearch] = useState("");

  const [taskDetails, setTaskDetails] = useState({
    id: idValue,
    currentState: true,
    title: "",
    description: "",
    createdAt: new Date(),
    dueDate: new Date(),
    priority: options[0].value,
    mode: "create",
    disabled: false,
    display: "none",
  });

  const [tasks, setTasks] = useState(data.tasks);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    handleCancel();
  };

  const handleDateChange = (date) => {
    setTaskDetails({
      ...taskDetails,
      dueDate: date.toLocaleDateString(),
    });
  };

  const handleTextChange = (event) => {
    const _errors = {};
    if (event.target.id === "title") {
      if (event.target.value.length < 10) {
        _errors.title = "Minimum length is 10 characters";
      } else if (event.target.value.length > 140) {
        _errors.title = "Maximum length is 140 characters";
      }
    }
    if (event.target.id === "description") {
      if (event.target.value.length < 10) {
        _errors.description = "Minimum length is 10 characters";
      } else if (event.target.value.length > 500) {
        _errors.description = "Maximum length is 500 characters";
      }
    }
    setErrors(_errors);
    setTaskDetails({
      ...taskDetails,
      [event.target.id]: [event.target.value].toString(),
    });
  };

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  const handleOptionsChange = (event) => {
    setTaskDetails({
      ...taskDetails,
      [event.target.name]: [event.target.value],
    });
  };

  const handleSearchTextChange = (event) => {
    let keyword = event.target.value;
    setSearch(keyword);
    console.log(search);
  };

  const handleSave = () => {
    if (taskDetails.mode === "create") {
      idValue = idValue + 1;
      taskDetails.id = idValue;
      taskDetails.createdAt = taskDetails.createdAt.toLocaleDateString();
      taskDetails.dueDate = taskDetails.dueDate.toLocaleDateString();
      taskDetails.display = "block";
      tasks.push(taskDetails);
      tasks.reverse();
      setTasks(tasks);
      console.log(tasks);
      handleClose();
      handleCancel();
    } else {
      let rowId = taskDetails.id;
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === rowId) {
          tasks[i].currentState = taskDetails.currentState;
          tasks[i].title = taskDetails.title;
          tasks[i].description = taskDetails.description;
          tasks[i].dueDate = taskDetails.dueDate;
          tasks[i].priority = taskDetails.priority;
          break;
        }
      }
      setTasks(tasks);
      handleClose();
      handleCancel();
    }
  };

  const handleCancel = () => {
    let mode = "create";
    let display = "none";
    if (taskDetails.mode === "edit") {
      mode = "edit";
      display = "block";
    }
    setTaskDetails({
      id: idValue,
      currentState: true,
      title: "",
      description: "",
      createdAt: new Date(),
      dueDate: new Date(),
      priority: options[0].value,
      mode: mode,
      disabled: false,
      display: display,
    });
  };

  const handleCreateForm = () => {
    taskDetails.mode = "create";
    taskDetails.display = "none";
    taskDetails.disabled = false;
    setTaskDetails(taskDetails);
    handleOpen();
  };

  const handleViewForm = (row) => {
    row.mode = "view";
    row.display = "block";
    row.disabled = true;
    Object.assign(taskDetails, row);
    setTaskDetails(taskDetails);
    setErrors({});
    handleOpen();
  };

  const handleEditForm = (row) => {
    row.mode = "edit";
    row.display = "block";
    row.disabled = false;
    Object.assign(taskDetails, row);
    setErrors({});
    handleOpen();
  };
  const handleDelete = (rowId) => {
    let filteredTasks = tasks.filter((task) => {
      return task.id !== rowId;
    });
    setTasks(filteredTasks);
  };

  const handleDone = (rowId) => {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === rowId) {
        tasks[i].currentState = false;
        break;
      }
    }
    setRadioValue("done");
    setTasks(tasks);
    setTaskDetails();
    handleCancel();
  };

  const handleReOpen = (rowId) => {
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === rowId) {
        tasks[i].currentState = true;
        break;
      }
    }
    setRadioValue("open");
    setTasks(tasks);
    setTaskDetails();
    handleCancel();
  };

  return (
    <Fragment>
      <Search search={search} handleChange={handleSearchTextChange} />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="allTasks" title="All tasks">
          {tasks.length > 0 ? (
            <List
              data={tasks}
              open={handleOpen}
              taskDetails={taskDetails}
              handleDelete={handleDelete}
              handleClose={handleClose}
              handleDone={handleDone}
              handleReOpen={handleReOpen}
              handleViewForm={handleViewForm}
              handleEditForm={handleEditForm}
              search={search}
            />
          ) : null}
        </Tab>
        <Tab eventKey="completed" title="Completed">
          {tasks.length > 0 ? (
            <List
              data={tasks.filter((task) => {
                return task.currentState === false;
              })}
              open={handleOpen}
              taskDetails={taskDetails}
              handleDelete={handleDelete}
              handleClose={handleClose}
              handleDone={handleDone}
              handleReOpen={handleReOpen}
              handleViewForm={handleViewForm}
              handleEditForm={handleEditForm}
              search={search}
            />
          ) : null}
        </Tab>
        <Tab eventKey="pending" title="Pending">
          {tasks.length > 0 ? (
            <List
              data={tasks.filter((task) => {
                return task.currentState === true;
              })}
              open={handleOpen}
              taskDetails={taskDetails}
              handleDelete={handleDelete}
              handleClose={handleClose}
              handleDone={handleDone}
              handleReOpen={handleReOpen}
              handleViewForm={handleViewForm}
              handleEditForm={handleEditForm}
              search={search}
            />
          ) : null}
        </Tab>
      </Tabs>
      <div className="btn">
        <Button variant="light" onClick={handleCreateForm}>
          +
        </Button>
      </div>
      {open ? (
        <AddTaskForm
          open={open}
          close={handleClose}
          errors={errors}
          taskDetails={taskDetails}
          options={options}
          handleTextChange={handleTextChange}
          handleDateChange={handleDateChange}
          handleOptionsChange={handleOptionsChange}
          handleSave={handleSave}
          handleCancel={handleCancel}
          handleRadioChange={handleRadioChange}
          radioValue={radioValue}
        />
      ) : null}
    </Fragment>
  );
};

export default App;
