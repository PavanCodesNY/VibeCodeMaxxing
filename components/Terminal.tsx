import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TerminalProps {
  className?: string;
}

export function Terminal({ className = "" }: TerminalProps) {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Array<{ command: string; output: string; type: 'command' | 'output' | 'error' }>>([
    { command: '', output: 'Welcome to Alex Johnson Terminal v2.1.0', type: 'output' },
    { command: '', output: 'Type "help" for available commands', type: 'output' },
    { command: '', output: '', type: 'output' }
  ]);
  const [currentPath, setCurrentPath] = useState('~/portfolio');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: 'Available commands: about, skills, projects, contact, clear, whoami, pwd, ls, cat, echo, date, matrix, hack',
    about: 'Creative Developer with 5+ years of experience crafting digital experiences.',
    skills: 'Frontend: React, TypeScript, Next.js\nDesign: Figma, Adobe Suite\nBackend: Node.js, Python',
    projects: 'Featured projects:\n• E-Commerce Platform\n• Task Management App\n• Weather Dashboard\n• Portfolio Website',
    contact: 'Email: alex@example.com\nLinkedIn: /in/alexjohnson\nGitHub: /alexjohnson',
    whoami: 'alex_johnson',
    pwd: currentPath,
    ls: 'about.md  skills.json  projects/  contact.txt  resume.pdf',
    date: () => new Date().toLocaleString(),
    matrix: 'Entering the Matrix... 01110100 01110010 01100001 01100011 01100101',
    hack: 'Initiating hack sequence...\nAccessing mainframe...\n[████████████████████] 100%\nAccess granted! Just kidding 😄'
  };

  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    let output = '';
    let type: 'output' | 'error' = 'output';

    if (cleanCmd === 'clear') {
      setHistory([]);
      return;
    }

    if (cleanCmd.startsWith('echo ')) {
      output = cmd.substring(5);
    } else if (cleanCmd.startsWith('cat ')) {
      const file = cleanCmd.substring(4);
      if (file === 'about.md') {
        output = commands.about;
      } else if (file === 'contact.txt') {
        output = commands.contact;
      } else {
        output = `cat: ${file}: No such file or directory`;
        type = 'error';
      }
    } else if (commands[cleanCmd as keyof typeof commands]) {
      const result = commands[cleanCmd as keyof typeof commands];
      output = typeof result === 'function' ? result() : result;
    } else if (cleanCmd === '') {
      output = '';
    } else {
      output = `Command not found: ${cleanCmd}`;
      type = 'error';
    }

    setHistory(prev => [
      ...prev,
      { command: `${currentPath} $ ${cmd}`, output: '', type: 'command' },
      { command: '', output, type }
    ]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(input);
    setInput('');
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <motion.div 
      className={`bg-black text-green-400 font-mono text-sm rounded-lg overflow-hidden border border-green-400 ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 px-4 py-2 border-b border-green-400 flex items-center gap-2">
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        <span className="ml-2 text-gray-300">terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="p-4 h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-green-400"
      >
        {history.map((entry, index) => (
          <div key={index} className="mb-1">
            {entry.type === 'command' && (
              <div className="text-green-400">{entry.command}</div>
            )}
            {entry.output && (
              <div className={`whitespace-pre-wrap ${
                entry.type === 'error' ? 'text-red-400' : 'text-gray-300'
              }`}>
                {entry.output}
              </div>
            )}
          </div>
        ))}
        
        <form onSubmit={handleSubmit} className="flex items-center">
          <span className="text-green-400 mr-2">{currentPath} $</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent text-green-400 outline-none flex-1 caret-green-400"
            autoFocus
          />
          <motion.span
            className="text-green-400 ml-1"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            █
          </motion.span>
        </form>
      </div>
    </motion.div>
  );
}