const express = require('express');
const router = express.Router();
const employees = require('../employees.json');

router.get('/employees', (req, res) => {
  if (req.query.page) {
      const page = req.query.page;
      const start = 2 * (page - 1);
      const end = start + 2;
      res.json(employees.slice(start, end));
  } else if (req.query.user === 'true') {
      res.json(employees.filter(employee => employee.privileges === 'user'));
  } else if (req.query.badges === 'black') {
      res.json(employees.filter(employee => employee.badges.includes('black')));
  } else {
      res.json(employees);
  }
});

router.get('/employees/oldest', (req, res) => {
  const oldestEmployee = employees.reduce((oldest, current) => {
      return (oldest.age > current.age) ? oldest : current;
  });
  res.json(oldestEmployee);
});

router.get('/employees/:name', (req, res) => {
  const employee = employees.find(employee => employee.name === req.params.name);
  if (employee) {
      res.json(employee);
  } else {
      res.status(404).json({ code: 'not_found' });
  }
});

router.post('/employees', (req, res) => {
  const newEmployee = req.body;
  if (newEmployee && newEmployee.name && newEmployee.age && newEmployee.privileges && newEmployee.badges) {
      employees.push(newEmployee);
      res.json(newEmployee);
  } else {
      res.status(400).json({ code: 'bad_request' });
  }
});

module.exports = router;