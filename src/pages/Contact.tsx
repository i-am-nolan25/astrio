
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Send } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Contact = () => {
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message received",
      description: "We'll get back to you as soon as possible.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        <section className="py-20 px-6">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h1 className="text-4xl font-bold mb-6">Get a Personalized Demo</h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Want to see how Astrio can transform your development workflow? 
                  Schedule a personalized demo with our team to learn how our platform can help 
                  your specific project needs.
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="bg-primary/20 p-2 rounded-md">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-muted-foreground">contact@astrio.tech</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Headquarters</h3>
                    <p className="text-muted-foreground">
                      123 Tech Boulevard<br />
                      San Francisco, CA 94107<br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Request a Demo</CardTitle>
                    <CardDescription>
                      Fill out the form below and we'll get in touch with you shortly.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label htmlFor="first-name" className="text-sm font-medium">
                            First Name
                          </label>
                          <Input id="first-name" required />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="last-name" className="text-sm font-medium">
                            Last Name
                          </label>
                          <Input id="last-name" required />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="company" className="text-sm font-medium">
                          Company
                        </label>
                        <Input id="company" required />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Message
                        </label>
                        <Textarea id="message" rows={4} required />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
