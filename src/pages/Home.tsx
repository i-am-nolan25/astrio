
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowRight, RefreshCw, Paintbrush, Bug, CheckSquare } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <section className="py-20 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  Modernize Your Code with <span className="text-primary">AI-Powered</span> Insights
                </h1>
                <p className="text-xl text-muted-foreground mb-8 max-w-lg">
                  Astrio helps development teams refactor, improve UI, fix bugs, and generate tests automatically.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button size="lg" asChild>
                    <Link to="/app">
                      Get Started Free
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link to="/contact">
                      Request a Demo
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-card rounded-lg border border-border p-1">
                <div className="bg-code rounded-md p-6 h-[400px] flex items-center justify-center">
                  <div className="animate-pulse text-center">
                    <div className="bg-primary/20 p-4 rounded-full mb-4 mx-auto w-fit">
                      <ArrowRight className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Code Analysis Preview</h3>
                    <p className="text-muted-foreground">Instant insights for better code</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-16 px-6 bg-card">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">How Astrio Transforms Your Code</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-background rounded-lg p-6">
                <div className="bg-primary/20 p-3 rounded-md w-fit mx-auto mb-4">
                  <RefreshCw className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Code Refactoring</h3>
                <p className="text-muted-foreground">Identify and fix code smells and technical debt with AI-powered suggestions.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6">
                <div className="bg-accent/20 p-3 rounded-md w-fit mx-auto mb-4">
                  <Paintbrush className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3">UI Modernization</h3>
                <p className="text-muted-foreground">Improve user interfaces with accessibility and responsive design recommendations.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6">
                <div className="bg-destructive/20 p-3 rounded-md w-fit mx-auto mb-4">
                  <Bug className="h-6 w-6 text-destructive" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Bug Detection</h3>
                <p className="text-muted-foreground">Find and fix potential bugs before they impact your users or production systems.</p>
              </div>
              
              <div className="bg-background rounded-lg p-6">
                <div className="bg-success/20 p-3 rounded-md w-fit mx-auto mb-4">
                  <CheckSquare className="h-6 w-6 text-success" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Test Generation</h3>
                <p className="text-muted-foreground">Automatically create comprehensive tests to improve code coverage and quality.</p>
              </div>
            </div>
          </div>
        </section>
        
        <section className="py-20 px-6">
          <div className="container max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to modernize your codebase?</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-xl mx-auto">
              Join thousands of developers who use Astrio to improve their code quality and productivity.
            </p>
            <Button size="lg" asChild>
              <Link to="/app">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Home;
