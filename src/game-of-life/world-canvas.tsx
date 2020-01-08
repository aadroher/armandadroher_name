import React, { useRef, useEffect } from 'react';
import {
  firstTickToRender,
  baseCellWidth,
  baseShadowBlurLength,
  frameToCanvasScaleFactor,
  WorldDimensions,
} from './config';

const hiddenCanvasWidth =
  (baseCellWidth + 2 * baseShadowBlurLength) * frameToCanvasScaleFactor;

type HiddenCanvas = React.ForwardRefExoticComponent<
  React.RefAttributes<HTMLCanvasElement>
>;
const HiddenCanvas: HiddenCanvas = React.forwardRef<HTMLCanvasElement, any>(
  (_, hiddenCanvasRef: React.Ref<HTMLCanvasElement>) => (
    <canvas
      ref={hiddenCanvasRef}
      width={hiddenCanvasWidth}
      height={hiddenCanvasWidth}
    />
  )
);

type DrawFrame = (
  hiddenCanvas: HTMLCanvasElement,
  canvas: HTMLCanvasElement,
  canvasContext: CanvasRenderingContext2D,
  worldDimensions: WorldDimensions,
  newAliveCells: number[][]
) => void;
const drawFrame: DrawFrame = (
  hiddenCanvas,
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
      const x = Math.floor(
        (Math.floor(width / 2) + column) * frameToCanvasScaleFactor
      );
      const y = Math.floor(
        (Math.floor(height / 2) - row) * frameToCanvasScaleFactor
      );

      context.drawImage(hiddenCanvas, x, y);

      // context.strokeStyle = 'black';
      // context.lineWidth = Math.floor(0.1 * frameToCanvasScaleFactor);
      // context.fillStyle = 'violet';
      // context.fillRect(
      //   x,
      //   y,
      //   1 * frameToCanvasScaleFactor,
      //   1 * frameToCanvasScaleFactor
      // );
      // // context.shadowBlur = Math.floor(0.5 * frameToCanvasScaleFactor);
      // // context.shadowColor = 'violet';
      // context.strokeRect(
      //   x,
      //   y,
      //   1 * frameToCanvasScaleFactor,
      //   1 * frameToCanvasScaleFactor
      // );
    });
  });
};

type UpdateCanvas = (
  hiddenCanvas: HTMLCanvasElement | null,
  canvas: HTMLCanvasElement | null,
  worldDimensions: WorldDimensions,
  newAliveCells: number[][]
) => void;
const updateCanvas: UpdateCanvas = (
  hiddenCanvas,
  canvas,
  worldDimensions,
  newAliveCells
) => {
  if (canvas && hiddenCanvas) {
    const context = canvas.getContext('2d', { alpha: false });
    if (context) {
      drawFrame(hiddenCanvas, canvas, context, worldDimensions, newAliveCells);
    }
  }
};

type WorldCanvas = React.FunctionComponent<{
  tick: number;
  aliveCells: number[][];
  worldDimensions: WorldDimensions;
}>;
const WorldCanvas: WorldCanvas = ({ tick, aliveCells, worldDimensions }) => {
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  let hiddenCanvas: HTMLCanvasElement | null;

  useEffect(() => {
    hiddenCanvas = hiddenCanvasRef.current;
    if (hiddenCanvas && tick <= firstTickToRender) {
      const context: CanvasRenderingContext2D | null = hiddenCanvas.getContext(
        '2d'
      );
      console.log({ context });
      if (context) {
        console.log('Draw in hidden canvas.');
        context.strokeStyle = 'black';
        context.lineWidth = Math.floor(0.1 * frameToCanvasScaleFactor);
        context.fillStyle = 'violet';
        // context.shadowBlur = baseShadowBlurLength * frameToCanvasScaleFactor;
        // context.shadowColor = 'violet';
        // const x = baseShadowBlurLength * frameToCanvasScaleFactor;
        // const y = baseShadowBlurLength * frameToCanvasScaleFactor;
        const x = 0;
        const y = 0;
        console.log({
          baseCellWidth: baseCellWidth * frameToCanvasScaleFactor,
          x,
          y,
        });
        context.fillRect(
          x,
          y,
          baseCellWidth * frameToCanvasScaleFactor,
          baseCellWidth * frameToCanvasScaleFactor
        );

        // context.strokeRect(
        //   x,
        //   y,
        //   baseCellWidth * frameToCanvasScaleFactor,
        //   baseCellWidth * frameToCanvasScaleFactor
        // );
      }
    }
  }, [tick]);

  useEffect(() => {
    if (canvasRef.current && tick >= firstTickToRender) {
      updateCanvas(
        hiddenCanvasRef.current,
        canvasRef.current,
        worldDimensions,
        aliveCells
      );
    }
  }, [tick]);
  return (
    <>
      <HiddenCanvas ref={hiddenCanvasRef} />
      <canvas
        ref={canvasRef}
        width={worldDimensions.width * frameToCanvasScaleFactor}
        height={worldDimensions.height * frameToCanvasScaleFactor}
      />
    </>
  );
};

export default WorldCanvas;
