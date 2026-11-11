let container;
let wireframes = [];
let codeSnippets = [];
let whiteboardNotes = [];

function setup() {
  container = document.getElementById('hero-container');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('hero-container');
  pixelDensity(1);

  // 1. Floating UI wireframe modules
  wireframes = [
    { x: width * 0.12, y: height * 0.18, w: 180, h: 110, label: "COMPONENT: HERO_BANNER", vx: 0.12, vy: -0.08 },
    { x: width * 0.42, y: height * 0.15, w: 210, h: 130, label: "MODULE: GRID_SYSTEM", vx: -0.15, vy: 0.12 },
    { x: width * 0.75, y: height * 0.28, w: 190, h: 120, label: "CARD: CASE_STUDY_01", vx: 0.1, vy: 0.15 },
    { x: width * 0.28, y: height * 0.58, w: 180, h: 105, label: "UI: NAVIGATION_BAR", vx: -0.12, vy: -0.12 },
    { x: width * 0.65, y: height * 0.62, w: 200, h: 115, label: "CONTAINER: FLEX_BOX", vx: 0.15, vy: -0.08 }
  ];

  // 2. Spread out code snippets & syntax elements
  codeSnippets = [
    { text: "const designSystem = new Palette();", x: width * 0.05, y: height * 0.48, color: [212, 175, 55, 180] },
    { text: "function buildLayout(grid) {", x: width * 0.38, y: height * 0.42, color: [255, 255, 255, 160] },
    { text: "  return components.map(render);", x: width * 0.40, y: height * 0.47, color: [112, 41, 99, 220] },
    { text: "}", x: width * 0.38, y: height * 0.52, color: [255, 255, 255, 160] },
    { text: "<Canvas overlay={true} />", x: width * 0.70, y: height * 0.12, color: [212, 175, 55, 160] },
    { text: "grid-template-columns: repeat(3, 1fr);", x: width * 0.18, y: height * 0.88, color: [255, 255, 255, 140] },
    { text: "p5.Vector.dist(mX, mY);", x: width * 0.55, y: height * 0.82, color: [212, 175, 55, 170] },
    { text: "const tiles = board.flat();", x: width * 0.82, y: height * 0.55, color: [112, 41, 99, 200] },
    { text: "// TODO: optimize particle loop", x: width * 0.62, y: height * 0.08, color: [255, 255, 255, 110] }
  ];

  // 3. Annotations, whiteboard notes, and architectural sketch elements
  whiteboardNotes = [
    { text: "NOTE: Check breakpoints -> 1024px / 600px", x: width * 0.15, y: height * 0.38, font: 'Caveat' },
    { text: "★ GOLD ACCENT (#D4AF37)", x: width * 0.52, y: height * 0.22, font: 'Space Grotesk' },
    { text: "[ FIXED ASPECT RATIO ]", x: width * 0.78, y: height * 0.45, font: 'Space Grotesk' },
    { text: "<- smooth spring animation here ->", x: width * 0.32, y: height * 0.72, font: 'Caveat' },
    { text: "// 200 OK — render complete", x: width * 0.80, y: height * 0.85, font: 'Space Grotesk' }
  ];
}

