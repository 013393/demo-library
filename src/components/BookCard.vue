<script setup>
import { Star, BookOpen, Heart } from 'lucide-vue-next'

defineProps({
  book: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['view', 'favorite'])
</script>

<template>
  <div class="group w-full overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
    <div class="relative overflow-hidden bg-gray-100">
      <img
        :src="book.cover"
        :alt="book.title"
        class="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
      />

      <button
        @click="emit('favorite', book)"
        class="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white text-gray-600 shadow hover:text-red-500"
      >
        <Heart :size="19" />
      </button>

      <div
        v-if="book.trending"
        class="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white"
      >
        Trending
      </div>
    </div>

    <div class="p-4">
      <h3 class="truncate text-base font-bold text-gray-800">
        {{ book.title }}
      </h3>

      <p class="mt-1 truncate text-sm text-gray-500">
        {{ book.author }}
      </p>

      <div class="mt-3 flex items-center justify-between">
        <div class="flex items-center gap-1 text-yellow-500">
          <Star :size="16" fill="currentColor" />
          <span class="text-sm text-gray-600">
            {{ book.rating || '4.5' }}
          </span>
        </div>

        <span class="text-xs text-gray-400">
          {{ book.year || 'Unknown year' }}
        </span>
      </div>

      <button
        @click="emit('view', book)"
        class="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
      >
        <BookOpen :size="17" />
        View Details
      </button>
    </div>
  </div>
</template>
