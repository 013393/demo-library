<script setup>
import { ref } from 'vue'
import {
  BookOpen,
  Clock,
  Play,
  CheckCircle
} from 'lucide-vue-next'

const readingBooks = ref([
  {
    id: 1,
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    progress: 65,
    pages: 320,
    currentPage: 208
  },
  {
    id: 2,
    title: 'The Psychology of Money',
    author: 'Morgan Housel',
    cover: 'https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg',
    progress: 40,
    pages: 256,
    currentPage: 102
  },
  {
    id: 3,
    title: 'Rich Dad Poor Dad',
    author: 'Robert T. Kiyosaki',
    cover: 'https://covers.openlibrary.org/b/isbn/9781612680194-L.jpg',
    progress: 85,
    pages: 336,
    currentPage: 286
  }
])

const continueReading = (book) => {
  if (book.currentPage < book.pages) {
    book.currentPage++

    book.progress = Math.round(
      (book.currentPage / book.pages) * 100
    )
  }
}
</script>

<template>
  <section class="w-full min-w-0">
    <div class="mb-5 flex items-center justify-between gap-2">
      <div>
        <h2 class="flex items-center gap-2 text-xl font-bold text-gray-800">
          <BookOpen :size="24" class="text-blue-500" />
          Continue Reading
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Pick up where you left off
        </p>
      </div>

      <span class="shrink-0 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600">
        {{ readingBooks.length }} Books
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
      <div
        v-for="book in readingBooks"
        :key="book.id"
        class="flex min-w-0 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
      >
        <img
          :src="book.cover"
          :alt="book.title"
          class="h-44 w-28 shrink-0 rounded-xl object-cover"
        />

        <div class="flex min-w-0 flex-1 flex-col">
          <h3 class="line-clamp-2 text-sm font-bold leading-6 text-gray-800">
            {{ book.title }}
          </h3>

          <p class="mt-1 line-clamp-2 text-sm text-gray-500">
            {{ book.author }}
          </p>

          <div class="mt-4">
            <div class="mb-2 flex flex-wrap justify-between gap-1 text-xs">
              <span class="text-gray-400">Progress</span>
              <span class="font-semibold text-blue-500">
                {{ book.progress }}%
              </span>
            </div>

            <div class="h-2 overflow-hidden rounded-full bg-gray-200">
              <div
                class="h-full rounded-full bg-blue-500 transition-all"
                :style="{ width: book.progress + '%' }"
              ></div>
            </div>
          </div>

          <div class="mt-3 flex items-center gap-1 text-xs text-gray-400">
            <Clock :size="14" />
            Page {{ book.currentPage }} / {{ book.pages }}
          </div>

          <button
            v-if="book.progress < 100"
            @click="continueReading(book)"
            class="mt-auto w-full rounded-lg bg-blue-500 px-2 py-2 text-xs font-semibold text-white hover:bg-blue-600"
          >
            <Play :size="14" class="mr-1 inline" />
            Continue
          </button>

          <div
            v-else
            class="mt-auto text-sm font-semibold text-green-600"
          >
            <CheckCircle :size="16" class="mr-1 inline" />
            Completed
          </div>
        </div>
      </div>
    </div>
  </section>
</template>