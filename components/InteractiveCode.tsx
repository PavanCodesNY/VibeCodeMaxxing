import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from './ui/button';
import { Play, RotateCcw } from 'lucide-react';

export function InteractiveCode() {
  const [output, setOutput] = useState('// Click "Run" to execute');
  const [isRunning, setIsRunning] = useState(false);

  const codeSnippets = [
    {
      title: 'Creative Greeting',
      code: `const greet = (name) => {
  const emojis = ['🚀', '✨', '🎨', '💻', '🔥'];
  const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
  return \`Hello \${name}! \${randomEmoji} Welcome to my portfolio!\`;
};

console.log(greet('Visitor'));`,
      execute: () => {
        const emojis = ['🚀', '✨', '🎨', '💻', '🔥'];
        const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
        return `Hello Visitor! ${randomEmoji} Welcome to my portfolio!`;
      }
    },
    {
      title: 'Random Tech Quote',
      code: `const techQuotes = [
  "Code is poetry written in logic.",
  "Debugging is like detective work.",
  "Good code is its own documentation.",
  "First, solve the problem. Then, write the code."
];

const randomQuote = () => {
  return techQuotes[Math.floor(Math.random() * techQuotes.length)];
};

console.log(randomQuote());`,
      execute: () => {
        const techQuotes = [
          "Code is poetry written in logic.",
          "Debugging is like detective work.",
          "Good code is its own documentation.",
          "First, solve the problem. Then, write the code."
        ];
        return techQuotes[Math.floor(Math.random() * techQuotes.length)];
      }
    },
    {
      title: 'Skill Level Calculator',
      code: `const skills = {
  JavaScript: 95,
  React: 90,
  TypeScript: 85,
  Design: 80
};

const calculateAverage = (skillsObj) => {
  const values = Object.values(skillsObj);
  const avg = values.reduce((a, b) => a + b, 0) / values.length;
  return \`Average skill level: \${avg.toFixed(1)}%\`;
};

console.log(calculateAverage(skills));`,
      execute: () => {
        const skills = {
          JavaScript: 95,
          React: 90,
          TypeScript: 85,
          Design: 80
        };
        const values = Object.values(skills);
        const avg = values.reduce((a, b) => a + b, 0) / values.length;
        return `Average skill level: ${avg.toFixed(1)}%`;
      }
    }
  ];

  const [currentSnippet, setCurrentSnippet] = useState(0);

  const runCode = async () => {
    setIsRunning(true);
    setOutput('Executing...');
    
    // Simulate execution delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      const result = codeSnippets[currentSnippet].execute();
      setOutput(result);
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
    
    setIsRunning(false);
  };

  const nextSnippet = () => {
    setCurrentSnippet((prev) => (prev + 1) % codeSnippets.length);
    setOutput('// Click "Run" to execute');
  };

  return (
    <motion.div 
      className="bg-gray-900 text-green-400 font-mono text-sm rounded-lg overflow-hidden border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-gray-800 px-4 py-2 border-b border-gray-700 flex items-center justify-between">
        <span className="text-gray-300">{codeSnippets[currentSnippet].title}</span>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={runCode}
            disabled={isRunning}
            className="text-green-400 hover:bg-green-400/20"
          >
            <Play className="w-4 h-4 mr-1" />
            Run
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSnippet}
            className="text-blue-400 hover:bg-blue-400/20"
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Next
          </Button>
        </div>
      </div>
      
      <div className="p-4">
        <pre className="text-gray-300 mb-4 overflow-x-auto">
          {codeSnippets[currentSnippet].code}
        </pre>
        
        <div className="border-t border-gray-700 pt-4">
          <div className="text-xs text-gray-500 mb-2">Output:</div>
          <motion.div 
            className="bg-black p-3 rounded min-h-[40px] flex items-center"
            key={output}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {isRunning ? (
              <motion.span
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                Executing...
              </motion.span>
            ) : (
              <span className="text-green-400">{output}</span>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}