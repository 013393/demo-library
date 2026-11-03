<script setup>
import { ref, onUnmounted } from 'vue'
import {
  Headphones,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2
} from 'lucide-vue-next'

const audioBooks = ref([
  {
    id: 1,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    duration: '4h 50m',
    audio: '',
    progress: 35
  },
  {
    id: 2,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    cover: 'https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg',
    duration: '11h 35m',
    audio: '',
    progress: 60
  },
  {
    id: 3,
    title: 'Alice in Wonderland',
    author: 'Lewis Carroll',
    cover: 'https://covers.openlibrary.org/b/isbn/9780141321073-L.jpg',
    duration: '3h 15m',
    audio: '',
    progress: 20
  }
])

const currentBook = ref(null)
const isPlaying = ref(false)
const audio = ref(null)

const playBook = (book) => {
  if (!book.audio) {
    alert('Audio is not available for this book yet.')
    return
  }

  if (currentBook.value?.id === book.id && audio.value) {
    if (isPlaying.value) {
      audio.value.pause()
      isPlaying.value = false
    } else {
      audio.value.play()
      isPlaying.value = true
    }
    return
  }

  if (audio.value) {
    audio.value.pause()
  }

  currentBook.value = book
  audio.value = new Audio(book.audio)

  audio.value.play()
    .then(() => {
      isPlaying.value = true
    })
    .catch(() => {
      isPlaying.value = false
      alert('Unable to play this audio.')
    })

  audio.value.onended = () => {
    isPlaying.value = false
  }
}

const nextBook = () => {
  if (!currentBook.value) return

  const index = audioBooks.value.findIndex(
    book => book.id === currentBook.value.id
  )

  const next = audioBooks.value[index + 1]

  if (next) playBook(next)
}

const previousBook = () => {
  if (!currentBook.value) return

  const index = audioBooks.value.findIndex(
    book => book.id === currentBook.value.id
  )

  const previous = audioBooks.value[index - 1]

  if (previous) playBook(previous)
}

onUnmounted(() => {
  if (audio.value) {
    audio.value.pause()
    audio.value = null
  }
})
</script>

<template>
  <section class="w-full min-w-0">
    <div class="mb-5 flex items-center justify-between gap-2">
      <div>
        <h2 class="flex items-center gap-2 text-xl font-bold text-gray-800">
          <Headphones :size="24" class="text-blue-500" />
          Listening Books
        </h2>

        <p class="mt-1 text-sm text-gray-500">
          Enjoy your favorite books with audio
        </p>
      </div>

      <span class="shrink-0 rounded-full bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-600">
        {{ audioBooks.length }} Audio Books
      </span>
    </div>

    <div class="grid grid-cols-1 gap-4">
      <div
        v-for="book in audioBooks"
        :key="book.id"
        class="flex min-w-0 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm transition hover:shadow-md"
      >
        <img
          :src="book.cover"
          :alt="book.title"
          class="h-24 w-16 shrink-0 rounded-xl object-cover"
        />

        <div class="flex min-w-0 flex-1 flex-col">
          <h3 class="line-clamp-1 font-bold text-gray-800">
            {{ book.title }}
          </h3>

          <p class="mt-1 line-clamp-1 text-sm text-gray-500">
            {{ book.author }}
          </p>

          <p class="mt-1 text-xs text-gray-400">
            {{ book.duration }}
          </p>

          <div class="mt-2 h-1.5 overflow-hidden rounded-full bg-gray-200">
            <div
              class="h-full rounded-full bg-blue-500"
              :style="{ width: book.progress + '%' }"
            ></div>
          </div>

          <div class="mt-2 flex items-center justify-between gap-2">
            <span class="text-xs text-gray-500">
              {{ book.progress }}% completed
            </span>

            <button
              @click="playBook(book)"
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-500 text-white hover:bg-blue-600"
            >
              <Pause
                v-if="currentBook?.id === book.id && isPlaying"
                :size="16"
              />
              <Play v-else :size="16" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="currentBook"
      class="mt-5 rounded-2xl bg-blue-50 p-4"
    >
      <div class="flex items-center gap-3">
        <img
          :src="currentBook.cover"
          class="h-14 w-12 rounded-lg object-cover"
          :alt="currentBook.title"
        />

        <div class="min-w-0 flex-1">
          <h3 class="truncate font-bold text-gray-800">
            {{ currentBook.title }}
          </h3>

          <p class="truncate text-sm text-gray-500">
            {{ currentBook.author }}
          </p>
        </div>

        <Volume2 :size="20" class="text-blue-500" />
      </div>

      <div class="mt-4 flex items-center justify-center gap-7">
        <button @click="previousBook" class="text-gray-500 hover:text-blue-500">
          <SkipBack :size="22" />
        </button>

        <button
          @click="playBook(currentBook)"
          class="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white"
        >
          <Pause v-if="isPlaying" :size="22" />
          <Play v-else :size="22" />
        </button>

        <button @click="nextBook" class="text-gray-500 hover:text-blue-500">
          <SkipForward :size="22" />
        </button>
      </div>
    </div>
  </section>
</template>