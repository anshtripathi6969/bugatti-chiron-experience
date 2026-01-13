'use client';

import { useEffect, useRef } from 'react';

export default function Hyperspace() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const stars: { x: number; y: number; z: number; o: number }[] = [];
        const numStars = 400;
        const speed = 15; // Base speed

        // Initialize stars
        for (let i = 0; i < numStars; i++) {
            stars.push({
                x: Math.random() * width - width / 2,
                y: Math.random() * height - height / 2,
                z: Math.random() * width,
                o: Math.random()
            });
        }

        const animate = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'; // Trail effect
            ctx.fillRect(0, 0, width, height);

            const cx = width / 2;
            const cy = height / 2;

            for (let i = 0; i < numStars; i++) {
                const star = stars[i];

                // Move star towards camera (z decreases)
                star.z -= speed;

                // Reset star if it passes camera
                if (star.z <= 0) {
                    star.x = Math.random() * width - width / 2;
                    star.y = Math.random() * height - height / 2;
                    star.z = width;
                    star.o = Math.random();
                }

                // Project 3D coordinates to 2D
                const x = cx + (star.x / star.z) * width;
                const y = cy + (star.y / star.z) * width;

                // Calculate size based on depth (closer = bigger)
                const size = (1 - star.z / width) * 4;

                // Calculate previous position for streak drawing
                const prevZ = star.z + speed * 1.5;
                const prevX = cx + (star.x / prevZ) * width;
                const prevY = cy + (star.y / prevZ) * width;

                // Draw streak
                if (x >= 0 && x <= width && y >= 0 && y <= height) {
                    const alpha = (1 - star.z / width) * star.o;
                    ctx.beginPath();
                    ctx.moveTo(prevX, prevY);
                    ctx.lineTo(x, y);
                    ctx.strokeStyle = `rgba(180, 230, 255, ${alpha})`;
                    ctx.lineWidth = size;
                    ctx.stroke();
                }
            }

            requestAnimationFrame(animate);
        };

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        const animationId = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full pointer-events-none z-0 mix-blend-screen"
        />
    );
}
