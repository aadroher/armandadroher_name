import React, { useRef, useEffect } from 'react';

type WorldDimensions = {
  width: number;
  height: number;
};

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
  if (canvas) {
    const context = canvas.getContext('2d');
    if (context) {
      context.clearRect(0, 0, canvas.width, canvas.height);
      context.strokeStyle = 'violet';
      context.lineWidth = 1;
      context.strokeRect(0, 0, canvas.width, canvas.height);
      newAliveCells.forEach(([column, row]) => {
        const x = Math.floor(width / 2) + column;
        const y = Math.floor(height / 2) - row;
        context.fillStyle = 'violet';
        context.fillRect(x, y, 1, 1);
      });
    }
  }
};

type WorldCanvas = React.FunctionComponent<{
  aliveCells: number[][];
  worldDimensions: WorldDimensions;
}>;
const WorldCanvas: WorldCanvas = ({ aliveCells, worldDimensions }) => {
  const canvasRef = useRef(null);
  useEffect(() => {
    if (canvasRef.current) {
      updateCanvas(canvasRef.current, worldDimensions, aliveCells);
    }
  }, [aliveCells]);
  return (
    <canvas
      ref={canvasRef}
      width={worldDimensions.width}
      height={worldDimensions.height}
    />
  );
};

export default WorldCanvas;
