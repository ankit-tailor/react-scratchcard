import React, { useRef, useEffect, useCallback, useState } from 'react';
import { ScratchCardProps } from './types';

export const ScratchCard = ({
  width = 300,
  height = 150,
  image = '',
  finishPercent = 60,
  onComplete = () => {},
  brushSize = 30,
  children,
}: ScratchCardProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef<boolean>(false);
  const lastPositionRef = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });
  const autoRevealedRef = useRef<boolean>(false);
  const [canvasLoaded, setCanvasLoaded] = useState<boolean>(false);

  const getMousePosition = (canvas: any, event: any) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: (event.clientX || event.touches[0].clientX) - rect.left,
      y: (event.clientY || event.touches[0].clientY) - rect.top,
    };
  };

  const startDrawing = useCallback((event: any) => {
    isDrawingRef.current = true;
    lastPositionRef.current = getMousePosition(canvasRef.current, event);
  }, []);

  const draw = useCallback(
    (event: any) => {
      if (
        !isDrawingRef.current ||
        autoRevealedRef.current ||
        !canvasRef.current
      )
        return;
      const ctx = canvasRef.current.getContext('2d');
      const newPosition = getMousePosition(canvasRef.current, event);

      if (ctx) {
        ctx.globalCompositeOperation = 'destination-out';
        ctx.lineWidth = brushSize;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastPositionRef.current.x, lastPositionRef.current.y);
        ctx.lineTo(newPosition.x, newPosition.y);
        ctx.stroke();

        lastPositionRef.current = newPosition;

        checkReveal(ctx);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [brushSize]
  );

  const checkReveal = useCallback(
    (ctx: any) => {
      const imageData = ctx.getImageData(0, 0, width, height);
      const pixels = imageData.data;
      let transparentPixels = 0;

      for (let i = 0; i < pixels.length; i += 4) {
        if (pixels[i + 3] === 0) transparentPixels++;
      }

      const totalPixels = width * height;
      const currentPercentage = (transparentPixels / totalPixels) * 100;

      if (currentPercentage >= finishPercent && !autoRevealedRef.current) {
        autoRevealedRef.current = true;
        ctx.clearRect(0, 0, width, height); // Clear the canvas here
        onComplete(); // Call the onComplete callback
      }
    },
    [finishPercent, width, height, onComplete]
  );

  const stopDrawing = useCallback(() => {
    isDrawingRef.current = false;
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');

      if (ctx) {
        if (image) {
          const backgroundImage = new Image();
          backgroundImage.crossOrigin = 'anonymous';
          backgroundImage.src = image;
          backgroundImage.onload = () => {
            ctx.drawImage(backgroundImage, 0, 0, width, height);
            ctx.globalCompositeOperation = 'source-over';
            setCanvasLoaded(true); // Set canvasLoaded to true when the image is loaded
          };
          backgroundImage.onerror = () => {
            console.error('Failed to load the image with CORS policy');
          };
        } else {
          ctx.fillStyle = '#000';
          ctx.fillRect(0, 0, width, height);
          setCanvasLoaded(true); // Set canvasLoaded to true when there is no image
        }

        canvas.addEventListener('mousedown', startDrawing);
        canvas.addEventListener('mousemove', draw);
        canvas.addEventListener('mouseup', stopDrawing);
        canvas.addEventListener('mouseout', stopDrawing);

        canvas.addEventListener('touchstart', startDrawing);
        canvas.addEventListener('touchmove', draw);
        canvas.addEventListener('touchend', stopDrawing);
      }

      return () => {
        canvas.removeEventListener('mousedown', startDrawing);
        canvas.removeEventListener('mousemove', draw);
        canvas.removeEventListener('mouseup', stopDrawing);
        canvas.removeEventListener('mouseout', stopDrawing);

        canvas.removeEventListener('touchstart', startDrawing);
        canvas.removeEventListener('touchmove', draw);
        canvas.removeEventListener('touchend', stopDrawing);
      };
    }
    return () => {};
  }, [startDrawing, draw, stopDrawing, image, width, height]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <div style={{ position: 'absolute', zIndex: 999, width, height }}>
        <canvas ref={canvasRef}></canvas>
      </div>
      {canvasLoaded && (
        <div style={{ position: 'relative', width, height }}>{children}</div>
      )}
    </div>
  );
};
