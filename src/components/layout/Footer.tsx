
import { Github, Linkedin, Mail } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-secondary/30 text-secondary-foreground py-8 mt-auto backdrop-blur-sm">
      <div className="container mx-auto px-4 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} VisART.</p>
        <p className="text-xs mt-1 mb-6">Learn DSA the interactive way.</p>
        
        <div className="border-t border-secondary-foreground/20 pt-6">
          <p className="text-sm font-semibold mb-3">Connect with the Founder</p>
          <div className="flex justify-center items-center space-x-6">
            <Link href="https://github.com/Geek-ASR" target="_blank" rel="noopener noreferrer" aria-label="Founder's GitHub profile" className="hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="https://www.linkedin.com/in/aditya-rekhe-94b27122a/" target="_blank" rel="noopener noreferrer" aria-label="Founder's LinkedIn profile" className="hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
            <a href="mailto:adityarekhe1030@gmail.com" aria-label="Email the Founder" className="flex items-center hover:text-primary transition-colors">
              <Mail className="h-6 w-6 mr-2" />
              <span className="text-sm">adityarekhe1030@gmail.com</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