function draw() {
  // Deep plum background base matching site theme
  background(26, 11, 46);

  // -------------------------------------------------------------
  // 1. ISOMETRIC ARCHITECTURAL GRID
  // -------------------------------------------------------------
  stroke(255, 255, 255, 12);
  strokeWeight(1);

  let gridSize = 30;
  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }

  // -------------------------------------------------------------
  // 2. SPREAD OUT CODE SNIPPETS
  // -------------------------------------------------------------
  textFont('Courier New', 'monospace');
  textSize(12);
  noStroke();

  for (let c of codeSnippets) {
    fill(c.color[0], c.color[1], c.color[2], c.color[3]);
    text(c.text, c.x, c.y);
  }

  // -------------------------------------------------------------
  // 3. WHITEBOARD NOTES & ANNOTATIONS
  // -------------------------------------------------------------
  for (let note of whiteboardNotes) {
    if (note.font === 'Caveat') {
      textFont('Caveat', 'cursive');
      textSize(18);
      fill(212, 175, 55, 210); // Gold handwritten notes
    } else {
      textFont('Space Grotesk', 'sans-serif');
      textSize(10);
      fill(255, 255, 255, 130);
    }
    text(note.text, note.x, note.y);
  }

  // Whiteboard sketch vector accents (connecting lines & arrows)
  stroke(212, 175, 55, 80);
  strokeWeight(1);
  noFill();

  // Pointer arrow sketch on canvas
  line(width * 0.28, height * 0.36, width * 0.22, height * 0.30);
  line(width * 0.22, height * 0.30, width * 0.24, height * 0.30);
  line(width * 0.22, height * 0.30, width * 0.22, height * 0.32);

  // Dimension measurement line
  stroke(255, 255, 255, 30);
  line(width * 0.75, height * 0.48, width * 0.88, height * 0.48);
  line(width * 0.75, height * 0.46, width * 0.75, height * 0.50);
  line(width * 0.88, height * 0.46, width * 0.88, height * 0.50);

  // -------------------------------------------------------------
  // 4. FLOATING WIREFRAME UI FRAMES
  // -------------------------------------------------------------
  textFont('Space Grotesk', 'monospace');

  for (let i = 0; i < wireframes.length; i++) {
    let f = wireframes[i];

    // Drift movement
    f.x += f.vx;
    f.y += f.vy;

    if (f.x < 30 || f.x + f.w > width - 30) f.vx *= -1;
    if (f.y < 20 || f.y + f.h > height - 20) f.vy *= -1;

    let centerX = f.x + f.w / 2;
    let centerY = f.y + f.h / 2;
    let d = dist(mouseX, mouseY, centerX, centerY);
    let isHovered = d < 140;

    if (isHovered) {
      fill(112, 41, 99, 50);
      stroke(212, 175, 55, 220);
      strokeWeight(1.5);
    } else {
      fill(255, 255, 255, 6);
      stroke(255, 255, 255, 35);
      strokeWeight(1);
    }

    rect(f.x, f.y, f.w, f.h, 4);

    // Inner structural lines
    stroke(isHovered ? color(212, 175, 55, 130) : color(255, 255, 255, 20));
    strokeWeight(1);
    line(f.x + 10, f.y + 22, f.x + f.w - 10, f.y + 22);
    line(f.x + 10, f.y + 36, f.x + f.w * 0.55, f.y + 36);

    rect(f.x + 10, f.y + 48, f.w - 20, f.h - 58, 2);

    // Frame Label Tag
    noStroke();
    fill(isHovered ? color(212, 175, 55, 240) : color(255, 255, 255, 120));
    textSize(9);
    text(f.label, f.x + 8, f.y + 15);

    // Corner Nodes
    fill(212, 175, 55, isHovered ? 255 : 80);
    rect(f.x - 2, f.y - 2, 5, 5);
    rect(f.x + f.w - 3, f.y - 2, 5, 5);
    rect(f.x - 2, f.y + f.h - 3, 5, 5);
    rect(f.x + f.w - 3, f.y + f.h - 3, 5, 5);
  }

  // -------------------------------------------------------------
  // 5. CURSOR MEASUREMENT CROSSHAIR
  // -------------------------------------------------------------
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    stroke(212, 175, 55, 90);
    strokeWeight(1);
    
    line(0, mouseY, width, mouseY);
    line(mouseX, 0, mouseX, height);

    noFill();
    stroke(212, 175, 55, 220);
    ellipse(mouseX, mouseY, 24, 24);
    ellipse(mouseX, mouseY, 6, 6);

    noStroke();
    fill(212, 175, 55, 240);
    textFont('Space Grotesk', 'sans-serif');
    textSize(10);
    let coords = `X: ${Math.round(mouseX)}px  |  Y: ${Math.round(mouseY)}px  [ ARCHITECT_MODE ]`;
    text(coords, mouseX + 16, mouseY - 10);
  }
}

function windowResized() {
  if (container) {
    resizeCanvas(container.offsetWidth, container.offsetHeight);
  }
}