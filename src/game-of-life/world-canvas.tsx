import React, { useRef, useEffect } from 'react';
import {
  firstTickToRender,
  frameToCanvasScaleFactor,
  WorldDimensions,
} from './config';

type UpdateCanvas = (
  canvas: HTMLCanvasElement | null,
  worldDimensions: WorldDimensions,
  newAliveCells: number[][]
) => void;
const updateCanvas: UpdateCanvas = (
  canvas,
  { width, height },
  newAliveCells
) => {
  window.requestAnimationFrame(() => {
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeStyle = 'violet';
        context.lineWidth = 1;
        context.strokeRect(0, 0, canvas.width, canvas.height);
        newAliveCells.forEach(([column, row]) => {
          const x = (Math.floor(width / 2) + column) * frameToCanvasScaleFactor;
          const y = (Math.floor(height / 2) - row) * frameToCanvasScaleFactor;
          context.fillStyle = 'violet';
          context.fillRect(
            x,
            y,
            1 * frameToCanvasScaleFactor,
            1 * frameToCanvasScaleFactor
          );
        });
      }
    }
  });
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
  }, [aliveCells]);
  return (
    <canvas
      ref={canvasRef}
      width={worldDimensions.width * frameToCanvasScaleFactor}
      height={worldDimensions.height * frameToCanvasScaleFactor}
    />
  );
};

export default WorldCanvas;
