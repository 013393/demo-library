<script setup>
import { ref, computed } from 'vue'
import { BookOpen, Search, LayoutGrid, List, Trash2 } from 'lucide-vue-next'
import BookCard from './BookCard.vue'
const props = defineProps({
  books: {
    type: Array,
    default: () => []
  }
})
const emit = defineEmits(['view', 'remove'])
const searchQuery = ref('')
const activeView = ref('grid')
const filteredBooks = computed(() => {
  return props.books.filter(book =>
    book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    (book.author || '').toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
<template>
  <section class="w-full">
    <div class="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="flex items-center gap-2 text-2xl font-bold text-gray-800">
          <BookOpen :size="25" class="text-blue-500" />
          My Library
        </h2>
        <p class="mt-1 text-sm text-gray-500">
          Manage your favorite books
        </p>
      </div>
      <span class="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-600">
        {{ filteredBooks.length }} Books
      </span>
    </div>

    <div class="mb-6 flex flex-wrap items-center gap-3">
      <div class="relative min-w-48 flex-1">
        <Search
          :size="18"
          class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search your library..."
          class="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-400"
        />
      </div>

      <div class="flex gap-2">
        <button
          @click="activeView = 'grid'"
          class="rounded-xl p-3"
          :class="activeView === 'grid' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'"
        >
          <LayoutGrid :size="19" />
        </button>

        <button
          @click="activeView = 'list'"
          class="rounded-xl p-3"
          :class="activeView === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'"
        >
          <List :size="19" />
        </button>
      </div>
    </div>

    <div
      v-if="filteredBooks.length"
      :class="activeView === 'grid'
        ? 'grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-4'
        : 'flex flex-col gap-4'"
    >
      <div
        v-for="book in filteredBooks"
        :key="book.key"
        class="relative"
        :class="activeView === 'list' ? 'flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm' : ''"
      >
        <div :class="activeView === 'list' ? 'w-28 shrink-0' : ''">
          <BookCard
            v-if="activeView === 'grid'"
            :book="book"
            @view="emit('view', $event)"
          />

          <img
            v-else
            :src="book.cover"
            :alt="book.title"
            class="h-36 w-full rounded-xl object-cover"
          />
        </div>

        <div v-if="activeView === 'list'" class="min-w-0 flex-1">
          <h3 class="truncate font-bold text-gray-800">
            {{ book.title }}
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            {{ book.author }}
          </p>
          <p class="mt-1 text-xs text-gray-400">
            {{ book.year || 'Unknown year' }}
          </p>

          <button
            @click="emit('view', book)"
            class="mt-3 rounded-lg bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600"
          >
            View Details
          </button>
        </div>
      </div>
    </div>

    <div
      v-else
      class="rounded-2xl border-2 border-dashed border-gray-200 py-16 text-center"
    >
      <BookOpen :size="40" class="mx-auto text-gray-300" />
      <h3 class="mt-3 font-semibold text-gray-600">
        No books found
      </h3>
      <p class="mt-1 text-sm text-gray-400">
        Your library is empty or no books match your search.
      </p>
    </div>
  </section>
</template>
