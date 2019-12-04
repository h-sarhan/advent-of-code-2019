// Load data
const data = document.querySelector('span').innerHTML;

const line1 = data.split('\n')[0].split(',');
const line2 = data.split('\n')[1].split(',');
line2[0] = 'L1000';

// Part 1
class Path {
  constructor(str) {
    this.direction = str[0];
    this.length = Number(str.slice(1));
  }
}

class Line {
  constructor(pathList) {
    this.maxL = 0;
    this.maxR = 0;
    this.maxD = 0;
    this.maxU = 0;
    this.paths = pathList.map(str => new Path(str));
    this.widthRange = this.paths.forEach(({ direction, length }) => {
      if (direction === 'L') {
        this.maxL += length;
      } else if (direction === 'R') {
        this.maxR += length;
      } else if (direction === 'D') {
        this.maxD += length;
      } else if (direction === 'U') {
        this.maxU += length;
      }
    });
  }
}

function gridSize(line1, line2) {
  const dim = [
    -Math.max(line1.maxL, line2.maxL),
    Math.max(line1.maxR, line2.maxR),
    -Math.max(line1.maxU, line2.maxU),
    Math.max(line1.maxD, line2.maxD),
  ];
  return dim;
}

function initGrid(grid, line1, line2) {
  const dim = gridSize(line1, line2);
  for (let x = dim[0]; x <= dim[1]; x++) {
    grid[x] = new Set();
  }
}
function fillGrid(grid, line) {
  const currPoint = [0, 0];
  const steps = {};
  let stepsTaken = 0;
  line.paths.forEach(path => {
    switch (path.direction) {
      case 'U':
        for (let i = 0; i < path.length; i++) {
          currPoint[1]++;
          stepsTaken++;
          grid[currPoint[0]].add(currPoint[1]);
          steps[[currPoint[0], currPoint[1]]] = stepsTaken;
        }
        break;
      case 'D':
        for (let i = 0; i < path.length; i++) {
          currPoint[1]--;
          stepsTaken++;
          grid[currPoint[0]].add(currPoint[1]);
          steps[[currPoint[0], currPoint[1]]] = stepsTaken;
        }
        break;
      case 'L':
        for (let i = 0; i < path.length; i++) {
          currPoint[0]--;
          stepsTaken++;
          grid[currPoint[0]].add(currPoint[1]);
          steps[[currPoint[0], currPoint[1]]] = stepsTaken;
        }
        break;
      case 'R':
        for (let i = 0; i < path.length; i++) {
          currPoint[0]++;
          stepsTaken++;
          grid[currPoint[0]].add(currPoint[1]);
          steps[[currPoint[0], currPoint[1]]] = stepsTaken;
        }
        break;
    }
  });
  return steps;
}

function searchGrids(grid1, grid2, dim) {
  const intersections = [];
  for (let i = dim[0]; i <= dim[1]; i++) {
    grid1[i].forEach(el => {
      if (grid2[i].has(el)) {
        intersections.push([i, el]);
      }
    });
  }
  return intersections;
}

function calcDistances(intersections) {
  const results = intersections.map(([x, y]) => Math.abs(x) + Math.abs(y));
  return results;
}

// const grid1 = { 0: { 0: 0 } };
// const grid2 = { 0: { 0: 0 } };
const lineObj1 = new Line(line1);
const lineObj2 = new Line(line2);

// initGrid(grid1, lineObj1, lineObj2);
// initGrid(grid2, lineObj1, lineObj2);
// fillGrid(grid1, lineObj1);
// fillGrid(grid2, lineObj2);
// const intersections = searchGrids(grid1, grid2, gridSize(lineObj1, lineObj2));
// const distances = calcDistances(intersections);
// const minDistance = Math.min(...distances);
// console.log(minDistance);

// Part 2

const grid3 = { 0: { 0: 0 } };
const grid4 = { 0: { 0: 0 } };

initGrid(grid3, lineObj1, lineObj2);
initGrid(grid4, lineObj1, lineObj2);
const steps1 = fillGrid(grid3, lineObj1);
const steps2 = fillGrid(grid4, lineObj2);
const intersections = searchGrids(grid3, grid4, gridSize(lineObj1, lineObj2));
const intersectionSteps = [];
const intersectionsToString = intersections.map(([x, y]) => `${x},${y}`);
Object.entries(steps1).forEach(([key, value]) => {
  if (intersectionsToString.includes(key)) {
    intersectionSteps.push(value + steps2[key]);
  }
});

const minSteps = Math.min(...intersectionSteps);
console.log(minSteps);
