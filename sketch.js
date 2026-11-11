let container;
let codeLayer;   // left scene, drawn once into an offscreen buffer
let sunsetLayer; // right scene, drawn once into an offscreen buffer

function setup() {
  container = document.getElementById('hero-container');
  let canvas = createCanvas(container.offsetWidth, container.offsetHeight);
  canvas.parent('hero-container');
  pixelDensity(1); 
  buildLayers();
}

// Both scenes are static, so render them once (and again on resize)
// instead of redrawing every line, cloud and character 60 times a second
function buildLayers() {
  if (codeLayer) codeLayer.remove();
  if (sunsetLayer) sunsetLayer.remove();

  codeLayer = createGraphics(width, height);
  codeLayer.pixelDensity(1);
  renderCodeVisual(codeLayer);

  sunsetLayer = createGraphics(width, height);
  sunsetLayer.pixelDensity(1);
  renderSunsetVisual(sunsetLayer);
}

function draw() {
  // Determine split boundary based on mouse X position
  // Default to center if cursor is outside or off-screen
  let dividerX = (mouseX > 0 && mouseX < width) ? mouseX : width / 2;

  // -------------------------------------------------------------
  // 1. LEFT SIDE: Monochrome Coding Visual
  // -------------------------------------------------------------
  push();
  rectMode(CORNER);
  // Clip rendering area to the left side of cursor
  clip(() => {
    rect(0, 0, dividerX, height);
  });
  image(codeLayer, 0, 0);
  pop();

  // -------------------------------------------------------------
  // 2. RIGHT SIDE: Sunset / Night Sky Visual
  // -------------------------------------------------------------
  push();
  rectMode(CORNER);
  // Clip rendering area to the right side of cursor
  clip(() => {
    rect(dividerX, 0, width - dividerX, height);
  });
  image(sunsetLayer, 0, 0);
  pop();

  // -------------------------------------------------------------
  // 3. DIVIDER LINE: Metallic Gold Interactive Cursor Line
  // -------------------------------------------------------------
  stroke(212, 175, 55); // Using your CSS --accent-color gold (#D4AF37)
  strokeWeight(2);
  line(dividerX, 0, dividerX, height);
}

// Render routine for Left Side (Monochrome / Tech)
function renderCodeVisual(g) {
  g.background(26, 26, 26); // Dark charcoal IDE background

  // -------------------------------------------------------------
  // LAYER 1: Spaced-Out Full-Width Matrix Rain (Background)
  // -------------------------------------------------------------
  g.textFont('Courier New');
  g.noStroke();

  let colSpacing = 48; // Spaced out horizontal columns
  let numColumns = ceil(width / colSpacing);

  for (let c = 0; c < numColumns; c++) {
    let colX = c * colSpacing + 20;
    let colSeed = (c * 17) % 100;
    
    // Vary font sizes slightly for depth
    let fontSz = (c % 2 === 0) ? 14 : 10;
    g.textSize(fontSz);

    for (let r = 0; r < 18; r++) {
      let charY = r * 30 + 20; // Spaced out vertical row gaps
      let bit = ((c + r + (r % 3)) % 2 === 0) ? "1" : "0";

      // Matrix glow highlights
      if ((r + colSeed) % 6 === 0) {
        g.fill(112, 41, 99, 220); // plum leader glow
      } else if ((r + colSeed) % 6 === 1) {
        g.fill(251, 80, 109, 180);   // Primary watermelon character
      } else {
        g.fill(255, 255, 255, 30);   // Subtle ambient background char
      }

      g.text(bit, colX, charY);
    }
  }

  // -------------------------------------------------------------
  // LAYER 2: Distributed Floating Syntax Tags & Brackets (Midground)
  // -------------------------------------------------------------
  g.fill(112, 41, 99, 130); // Teal accent with opacity
  g.textSize(14);

  // Distributed across full width percentages
  g.text("<canvas id='hero'>", width * 0.35, 45);
  g.text("{ ...designTokens }", width * 0.65, 90);
  g.text("display: flex;", width * 0.22, 160);
  g.text("</>", width * 0.78, 180);
  g.fill(252, 108, 133,130)
  g.text("const [state, setState]", width * 0.48, 250);
  g.text("import { p5 } from 'p5';", width * 0.15, 310);
  g.text("</div>", width * 0.82, 340);
  g.text("=> { return UI; }", width * 0.58, 410);

  // Structural Blueprint Vertical Guide Lines
  g.stroke(255, 255, 255, 12);
  g.strokeWeight(1);
  g.line(width * 0.3, 0, width * 0.3, height);
  g.line(width * 0.65, 0, width * 0.65, height);

  // -------------------------------------------------------------
  // LAYER 3: Distributed Terminal Clusters (Foreground)
  // -------------------------------------------------------------
  g.noStroke();
  g.textFont('Courier New');

  // --- CLUSTER A: Top-Left Stack ---
  g.textSize(13);
  g.fill(255, 255, 255, 240);
  g.text("> const developer = true;", 35, 75);
  g.text("> const designer = true;", 35, 100);
  g.fill(112, 41, 99, 240);
  g.text("> const stack = ['JS', 'CSS3', 'p5'];", 35, 125);

  // --- CLUSTER B: Upper-Mid-Right Function Call ---
  g.fill(252, 108, 133, 240); // watermelon accent
  g.text("> buildInteractiveUI();", width * 0.42, 130);
  g.fill(255, 255, 255, 190);
  g.text("> renderCanvas({ split: true });", width * 0.44, 155);

  // --- CLUSTER C: Mid-Canvas Action Block ---
  g.fill(255, 255, 255, 230);
  g.text("> async function initApp() {", width * 0.28, 280);
  g.fill(112, 41, 99, 240);
  g.text("    await loadAssets();", width * 0.28, 305);
  g.fill(252, 108, 133, 240);
  g.text("    return <Portfolio />; ", width * 0.28, 330);
  
  // Terminal Cursor Block
  g.rect(width * 0.28 + 205, 318, 8, 14);

  // --- CLUSTER D: Right-Side Footer Status Note ---
  g.fill(255, 255, 255, 150);
  g.textSize(11);
  g.text("// status: 200 OK — system online", width * 0.68, 420);
}

