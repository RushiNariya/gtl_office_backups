const express = require('express');
const deleteNotes = require("../controller/deleteNote");
const postNote = require('../controller/postNote');
const allNotes = require('../controller/getNotes');
// const { ensureToken } = require("../jwtUtils");

const router = express.Router();

router.post('/add', postNote.postNote);

router.get('/all', allNotes.getNotes);

router.delete('/:id', deleteNotes.deleteNote);
// router.post("/login", loginUser.login);

module.exports = router;
