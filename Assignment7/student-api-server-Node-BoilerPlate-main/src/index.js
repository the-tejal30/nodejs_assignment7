const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
app.use(express.urlencoded());

//importing data
const studentArray = require('./InitialData');

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get('/api/student',(req,res)=>{
    res.status(200).json({studentArray})
})

app.get('/api/student/:id',(req,res)=> {
    const query = parseInt(req.params.id);

    let student = studentArray.find((student)=>{
        return student.id === query;
    })

    if(student) {
        res.status(200).json({
            details: student
        })
    }
    else {
        res.status(404).json({
            message: 'Please enter valid id, student not found'
        })
    }
})

app.post('/api/student',(req,res)=> {
    const {name, currentClass, division} = req.body;

    let length = studentArray.length;
    let newId = ++length;
    // console.log(newId);

    if(name && currentClass && division) {
        const newStudent = {
            id: newId,
            name,
            currentClass,
            division
        };
        studentArray.push(newStudent);
        res.status(200).json({id: newStudent.id})
    }
    else {
        res.status(400).json({
            message: 'Please provide full details of student'
        })
    }
})

app.put('/api/student/:id', (req, res) => {
    const queryID = parseInt(req.params.id);
    const newName = req.body.name;
    let student = studentArray.find((student) => {
        return student.id === queryID;
    });

    if (!student) {
        res.status(400).json({
            message: "Student not found. Please provide a valid ID."
        });
    } else if (!newName) {
        res.status(400).json({
            message: "Invalid update data. Please provide a new name."
        });
    } else {
        student.name = newName;
        res.status(200).json({
            message: `Student details with ID ${queryID} updated successfully!`
        });
    }
});

app.delete('/api/student/:id',(req,res)=> {
    const queryID = parseInt(req.query.id);
    let student = studentArray.findIndex((student)=> {
        return student.id === queryID
    })

    if(student) {
        studentArray.splice(student, 1);
        res.status(200).json({
            message: 'Student record deleted successfully!'
        })
    }
    else {
        res.status(404).json({
            message: 'Student not found'
        })
    }
})


app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app; 






