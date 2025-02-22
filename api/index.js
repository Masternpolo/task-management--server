const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const port = 3000;
require('dotenv').config();


const userRoutes = require('../routes/user.route')




const db = new Client({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: '230994',
    database: 'Task_manager'
});

db.connect().then(() => console.log('connected to database'))



app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'https://task-manager-steel-pi.vercel.app',
    // origin: 'http://127.0.0.1:5500',

    credentials: true // Allow cookies and other credentials
}));


app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', userRoutes);





// app.post('/register', (req, res) => {
//     const { username, password, email } = req.body;
//     const sql = `SELECT * FROM users WHERE USERNAME = $1`;
//     db.query(sql, [username], (err, result) => {
//         if (err || result.rows) return res.status(401).json({ error: "Username already exits" })
//         const hashedPassword = bcrypt.hashSync(password, 10)
//         console.log(hashedPassword, username, email);

//         const sql2 = `INSERT INTO users(username, password, email) VALUES ($1, $2, $3);`
//         db.query(sql2, [username, hashedPassword, email], (err, result) => {
//             if (err) return res.status(401).send("error registering user");
//             res.status(201).json({ message: 'reg successful' });
//         })
//     })
// })

// app.post('/login', (req, res) => {

//     const { username, password } = req.body;
//     const sql = `SELECT * FROM users WHERE USERNAME = $1`;
//     //checking if username exists
//     db.query(sql, [username], (err, result) => {
//         if (err || !result.rows) return res.status(401).json("Username does not exits");
//         const user = result.rows[0]
//         //comparing password
//         const isvalidPassword = bcrypt.compareSync(password, user.password)
//         if (!isvalidPassword) return res.status(401).json({ error: 'Invalid password' });
//         // generate token
//         const accessToken = generateAccessToken(user)

//         console.log(accessToken);

//         return res.status(200).json({ message: 'login succesful', token: accessToken });
//     })

// })
// app.post('/logout', (req, res) => {
//     res.json({ message: 'Logout successful' })

// })


app.get('/getUser', );

// app.post('/addTask', auth, (req, res) => {
//     console.log('in post task');
//     // getting authenticated user's id
//     const userId = req.user.id
//     // destructuring the request body
//     const priority = req.body.priority.toLowerCase()
//     const { title, description, deadline } = req.body
//     // checking if any of the field is empty
//     if (!title || !description || !priority || !deadline) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }
//     // save task to database
//     const sql2 = `INSERT INTO tasks(task_title, task_description, task_priority, task_deadline, user_id) VALUES ($1, $2, $3, $4, $5);`
//     db.query(sql2, [title, description, priority, deadline, userId], (err, result) => {
//         if (err) return res.status(401).json({ message: "error registering user" });
//         return res.status(201).json({ message: 'Task added successful' });
//     })
//     console.log('Done creating');
// })

// app.get('/getTasks', auth, (req, res) => {
//     // getting the users id
//     const userId = req.user.id
//     const sql = `SELECT * FROM tasks WHERE user_id = $1`
//     db.query(sql, [userId], (err, results) => {
//         if (err) return res.status(401).send('Error registering user');
//         const tasks = results.rows
//         res.status(201).json({ tasks })
//     })
//     console.log('tasks sent to the client');
// })

// app.patch('/update/:id', auth, (req, res) => {
//     const userId = req.user.id
//     const taskId = req.params.id
//     const priority = req.body.priority.toLowerCase()

//     const { title, description, deadline, } = req.body;
//     const sql = `
//     UPDATE tasks
//     SET task_title = $1, task_description = $2,  task_priority = $3, task_deadline = $4 WHERE id = $5 AND user_id = $6`
//     db.query(sql, [title, description, priority, deadline, taskId, userId], (err, result) => {
//         if (err) {
//             console.log('database error', err);
//             return res.status(401).json({ message: 'Error updating task' });
//         }

//         if (result.rowCount === 0) return res.status(404).json({ message: 'Task not found' });

//         res.status(201).json({ message: 'Task updated successfully' })
//     })
// })

// app.delete('/deleteTask/:id', auth, (req, res) => {
//     //checking if the req entered the route
//     console.log('inside delete route');
//     // getting the task_id and users_id
//     const taskId = req.params.id
//     const userId = req.user.id
//     // SQL query to delete the task from database
//     const sql = `DELETE FROM tasks WHERE id = $1 AND user_id = $2`
//     db.query(sql, [taskId, userId], (err, result) => {
//         //checking for errors
//         if (err || result.rowCount === 0) return res.status(404).json({ message: 'No such task or unauthorized' })
//         // on successful request
//         res.status(200).json({ message: 'Task successfully deleted' })
//     })
// })

// app.get('/search/:word', auth, (req, res)=>{
//     const word = req.params.word;
//     const userId = req.user.id;
//     console.log(word);
    
// console.log('inside search', word, userId);

//     const sql = `SELECT * FROM tasks WHERE task_title = $1 AND user_id =$2`
//     db.query(sql,[word, userId], (err, result)=>{
//         if(err){
//             return res.status(404).json({message:'Error getting task or unauthorized'})
//         }
//         const tasks = result.rows;
//         console.log(tasks);
        
//         res.status(200).json({message:'Tasks successfully retireved', tasks})
//     })
// })

// app.get('/filterTasks/:word', auth, (req, res)=>{
//     const word = req.params.word;
//     const userId = req.user.id;
//     console.log(word);

//     const sql = `SELECT * FROM tasks WHERE task_priorirty = $1 AND user_id =$2`
//     db.query(sql,[word, userId], (err, result)=>{
//         if(err){
//             return res.status(404).json({message:'Error getting task or unauthorized'})
//         }
//         const tasks = result.rows;
//         console.log(tasks);
        
//         res.status(200).json({message:'Tasks successfully retireved', tasks})
//     })
// })

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

