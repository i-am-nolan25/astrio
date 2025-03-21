
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Info, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  return (
    <header className="border-b border-border py-4 px-6 bg-white shadow-sm">
      <div className="container max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-sky/20 p-1.5 rounded-md">
            <ArrowRight className="h-5 w-5 text-sky" />
          </div>
          <Link to="/" className="text-xl font-semibold">astrio</Link>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={`text-sm font-medium hover:text-sky transition flex items-center gap-2 ${
              location.pathname === '/' ? 'text-sky' : ''
            }`}
          >
            <HomeIcon className="h-4 w-4" />
            Home
          </Link>
          <Link 
            to="/about" 
            className={`text-sm font-medium hover:text-sky transition flex items-center gap-2 ${
              location.pathname === '/about' ? 'text-sky' : ''
            }`}
          >
            <Info className="h-4 w-4" />
            About
          </Link>
          <Link 
            to="/contact" 
            className={`text-sm font-medium hover:text-sky transition flex items-center gap-2 ${
              location.pathname === '/contact' ? 'text-sky' : ''
            }`}
          >
            <Mail className="h-4 w-4" />
            Get a Demo
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          <Link to="/app" className="text-sm font-medium text-muted-foreground hover:text-foreground transition">
            Sign In
          </Link>
          <Button asChild className="bg-sky hover:bg-sky/90">
            <Link to="/app">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
