import type { TerminalCommands } from '~/src/types/terminal';

const banner = `
██╗   ██╗ ██████╗ ██╗   ██╗██████╗      ██████╗██╗     ██╗
╚██╗ ██╔╝██╔═══██╗██║   ██║██╔══██╗    ██╔════╝██║     ██║
 ╚████╔╝ ██║   ██║██║   ██║██████╔╝    ██║     ██║     ██║
  ╚██╔╝  ██║   ██║██║   ██║██╔══██╗    ██║     ██║     ██║
   ██║   ╚██████╔╝╚██████╔╝██║  ██║    ╚██████╗███████╗██║
   ╚═╝    ╚═════╝  ╚═════╝ ╚═╝  ╚═╝     ╚═════╝╚══════╝╚═╝
`;

export const terminalCommands: TerminalCommands = {
  help: () => `Available commands:
  
- banner: Display the CLI banner
- aboutMe: Display information about me
- skills: List my technical skills
- projects: Show my projects
- contact: Display my contact information
- aboutPortfolio: Display tech stack of this CLI
- help: Display this help message
- clear: Clear the terminal screen`,

  banner: () => {
    const welcomeText =
      "Welcome to my CLI portfolio! Type 'help' to see available commands.";

    return `<div class="ascii-banner">
<pre class="ascii-art">${banner}</pre>
<p class="welcome-text">${welcomeText}</p></div>`;
  },

  aboutMe: () =>`
`,

  skills: () => `My technical skills include:
`,

  projects: () => `Here are some of my projects:

1. <a href="" target="_blank"></a>
`,

  contact: () => `You can reach me via:
  
- Phone Number:
- Email:
- LinkedIn:
- GitHub:`,

  clear: () => '',

  easterEgg:
    () => `🎉 Congratulations! You've found the easter egg. Here's a joke for you:
`,

  aboutPortfolio: () => `This portfolio project is built with:

- Framework: Nuxt 3 (Vue 3 based)
- Language: TypeScript
- CSS: Custom CSS with Flexbox
- Font: Fira Code (monospace)
- Development: Vite (bundler)
- Deployment: Netlify (static site hosting)`,

  techStack: () => `I love working with:
`,
};
