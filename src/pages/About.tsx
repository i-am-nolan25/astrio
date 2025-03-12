
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Mail } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <section className="py-20 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl font-bold mb-8 text-center">About Astrio</h1>
              
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-lg text-muted-foreground">
                    At Astrio, we're on a mission to revolutionize code quality and developer productivity. 
                    We believe that smart automation and AI-powered insights can transform how development teams 
                    work, allowing them to focus on innovation rather than repetitive tasks.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                  <p className="text-lg text-muted-foreground mb-4">
                    Founded in 2023 by a team of experienced developers who were frustrated with the limitations 
                    of existing code analysis tools, Astrio was built to provide meaningful, actionable insights 
                    that truly improve codebases.
                  </p>
                  <p className="text-lg text-muted-foreground">
                    We've combined cutting-edge AI technology with deep software engineering expertise to create 
                    a platform that doesn't just identify problems but offers concrete solutions.
                  </p>
                </div>
                
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
                  <p className="text-lg text-muted-foreground">
                    Astrio's platform uses advanced machine learning algorithms trained on millions of code 
                    samples to recognize patterns, detect issues, and generate improvements. Our technology 
                    continuously learns from new code and feedback, getting smarter with every analysis.
                  </p>
                </div>
              </div>
              
              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link to="/contact">
                    Get in Touch
                    <Mail className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
