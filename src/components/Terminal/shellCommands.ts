interface CommandResult {
  output: string;
  newDir?: string;
}

const fileSystem = {
  '~': {
    type: 'dir',
    contents: {
      'projects': { type: 'dir', contents: {} },
      'about.txt': { type: 'file', content: 'Hi, I\'m Akarsh!' },
      'contact.txt': { type: 'file', content: 'Email: akudrimoti1@gmail.com' },
    }
  }
};

export async function executeCommand(cmd: string, currentDir: string): Promise<CommandResult> {
  const [command, ...args] = cmd.split(' ');

  switch (command) {
    case 'ls':
      return { 
        output: `total 7
drwxr-xr-x  2 root root 4096 Mar 15 12:34 projects/
-rw-r--r--  1 root root  220 Mar 15 12:34 about.txt
-rw-r--r--  1 root root  220 Mar 15 12:34 contact.txt
-rw-r--r--  1 root root  220 Mar 15 12:34 skills.md
-rw-r--r--  1 root root  220 Mar 15 12:34 experience.log
drwxr-xr-x  2 root root 4096 Mar 15 12:34 .git/` 
      };
    
    case 'cd':
      if (!args[0] || args[0] === '~') return { output: '', newDir: '~' };
      if (args[0] === '..') return { output: '', newDir: '~' };
      return { output: 'bash: cd: No such directory' };
    
    case 'pwd':
      return { output: `/home/guest${currentDir === '~' ? '' : `/${currentDir}`}` };
    
    case 'cat':
      if (!args[0]) return { output: 'Usage: cat <filename>' };
      if (args[0] === 'about.txt') return { output: 'Hi, I\'m Akarsh!' };
      if (args[0] === 'contact.txt') return { output: 'Email: akudrimoti1@gmail.com' };
      return { output: `cat: ${args[0]}: No such file` };
    
    case 'clear':
      return { output: '\x1Bc' };
    
    case 'whoami':
      return { output: 'root' };
    
    case 'date':
      return { output: new Date().toString() };
    
    default:
      throw new Error('Command not found');
  }
} 