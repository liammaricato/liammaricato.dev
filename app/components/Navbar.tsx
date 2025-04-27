import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  return (
    <nav className="flex h-20 justify-between items-center px-8 lg:px-16 py-4 bg-background border-b">
      <Link href="/" className="text-3xl font-black text-foreground hover:text-pink transition-colors duration-300">
        Liam Maricato
      </Link>
      
      <div className="flex items-center gap-4">
        <ThemeToggle />
        
        <Sheet>
          <SheetTrigger>
            <svg id="menu-icon" className="md:hidden cursor-pointer" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle></SheetTitle>
            </SheetHeader>
            <ul className="flex flex-col gap-8 text-foreground text-xl font-black px-8">
              <li>
                <Link href="/blog" className="hover:text-pink transition-colors duration-300">Blog</Link>
              </li>
              <li>
                <Link href="/highlights" className="hover:text-pink transition-colors duration-300">Highlights</Link>
              </li>
              <li>
                <Link href="/resume" target="_blank" className="hover:text-pink transition-colors duration-300">Resume</Link>
              </li>
              <li>
                <Link href="/about" target="_blank" className="hover:text-pink transition-colors duration-300">About Me</Link>
              </li>
            </ul>
          </SheetContent>
        </Sheet>

        <ul className="hidden md:flex gap-8 text-foreground text-xl font-black">
          <li>
            <Link href="/blog" className="hover:text-pink transition-colors duration-300">Blog</Link>
          </li>
          <li>
            <Link href="/highlights" className="hover:text-pink transition-colors duration-300">Highlights</Link>
          </li>
          <li>
            <Link href="/resume" target="_blank" className="hover:text-pink transition-colors duration-300">Resume</Link>
          </li>
          <li>
            <Link href="/about" target="_blank" className="hover:text-pink transition-colors duration-300">About me</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
