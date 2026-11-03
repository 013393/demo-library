<script setup>
import { ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import SearchBar from './components/SearchBar.vue'
import BookCarousel from './components/BookCarousel.vue'
import VisitedSection from './components/VisitedSection.vue'
import ListeningSection from './components/ListeningSection.vue'
import ReadingSection from './components/ReadingSection.vue'

const visitedBooks = ref([
  {
    key: '1',
    title: 'Read People Like a Book',
    author: 'Patrick King',
    cover: 'https://covers.openlibrary.org/b/isbn/9781647432236-L.jpg'
  },
  {
    key: '2',
    title: 'The Outsider',
    author: 'Stephen King',
    cover: 'https://covers.openlibrary.org/b/isbn/9781501180989-L.jpg'
  },
  {
    key: '3',
    title: 'The Midnight Library',
    author: 'Matt Haig',
    cover: 'https://covers.openlibrary.org/b/isbn/9780525559474-L.jpg'
  }
])
</script>

<template>
  <div class="min-h-screen bg-sky-300 p-4 md:p-8">
    <div class="mx-auto max-w-[1700px] rounded-3xl bg-white p-5 md:p-8">

      <Navbar />

      <div class="mt-6 md:ml-16">
        <SearchBar />
      </div>

      <div class="mt-8 flex gap-6">

        <Sidebar />

        <main class="min-w-0 flex-1 space-y-8">

          <BookCarousel />

          <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <VisitedSection :books="visitedBooks" />
            <ListeningSection /> 
            <ReadingSection />
          </div>

        

        </main>

      </div>
    </div>
  </div>
</template>