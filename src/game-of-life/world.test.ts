import { createCells, createWorld, evolve } from './world';

describe('createCells', () => {
  it('creates a cell set', () => {
    const coordinates: number[][] = [
      [0, 0],
      [1, 0],
      [-1, 0],
    ];
    const cellSet = createCells(coordinates);
    console.log(cellSet);
  });
});

describe('createWorld', () => {
  it('creates a world', () => {
    const coordinates: number[][] = [
      [0, 0],
      [1, 0],
      [-1, 0],
    ];
    const cellSet = createCells(coordinates);
    const world = createWorld(cellSet);
    console.log(world);
  });
});

describe('evolve', () => {
  it('kills a single cell', () => {
    const coordinates: number[][] = [[0, 0]];
    const cellSet = createCells(coordinates);
    const world = createWorld(cellSet);
    console.log(world);
    const nextWorld = evolve(world);
    console.log(nextWorld);
  });

  it('leaves a square stable', () => {
    const coordinates: number[][] = [
      [0, 0],
      [1, 0],
      [0, 1],
      [1, 1],
    ];
    const cellSet = createCells(coordinates);
    const world = createWorld(cellSet);
    console.log(world);
    const nextWorld = evolve(world);
    console.log(nextWorld);
  });

  it('evolves a blinker', () => {
    const coordinates: number[][] = [
      [0, 0],
      [1, 0],
      [-1, 0],
    ];
    const cellSet = createCells(coordinates);
    const world = createWorld(cellSet);
    console.log(world);
    const nextWorld = evolve(world);
    console.log(nextWorld);
  });
});
