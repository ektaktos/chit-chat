<script setup>
// import { useCounterStore } from '@/stores/counter';
import axios from 'axios'
import { onMounted, reactive } from 'vue';
// const store = useCounterStore();
// const { activeOption } = store;
const cState = reactive({
  message: '',
  messages: [],
  role: '',
  activeOption: '',
  loading: false
});

onMounted(() => {
  cState.role = localStorage.getItem('role');
  cState.activeOption = localStorage.getItem('activeOption');
})

async function sendChat(e) {
  e.preventDefault();
  cState.loading = true;
  cState.messages.push({ role: "sender", message: cState.message })
  const requestData = {
    "model": "gpt-3.5-turbo",
    "messages": [{ "role": "user", "content": cState.message }],
    "temperature": 0.7
  }
  try {
    const response = await axios.post('https://api.openai.com/v1/chat/completions', requestData, { headers: { "Content-Type": "application/json", "Authorization": `Bearer ${import.meta.env.VITE_OPEN_AI_API_KEY}` } });
    console.log(response.data.choices[0]);
    const responseMessage = response.data.choices[0].message.content;
    cState.messages.push({ role: "responder", message: responseMessage })
    cState.message = "";
    cState.loading = false;

  } catch (error) {
    cState.message = "";
    cState.loading = false;
    console.log(error)
  }
}
</script>
<template>
  <div class="chat">
    <div class="chat-header">
      <RouterLink to="/">
        <p>Switch Bot</p>
      </RouterLink>
      <p>You are currently chatting with <span style="text-transform:uppercase; font-weight: bold">{{
        cState.activeOption
          }}</span> bot</p>
    </div>
    <div class="chat-body">
      <div v-for="(message, index) in cState.messages" :key="index">
        <div class="chat-body-bubble" :class="[message.role === 'sender' ? 'right' : '']">
          <div :class="[message.role === 'sender' ? 'chat-body-bubble-left' : 'chat-body-bubble-right']">
            {{ message.message }}
          </div>
          <div :class="[message.role === 'sender' ? 'chat-body-name-left' : 'chat-body-name-right']">
            <div class="chat-body-name-icon"></div>
            <span v-if="message.role === 'sender'">YOU</span>
            <span v-else>{{ cState.role }} Bot</span>
          </div>
        </div>
      </div>
    </div>
    <div class="chat-footer">
      <div v-if="cState.loading" class="loader">Please wait...</div>
      <form @submit="sendChat">

        <div class="input-wrapper">

          <img src="@/assets/svgs/paperclip.svg">
          <input type="text" v-model="cState.message" placeholder="Ask me anything">
          <img src="@/assets/svgs/send.svg">
        </div>
      </form>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.loader {
  text-align: center;
  font-size: 14px;
}

.chat {
  height: 100vh;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 56px 0;

  &-header {
    height: 5%;
    text-align: center;
  }

  &-body {
    height: 90%;
    padding-top: 24px;
    overflow: scroll;

    &-name {
      &-left {
        display: flex;
        align-items: center;
        float: left;
        margin-top: 8px;

        span {
          margin-left: 4px;
        }
      }

      &-right {
        float: right;
        margin-top: 8px;
        display: flex;

        span {
          margin-left: 4px;
        }
      }

      &-icon {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #E6E6E6;
      }
    }

    &-bubble {
      display: flex;
      flex-direction: column;
      margin-bottom: 12px;

      &-right {
        width: 70%;
        display: flex;
        border-radius: 10px 10px 0px 10px;
        background: #DEDEDE;
        padding: 4px 8px;
        min-height: 40px;
        color: #000;
      }

      &-left {
        width: 70%;
        float: left;
        border-radius: 10px 10px 10px 0px;
        background: #F1F1F1;
        padding: 4px 8px;
        min-height: 40px;
        color: #000;
      }
    }
  }

  .right {
    align-items: flex-end;
  }

  &-footer {
    height: 5%;
    width: 75%;
    margin: auto;

    .input-wrapper {
      background: #F0F0F0;
      margin-top: 8px;
      border-radius: 50px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 4px 20px;

      input {
        outline: none;
        border: none;
        font-size: 17px;
        font-weight: 400;
        z-index: 0;
        width: 100%;
        border-radius: 8px;
        padding: 12px 16px 12px 4px;
        background: transparent;
        font-family: Inter, "sans-serif";

        &::placeholder {
          color: #1B1B1B5C;
        }
      }
    }
  }
}
</style>
