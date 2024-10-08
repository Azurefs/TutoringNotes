import express, { json, Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { port, url } from './config.json';
import {
  clear,
  peopleAdd,
  personView,
  personEdit,
  peopleList,
  personRemove,
  peopleStats,
} from './people';

const app = express();

// Use middleware that allows for access from other domains (needed for frontend to connect)
app.use(cors());
// Use middleware that allows us to access the JSON body of requests
app.use(json());
// Use middleware to log (print to terminal) incoming HTTP requests (OPTIONAL)
app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the root URL of names ages!' });
});

// Basic Extracting from JSON Body
app.post('/people/add', (req: Request, res: Response) => {
  // This is an example of destructuring
  // Look into "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment"
  // If you want to learn more but dimmed down, this is extracting the value
  // of the properties "name" and "age" from the object "req.body" and creates
  // new variables called "name" and "age" and assigns the value to those.
  const { name, age } = req.body;
  const result = peopleAdd(name, age);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Basic Extracting from Query Strings
app.get('/people/list', (req: Request, res: Response) => {
  // We extract minAge variable from query strings and turn into a string
  // After turning into a string, we want to convert it to a number with "parseInt"
  const minAge = parseInt(req.query.minAge as string);
  const result = peopleList(minAge);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Basic Extract from the URL (Params)
app.put('/people/:personId', (req: Request, res: Response) => {
  const personId = parseInt(req.params.personId as string);
  const result = personView(personId);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Get details about a person
app.get('/person/:personId', (req: Request, res: Response) => {
  const personId = parseInt(req.params.personId as string);
  const result = personView(personId);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Update a person
app.put('/person/:personId', (req: Request, res: Response) => {
  const personId = parseInt(req.params.personId as string);
  const { name, age } = req.body;
  const result = personEdit(personId, name, age);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

// Remove a Person
app.delete('/person/:personId', (req: Request, res: Response) => {
  const personId = parseInt(req.params.personId as string);
  const result = personRemove(personId);
  if ('error' in result) {
    return res.status(400).json(result);
  }
  res.json(result);
});

app.delete('/clear', (req: Request, res: Response) => {
  const result = clear();
  res.json(result);
});

app.listen(port, () => {
  console.log(`Express Server started and awaiting requests at the URL: '${url}:${port}'`);
});
