'use client';

import { useEffect, useRef } from 'react';

const LineChart = ({ data, width = 600, height = 400, lineColor = '#4A90E2' }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Calculate max value for scaling
        const maxValue = Math.max(...data.map(item => item.value));
        const minValue = Math.min(...data.map(item => item.value));
        const valueRange = maxValue - minValue || 1; // Avoid division by zero
        const pointSpacing = width / (data.length - 1);
        const scale = (height - 50) / valueRange; // 50px for labels

        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;

        data.forEach((item, index) => {
            const x = index * pointSpacing;
            const y = height - (item.value - minValue) * scale - 30;
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.stroke();

        // Draw points
        data.forEach((item, index) => {
            const x = index * pointSpacing;
            const y = height - (item.value - minValue) * scale - 30;

            // Draw point
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, 2 * Math.PI);
            ctx.fillStyle = lineColor;
            ctx.fill();

            // Draw label
            ctx.fillStyle = '#000';
            ctx.font = '12px Arial';
            ctx.textAlign = 'center';
            ctx.fillText(item.label, x, height - 10);

            // Draw value
            ctx.fillText(item.value, x, y - 10);
        });

        // Draw axes
        ctx.beginPath();
        ctx.moveTo(0, height - 30);
        ctx.lineTo(width, height - 30);
        ctx.moveTo(0, height - 30);
        ctx.lineTo(0, 0);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.stroke();
    }, [data, width, height, lineColor]);

    return (
        <canvas
            ref={canvasRef}
            width={width}
            height={height}
            className="border border-gray-200"
        />
    );
};

export default LineChart;