let container;
let skillNodes = [];
let timelineMarkers = [];

function setup() {
  container = document.getElementById('hero-container');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('hero-container');
  pixelDensity(1);

  // Skill nodes floating around the central timeline
  skillNodes = [
    { label: "p5.js / Canvas", x: width * 0.15, y: height * 0.28, vx: 0.1, vy: -0.08, category: "Interactive" },
    { label: "HTML5 / CSS3", x: width * 0.28, y: height * 0.70, vx: -0.12, vy: 0.1, category: "Front-End" },
    { label: "JavaScript (ES6+)", x: width * 0.45, y: height * 0.25, vx: 0.08, vy: 0.12, category: "Engineering" },
    { label: "UI/UX & Figma", x: width * 0.62, y: height * 0.72, vx: -0.1, vy: -0.08, category: "Design" },
    { label: "Design Systems", x: width * 0.78, y: height * 0.30, vx: 0.12, vy: 0.08, category: "Architecture" },
    { label: "Responsive Web", x: width * 0.88, y: height * 0.65, vx: -0.08, vy: -0.1, category: "Front-End" }
  ];

  // Milestones along the timeline
  timelineMarkers = [
    { x: width * 0.20, label: "FOUNDATIONS" },
    { x: width * 0.45, label: "DEVELOPMENT" },
    { x: width * 0.70, label: "SPECIALIZATION" },
    { x: width * 0.90, label: "CO-OP READY" }
  ];
}

function draw() {
  // Deep plum background base matching site theme
  background(26, 11, 46);

  // -------------------------------------------------------------
  // 1. ISOMETRIC BACKGROUND GRID
  // -------------------------------------------------------------
  stroke(255, 255, 255, 10);
  strokeWeight(1);
  let gridSize = 30;

  for (let x = 0; x < width; x += gridSize) {
    line(x, 0, x, height);
  }
  for (let y = 0; y < height; y += gridSize) {
    line(0, y, width, y);
  }

  // -------------------------------------------------------------
  // 2. TIMELINE AXIS & MILESTONES
  // -------------------------------------------------------------
  let axisY = height * 0.50;

  // Central progression axis line
  stroke(212, 175, 55, 90); // Gold stroke
  strokeWeight(1.5);
  line(width * 0.08, axisY, width * 0.92, axisY);

  // Timeline pulse tick marks and labels
  for (let m of timelineMarkers) {
    stroke(212, 175, 55, 180);
    strokeWeight(2);
    line(m.x, axisY - 8, m.x, axisY + 8);

    noStroke();
    fill(255, 255, 255, 140);
    textFont('Space Grotesk', 'sans-serif');
    textSize(10);
    textAlign(CENTER);
    text(m.label, m.x, axisY + 24);
  }
  textAlign(LEFT); // Reset text alignment

  // -------------------------------------------------------------
  // 3. SKILL NODES & VECTOR CONNECTORS
  // -------------------------------------------------------------
  for (let node of skillNodes) {
    // Drifting movement
    node.x += node.vx;
    node.y += node.vy;

    if (node.x < 50 || node.x > width - 50) node.vx *= -1;
    if (node.y < 40 || node.y > height - 40) node.vy *= -1;

    let d = dist(mouseX, mouseY, node.x, node.y);
    let isHovered = d < 300;

    // Line connecting node back to central timeline axis
    stroke(isHovered ? color(212, 175, 55, 140) : color(255, 255, 255, 20));
    strokeWeight(1);
    line(node.x, node.y, node.x, axisY);

    // Connector line from mouse to nearby node
    if (isHovered && mouseX > 0 && mouseX < width) {
      stroke(212, 175, 55, map(d, 0, 150, 220, 40));
      strokeWeight(1);
      line(mouseX, mouseY, node.x, node.y);
    }

    // Node pill background
    if (isHovered) {
      fill(112, 41, 99, 80);
      stroke(212, 175, 55, 240);
      strokeWeight(1.5);
    } else {
      fill(255, 255, 255, 8);
      stroke(255, 255, 255, 35);
      strokeWeight(1);
    }

    rect(node.x - 10, node.y - 14, 130, 28, 14);

    // Node indicator dot
    noStroke();
    fill(212, 175, 55, isHovered ? 255 : 120);
    ellipse(node.x, node.y, 6, 6);

    // Node label
    fill(isHovered ? color(255, 255, 255, 255) : color(255, 255, 255, 180));
    textFont('Space Grotesk', 'sans-serif');
    textSize(11);
    text(node.label, node.x + 12, node.y + 4);
  }

  // -------------------------------------------------------------
  // 4. WHITEBOARD ANNOTATIONS & NOTES
  // -------------------------------------------------------------
  textFont('Caveat', 'cursive');
  textSize(18);
  fill(212, 175, 55, 200);
  text("★ Front-End & UI/UX Stack", width * 0.10, height * 0.18);
  text("← continuous learning curve →", width * 0.42, height * 0.88);

  // -------------------------------------------------------------
  // 5. CURSOR TRACKING CROSSHAIR
  // -------------------------------------------------------------
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    stroke(212, 175, 55, 90);
    strokeWeight(1);
    line(0, mouseY, width, mouseY);
    line(mouseX, 0, mouseX, height);

    noFill();
    stroke(212, 175, 55, 220);
    ellipse(mouseX, mouseY, 20, 20);

    noStroke();
    fill(212, 175, 55, 240);
    textFont('Space Grotesk', 'sans-serif');
    textSize(10);
    text(`TIMELINE_INSPECT: ${Math.round(mouseX)}px`, mouseX + 16, mouseY - 10);
  }
}

function windowResized() {
  if (container) {
    resizeCanvas(container.offsetWidth, container.offsetHeight);
  }
}