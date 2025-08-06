import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-center mb-16">
            Get In Touch
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-medium mb-4">Let's work together</h3>
                <p className="text-muted-foreground leading-relaxed">
                  I'm always interested in new opportunities and collaborations. 
                  Whether you have a project in mind or just want to say hello, 
                  feel free to reach out.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Mail className="w-5 h-5 text-muted-foreground" />
                  <span>alex@example.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Phone className="w-5 h-5 text-muted-foreground" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button variant="outline" size="icon" className="border-foreground hover:bg-foreground hover:text-background">
                  <Github className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-foreground hover:bg-foreground hover:text-background">
                  <Linkedin className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="border-foreground hover:bg-foreground hover:text-background">
                  <Twitter className="w-5 h-5" />
                </Button>
              </div>
            </div>
            
            <Card className="p-8 border-2">
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm mb-2">First Name</label>
                    <Input placeholder="John" className="border-border" />
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Last Name</label>
                    <Input placeholder="Doe" className="border-border" />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Email</label>
                  <Input type="email" placeholder="john@example.com" className="border-border" />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Subject</label>
                  <Input placeholder="Project Inquiry" className="border-border" />
                </div>
                
                <div>
                  <label className="block text-sm mb-2">Message</label>
                  <Textarea 
                    placeholder="Tell me about your project..." 
                    className="border-border min-h-32"
                  />
                </div>
                
                <Button className="w-full bg-foreground text-background hover:bg-foreground/90">
                  Send Message
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}