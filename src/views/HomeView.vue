<script setup>
import { onMounted, reactive } from 'vue';
import { useCounterStore } from '@/stores/counter';
const store = useCounterStore();
const { setActiveOption } = store;
const cState = reactive({
  activeOption: '',
  shuffledOptions: []
});

const options = [{
  role: "Chat GPT",
  alias: "Chat GPT",
},
{
  role: "A Student",
  alias: "Student",
},
{
  role: "An Academic",
  alias: "Academic",
},
{
  role: "A Manager",
  alias: "Manager",
},
];

function shuffledOptions() {
  for (var i = options.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = options[i];
    options[i] = options[j];
    options[j] = temp;
  }
  console.log(options)
  return options;
}

onMounted(() => {
  cState.shuffledOptions = shuffledOptions();
})

function updateActiveOption(option, role) {
  cState.activeOption = role;
  setActiveOption(role, option);
  localStorage.setItem('role', role);
  localStorage.setItem('activeOption', option);
}

</script>

<template>
  <div class="home-section">
    <div class="home-heading">
      <p>Hello, welcome to xxx</p>
      <p>Which role would you like to chat with today?</p>
    </div>
    <div class="options-stack">
      <div v-for="(option, index) in cState.shuffledOptions" :key="index" class="options">
        <div class="option" :class="{ active: cState.activeOption === option.alias }"
          @click="() => updateActiveOption(option.role, option.alias)">
          <p>{{ option.role }}</p>
        </div>
      </div>
    </div>


    <div class="button-section">
      <RouterLink to="/chat">
        <button :disabled="cState.activeOption === ''" :class="{ active: cState.activeOption !== '' }">

          Next

        </button>
      </RouterLink>
    </div>

  </div>


</template>

<style lang="scss" scoped>
.home {
  &-section {
    text-align: center;
    width: 70%;
    margin: auto;
  }

  &-heading {
    font-size: 22px;
  }
}

.options-stack {
  margin-top: 24px;
  display: flex;
  justify-content: space-between;

  .options {
    width: 24%;

    .option {
      border-radius: 16px;
      border: 1.5px solid #F0F0F0;
      padding: 16px;
      width: 100%;
      box-shadow: 0px 4px 11px 0px #0000000A;
      text-align: left;
      cursor: pointer;

      &.active {
        background-color: #999999;
        color: #FFF;
      }
    }
  }
}

.button-section {
  margin-top: 40px;

  button {
    text-align: center;
    background: #999999;
    color: #FFF;
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05), 0px 1px 3px rgba(0, 0, 0, 0.025);
    padding: 16px 0;
    width: 60%;
    margin: auto;
    border: 0;
    position: relative;
    outline: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;

    &:disabled {
      color: var(--vt-c-text-dark-2);
      background: #99999980;
    }
  }
}
</style>
