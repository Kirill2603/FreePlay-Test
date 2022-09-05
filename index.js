function isPositiveNumbers(...args) {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] <= 0 || typeof arguments[i] !== "number") {
      return false;
    }
  }
  return true;
}

function setRectangleParameters(width, height) {
  if (!isPositiveNumbers(width, height)) {
    console.error("Error: pls enter two positive number");
  } else
    return {
      type: "Rectangle",
      width,
      height,
      area: width * height,
      perimeter: (width + height) * 2,
    };
}

function setTriangleParameters(a, b, c) {
  if (!isPositiveNumbers(a, b, c)) {
    console.error("Error: pls enter three positive number");
  } else {
    const perimeterHalf = (a + b + c) / 2;
    const area = Math.sqrt(
      perimeterHalf *
        (perimeterHalf - a) *
        (perimeterHalf - b) *
        (perimeterHalf - c)
    );
    return {
      type: "Triangle",
      sides: { a, b, c },
      area: area.toFixed(2),
      perimeter: a + b + c,
    };
  }
}

function setRegularPolygonParameters(sideLength, sidesQuantity) {
  if (!isPositiveNumbers(sideLength, sidesQuantity)) {
    console.error("Error: pls enter two positive number");
  } else {
    const area =
      (sidesQuantity * sideLength ** 2) /
      (4 * Math.tan(Math.PI / sidesQuantity));
    return {
      type: "Polygon",
      sideLength,
      sidesQuantity,
      area: area.toFixed(2),
      perimeter: sideLength * sidesQuantity,
    };
  }
}

function setCircle(radius) {
  if (!isPositiveNumbers(radius)) {
    console.error("Error: pls enter positive number");
  } else {
    return {
      type: "Circle",
      radius,
      area: (Math.PI * radius ** 2).toFixed(2),
      perimeter: (2 * Math.PI * radius).toFixed(2),
    };
  }
}

function setPoint(x, y) {
  if (!isPositiveNumbers(x, y)) {
    console.error("Error: pls enter two positive number");
  } else {
    return { type: "Point", x, y };
  }
}

function setLine(start, end) {
  if (start.x === end.x && start.y === end.y) {
    console.error("Line length in null");
  }
  return {
    type: "Line",
    start,
    end,
    lineLength: Math.sqrt(
      (start.x - end.x) ** 2 + (start.y - end.y) ** 2
    ).toFixed(2),
  };
}

function isLineIntersected(firstLine, secondLine) {
  const x1 = firstLine.start.x;
  const y1 = firstLine.start.y;
  const x2 = firstLine.end.x;
  const y2 = firstLine.end.y;
  const x3 = secondLine.start.x;
  const y3 = secondLine.start.y;
  const x4 = secondLine.end.x;
  const y4 = secondLine.end.y;

  const result = {
    type: "Line Intersected",
    firstLine,
    secondLine,
  };

  // check lineLength
  if (firstLine.lineLength === 0 || secondLine.lineLength === 0) {
    return { ...result, intersect: "Line length in null" };
  }
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);

  // is Parallels Lines
  if (denominator === 0) {
    return { ...result, intersect: "line is parallels" };
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denominator;

  // is the intersection along the segments
  if (ua < 0 || ua > 1 || ub < 0 || ub > 1) {
    return { ...result, intersect: "No intersect" };
  }

  return {
    ...result,
    intersect: {
      x: x1 + ua * (x2 - x1),
      y: y1 + ua * (y2 - y1),
    },
  };
}

function set3DPoint(x, y, z) {
  if (!isPositiveNumbers(x, y, z)) {
    console.error("Error: pls enter three positive numbers");
    return null;
  }
  return {
    type: "3D Point",
    position: [x, y, z],
  };
}

function set3DLine(point1, point2) {
  if (!isPositiveNumbers(...point1.position, ...point2.position)) {
    console.error("Error: pls enter two correct points");
    return null;
  }
  return {
    type: "3D Line",
    point1,
    point2,
    lineLength: Math.sqrt(
      (point2.position[0] - point1.position[0]) ** 2 +
        (point2.position[1] - point1.position[1]) ** 2 +
        (point2.position[2] - point1.position[2]) ** 2
    ).toFixed(2),
  };
}

console.log(setRectangleParameters(2, 2));
console.log(setTriangleParameters(2, 3, 4));
console.log(setRegularPolygonParameters(4, 5));
console.log(setCircle(3));
console.log(setLine(setPoint(1, 3), setPoint(7, 6)));

const line1 = setLine(setPoint(1, 1), setPoint(6, 1));
const line2 = setLine(setPoint(3, 1), setPoint(3, 3));
console.log(isLineIntersected(line1, line2));

const point1 = set3DPoint(1, 1, 1);
const point2 = set3DPoint(3, 3, 3);
console.log(set3DLine(point1, point2));
