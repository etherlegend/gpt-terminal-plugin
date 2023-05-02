import express from 'express';
import cors from 'cors';
import { json } from 'body-parser';
import os from 'os';
import fs from 'fs';
import { exec } from 'child_process';
import path from 'path';

const app = express();

app.use(cors({
  origin: 'https://chat.openai.com'
}));
app.use(json());

app.get('/system/os-version', async (_, res) => {
  const osVersion = os.release();
  res.status(200).json({ os_version: osVersion });
});

app.get('/system/local-time', async (_, res) => {
  const localTime = new Date().toLocaleString();
  res.status(200).json({ local_time: localTime });
});

app.get('/system/current-folder', async (_, res) => {
  const currentFolder = os.homedir();
  res.status(200).json({ current_folder: currentFolder });
});

app.post('/system/command', async (req, res) => {
  const command = req.body.command;

  exec(command, {cwd:os.homedir()}, (error, stdout, stderr) => {
    if (error) {
      res.status(500).json({ output: `Error: ${error.message}` });
      return;
    }
    if (stderr) {
      res.status(200).json({ output: `Stderr: ${stderr ? stderr : "error"}` });
      return;
    }
    res.status(200).json({ output: `Stdout: ${stdout ? (stdout.trim()===""?"ok":stdout) :"ok" }` });
  });
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
  app.listen(5004, '0.0.0.0', () => {
    console.log('Server running on http://0.0.0.0:5004');
  });
};

main();
