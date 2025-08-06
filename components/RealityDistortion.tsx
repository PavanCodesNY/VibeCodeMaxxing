import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

interface DistortionField {
  x: number;
  y: number;
  strength: number;
  type: 'gravity' | 'electromagnetic' | 'quantum' | 'temporal';
  id: number;
}

export function RealityDistortion() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [distortionFields, setDistortionFields] = useState<DistortionField[]>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize distortion fields
    const fields: DistortionField[] = [
      { x: 200, y: 200, strength: 50, type: 'gravity', id: 1 },
      { x: 600, y: 300, strength: 30, type: 'electromagnetic', id: 2 },
      { x: 400, y: 500, strength: 40, type: 'quantum', id: 3 },
      { x: 800, y: 150, strength: 35, type: 'temporal', id: 4 },
    ];
    setDistortionFields(fields);

    const createDistortionGrid = () => {
      const gridSize = 30;
      const points: Array<{x: number, y: number, originalX: number, originalY: number}> = [];
      
      for (let x = 0; x < canvas.width; x += gridSize) {
        for (let y = 0; y < canvas.height; y += gridSize) {
          points.push({ x, y, originalX: x, originalY: y });
        }
      }
      return points;
    };

    let gridPoints = createDistortionGrid();

    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update distortion fields
      fields.forEach(field => {
        const time = timeRef.current;
        field.x += Math.sin(time * 0.5 + field.id) * 0.5;
        field.y += Math.cos(time * 0.3 + field.id) * 0.5;
        field.strength = 30 + Math.sin(time * 0.8 + field.id) * 20;
      });

      // Apply distortions to grid
      gridPoints.forEach(point => {
        let totalDistortionX = 0;
        let totalDistortionY = 0;

        fields.forEach(field => {
          const dx = point.originalX - field.x;
          const dy = point.originalY - field.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 200) {
            const force = field.strength / (distance + 1);
            const angle = Math.atan2(dy, dx);
            
            switch (field.type) {
              case 'gravity':
                totalDistortionX -= Math.cos(angle) * force * 0.5;
                totalDistortionY -= Math.sin(angle) * force * 0.5;
                break;
              case 'electromagnetic':
                totalDistortionX += Math.cos(angle + Math.PI/2) * force * 0.3;
                totalDistortionY += Math.sin(angle + Math.PI/2) * force * 0.3;
                break;
              case 'quantum':
                totalDistortionX += Math.cos(timeRef.current * 2 + angle) * force * 0.2;
                totalDistortionY += Math.sin(timeRef.current * 2 + angle) * force * 0.2;
                break;
              case 'temporal':
                const warp = Math.sin(timeRef.current * 3 + distance * 0.01) * force * 0.1;
                totalDistortionX += warp;
                totalDistortionY += warp;
                break;
            }
          }
        });

        point.x = point.originalX + totalDistortionX;
        point.y = point.originalY + totalDistortionY;
      });

      // Draw distorted grid
      ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
      ctx.lineWidth = 0.5;
      
      // Draw horizontal lines
      for (let row = 0; row < Math.ceil(canvas.height / 30); row++) {
        ctx.beginPath();
        for (let col = 0; col < Math.ceil(canvas.width / 30); col++) {
          const pointIndex = row * Math.ceil(canvas.width / 30) + col;
          if (pointIndex < gridPoints.length) {
            const point = gridPoints[pointIndex];
            if (col === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw vertical lines
      for (let col = 0; col < Math.ceil(canvas.width / 30); col++) {
        ctx.beginPath();
        for (let row = 0; row < Math.ceil(canvas.height / 30); row++) {
          const pointIndex = row * Math.ceil(canvas.width / 30) + col;
          if (pointIndex < gridPoints.length) {
            const point = gridPoints[pointIndex];
            if (row === 0) {
              ctx.moveTo(point.x, point.y);
            } else {
              ctx.lineTo(point.x, point.y);
            }
          }
        }
        ctx.stroke();
      }

      // Draw distortion field centers
      fields.forEach(field => {
        const colors = {
          gravity: 'rgba(255, 0, 0, 0.3)',
          electromagnetic: 'rgba(0, 0, 255, 0.3)',
          quantum: 'rgba(0, 255, 0, 0.3)',
          temporal: 'rgba(255, 255, 0, 0.3)'
        };

        ctx.fillStyle = colors[field.type];
        ctx.beginPath();
        ctx.arc(field.x, field.y, field.strength * 0.5, 0, Math.PI * 2);
        ctx.fill();

        // Ripple effect
        const rippleRadius = (timeRef.current * 50 + field.id * 100) % 100;
        ctx.strokeStyle = colors[field.type];
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(field.x, field.y, rippleRadius, 0, Math.PI * 2);
        ctx.stroke();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}