// Render routine for Right Side (Sunset / Creative Sky)
function renderSunsetVisual(g) {
  // -------------------------------------------------------------
  // 1. SMOOTH ATMOSPHERIC SKY GRADIENT (Plum -> Rose -> Gold)
  // -------------------------------------------------------------
  let colorPlum   = color(30, 19, 43);   // Deep Plum Top (#1E132B)
  let colorRose   = color(180, 75, 110); // Mid Rose Pink
  let colorGold   = color(230, 150, 40); // Golden Horizon

  for (let y = 0; y < height; y++) {
    let inter;
    let c;
    if (y < height * 0.5) {
      inter = map(y, 0, height * 0.5, 0, 1);
      c = lerpColor(colorPlum, colorRose, inter);
    } else {
      inter = map(y, height * 0.5, height, 0, 1);
      c = lerpColor(colorRose, colorGold, inter);
    }
    g.stroke(c);
    g.strokeWeight(1);
    g.line(0, y, width, y);
  }

  // -------------------------------------------------------------
  // 2. THE SUN & ATMOSPHERIC GLOW
  // -------------------------------------------------------------
  g.noStroke();
  let sunX = width * 0.75;
  let sunY = height * 0.55;

  // Soft blended outer radial glows
  for (let r = 240; r > 70; r -= 20) {
    let alpha = map(r, 70, 240, 60, 0);
    g.fill(255, 230, 170, alpha);
    g.ellipse(sunX, sunY, r, r);
  }

  // Radiant Warm Sun Core
  g.fill(255, 245, 225);
  g.ellipse(sunX, sunY, 65, 65);

  // -------------------------------------------------------------
  // 3. FLOCKS OF BIRDS (Spread Across Full Horizon Width)
  // -------------------------------------------------------------
  g.stroke(45, 25, 60, 210);
  g.strokeWeight(2);
  g.noFill();

  // --- Right Flock ---
  drawBird(g, width * 0.62, height * 0.20, 14);
  drawBird(g, width * 0.70, height * 0.14, 18);
  drawBird(g, width * 0.80, height * 0.26, 10);

  // --- Left Flock (Visible as curtain drags left) ---
  drawBird(g, width * 0.22, height * 0.22, 16);
  drawBird(g, width * 0.30, height * 0.16, 12);
  drawBird(g, width * 0.42, height * 0.28, 14);

  // -------------------------------------------------------------
  // 4. NATURAL SOFT CLOUD FORMATIONS
  // -------------------------------------------------------------
  g.noStroke();

  // Cloud 1 (Far Left Sky)
  drawOrganicCloud(g, width * 0.20, height * 0.25, 130, color(65, 30, 75, 80));
  
  // Cloud 2 (Mid-Left Sky)
  drawOrganicCloud(g, width * 0.45, height * 0.18, 160, color(75, 35, 80, 85));

  // Cloud 3 (Mid-Right Sky)
  drawOrganicCloud(g, width * 0.65, height * 0.32, 140, color(90, 40, 90, 80));

  // Cloud 4 (Far Right Sky)
  drawOrganicCloud(g, width * 0.85, height * 0.22, 180, color(80, 35, 85, 90));

  // -------------------------------------------------------------
  // 5. MOUNTAIN SILHOUETTES (Lifted Contrast & Hazy Slate Fill)
  // -------------------------------------------------------------
  // Back Mountain Ridge (Hazy Desaturated Lavender-Slate)
  g.fill(85, 62, 88, 180); // Lifted tone with slight opacity haze
  g.beginShape();
  g.vertex(0, height);
  g.vertex(0, height * 0.72);
  g.bezierVertex(width * 0.20, height * 0.62, width * 0.35, height * 0.78, width * 0.48, height * 0.68);
  g.bezierVertex(width * 0.60, height * 0.60, width * 0.72, height * 0.75, width * 0.85, height * 0.64);
  g.bezierVertex(width * 0.92, height * 0.58, width * 0.98, height * 0.68, width, height * 0.66);
  g.vertex(width, height);
  g.endShape(CLOSE);

  // Front Rolling Hills (Deep Muted Plum-Charcoal with Clear Contrast)
  g.fill(48, 32, 52); // Noticeably lighter than the black container background
  g.beginShape();
  g.vertex(0, height);
  g.vertex(0, height * 0.82);
  g.bezierVertex(width * 0.25, height * 0.88, width * 0.42, height * 0.76, width * 0.58, height * 0.80);
  g.bezierVertex(width * 0.74, height * 0.84, width * 0.88, height * 0.75, width, height * 0.78);
  g.vertex(width, height);
  g.endShape(CLOSE);

  // Subtle Golden Sunset Rim Highlight on Foreground Hill
  g.stroke(230, 150, 60, 120); // Warm sunset edge glow
  g.strokeWeight(1.5);
  g.noFill();
  g.beginShape();
  g.vertex(0, height * 0.82);
  g.bezierVertex(width * 0.25, height * 0.88, width * 0.42, height * 0.76, width * 0.58, height * 0.80);
  g.bezierVertex(width * 0.74, height * 0.84, width * 0.88, height * 0.75, width, height * 0.78);
  g.endShape();
}

