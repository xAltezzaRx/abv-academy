<script setup>
import AppSkeleton from "@/shared/ui/AppSkeleton.vue";
import AppError from "@/shared/ui/AppError.vue";
import AppEmpty from "@/shared/ui/AppEmpty.vue";
import CabCard from "@/shared/ui/CabCard.vue";
import CabSectionTitle from "@/shared/ui/CabSectionTitle.vue";
import { useAsyncViewState } from "@/shared/lib/useAsyncViewState";
import { useStudentNotesStore } from "../model/notes.store";

const notesStore = useStudentNotesStore();
const { isLoading, isError, isEmpty } = useAsyncViewState(notesStore, "items");
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
          <div class="date">{{ n.date }}</div>
          <div class="text">{{ n.text }}</div>
        </CabCard>
      </div>
    </div>
  </section>
</template>

<style scoped>
.list {
  display: grid;
  gap: 12px;
}

.date {
  font-weight: 900;
  font-size: 12px;
  opacity: .7;
  margin-bottom: 8px;
}

.text {
  font-size: 13px;
  line-height: 1.4;
  opacity: .9;
}
</style>