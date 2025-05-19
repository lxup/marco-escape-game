'use client'

import constants from "@/constants";
import React from "react";
import { TerminalContextProvider } from "react-terminal";
import { ReactTerminal } from "react-terminal"

export default function Home() {
  const [isValidated, setIsValidated] = React.useState(false);
  const files = [
    {
      name: "man.txt",
      content: (
        <>
          <strong># LS(1)</strong><br />
          <strong>NOM</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;ls - liste le contenu d’un répertoire<br />
          <strong>UTILISATION</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;ls [OPTION]... [FICHIER]...<br />
          <strong>DESCRIPTION</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;-a, Affiche tous les fichiers, y compris les fichiers cachés (ceux commençant par un point).<br />
          <strong>EXEMPLES</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;ls<br />
          &nbsp;&nbsp;&nbsp;&nbsp;ls -a<br />
          <br />
          <strong># CAT(1)</strong><br />
          <strong>NOM</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;cat - concatène les fichiers et affiche leur contenu<br />
          <strong>UTILISATION</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;cat [OPTION]... [FICHIER]...<br />
          <strong>DESCRIPTION</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;-p [motdepasse], ouvre les fichiers protégés<br />
          <strong>EXEMPLES</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;cat fichier.txt<br />
          &nbsp;&nbsp;&nbsp;&nbsp;cat -p monmotdepasse fichier.txt<br />
        </>
      ),
      protected: false,
    },
    {
      name: "README.md",
      content: (
        <>
          <strong># Collision des Mondes</strong><br />
          <strong>## Contexte</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;Une réalité parallèle a décidé de nous annihiler. Pas de négociation, pas de raison. Leur seule mission : fusionner leur monde avec le nôtre et tout réduire en poussière.<br />
          <br />
          <strong>## Mission</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;Tu es la seule version de toi-même encore stable dans ce merdier interdimensionnel. Tu dois comprendre ce qui se passe, trouver les failles, et les refermer avant que tout parte en vrille.<br />
          <br />
          <strong>## Comment jouer</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;Utilise les commandes du terminal pour naviguer dans les fichiers, trouver des indices et survivre au chaos. Chaque fichier peut être une clé, ou un piège.<br />
          <br />
          <strong>## Fichiers protégés</strong><br />
          &nbsp;&nbsp;&nbsp;&nbsp;Certains fichiers sont verrouillés. Le mot de passe est le nombre total de fichiers dans le répertoire actuel.<br />
          <br />
        </>
      ),
      protected: false
    },
    {
      name: "validation.txt",
      content: `
        Pour valider le code, exécute la commande suivante dans le terminal :
        validate <code>
      `,
      protected: true,
    },
    {
      name: ".freepalestine",
      content: (
        <>
          <strong># Free Palestine</strong><br />
        </>
      ),
      protected: false,
    },
    {
      name: ".hidden",
      content: "Je suis juste un fichier caché.",
      protected: false,
    }
  ];

  const commands = {
    help: (
      <span>
        <strong>help</strong> - Affiche ce message d’aide<br />
        <strong>clear</strong> - Efface le terminal<br />
        <strong>cat &lt;fichier&gt;</strong> - Affiche le contenu d’un fichier<br />
        <strong>ls</strong> - Liste les fichiers du répertoire courant<br />
        <strong>calc &lt;EXPR&gt;</strong> - Calcule une expression mathématique (ex: <strong>4*4</strong>)<br />
      </span>
    ),
    calc: async (expr: string) => {
      if (!expr) {
        return (
          <span>
            La commande <strong>calc</strong> nécessite une expression à évaluer.<br />
            Exemple : <strong>calc 4*4</strong>
          </span>
        )
      }
      const response = await fetch(
        `https://api.mathjs.org/v4/?expr=${encodeURIComponent(expr)}`
      );
      return await response.text();
    },
    ls: (args?: string) => {
      const showAll = args?.includes("-a");
      const visibleFiles = files.filter(f => showAll || !f.name.startsWith("."));

      return (
        <span>
          {visibleFiles.map((file, i) => (
            <>
              <span key={file.name}>{file.name}</span>
              {i !== visibleFiles.length - 1 && ' '}
            </>
          ))}
        </span>
      );
    },
    cat: (args: string) => {
      const parts = args.trim().split(/\s+/);
      let filename = "";
      let password = null;

      for (let i = 0; i < parts.length; i++) {
        if (parts[i] === "-p") {
          password = parts[i + 1] || "";
          i++; // skip next
        } else if (!filename) {
          filename = parts[i];
        }
      }

      if (!filename) {
        return <span>Nom de fichier manquant.</span>;
      }

      const file = files.find((f) => f.name === filename);
      if (!file) {
        return <span><strong>{filename}</strong> introuvable.</span>;
      }

      if (file.protected) {
        if (password === null) {
          return <span>Ce fichier est protégé (voir <strong>man.txt</strong>).</span>;
        }
        if (password !== files.length.toString()) {
          return <span>Mot de passe incorrect pour <strong>{filename}</strong>.</span>;
        }
      }

      return (
        <span>
          <strong>{filename}</strong>:<br />
          {file.content}
        </span>
      );
    },
    validate: (args: string) => {
      if (args === constants.passwordEscapeGame) {
        setIsValidated(true);
        return ;
      } else {
        return (
          <span>
            Mot de passe incorrect. Essayez encore !
          </span>
        );
      }
    },
  };

  const welcomeMessage = (
    <span>
      <strong>{constants.title}</strong> <br />
      <br />
      Tape &quot;help&quot; pour voir les commandes disponibles. <br />
      <br />
    </span>
  );

  const errorMessage = (
    <span>
      <strong>Commande inconnue</strong> <br />
      Tape &quot;help&quot; pour voir les commandes disponibles. <br />
      <br />
    </span>
  );

  return (
    <TerminalContextProvider>
      <div className="h-screen">
        {isValidated ? (
          <div className="flex items-center justify-center h-full">
            <h1 className="text-4xl font-bold text-green-500 text-center">
              
            </h1>
          </div>
        ) : (
          <ReactTerminal
            prompt=">"
            commands={commands}
            theme={'matrix'}
            welcomeMessage={welcomeMessage}
            errorMessage={errorMessage}
          />
        )}
      </div>
    </TerminalContextProvider>
  )
}