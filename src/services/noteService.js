const noteRepository = require("../repositories/noteRepository");

const noteService = {
    async getNotes(userId) {
        return await noteRepository.findAllByUserId(userId);
    },

    async getNoteById(id, userId) {
        if (!Number.isInteger(Number(id))) {
            throw { status: 400, message: "ID must be a number !" };
        }
        const rows = await noteRepository.findById(id, userId);
        if (rows.length === 0) {
            throw { status: 404, message: "Note not found" };
        }
        return rows;
    },

    async searchNote(noteText, userId) {
        if (!noteText || noteText.trim() === "") {
            throw { status: 400, message: "Search term is required" };
        }
        return await noteRepository.searchByText(noteText, userId);
    },

    async createNote({ title, note, userId }) {
        if (!title || title.trim() === "") {
            throw { status: 400, message: "Title can not be empty" };
        }
        if (!note || note.trim() === "") {
            throw { status: 400, message: "Note must be a content" };
        }
        return await noteRepository.create(title, note, userId);
    },

    async updateNote({ id, title, note, userId }) {
        if (!title || title.trim() === "") {
            throw { status: 400, message: "Title can not be empty" };
        }
        if (!note || note.trim() === "") {
            throw { status: 400, message: "Note must be a content" };
        }
        
        const result = await noteRepository.update(id, title, note, userId);
        if (result.affectedRows === 0) {
            throw { status: 404, message: "ID not found" };
        }
        return result;
    },

    async deleteAllNotes(userId) {
        const result = await noteRepository.deleteAllByUserId(userId);
        if (result.affectedRows <= 0) {
            throw { status: 400, message: "Do not exists notes here!" };
        }
        return result;
    },

    async deleteNoteById(id, userId) {
        const result = await noteRepository.deleteById(id, userId);
        if (result.affectedRows === 0) {
            throw { status: 404, message: "Note not found" };
        }
        return result;
    }
};

module.exports = noteService;