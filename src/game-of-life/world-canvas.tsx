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
      newAliveCells.forEach(([column, row]) => {
        console.log({ canvas });
        console.log({ width, height });
        console.log({ column, row });
        const x = (column + Math.floor(width / 1)) / 1;
        const y = (row + Math.floor(height / 1)) / 1;
        console.log({ x, y });
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
