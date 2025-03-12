
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="border-t border-border py-10 px-6">
      <div className="container max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <div className="bg-primary/20 p-1.5 rounded-md">
              <ArrowRight className="h-5 w-5 text-primary" />
            </div>
            <h2 className="text-xl font-semibold">Astrio</h2>
          </div>
          <div className="flex flex-wrap gap-6 mb-4 md:mb-0">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition">
              Home
            </Link>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground transition">
              About
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground transition">
              Contact
            </Link>
            <Link to="/app" className="text-sm text-muted-foreground hover:text-foreground transition">
              App
            </Link>
          </div>
          <div className="text-sm text-muted-foreground">
            © 2023 Astrio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
