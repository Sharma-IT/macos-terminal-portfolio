<template>
  <div class="terminal-container">
    <div class="terminal">
      <div class="terminal-header">
        <div class="terminal-buttons">
          <div class="terminal-button close" data-symbol="×"></div>
          <div class="terminal-button minimize" data-symbol="−"></div>
          <div class="terminal-button maximize" data-symbol="⤡"></div>
        </div>
      </div>
      <div class="terminal-content">
        <Suspense>
          <TerminalPrompt />
          <template #fallback>
            <div class="loading">Loading terminal...</div>
          </template>
        </Suspense>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineAsyncComponent } from 'vue';
const TerminalPrompt = defineAsyncComponent(() => 
  import('~/components/TerminalPrompt.vue')
);
</script>

<style>
body {
  background-image: url('https://512pixels.net/downloads/macos-wallpapers-thumbs/10-5--thumb.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: 100dvh;
  overscroll-behavior: none;
}

.terminal-container {
  min-height: 100vh;
  min-height: 100dvh;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  contain: content;
}

.terminal {
  width: min(800px, 90vw);
  height: min(600px, 80vh);
  background-color: rgba(30, 30, 30, 0.85);
  border-radius: 5px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  font-family: 'Fira Code', monospace;
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(5px);
  margin: auto;
  contain: content;
}

.terminal-header {
  background-color: rgba(50, 50, 50, 0.9);
  padding: 5px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  display: flex;
  gap: 5px;
  contain: content;
}

.terminal-buttons {
  width: fit-content;
  display: flex;
  gap: 5px;
  position: relative;
  cursor: default;
}

.terminal-button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  position: relative;
  contain: strict;
}

.terminal-button::before {
  content: attr(data-symbol);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: rgba(0, 0, 0, 0.5);
  font-size: 9px;
  line-height: 1;
  opacity: 0;
  transition: opacity 0.15s ease;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.terminal-buttons:hover .terminal-button::before {
  opacity: 1;
}

.close { background-color: #ff5f56; }
.minimize { background-color: #ffbd2e; }
.maximize { background-color: #27c93f; }

.terminal-content {
  flex-grow: 1;
  padding: 20px;
  color: #f8f8f2;
  overflow-y: auto;
  overflow-x: hidden;
  contain: content;
  scroll-behavior: smooth;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #f8f8f2;
}

@media (max-width: 600px) {
  .terminal-container {
    padding: 10px;
  }
  
  .terminal {
    width: 95vw;
    height: 85vh;
  }
}

@supports (-webkit-touch-callout: none) {
  .terminal-container {
    min-height: -webkit-fill-available;
  }
}

:root {
  color-scheme: dark;
}
</style>