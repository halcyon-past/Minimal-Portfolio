import { useState, useEffect } from 'react';
import { Command } from 'cmdk';
import { useNavigate } from 'react-router-dom';
import { FileText, User, Image, Link as LinkIcon, Command as CommandIcon, Mail } from 'lucide-react';
import './CommandPalette.css';

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // Toggle the menu when ⌘K is pressed
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  const runCommand = (command) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <div 
        className="fixed bottom-4 left-4 z-50 bg-white shadow-lg border border-gray-100 rounded-full px-4 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        onClick={() => setOpen(true)}
      >
        <CommandIcon size={16} className="text-gray-500" />
        <span>Menu</span>
        <kbd className="hidden md:ml-1 md:inline-flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-400 font-sans">
          <span className="text-[10px]">⌘</span>K
        </kbd>
      </div>

      <Command.Dialog open={open} onOpenChange={setOpen} label="Global Command Menu" className="cmdk-dialog z-[999]">
        <div className="cmdk-overlay" onClick={() => setOpen(false)} />
        <div className="cmdk-content">
          <Command.Input placeholder="Type a command or search..." className="cmdk-input" />
          <Command.List className="cmdk-list">
            <Command.Empty className="cmdk-empty">No results found.</Command.Empty>

            <Command.Group heading="Navigation" className="cmdk-group">
              <Command.Item onSelect={() => runCommand(() => navigate('/'))}>
                <LinkIcon size={16} /> Home
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/about'))}>
                <User size={16} /> About Me
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => navigate('/gallery'))}>
                <Image size={16} /> Gallery
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Documents" className="cmdk-group">
              <Command.Item onSelect={() => runCommand(() => window.open('/assets/resume/Aritro-Saha-Resume.pdf', '_blank'))}>
                <FileText size={16} /> View Resume
              </Command.Item>
            </Command.Group>

            <Command.Group heading="News" className="cmdk-group">
              <Command.Item onSelect={() => runCommand(() => window.open('https://siliconsync.aritro.cloud/', '_blank'))}>
                <i className="fas fa-newspaper opacity-70 w-4 h-4 flex items-center justify-center"></i> SiliconSync AI News
              </Command.Item>
            </Command.Group>

            <Command.Group heading="Links" className="cmdk-group">
              <Command.Item onSelect={() => runCommand(() => window.open('https://github.com/halcyon-past', '_blank'))}>
                <i className="fab fa-github opacity-70 w-4 h-4 flex items-center justify-center"></i> GitHub Profile
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('https://linkedin.com/in/aritro-saha', '_blank'))}>
                <i className="fab fa-linkedin opacity-70 w-4 h-4 flex items-center justify-center"></i> LinkedIn Profile
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('https://leetcode.com/u/AritroSaha/', '_blank'))}>
                <i className="fas fa-code opacity-70 w-4 h-4 flex items-center justify-center"></i> LeetCode Profile
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.open('https://www.youtube.com/@veripyed', '_blank'))}>
                <i className="fab fa-youtube opacity-70 w-4 h-4 flex items-center justify-center"></i> YouTube Channel
              </Command.Item>
              <Command.Item onSelect={() => runCommand(() => window.location.href = 'mailto:aritrosaha2025@gmail.com')}>
                <Mail size={16} /> Send Email
              </Command.Item>
            </Command.Group>
          </Command.List>
        </div>
      </Command.Dialog>
    </>
  );
}