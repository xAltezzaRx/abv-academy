<script setup>
import { onMounted } from "vue";
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentNotesStore } from "../model/notes.store";

const notesStore = useStudentNotesStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(notesStore, "items");

onMounted(() => {
  if (!notesStore.items.length && !notesStore.loading) {
    notesStore.fetchNotes();
  }
});
</script>

<template>
  <section>
    <AppSkeleton v-if="isLoading" :lines="7" />

    <AppError
        v-else-if="isError"
        :message="notesStore.error"
        @retry="notesStore.fetchNotes()"
    />

    <AppEmpty
        v-else-if="isEmpty"
        title="Заметок пока нет"
        description="Когда появятся новые заметки, они будут показаны здесь."
    />

    <div v-else>
      <CabSectionTitle>Заметки</CabSectionTitle>

      <div class="list">
        <CabCard v-for="n in notesStore.items" :key="n.id">
          <div class="note">
            <div class="note__date">{{ n.date }}</div>
            <div class="note__text">{{ n.text }}</div>
          </div>
        </CabCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 14px;
}

.note__date {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--cab-accent-soft);
  color: var(--cab-accent);
  font-size: 12px;
  font-weight: 900;
}

.note__text {
  margin-top: 12px;
  font-size: 14px;
  line-height: 1.5;
  color: var(--cab-text);
}

@media (max-width: 800px) {
  .note__text {
    font-size: 13px;
  }
}
</style>