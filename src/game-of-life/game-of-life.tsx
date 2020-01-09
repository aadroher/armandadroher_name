import React, { useRef, useEffect, useState } from 'react';
import {
  ticksPerSecond,
  frameToCanvasScaleFactor,
  WorldDimensions,
  aliveCellDensity,
} from './config';
import { createCells, createWorld, evolve, getWorldAliveCells } from './world';
import WorldCanvas from './world-canvas';

type GetWorldDimensions = () => WorldDimensions;
const getWorldDimensions: GetWorldDimensions = () => ({
  width: (window.innerWidth - 10) / frameToCanvasScaleFactor,
  height: (window.innerHeight - 10) / frameToCanvasScaleFactor,
});
const worldDimensions = getWorldDimensions();

const initialNumCells = Math.floor(
  worldDimensions.width * worldDimensions.height * aliveCellDensity
);

type GetRandomInt = (range: number) => number;
const getRandomInt: GetRandomInt = range =>
  Math.floor(Math.random() * range - range / 2);

type GetRandomCoordinates = (
  worldDimensions: WorldDimensions,
  numCells: number
) => number[][];
const getRandomCoordinates: GetRandomCoordinates = (
  { width, height },
  numCells
) =>
  [...Array(numCells).keys()].map(() => [
    getRandomInt(width),
    getRandomInt(height),
  ]);

const initialCells = createCells(
  getRandomCoordinates(worldDimensions, initialNumCells)
);
const initialWorld = createWorld(initialCells);

type UseInterval = (callback: Function, delay: number) => void;
const useInterval: UseInterval = (callback, delay) => {
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
};

type GameOfLife = React.FunctionComponent<{}>;
const GameOfLife: GameOfLife = () => {
  const [world, setWorld] = useState(initialWorld);
  const [tick, setTick] = useState(0);
  useInterval(() => {
    // if (tick <= 10) {
    const newWorld = evolve(world);
    setWorld(newWorld);
    setTick(tick + 1);
    // }
  }, 1000 / ticksPerSecond);

  const aliveCells = getWorldAliveCells(world);
  return (
    <WorldCanvas
      tick={tick}
      aliveCells={aliveCells}
      worldDimensions={worldDimensions}
    />
  );
};

export default GameOfLife;
