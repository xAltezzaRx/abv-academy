import { api } from "@/api/client";
import { mapNotesList } from "./notes.adapter";

export const notesApi = {
    async getList() {
        const dto = await api.get("/student/notes");
        return mapNotesList(dto);
    },
};
