import { computed } from "vue";

export const useAsyncViewState = (source, dataKey = "items") => {
    const isLoading = computed(() => source.loading);
    const isError = computed(() => !!source.error);
    const isEmpty = computed(() => {
        const value = source[dataKey];

        if (Array.isArray(value)) return !value.length;
        if (value && typeof value === "object") return false;
        return !value;
    });

    return {
        isLoading,
        isError,
        isEmpty,
    };
};