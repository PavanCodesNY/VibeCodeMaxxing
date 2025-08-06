import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from 'motion/react';

export function Projects() {
  const projects = [
    {
      title: "E-Commerce Platform",
      description: "A modern e-commerce solution built with React and Node.js, featuring real-time inventory management and seamless checkout experience.",
      tech: ["React", "Node.js", "MongoDB", "Stripe"],
      featured: true,
      number: "01"
    },
    {
      title: "Portfolio Website",
      description: "A minimalist portfolio design for a creative agency, focusing on clean aesthetics and smooth animations.",
      tech: ["Next.js", "Framer Motion", "Tailwind"],
      featured: false,
      number: "02"
    },
    {
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, file sharing, and team communication features.",
      tech: ["React", "Socket.io", "PostgreSQL"],
      featured: true,
      number: "03"
    },
    {
      title: "Weather Dashboard",
      description: "An interactive weather application with detailed forecasts, maps integration, and customizable widgets.",
      tech: ["Vue.js", "Chart.js", "Weather API"],
      featured: false,
      number: "04"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="projects" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-20 left-10 font-mono text-4xl text-foreground/5"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        &lt;/&gt;
      </motion.div>

      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm tracking-widest uppercase text-muted-foreground block mb-4">
              // portfolio.showcase
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light glitch">
              Featured Projects
            </h2>
          </motion.div>
          
          <motion.div 
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card 
                  className={`p-8 hover:shadow-xl transition-all duration-500 border-2 group relative overflow-hidden ${
                    project.featured ? 'border-foreground bg-foreground/5' : 'hover:border-foreground'
                  }`}
                >
                  {/* Project number background */}
                  <motion.div
                    className="absolute top-4 right-4 font-mono text-6xl font-light text-foreground/5"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    {project.number}
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-8 relative z-10">
                    <motion.div 
                      className="md:col-span-1"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="aspect-video bg-gradient-to-br from-foreground to-muted rounded-lg flex items-center justify-center relative overflow-hidden group">
                        <motion.div
                          className="absolute inset-0 bg-foreground/20"
                          initial={{ scale: 0, rotate: 45 }}
                          whileHover={{ scale: 1.5, rotate: 0 }}
                          transition={{ duration: 0.5 }}
                        />
                        <div className="text-background font-mono text-sm z-10">
                          preview.{index + 1}
                        </div>
                      </div>
                    </motion.div>
                    
                    <div className="md:col-span-2 space-y-6">
                      <div className="flex items-center gap-4">
                        <motion.h3 
                          className="text-2xl font-serif font-light"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {project.title}
                        </motion.h3>
                        {project.featured && (
                          <motion.span 
                            className="px-3 py-1 bg-foreground text-background text-xs rounded-full font-mono"
                            whileHover={{ scale: 1.05 }}
                            animate={{ 
                              boxShadow: [
                                "0 0 0 0px rgba(0,0,0,0.1)",
                                "0 0 0 4px rgba(0,0,0,0.1)",
                                "0 0 0 0px rgba(0,0,0,0.1)"
                              ]
                            }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            featured
                          </motion.span>
                        )}
                      </div>
                      
                      <motion.p 
                        className="text-muted-foreground leading-relaxed font-sans"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                      >
                        {project.description}
                      </motion.p>
                      
                      <motion.div 
                        className="flex flex-wrap gap-3"
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {project.tech.map((tech, techIndex) => (
                          <motion.span 
                            key={techIndex}
                            className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full border font-mono"
                            whileHover={{ 
                              scale: 1.05,
                              backgroundColor: "var(--foreground)",
                              color: "var(--background)"
                            }}
                            transition={{ duration: 0.2 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      <motion.div 
                        className="flex gap-4 pt-4"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                      >
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono group"
                          >
                            <ExternalLink className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                            live
                          </Button>
                        </motion.div>
                        
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-foreground text-foreground hover:bg-foreground hover:text-background font-mono group"
                          >
                            <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" />
                            code
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Bottom decoration */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <p className="font-mono text-sm text-muted-foreground">
              projects.length === <span className="text-foreground">{projects.length}</span> && counting...
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}