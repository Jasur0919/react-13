 
// import React, { useState } from 'react';
// import { Container, Grid, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Select, MenuItem } from '@mui/material';
// // import { Delete , DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
// import { FaRegEdit } from "react-icons/fa";
// import { FaTrashAlt } from "react-icons/fa";

// const App = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTaskTitle, setNewTaskTitle] = useState('');
//   const [newTaskStatus, setNewTaskStatus] = useState('open');
//   const [editTask, setEditTask] = useState(null);

//   const addTask = () => {
//     setTasks([...tasks, { title: newTaskTitle, status: newTaskStatus }]);
//     setNewTaskTitle('');
//   };

//   const deleteTask = (index) => {
//     const updatedTasks = tasks.filter((_, i) => i !== index);
//     setTasks(updatedTasks);
//   };

//   const changeStatus = (index, status) => {
//     const updatedTasks = tasks.map((task, i) => i === index ? { ...task, status } : task);
//     setTasks(updatedTasks);
//   };

//   const startEditTask = (index) => {
//     setEditTask(index);
//     setNewTaskTitle(tasks[index].title);
//     setNewTaskStatus(tasks[index].status);
//   };

//   const updateTask = () => {
//     const updatedTasks = tasks.map((task, i) => i === editTask ? { title: newTaskTitle, status: newTaskStatus } : task);
//     setTasks(updatedTasks);
//     setNewTaskTitle('');
//     setEditTask(null);
//   };

//   return (
//     <Container>
//       <h1>Task Manager</h1>

//       <Paper elevation={3} style={{ padding: '10px', marginTop: '20px', marginBottom: '50px' }}>
//         <h2>{editTask !== null ? 'Edit Task' : 'Add Task'}</h2>
//         <TextField
//           label="Task Title"
//           value={newTaskTitle}
//           onChange={(e) => setNewTaskTitle(e.target.value)}
//           fullWidth
//         />
//         <Select
//         required
//           value={newTaskStatus}
//           onChange={(e) => setNewTaskStatus(e.target.value)}
//           fullWidth
//           style={{ marginTop: '10px' }}
//         >
//           {['open', 'pending', 'inprog', 'complete'].map((status) => (
//             <MenuItem required key={status} value={status}>{status}</MenuItem>
//           ))}
//         </Select>
//         <Button
//           variant="contained"
//           color="primary"
//           onClick={editTask !== null ? updateTask : addTask}
//           style={{ marginTop: '10px' }}
//         >
//           {editTask !== null ? 'Update Task' : 'Add Task'}
//         </Button>
//       </Paper>
//       <Grid container spacing={3} style={{color: 'bleck'}} >
//         {['open', 'pending', 'inprog', 'complete'].map((status) => (
//           <Grid item xs={3} key={status}>
//             <Paper elevation={3} style={{ padding: '10px' , flexWrap: 'wrap'}}>
//               <h2 style={{color: 'bleck'}}>{status}</h2>
//               <List style={{flexWrap: 'wrap'}} >
//                 {tasks.filter(task => task.status === status).map((task, index) => (
//                   <ListItem key={index} >
//                     <ListItemText primary={task.title} />
//                     <IconButton edge="end" aria-label="edit" onClick={() => startEditTask(index)}>
//                       {/* <EditIcon /> */}
//                       <FaRegEdit style={{color: 'blue'}}/>
//                     </IconButton>
//                     <IconButton  edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
//                       {/* <DeleteIcon /> */}
//                       <FaTrashAlt  style={{color: 'red'}}/>

//                     </IconButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           </Grid>
//         ))}
//       </Grid>
   
//     </Container>
//   );
// };

// export default App;


import React, { useState } from 'react';
import { Container, Grid, Paper, TextField, Button, List, ListItem, ListItemText, IconButton, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { FaRegEdit } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('open');
  const [editTask, setEditTask] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewTaskTitle('');
    setNewTaskStatus('open');
    setEditTask(null);
  };

  const addTask = () => {
    setTasks([...tasks, { title: newTaskTitle, status: newTaskStatus }]);
    handleCloseModal();
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const startEditTask = (index) => {
    setEditTask(index);
    setNewTaskTitle(tasks[index].title);
    setNewTaskStatus(tasks[index].status);
    handleOpenModal();
  };

  const updateTask = () => {
    const updatedTasks = tasks.map((task, i) => i === editTask ? { title: newTaskTitle, status: newTaskStatus } : task);
    setTasks(updatedTasks);
    handleCloseModal();
  };

  return (
    <Container>
      <h1>Task Manager</h1>
      <Button variant="contained" color="primary" onClick={handleOpenModal} style={{ marginBottom: '20px' }}>
        Add Task
      </Button>

      <Dialog open={isModalOpen} onClose={handleCloseModal}>
        <DialogTitle>{editTask !== null ? 'Edit Task' : 'Add Task'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Task Title"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            fullWidth
            margin="dense"
          />
          <Select
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
            fullWidth
            margin="dense"
          >
            {['open', 'pending', 'inprog', 'complete'].map((status) => (
              <MenuItem key={status} value={status}>{status}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="secondary">
            Cancel
          </Button>
          <Button onClick={editTask !== null ? updateTask : addTask} color="primary">
            {editTask !== null ? 'Update Task' : 'Add Task'}
          </Button>
        </DialogActions>
      </Dialog>

      <Grid container spacing={3}>
        {['open', 'pending', 'inprog', 'complete'].map((status) => (
          <Grid item xs={3} key={status}>
            <Paper elevation={3} style={{ padding: '10px' }}>
              <h2>{status}</h2>
              <List>
                {tasks.filter(task => task.status === status).map((task, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={task.title} />
                    <IconButton edge="end" aria-label="edit" onClick={() => startEditTask(index)}>
                      <FaRegEdit style={{ color: 'blue' }} />
                    </IconButton>
                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTask(index)}>
                      <FaTrashAlt style={{ color: 'red' }} />
                    </IconButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default App;
