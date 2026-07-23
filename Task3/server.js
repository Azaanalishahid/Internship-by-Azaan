const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

// Apply custom logger middleware globally
app.use(logger);

// Parse JSON request bodies
app.use(express.json());

// Serve static frontend UI
app.use(express.static(path.join(__dirname, 'public')));

// Mock database
let users = [
  { id: 1, name: 'Alex Johnson', role: 'Software Engineer', status: 'Active' },
  { id: 2, name: 'Sarah Connor', role: 'DevOps Specialist', status: 'Active' },
  { id: 3, name: 'Michael Scott', role: 'Regional Manager', status: 'On Leave' }
];

// Logger API Endpoints for UI
app.get('/api/logs', (req, res) => {
  res.json({ logs: logger.getLogs() });
});

app.delete('/api/logs', (req, res) => {
  logger.clearLogs();
  res.json({ message: 'Log buffer cleared' });
});

app.get('/api/logger-code', (req, res) => {
  const codePath = path.join(__dirname, 'middleware', 'logger.js');
  fs.readFile(codePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read logger file' });
    res.json({ code: data });
  });
});

// Sample API Endpoints to test logger with various methods
app.get('/api/users', (req, res) => {
  res.json({ success: true, data: users });
});

app.post('/api/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name || `User ${users.length + 1}`,
    role: req.body.role || 'Contributor',
    status: 'Active'
  };
  users.push(newUser);
  res.status(201).json({ success: true, user: newUser });
});

app.put('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find(u => u.id === userId);
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  
  if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;
  if (req.body.status) user.status = req.body.status;

  res.json({ success: true, user });
});

app.delete('/api/users/:id', (req, res) => {
  const userId = parseInt(req.params.id);
  users = users.filter(u => u.id !== userId);
  res.json({ success: true, message: `User ${userId} deleted` });
});

app.get('/api/system/status', (req, res) => {
  res.json({
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    nodeVersion: process.version,
    memoryUsage: process.memoryUsage()
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Logger App running on http://localhost:${PORT}`);
});
