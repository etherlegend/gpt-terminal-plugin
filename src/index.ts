import express from 'express';
import cors from 'cors';
import fs from 'fs';
import { json } from 'body-parser';

const app = express();

app.use(cors({
  origin: 'https://chat.openai.com'
}));
app.use(json());

// Keep track of todos. Does not persist if Node.js session is restarted.
const _TODOS: { [username: string]: any[] } = {};

const logTodos = (username:string) => {
  console.log('Todos:');
  console.log(_TODOS[username]);
};

app.post('/todos/:username', async (req, res) => {
  const username = req.params.username;
  if (!_TODOS[username]) {
    _TODOS[username] = [];
  }
  _TODOS[username].push(req.body.todo);
  logTodos(username);
  res.status(200).send('OK');
});

app.get('/todos/:username', async (req, res) => {
  const username = req.params.username;
  logTodos(username);
  res.status(200).json(_TODOS[username] || []);
});

app.delete('/todos/:username', async (req, res) => {
  const username = req.params.username;
  const todoIdx = req.body.todo_idx;
  if (0 <= todoIdx && todoIdx < _TODOS[username].length) {
    _TODOS[username].splice(todoIdx, 1);
  }
  logTodos(username);
  res.status(200).send('OK');
});

app.get('/logo.png', async (_, res) => {
  const filename = 'logo.png';
  res.sendFile(filename, { root: '.' });
});

app.get('/.well-known/ai-plugin.json', async (_, res) => {
  fs.readFile('./.well-known/ai-plugin.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(data);
  });
});

app.get('/openapi.yaml', async (_, res) => {
  fs.readFile('openapi.yaml', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }
    res.setHeader('Content-Type', 'text/yaml');
    res.status(200).send(data);
  });
});

const main = () => {
  app.listen(5003, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:5003');
  });
};

main();
