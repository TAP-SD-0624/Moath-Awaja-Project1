const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const courses = require('./topics.json')

app.get('/courses', (req, res) => {
    const frontendCourses = courses.filter(course => course.category === 'Frontend Frameworks and Libraries');
    res.json(frontendCourses);
});


app.get('/course/:id', (req, res) => {
    const courseId = parseInt(req.params.id);
    const course = courses.find(course => course.id === courseId);
    if (course) {
        res.json(course);
    } else {
        res.status(404).json({ message: 'Course not found' });
    }
});

app.get('/search', (req, res) => {
    // console.log('query', req.query.q);
    const query = req.query.q.toLowerCase();
    // console.log('query', query);
    const results = courses.filter(course => course.topic.toLowerCase().includes(query));
    // console.log('results', results);
    res.json(results);
});

app.listen(3000, () => {
    console.log(`Server is running on port 3000`);
});
