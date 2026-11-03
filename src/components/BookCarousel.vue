<script setup>
import { ref, onMounted } from 'vue'
import {
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Star,
  BookOpen
} from 'lucide-vue-next'

const books = ref([])
const loading = ref(false)
const error = ref('')
const carousel = ref(null)

const fetchBooks = async () => {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(
      'https://openlibrary.org/search.json?q=fiction&limit=15&fields=key,title,author_name,cover_i,first_publish_year'
    )

    if (!response.ok) {
      throw new Error('Failed to fetch books')
    }

    const data = await response.json()

    books.value = data.docs
      .filter(book => book.cover_i)
      .map((book, index) => ({
        id: book.key,
        title: book.title,
        author: book.author_name?.[0] || 'Unknown Author',
        year: book.first_publish_year || 'Unknown',
        cover: `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`,
        trending: index < 2
      }))
  } catch (err) {
    error.value = 'Unable to load books. Please try again.'
  } finally {
    loading.value = false
  }
}

const scrollBooks = (direction) => {
  if (carousel.value) {
    carousel.value.scrollBy({
      left: direction * 300,
      behavior: 'smooth'
    })
  }
}

onMounted(() => {
  fetchBooks()
})
</script>
<template>
  <section class="w-full">
    <div class="flex items-center justify-between mb-5">
      <h2 class="text-xl font-bold text-gray-800">
        My Library
      </h2>
      <div class="flex items-center gap-3">
        <button
          @click="scrollBooks(-1)"
          class="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-sky-100 hover:text-sky-500 transition"
        >
          <ChevronLeft :size="23" />
        </button>

        <button
          @click="scrollBooks(1)"
          class="w-9 h-9 rounded-full flex items-center justify-center text-gray-500 hover:bg-sky-100 hover:text-sky-500 transition"
        >
          <ChevronRight :size="23" />
        </button>
      </div>
    </div>
    <div v-if="loading" class="flex justify-center py-16">
      <div class="w-9 h-9 border-4 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
    </div>
    <div v-else-if="error" class="text-center py-10">
      <p class="text-red-500 mb-3">{{ error }}</p>

      <button
        @click="fetchBooks"
        class="px-5 py-2 bg-sky-400 text-white rounded-full"
      >
        Try Again
      </button>
    </div>
    <div
      v-else
      ref="carousel"
      class="flex gap-4 overflow-x-auto scroll-smooth pb-5"
      style="scrollbar-width: none"
    >
      <div
        v-for="(book, index) in books"
        :key="book.id"
        class="group relative flex-shrink-0 w-40 h-64 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
      >
        <img
          :src="book.cover"
          :alt="book.title"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"></div>
        <div
          v-if="book.trending"
          class="absolute top-3 left-2 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1"
        >
          <TrendingUp :size="12" class="text-orange-500" />

          <span class="text-[10px] font-semibold text-gray-700">
            Trending
          </span>
        </div>
        <div class="absolute top-3 right-3">
          <Star :size="17" class="text-white fill-white" />
        </div>
        <div class="absolute bottom-0 left-0 right-0 p-3 text-white">
          <h3 class="text-sm font-semibold line-clamp-2">
            {{ book.title }}
          </h3>
          <p class="text-xs text-gray-300 mt-1 truncate">
            {{ book.author }}
          </p>
          <p class="text-[10px] text-gray-300 mt-1">
            {{ book.year }}
          </p>
        </div>
      </div>
      <div
        v-if="books.length === 0 && !loading"
        class="w-full text-center py-10 text-gray-400"
      >
        <BookOpen :size="35" class="mx-auto mb-3" />
        No books found
      </div>
    </div>
  </section>
</template>
