<script setup>
import { Clock, BookOpen, Trash2 } from 'lucide-vue-next'

defineProps({
  books: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits(['view', 'remove'])
</script>

<template>
  <section class="w-full min-w-0">
    <div class="mb-5 flex items-center justify-between gap-2">
      <div class="min-w-0">
        <h2 class="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Clock :size="24" class="shrink-0 text-blue-500" />
          Recently Visited
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Continue exploring books you viewed recently
        </p>
      </div>

      <span class="shrink-0 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600">
        {{ books.length }} Books
      </span>
    </div>

    <div v-if="books.length" class="space-y-3">
      <div
        v-for="book in books"
        :key="book.key"
        class="flex min-w-0 items-center gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
      >
        <img
          :src="book.cover"
          :alt="book.title"
          class="h-20 w-14 shrink-0 rounded-lg object-cover"
        />

        <div class="min-w-0 flex-1">
          <h3 class="truncate text-sm font-bold text-gray-800">
            {{ book.title }}
          </h3>

          <p class="mt-1 truncate text-xs text-gray-500">
            {{ book.author || 'Unknown Author' }}
          </p>

          <span class="mt-2 inline-block text-xs text-blue-500">
            Recently Viewed
          </span>
        </div>

        <div class="flex shrink-0 items-center gap-1">
          <button
            @click="emit('view', book)"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-blue-500 hover:bg-blue-100"
            title="View Book"
          >
            <BookOpen :size="17" />
          </button>

          <button
            @click="emit('remove', book)"
            class="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-500 hover:bg-red-100"
            title="Remove"
          >
            <Trash2 :size="17" />
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="flex min-h-64 flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 text-center"
    >
      <Clock :size="40" class="text-gray-300" />

      <h3 class="mt-3 font-semibold text-gray-600">
        No Recently Visited Books
      </h3>

      <p class="mt-1 text-sm text-gray-400">
        Books you view will appear here.
      </p>
    </div>
  </section>
</template>