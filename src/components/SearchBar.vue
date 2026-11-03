<script setup>
import { ref } from 'vue'
import {
  Search,
  ChevronDown,
  X
} from 'lucide-vue-next'
const searchQuery = ref('')
const selectedCategory = ref('All Category')
const selectedYear = ref('Years')
const categories = [
  'All Category',
  'Literature',
  'Science',
  'Business',
  'History'
]

const years = [
  'Years',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
]

const clearSearch = () => {
  searchQuery.value = ''
}
</script>
<template>
  <div class="w-full flex items-center gap-3 flex-wrap">
    <div class="flex-1 min-w-[200px] flex items-center gap-3 px-5 py-3 border border-gray-200 rounded-full shadow-sm focus-within:border-sky-400 transition">
      <Search :size="20" class="text-gray-400" />

      <input
        v-model="searchQuery"
        type="text"
        placeholder="Which book were you looking for?"
        class="w-full outline-none text-sm text-gray-700 placeholder:text-gray-400"
      />

      <button
        v-if="searchQuery"
        @click="clearSearch"
        class="text-gray-400 hover:text-red-500"
      >
        <X :size="17" />
      </button>

    </div>
    <div class="relative">
      <select
        v-model="selectedCategory"
        class="appearance-none cursor-pointer min-w-[140px] px-5 py-3 pr-10 border border-gray-200 rounded-full bg-white text-sm text-gray-500 shadow-sm outline-none hover:border-sky-400"
      >
        <option
          v-for="category in categories"
          :key="category"
          :value="category"
        >
          {{ category }}
        </option>
      </select>

      <ChevronDown
        :size="15"
        class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>

    <!-- Year Filter -->
    <div class="relative">
      <select
        v-model="selectedYear"
        class="appearance-none cursor-pointer min-w-[90px] px-4 py-3 pr-9 border border-gray-200 rounded-full bg-white text-sm text-gray-500 shadow-sm outline-none hover:border-sky-400"
      >
        <option
          v-for="year in years"
          :key="year"
          :value="year"
        >
          {{ year }}
        </option>
      </select>

      <ChevronDown
        :size="15"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  </div>
</template>
