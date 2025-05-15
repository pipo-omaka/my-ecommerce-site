const express = require('express');
const router = express.Router();

const subject = '{"contactSubject": ["General Enquery","Classes","Scheudues","Instructor","Price","Other"]}';
const subject_file = require('../data/contact_subject.json')

router.get('/', (req, res)=> {
    res.json(subject_file);
});

module.exports = router;