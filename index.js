const express = require('express');
const cors = require('cors');


const app = express();
const PORT = 9127;

app.use(express.json());
app.use(cors());


const students = require('./data.json');

app.get('/',(req,res) => {
    res.send("Teacher and student threshold marks Search");
})

app.post('/students/above-threshold',(req,res) => {

    const {threshold} = req.body;

    try {
        
    // If threshold is not entered or is it string or number or if it is less than 0  
    if( !threshold || threshold === 'number' || threshold<0){
        return res.status(400).json({message : "Enter a Valid and non-negative threshold"});
    }




    // If threshold given , also for its respective below another if threshold = what if threshold is  not there 
    if(threshold){
        
        const studentsThreshold = students.filter(student => student.total > threshold)
        .map(student => ({name : student.name , total : student.total}))
        return res.status(200).json({
            count : studentsThreshold.length,
            students : studentsThreshold
        });

    }

    // above threshold consdition is given to write this one what will happen if threshold not presnet or exceeded
    if(threshold > students.total){
        return res.status(404).json({
            count :0,
            students : []
        })
    }


    } catch (error) {
        console.log(error.message)
    }

})

app.listen(PORT, () => {
    console.log(`Successfully running at http://localhost:${PORT}`)
})