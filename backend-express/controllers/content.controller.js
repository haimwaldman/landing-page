// backend-express/controllers/content.controller.js
import db from '../utils/db.js';
import { nanoid } from 'nanoid';

export const getAllContent = async (req, res) => {
  await db.read();
  res.json({
    contents: db.data.contents || [],
    config: db.data.config || {}
  });
};

export const createContent = async (req, res) => {
  await db.read();
  const content = { ...req.body, id: nanoid() };
  db.data.contents.push(content);
  await db.write();
  res.status(201).json(content);
};

export const updateContent = async (req, res) => {
  await db.read();
  const idx = db.data.contents.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).send('Not found');
  db.data.contents[idx] = { ...db.data.contents[idx], ...req.body };
  await db.write();
  res.json(db.data.contents[idx]);
};

export const deleteContent = async (req, res) => {
  await db.read();
  db.data.contents = db.data.contents.filter(c => c.id !== req.params.id);
  await db.write();
  res.status(204).send();
};

export const updateConfig = async (req, res) => {
  await db.read();
  db.data.config = { ...db.data.config, ...req.body };
  await db.write();
  res.json(db.data.config);
};