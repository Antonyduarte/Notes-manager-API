const noteService = require("../services/noteService");
const defs = require("../responses");

const noteController = {
    async getAll(req, res) {
        try {
            const result = await noteService.getNotes(req.userId);
            return res.status(200).json(result);
        } catch (error) {
            return res.status(404).json(defs.response("ERROR", "Notes NOT found", 0, null));
        }
    },

    async getById(req, res) {
        try {
            const rows = await noteService.getNoteById(req.params.id, req.userId);
            return res.json(defs.response("Success", "Note found", rows.length, rows));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async search(req, res) {
        try {
            const rows = await noteService.searchNote(req.params.note, req.userId);
            if (rows.length > 0) {
                return res.json(defs.response("Success", "Note(s) found", rows.length, rows));
            }
            return res.status(404).json(defs.response("Error", "Note not found", 0, null));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async create(req, res) {
        try {
            const { title, note } = req.body;
            const result = await noteService.createNote({ title, note, userId: req.userId });
            return res.status(201).json(defs.response("Success", "Note created", result.affectedRows, null));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async update(req, res) {
        try {
            const { title, note } = req.body;
            const result = await noteService.updateNote({ id: req.params.id, title, note, userId: req.userId });
            return res.json(defs.response("Success", "Note successfully updated", result.affectedRows, result));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async deleteAll(req, res) {
        try {
            const result = await noteService.deleteAllNotes(req.userId);
            return res.status(200).json(defs.response("Success", "All notes are deleted", result.affectedRows));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    },

    async deleteById(req, res) {
        try {
            const result = await noteService.deleteNoteById(req.params.id, req.userId);
            return res.status(200).json(defs.response("Success", `Note ${req.params.id} are deleted`, result.affectedRows, null));
        } catch (error) {
            const status = error.status || 500;
            return res.status(status).json(defs.response("Error", error.message || error, 0, null));
        }
    }
};

module.exports = noteController;