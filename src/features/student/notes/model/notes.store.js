import { defineStore } from "pinia";
import { notesApi } from "../api/notes.api";

export const useStudentNotesStore = defineStore("studentNotes", {
    state: () => ({
        /** @type {import("./types").NoteItem[]} */
        items: [],
        loading: false,
        error: "",
    }),

    actions: {
        async fetchNotes() {
            this.loading = true;
            this.error = "";
            try {
                this.items = await notesApi.getList();
            } catch (e) {
                this.error = e?.message || "Ошибка загрузки заметок";
            } finally {
                this.loading = false;
            }
        },
    },
});
