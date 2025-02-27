'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface Command {
  command: string;
  output: string | React.ReactNode;
}

export function Terminal() {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<Command[]>([{
    command: '',
    output: 'Welcome to Akarsh\'s Terminal Portfolio! Type "help" to see available commands.'
  }]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const commands = {
    help: `Available commands:
  about         - Learn about me
  projects      - View my projects
  experience    - See my work experience
  education     - View my education
  skills        - List technical skills
  contact       - Get contact info
  clear         - Clear terminal`,
    about: `Hi, I'm Akarsh Kudrimoti! 👋
Currently at Georgia Tech studying Computer Science
Passionate about:
- Low-level programming & embedded systems
- Startup development
- AI/ML and computer vision
- Competitive programming (USACO Gold)`,
    projects: `Notable Projects:
1. Stride Labs - AI-powered orthotics startup
   - Built postgresql order management system
   - Implemented 3D STL rendering with Three.js

2. Gait Energy Optimization Research
   - Created energy-generating prosthetic leg design
   - Ran 534 MuJoCo simulations
   - Used TensorFlow for reinforcement learning

3. AI Prostate Cancer Detection System
   - Developed detection system with 94.2% accuracy
   - Analyzed 314 untrained MRI results
   - Implemented both SVM and CNN approaches

4. PeerBase AI Marketing Platform
   - Attracted 1,850 website visitors
   - Added 1,500 high-quality leads
   - Achieved 250 new customers`,
    experience: `Current: SWE Lead @ Stride Labs
- Evolved 3D printed insole supply chain
- Secured ML orthotic pipeline with Firebase Auth
- Enabled real-time STL rendering

Previous:
- Gait Energy Optimization Research @ GT
- AI Research @ Emory
- Marketing/AI Intern @ PeerBase AI
- Improving (IT Services)`,
    education: `Georgia Tech - Innovation Academy
- Computer Science (Expected May 2025)
- GPA: 4.17
- Threads: Intelligence & Info Internetworks
- Minor: Mathematics (Statistics)
- Highest Honors, Zell Miller Scholar`,
    skills: `Technical Skills:
Languages: Python, Java, C++, JavaScript/TypeScript
Frameworks: React.js, Node.js, Express.js
ML/AI: TensorFlow, MuJoCo, CNNs, SVMs
Cloud: Docker, AWS, GCloud, Firebase
Other: Competitive Programming, USACO Gold`,
    contact: `📧 akudrimoti1@gmail.com
🔗 linkedin.com/in/akudrimoti
💻 github.com/akarshkudrimoti
📱 (404)-426-6523`
  };

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    let output = '';

    if (trimmedCmd in commands) {
      output = commands[trimmedCmd as keyof typeof commands];
    } else if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    } else {
      output = `Command not found: ${trimmedCmd}. Type "help" for available commands.`;
    }

    setHistory(prev => [...prev, { command: cmd, output }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  return (
    <Card className="bg-black/95 text-primary-foreground p-4 min-h-[80vh] font-mono">
      <div className="mb-4 space-y-2">
        {history.map((entry, i) => (
          <div key={i}>
            {entry.command && (
              <div className="flex items-center gap-2">
                <span className="text-green-500">guest@portfolio:~$</span>
                <span>{entry.command}</span>
              </div>
            )}
            <div className="pl-4 text-muted-foreground whitespace-pre-wrap">
              {entry.output}
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-500">guest@portfolio:~$</span>
        <Input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1 bg-transparent border-none text-primary-foreground"
          autoFocus
        />
      </div>
    </Card>
  );
} 