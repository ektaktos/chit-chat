import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('activeOption', () => {
  const activeOption = ref('')
  const activeValue = ref(0)
  const activeOptionValue = computed(() => activeValue.value)
  function setActiveOption(value, option) {
    activeOption.value = option
    activeValue.value = value
  }

  return { activeOption, activeOptionValue, setActiveOption }
})
