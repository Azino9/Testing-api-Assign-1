// API: Retrieve Students Above Threshold
// ---------------------------------------
// Task:
// Implement an API to fetch students whose total marks exceed a given threshold.
//
// Endpoint:
// POST /students/above-threshold
//
// Request Body:
// {
//   "threshold": <number>
// }
//
// Response:
// Success: List of students with their names and total marks who meet the criteria.
// Example:
// {
//   "count": 2,
//   "students": [
//     { "name": "Alice Johnson", "total": 433 },
//     { "name": "Bob Smith", "total": 410 }
//   ]
// }
//
// No Matches:
// {
//   "count": 0,
//   "students": []
// }
//
// Purpose:
// Help teachers retrieve and analyze student performance efficiently.


const express = require('express');
const { resolve } = require('path');


const students= require('./data.json')


const app = express();
const PORT = process.env.PORT || 9126;

app.use(express.json());
app.use(express.static('static'));

app.get('/', (req, res) => {
  res.sendFile(resolve(__dirname, 'pages/index.html'));
});


app.post('/student/marks' ,async(req,res) => {

  const {threshold} = req.body;

  try {

    if(threshold === 'number' || threshold<0){
      return res.status(400).json({message:"Enter a non-negative or Valid threshold"});
    }

    else{
      const studentsThreshold = students.filter(student => student.total > threshold)
      .map(student => ({name : student.name, total :student.total})) 

      return res.status(200).json({
        count : studentsThreshold.length,
        student : studentsThreshold

        
      });
    }
    
    
  } catch (error) {
    return res.status(400).json({message:error})
  }



});


app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});




