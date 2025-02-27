export const commands = {
  help: `
╔════════════════════════════════════════════╗
║             Available Commands              ║
╠════════════════════════════════════════════╣
║ SYSTEM COMMANDS:                           ║
║   ls        - List directory contents      ║
║   cd        - Change directory             ║
║   pwd       - Print working directory      ║
║   cat       - Read file contents           ║
║   clear     - Clear terminal               ║
║   whoami    - Display current user         ║
║   neofetch  - System information           ║
║                                           ║
║ PORTFOLIO COMMANDS:                        ║
║   about     - Learn about me               ║
║   projects  - View my projects             ║
║   exp       - See my work experience       ║
║   edu       - View my education            ║
║   skills    - List technical skills        ║
║   contact   - Get contact info             ║
╚════════════════════════════════════════════╝`,

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
   - Implemented both SVM and CNN approaches`,

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
�� (404)-426-6523`,

  neofetch: `
                   -\`                    root@akarsh-system
                  .o+\`                   ------------------
                 \`ooo/                   OS: AkarshOS x86_64
                \`+oooo:                  Host: Portfolio System
               \`+oooooo:                Kernel: 1.0.0-portfolio
               -+oooooo+:               Uptime: ${Math.floor(Math.random() * 24)} hours
             \`/:-:++oooo+:              Packages: 420 (npm)
            \`/++++/+++++++:             Shell: bash 5.1.16
           \`/++++++++++++++:            Resolution: 1920x1080
          \`/+++ooooooooooooo/\`          DE: React 18.2.0
         ./ooosssso++osssssso+\`         WM: Next.js
        .oossssso-\`\`\`/ossssss+\`         Theme: Cyberpunk-Dark
       -osssssso.      :ssssssso.       CPU: TypeScript @ 5.0GHz
      :osssssss/        osssso+++.      GPU: RTX 4090 Ti
     /ossssssss/        +ssssooo/-      Memory: 32GB DDR5
   \`/ossssso+/:-        -:/+osssso+-   
  \`+sso+:-\`                 \`.-/+oso:   Languages: Python, Java, C++, TypeScript
 \`++:.                           \`-/+/  Frameworks: React, Node, Express
 .\`                                  \`/  Cloud: Docker, AWS, Firebase`
}; 