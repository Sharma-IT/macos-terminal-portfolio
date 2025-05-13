<template>
  <div class="terminal-prompt">
    <div
      v-for="(line, index) in visibleHistory"
      :key="index"
      class="command-line"
      v-memo="[line.command, line.output]"
    >
      <span class="prompt">guest@your-cli ~ %</span>
      <span v-if="!line.isInitial" class="command-text">{{ line.command }}</span>
      <div v-if="line.output" class="command-output" v-html="line.output"></div>
    </div>
    <div class="current-line">
      <span class="prompt">guest@your-cli ~ %</span>
      <input
        v-model="currentCommand"
        @keyup.enter="executeCommand"
        @keydown.up.prevent="navigateHistory(-1)"
        @keydown.down.prevent="navigateHistory(1)"
        type="text"
        autofocus
        spellcheck="false"
        class="command-input"
        ref="commandInput"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, shallowRef, onUnmounted } from 'vue';
import type { CommandHistory } from '~/src/types/terminal';
import { terminalCommands } from '~/src/utils/commands';

const currentCommand = ref('');
const commandHistory = shallowRef<CommandHistory[]>([]);
const visibleHistory = shallowRef<CommandHistory[]>([]);
const historyIndex = ref(-1);
const commandInput = ref<HTMLInputElement | null>(null);
let rafId: number;

const isMobile = () => window.innerWidth <= 768;

const executeCommand = () => {
  const displayCommand = currentCommand.value;
  const commandToExecute = displayCommand.trim();

  if (commandToExecute) {
    const normalizedCommand =
      Object.keys(terminalCommands).find(
        (cmd) => cmd.toLowerCase() === commandToExecute.toLowerCase()
      ) || commandToExecute;

    let commandOutput = null;
    
    if (normalizedCommand === 'banner' && isMobile()) {
      commandOutput = 'Banner is not available on mobile devices. To see it, go on desktop. Try any other command.';
    } else {
      commandOutput = terminalCommands[normalizedCommand]
        ? terminalCommands[normalizedCommand]()
        : `Command not found: ${displayCommand}. Type 'help' for available commands.`;
    }

    const newCommand = {
      command: displayCommand,
      output: commandOutput || '',
      isInitial: false
    };

    commandHistory.value = [...commandHistory.value, newCommand];

    if (commandToExecute.toLowerCase() === 'clear') {
      visibleHistory.value = [];
    } else {
      visibleHistory.value = [...visibleHistory.value, newCommand];
    }
  }

  currentCommand.value = '';
  historyIndex.value = -1;
  scrollToBottom();
};

const navigateHistory = (direction: number) => {
  const historyLength = commandHistory.value.length;
  if (historyLength === 0) return;

  historyIndex.value += direction;

  if (historyIndex.value < -1) historyIndex.value = historyLength - 1;
  if (historyIndex.value >= historyLength) historyIndex.value = -1;

  currentCommand.value =
    historyIndex.value === -1
      ? ''
      : commandHistory.value[historyIndex.value].command;
};

const scrollToBottom = () => {
  cancelAnimationFrame(rafId);
  rafId = requestAnimationFrame(() => {
    const terminalContent = document.querySelector('.terminal-content');
    if (terminalContent) {
      terminalContent.scrollTop = terminalContent.scrollHeight;
    }
  });
};

onMounted(() => {
  if (commandInput.value) {
    commandInput.value.focus();
  }

  window.addEventListener('focus', () => {
    commandInput.value?.focus();
  });

  // Show banner only on desktop as initial command
  if (!isMobile()) {
    visibleHistory.value = [{
      command: 'banner',
      output: terminalCommands.banner(),
      isInitial: true
    }];
  }
});

onUnmounted(() => {
  cancelAnimationFrame(rafId);
  window.removeEventListener('focus', () => {
    commandInput.value?.focus();
  });
});
</script>

<style scoped>
.terminal-prompt {
  font-size: 14px;
  line-height: 1.6;
  width: 100%;
  contain: content;
  will-change: transform;
  transform: translateZ(0);
}

.command-line {
  margin-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
  contain: content;
  will-change: transform;
}

.prompt {
  color: #f8f8f2;
  margin-right: 10px;
  white-space: nowrap;
}

.command-text {
  word-break: break-all;
  white-space: pre-wrap;
}

.command-output {
  width: 100%;
  margin-top: 5px;
  white-space: pre-wrap;
  word-wrap: break-word;
  contain: content;
}

.current-line {
  display: flex;
  align-items: center;
  width: 100%;
}

.command-input {
  background-color: transparent;
  border: none;
  color: #f8f8f2;
  font-family: inherit;
  font-size: inherit;
  outline: none;
  flex-grow: 1;
  width: 1px;
  will-change: contents;
}

input::placeholder {
  color: #f8f8f2;
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>