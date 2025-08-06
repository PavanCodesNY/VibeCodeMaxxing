import { Card } from "./ui/card";
import { Code, Palette, Smartphone, Globe } from "lucide-react";
import { motion } from 'motion/react';
import { useState } from 'react';

export function Skills() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const skills = [
    {
      icon: Code,
      title: "Frontend Development",
      description: "React, TypeScript, Next.js, Tailwind CSS",
      level: 95,
      color: "from-foreground to-muted-foreground"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Figma, Adobe Creative Suite, Prototyping",
      level: 85,
      color: "from-foreground to-muted-foreground"
    },
    {
      icon: Smartphone,
      title: "Mobile Development", 
      description: "React Native, Flutter, Responsive Design",
      level: 80,
      color: "from-foreground to-muted-foreground"
    },
    {
      icon: Globe,
      title: "Backend Development",
      description: "Node.js, Python, Database Design",
      level: 75,
      color: "from-foreground to-muted-foreground"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="skills" className="py-20 bg-background relative">
      {/* Background elements */}
      <motion.div
        className="absolute top-1/4 left-5 font-mono text-xs text-foreground/10"
        animate={{ y: [-10, 10, -10] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        console.log("skills");
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
              // skills.array
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light glitch">
              Skills & Expertise
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                onHoverStart={() => setHoveredIndex(index)}
                onHoverEnd={() => setHoveredIndex(null)}
              >
                <Card className="p-8 hover:shadow-lg transition-all duration-300 border-2 hover:border-foreground group relative overflow-hidden">
                  {/* Background animation on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-foreground/5 to-transparent"
                    initial={{ x: '-100%' }}
                    animate={{ x: hoveredIndex === index ? '0%' : '-100%' }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="flex items-start gap-4 relative z-10">
                    <motion.div 
                      className="p-3 bg-foreground text-background rounded-lg"
                      whileHover={{ 
                        scale: 1.1,
                        rotate: [0, -10, 10, 0]
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <skill.icon className="w-6 h-6" />
                    </motion.div>
                    
                    <div className="flex-1">
                      <motion.h3 
                        className="text-xl font-medium mb-2 font-serif"
                        whileHover={{ x: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        {skill.title}
                      </motion.h3>
                      
                      <p className="text-muted-foreground mb-6 font-sans text-sm leading-relaxed">
                        {skill.description}
                      </p>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-xs text-muted-foreground">
                            proficiency
                          </span>
                          <motion.span 
                            className="font-mono text-sm"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 + index * 0.1 }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>
                        
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <motion.div 
                            className="h-2 rounded-full bg-foreground relative"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{ 
                              duration: 1.2, 
                              delay: 0.3 + index * 0.1,
                              ease: [0.25, 0.1, 0.25, 1]
                            }}
                          >
                            <motion.div
                              className="absolute right-0 top-0 w-1 h-full bg-background"
                              animate={{ opacity: [0, 1, 0] }}
                              transition={{ 
                                duration: 0.8, 
                                repeat: Infinity,
                                delay: 1.5 + index * 0.1
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Additional decorative element */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1 }}
          >
            <p className="font-mono text-sm text-muted-foreground">
              <span className="text-foreground">const</span> expertise = skills.
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                map
              </motion.span>
              (skill =&gt; skill.level);
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}