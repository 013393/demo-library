
<script setup>
import { ref } from 'vue'
import {
  House,
  Compass,
  LayoutGrid,
  BookOpen,
  Heart,
  Settings
} from 'lucide-vue-next'

const activeMenu = ref('Library')

const menus = [
  { name: 'Home', icon: House },
  { name: 'Explore', icon: Compass },
  { name: 'Categories', icon: LayoutGrid },
  { name: 'Library', icon: BookOpen },
  { name: 'Favorites', icon: Heart },
  { name: 'Settings', icon: Settings }
]

const selectMenu = (menu) => {
  activeMenu.value = menu
}
</script>

<template>
  <aside class="w-14 flex flex-col items-center gap-3 py-4 bg-white rounded-full shadow-md h-fit">

    <button
      v-for="menu in menus"
      :key="menu.name"
      @click="selectMenu(menu.name)"
      :title="menu.name"
      :class="[
        'w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300',
        activeMenu === menu.name
          ? 'bg-sky-400 text-white shadow-md'
          : 'text-gray-500 hover:bg-sky-100 hover:text-sky-500'
      ]"
    >
      <component :is="menu.icon" :size="20" :strokeWidth="1.8" />
    </button>
  </aside>
</template>
