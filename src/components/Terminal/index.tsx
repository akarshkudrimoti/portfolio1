'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { commands } from './commands';
import { executeCommand } from './shellCommands';

interface Command {
  command: string;
  output: string | React.ReactNode;
  isError?: boolean;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([{
    command: '',
    output: `Welcome to AkarshOS v1.0.0 (typescript)
Type 'help' to see available commands.
For a list of all commands, type 'commands'.
For system commands, try 'ls', 'cd', 'pwd', etc.`
  }]);
  const [currentDir, setCurrentDir] = useState('~');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim();
    let output: Command = { command: cmd, output: '' };

    // First check if it's a portfolio command
    if (trimmedCmd.toLowerCase() in commands) {
      output.output = commands[trimmedCmd.toLowerCase() as keyof typeof commands];
    }
    // Then check if it's a shell command
    else {
      try {
        const result = await executeCommand(trimmedCmd, currentDir);
        output.output = result.output;
        if (result.newDir) setCurrentDir(result.newDir);
      } catch (error) {
        output.output = `bash: ${trimmedCmd}: command not found`;
        output.isError = true;
      }
    }

    setHistory(prev => [...prev, output]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
      setCommandHistory(prev => [input, ...prev]);
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        setHistoryIndex(prev => prev + 1);
        setInput(commandHistory[historyIndex + 1]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        setHistoryIndex(prev => prev - 1);
        setInput(commandHistory[historyIndex - 1]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <Card className="bg-[#0a0a0a] text-green-500 p-4 min-h-[80vh] font-mono shadow-xl border-none relative overflow-hidden" ref={terminalRef}>
      {/* Matrix-like background effect */}
      <div className="absolute inset-0 opacity-10 bg-grid-pattern" />
      
      <div className="mb-4 space-y-1 relative z-10">
        {history.map((entry, i) => (
          <div key={i} className="leading-relaxed">
            {entry.command && (
              <div className="flex items-center gap-2 opacity-100">
                <span className="text-green-400 font-bold text-shadow-glow">[root@akarsh-system {currentDir}]#</span>
                <span className="text-green-300">{entry.command}</span>
              </div>
            )}
            <div className={`pl-4 ${entry.isError ? 'text-red-500' : 'text-green-300'} whitespace-pre-wrap text-shadow-sm`}>
              {entry.output}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 relative z-10">
        <span className="text-green-400 font-bold text-shadow-glow">[root@akarsh-system {currentDir}]#</span>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent border-none text-green-300 focus:outline-none focus:ring-0 placeholder-green-800 text-shadow-sm"
          autoFocus
          spellCheck={false}
        />
      </div>
    </Card>
  );
} 