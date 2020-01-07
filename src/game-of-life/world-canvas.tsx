import React, { useRef, useEffect } from 'react';
import {
  firstTickToRender,
  frameToCanvasScaleFactor,
  WorldDimensions,
} from './config';

type DrawFrame = (
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  worldDimensions: WorldDimensions,
  newAliveCells: number[][]
) => void;
const drawFrame: DrawFrame = (
  canvas,
  context,
  { width, height },
  newAliveCells
) => {
  window.requestAnimationFrame(() => {
    // context.imageSmoothingEnabled = false;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = 'violet';
    context.lineWidth = 1;
    context.strokeRect(0, 0, canvas.width, canvas.height);
    newAliveCells.forEach(([column, row]) => {
      const x = (Math.floor(width / 2) + column) * frameToCanvasScaleFactor;
      const y = (Math.floor(height / 2) - row) * frameToCanvasScaleFactor;

      context.strokeStyle = 'black';
      context.lineWidth = 0.1 * frameToCanvasScaleFactor;
      context.fillStyle = 'violet';
      context.fillRect(
        x,
        y,
        1 * frameToCanvasScaleFactor,
        1 * frameToCanvasScaleFactor
      );
      context.shadowBlur = 0.5 * frameToCanvasScaleFactor;
      context.shadowColor = 'violet';
      context.strokeRect(
        x,
        y,
        1 * frameToCanvasScaleFactor,
        1 * frameToCanvasScaleFactor
      );
    });
  });
};

type UpdateCanvas = (
  canvas: HTMLCanvasElement | null,
  worldDimensions: WorldDimensions,
  newAliveCells: number[][]
) => void;
const updateCanvas: UpdateCanvas = (canvas, worldDimensions, newAliveCells) => {
  if (canvas) {
    const context = canvas.getContext('2d', { alpha: false });
    if (context) {
      drawFrame(canvas, context, worldDimensions, newAliveCells);
    }
  }
};

type WorldCanvas = React.FunctionComponent<{
  tick: number;
  aliveCells: number[][];
  worldDimensions: WorldDimensions;
}>;
const WorldCanvas: WorldCanvas = ({ tick, aliveCells, worldDimensions }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current && tick >= firstTickToRender) {
      updateCanvas(canvasRef.current, worldDimensions, aliveCells);
    }
  }, [tick]);
  return (
    <canvas
      ref={canvasRef}
      width={worldDimensions.width * frameToCanvasScaleFactor}
      height={worldDimensions.height * frameToCanvasScaleFactor}
    />
  );
};

export default WorldCanvas;
