#!/usr/bin/env node

// Usage: node generate_ticks.js <numTicks> <startRadius> <endRadius>
// Example: node generate_ticks.js 11 7.5 9

const args = process.argv.slice(2);

if (args.length !== 3) {
  console.error("Usage: node generate_ticks.js <numTicks> <startRadius> <endRadius>");
  process.exit(1);
}

const numTicks = parseInt(args[0]);
const startRadius = parseFloat(args[1]);
const endRadius = parseFloat(args[2]);

if (isNaN(numTicks) || isNaN(startRadius) || isNaN(endRadius)) {
  console.error("All arguments must be numbers.");
  process.exit(1);
}

// 270 degree range centered at 12 o'clock
// Ticks go from -135deg to +135deg in equal steps
const totalAngle = 270;
const startAngle = -135;
const step = numTicks > 1 ? totalAngle / (numTicks - 1) : 0;

function toRad(deg) {
  return (deg * Math.PI) / 180;
}

// KiCad coords: x = r * sin(angle), y = -r * cos(angle)
// angle 0 = 12 o'clock
function point(r, angleDeg) {
  const rad = toRad(angleDeg);
  const x = parseFloat((r * Math.sin(rad)).toFixed(6));
  const y = parseFloat((-r * Math.cos(rad)).toFixed(6));
  return { x, y };
}

// Generate tick lines
const lines = [];
for (let i = 0; i < numTicks; i++) {
  const angle = startAngle + i * step;
  const inner = point(startRadius, angle);
  const outer = point(endRadius, angle);
  const uuid = `ee001111-0000-0000-0000-${String(i + 1).padStart(12, "0")}`;
  lines.push(`\t(fp_line
\t\t(start ${inner.x.toFixed(6)} ${inner.y.toFixed(6)})
\t\t(end ${outer.x.toFixed(6)} ${outer.y.toFixed(6)})
\t\t(stroke (width 0.15) (type solid))
\t\t(layer "F.SilkS")
\t\t(uuid "${uuid}")
\t)`);
}

const footprintName = `ticks_${numTicks}_${startRadius}_${endRadius}`;
const filename = `${footprintName}.kicad_mod`;

const content = `(footprint "${footprintName}"
\t(version 20260206)
\t(generator "pcbnew")
\t(generator_version "10.0")
\t(layer "F.SilkS")
\t(property "Reference" "REF**"
\t\t(at 0 -0.5 0)
\t\t(unlocked yes)
\t\t(layer "F.SilkS")
\t\t(hide yes)
\t\t(uuid "aa001122-3344-5566-7788-99aabbccddee")
\t\t(effects (font (size 1 1) (thickness 0.1)))
\t)
\t(property "Value" "Ticks"
\t\t(at 0 1 0)
\t\t(unlocked yes)
\t\t(layer "F.Fab")
\t\t(hide yes)
\t\t(uuid "bb112233-4455-6677-8899-aabbccddeeff")
\t\t(effects (font (size 1 1) (thickness 0.15)))
\t)
\t(property "Description" "${numTicks} ticks, 270deg range, start ${startRadius}mm end ${endRadius}mm"
\t\t(at 0 0 0)
\t\t(unlocked yes)
\t\t(layer "F.Fab")
\t\t(hide yes)
\t\t(uuid "cc223344-5566-7788-99aa-bbccddeeff00")
\t\t(effects (font (size 1 1) (thickness 0.15)))
\t)
\t(attr smd)
\t(duplicate_pad_numbers_are_jumpers no)
${lines.join("\n")}
\t(embedded_fonts no)
)
`;

const fs = require("fs");
fs.writeFileSync(filename, content);
console.log(`Created: ${filename}`);