// Helper: Draw Bird Silhouette
function drawBird(g, x, y, sz) {
  g.beginShape();
  g.vertex(x - sz, y + sz * 0.3);
  g.quadraticVertex(x - sz * 0.5, y - sz * 0.4, x, y);
  g.quadraticVertex(x + sz * 0.5, y - sz * 0.4, x + sz, y + sz * 0.3);
  g.endShape();
}

// Helper: Draw Natural Puffy Cloud Cluster
function drawOrganicCloud(g, x, y, w, cloudColor) {
  g.fill(cloudColor);
  
  // Base soft body
  g.ellipse(x, y, w, w * 0.35);
  // Puffy top mounds
  g.ellipse(x - w * 0.20, y - w * 0.08, w * 0.45, w * 0.35);
  g.ellipse(x + w * 0.05, y - w * 0.12, w * 0.55, w * 0.40);
  g.ellipse(x + w * 0.28, y - w * 0.02, w * 0.40, w * 0.30);
  
  // Soft ambient horizon glow line on cloud bottom
  g.fill(245, 175, 110, 35);
  g.ellipse(x, y + w * 0.08, w * 0.85, w * 0.12);
}

function windowResized() {
  if (container) {
    resizeCanvas(container.offsetWidth, container.offsetHeight);
    buildLayers(); // re-render the scenes at the new size
  }
}