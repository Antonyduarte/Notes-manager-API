const db = require("../config/cfg");

const noteRepository = {
    async findAllByUserId(userId) {
        const [rows] = await db.query("SELECT * FROM notes WHERE user_id = ?", [userId]);
        return rows;
    },

    async findById(id, userId) {
        const [rows] = await db.query("SELECT * FROM notes WHERE id = ? AND user_id = ?", [id, userId]);
        return rows;
    },

    async searchByText(text, userId) {
        const [rows] = await db.query("SELECT * FROM notes WHERE note LIKE ? AND user_id = ?", [`%${text}%`, userId]);
        return rows;
    },

    async create(title, note, userId) {
        const [result] = await db.query("INSERT INTO notes (title, note, user_id) VALUES(?, ?, ?)", [title, note, userId]);
        return result;
    },

    async update(id, title, note, userId) {
        const [result] = await db.query(
            "UPDATE notes SET title = ?, note = ? WHERE id = ? AND user_id = ?",
            [title, note, id, userId]
        );
        return result;
    },

    async deleteAllByUserId(userId) {
        const [result] = await db.query("DELETE FROM notes WHERE user_id = ?", [userId]);
        return result;
    },

    async deleteById(id, userId) {
        const [result] = await db.query("DELETE FROM notes WHERE id = ? AND user_id = ?", [id, userId]);
        return result;
    }
};

module.exports = noteRepository;