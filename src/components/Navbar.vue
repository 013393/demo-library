
<script setup>
import { ref } from 'vue'
import {
  Bell,
  Moon,
  ChevronDown,
  Sun,
  User,
  Settings,
  LogOut
} from 'lucide-vue-next'
const activeCategory = ref('Literature')
const isDark = ref(false)
const showProfile = ref(false)
const categories = [
  'Literature',
  'Science',
  'Business',
  'History'
]
const selectCategory = (category) => {
  activeCategory.value = category
}
const toggleDarkMode = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>

<template>
  <header class="w-full flex flex-wrap items-center justify-between gap-5 py-3">

    <h1 class="text-2xl font-normal tracking-wide text-gray-800">
      BOOKNEST
    </h1>

    <nav class="flex items-center gap-2 flex-wrap">
      <button
        v-for="category in categories"
        :key="category"
        @click="selectCategory(category)"
        :class="[
          'px-5 py-3 rounded-full text-sm transition duration-300',
          activeCategory === category
            ? 'bg-sky-400 text-white'
            : 'text-gray-700 hover:bg-sky-100'
        ]"
      >
        {{ category }}
      </button>
    </nav>

    <div class="flex items-center gap-3">

      <button class="relative w-9 h-9 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center">
        <Bell :size="19" />
        <span class="absolute top-1 right-1 w-2 h-2 rounded-full bg-pink-400"></span>
      </button>

      <button
        @click="toggleDarkMode"
        class="w-9 h-9 rounded-full bg-sky-100 text-sky-500 flex items-center justify-center"
      >
        <Sun v-if="isDark" :size="19" />
        <Moon v-else :size="19" />
      </button>

      <div class="relative">
        <button
          @click="showProfile = !showProfile"
          class="flex items-center gap-2 bg-sky-100 rounded-full px-3 py-2"
        >
          <span class="w-8 h-8 rounded-full bg-pink-200 flex items-center justify-center text-pink-600">
            <User :size="19" />
          </span>

          <div class="text-left">
            <p class="text-xs font-medium text-gray-700">
              sreynin Carter
            </p>
            <p class="text-xs text-gray-400">
              @leang sreynin
            </p>
          </div>

          <ChevronDown :size="15" class="text-gray-500" />
        </button>

        <div
          v-if="showProfile"
          class="absolute right-0 top-14 w-48 bg-white shadow-lg rounded-xl p-2 z-50"
        >
          <button class="flex items-center gap-3 w-full p-3 hover:bg-sky-50 rounded-lg text-sm">
            <User :size="17" />
            My Profile
          </button>

          <button class="flex items-center gap-3 w-full p-3 hover:bg-sky-50 rounded-lg text-sm">
            <Settings :size="17" />
            Settings
          </button>

          <button class="flex items-center gap-3 w-full p-3 hover:bg-sky-50 rounded-lg text-sm text-red-500">
            <LogOut :size="17" />
            Logout
          </button>
        </div>
      </div>

    </div>
  </header>
</template>
