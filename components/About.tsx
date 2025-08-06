import { Card } from "./ui/card";
import { motion } from 'motion/react';
import { AnimatedText } from "./AnimatedText";

export function About() {
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
    }
  };

  return (
    <section id="about" className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <motion.div
        className="absolute top-10 right-10 font-mono text-6xl text-foreground/5"
        animate={{ rotate: 360 }}
        transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
      >
        {"{ }"}
      </motion.div>

      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-16"
          >
            <span className="font-mono text-sm tracking-widest uppercase text-muted-foreground block mb-4">
              // about.me
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-light glitch">
              About Me
            </h2>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-12 items-center"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <motion.div className="space-y-8" variants={itemVariants}>
              <motion.p 
                className="text-lg leading-relaxed font-sans"
                variants={itemVariants}
              >
                I'm a <span className="font-serif italic">passionate</span> creative developer with over{" "}
                <span className="font-mono bg-foreground text-background px-2 py-1 rounded">5 years</span>{" "}
                of experience in building digital products that combine aesthetic appeal with 
                functional excellence.
              </motion.p>
              
              <motion.p 
                className="text-lg leading-relaxed font-sans"
                variants={itemVariants}
              >
                My approach focuses on <span className="underline-animate">clean code</span>, 
                intuitive user interfaces, and seamless user experiences. I believe in the power 
                of <span className="font-serif italic">simplicity</span> and the impact of 
                thoughtful design decisions.
              </motion.p>

              <motion.div 
                className="font-mono text-sm text-muted-foreground space-y-2"
                variants={itemVariants}
              >
                <div>const passion = ["design", "code", "innovation"];</div>
                <div>const mission = "create meaningful experiences";</div>
                <div>const coffee = ∞;</div>
              </motion.div>
              
              <motion.div 
                className="grid grid-cols-2 gap-6 pt-6"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 text-center border-2 border-border hover:border-foreground transition-colors">
                    <motion.div 
                      className="text-3xl font-light font-serif"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, type: "spring" }}
                    >
                      50+
                    </motion.div>
                    <div className="text-sm text-muted-foreground font-mono">Projects</div>
                  </Card>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card className="p-6 text-center border-2 border-border hover:border-foreground transition-colors">
                    <motion.div 
                      className="text-3xl font-light font-serif"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.7, type: "spring" }}
                    >
                      5+
                    </motion.div>
                    <div className="text-sm text-muted-foreground font-mono">Years</div>
                  </Card>
                </motion.div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="relative"
              variants={itemVariants}
            >
              <motion.div 
                className="aspect-square bg-gradient-to-br from-foreground to-muted-foreground rounded-lg relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute inset-0 bg-foreground"
                  initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                  whileInView={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: 0.5 }}
                />
                
                <div className="absolute inset-4 bg-background rounded-lg flex items-center justify-center">
                  <motion.div 
                    className="text-center"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.5 }}
                  >
                    <motion.div 
                      className="w-24 h-24 bg-foreground rounded-full mx-auto mb-4 relative overflow-hidden"
                      whileHover={{ 
                        boxShadow: "0 0 0 4px rgba(0,0,0,0.1)",
                        scale: 1.1 
                      }}
                    >
                      <motion.div
                        className="w-full h-full bg-muted"
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 180, 360] 
                        }}
                        transition={{ 
                          duration: 4, 
                          repeat: Infinity,
                          ease: "linear" 
                        }}
                      />
                    </motion.div>
                    <p className="text-sm text-muted-foreground font-mono">
                      <span className="text-foreground">{'>'}</span> profile.jpg
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}