export interface Command {
  command: string;
  output: string | null;
}

export interface CommandHistory {
  command: string;
  output: string;
}

export interface TerminalCommands {
  [key: string]: () => string | null;
}
