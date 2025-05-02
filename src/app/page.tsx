'use client'

import { TerminalContextProvider } from "react-terminal";
import { ReactTerminal } from "react-terminal"

export default function Home() {
  const files = [
    {
      name: "story.txt",
      content: `Once upon a time, in a world not so different from our own, there was a great calamity. The skies darkened, the earth trembled, and the seas roared. But amidst the chaos, a hero emerged. Armed with nothing but their wits and a mysterious artifact, they set out on a quest to save the world. Along the way, they encountered strange creatures, forged unlikely alliances, and uncovered secrets that would change everything. As they journeyed through enchanted forests and treacherous mountains, they realized that the true power to save the world lay not in the artifact, but within themselves.`
    },
    {
      name: "README.md",
      content: `# Save the World`
    }
  ];
  const commands = {
    help: (
      <span>
        <strong>help</strong> - Displays this help message<br />
        <strong>clear</strong> - Clears the terminal<br />
        <strong>cat &lt;filename&gt;</strong> - Displays the content of a file<br />
        <strong>ls</strong> - Lists all files in the current directory<br />
        <strong>calc &lt;EXPR&gt;</strong> - Evaluates a
          mathematical expression (eg, <strong>4*4</strong>)<br />
      </span>
    ),
    calc: async (expr: string) => {
      if (!expr) {
        return (
          <span>
            <strong>calc</strong> command requires an expression to evaluate.<br />
            Example: <strong>calc 4*4</strong>
          </span>
        )
      }
      const response = await fetch(
        `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
      );
      return await response.text();
    },
    ls: () => {
      return (
        <span>
          {files.map((file) => (
            <>
            <span key={file.name}>{file.name}</span>
            {file.name !== files[files.length - 1].name && ' '}
            </>
          ))}
        </span>
      )
    },
    cat: (filename: string) => {
      const file = files.find((file) => file.name === filename);
      if (!file) {
        return (
          <span>
            <strong>{filename}</strong> not found.
          </span>
        )
      }
      return (
        <span>
          <strong>{filename}</strong>:<br />
          {file.content}
        </span>
      )
    },
  };
  const welcomeMessage = (
    <span>
      <strong>Time to save the world!</strong> <br />
      <br />
      Type &quot;help&quot; for all available commands. <br />
      <br />
    </span>
  );
  const errorMessage = (
    <span>
      <strong>Command not found</strong> <br />
      Type &quot;help&quot; for all available commands. <br />
      <br />
    </span>
  );
  
  return (
    <TerminalContextProvider>
      <div className="h-screen">
        <ReactTerminal
          prompt=">"
          commands={commands}
          theme={'matrix'}
          welcomeMessage={welcomeMessage}
          errorMessage={errorMessage}
        />
      </div>
    </TerminalContextProvider>
  )
}
