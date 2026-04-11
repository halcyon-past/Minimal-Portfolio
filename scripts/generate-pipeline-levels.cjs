const fs = require('fs');

function findLongPath(size, targetLen) {
    const sx = 0, sy = 0;
    const ex = size - 1, ey = size - 1;
    let bestPath = null;
    let attempts = 0;

    function dfs(cx, cy, path, visited) {
        if (bestPath && bestPath.length >= targetLen) return;
        if (attempts > 500000) return;
        attempts++;

        if (cx === ex && cy === ey) {
            if (!bestPath || path.length > bestPath.length) {
                bestPath = [...path];
            }
            return;
        }

        let dirs = [ {dx:1,dy:0}, {dx:0,dy:1}, {dx:-1,dy:0}, {dx:0,dy:-1} ];
        // Shuffle to explore random meanders
        dirs.sort(() => Math.random() - 0.5);

        for (let d of dirs) {
            let nx = cx + d.dx, ny = cy + d.dy;
            if (nx === ex && ny === ey) {
                // Must enter from the left or top?
                // E is at Bottom-Right. It's ports[3] is Left. So it MUST enter from Left!
                if (cx !== ex - 1 || cy !== ey) continue;
            }

            if (nx >= 0 && nx < size && ny >= 0 && ny < size) {
                let key = `${nx},${ny}`;
                if (!visited.has(key)) {
                    visited.add(key);
                    path.push({x:nx, y:ny});
                    dfs(nx, ny, path, visited);
                    if (bestPath && bestPath.length >= targetLen) return;
                    path.pop();
                    visited.delete(key);
                }
            }
        }
    }

    // Force start by going Right (since S is [0,1,0,0])
    dfs(1, 0, [{x:0,y:0}, {x:1, y:0}], new Set(['0,0', '1,0']));
    return bestPath;
}

const levelsData = [];
// Levels sizes from 5 to 9
const configs = [];
for (let i = 3; i < 30; i++) {
    if (i < 8) configs.push({ s: 5, target: 12 + (i-3)*2 });
    else if (i < 15) configs.push({ s: 6, target: 18 + (i-8)*2 });
    else if (i < 22) configs.push({ s: 7, target: 26 + (i-15)*2 });
    else if (i < 27) configs.push({ s: 8, target: 36 + (i-22)*2 });
    else configs.push({ s: 9, target: 48 + (i-27)*2 });
}

for (let i = 0; i < configs.length; i++) {
    let c = configs[i];
    let path = findLongPath(c.s, c.target);
    if (!path) {
        // Fallback: try smaller target
        path = findLongPath(c.s, c.s + 1); 
    }

    const grid = new Array(c.s * c.s).fill('.');
    grid[0] = 'S';
    grid[c.s * c.s - 1] = 'E';

    for (let k = 1; k < path.length - 1; k++) {
        const prev = path[k-1];
        const curr = path[k];
        const next = path[k+1];

        const dx1 = curr.x - prev.x, dy1 = curr.y - prev.y;
        const dx2 = next.x - curr.x, dy2 = next.y - curr.y;

        if (dx1 === dx2 && dy1 === dy2) {
            grid[curr.y * c.s + curr.x] = 'I';
        } else {
            grid[curr.y * c.s + curr.x] = 'L';
        }
    }

    // Distractors: 80% to 100% of remaining empty slots become pipes to make it Hard!
    // Level 3 start at 60%, level 29 reaches 95%
    let fillRatio = 0.6 + (i / configs.length) * 0.35;
    for (let k = 0; k < grid.length; k++) {
        if (grid[k] === '.') {
            if (Math.random() < fillRatio) {
                grid[k] = ['I', 'L', '+'][Math.floor(Math.random() * 3)];
            }
        }
    }

    levelsData.push({ size: c.s, grid });
    console.log(`Generated level ${i+3} with path length ${path.length} (Target: ${c.target})`);
}

const filePaths = require('path').join(__dirname, '../src/pages/games/DataPipelinePage.jsx');
let content = fs.readFileSync(filePaths, 'utf8');

const levelsDesc = levelsData.map(l => {
    const rowStrs = [];
    for (let r = 0; r < l.size; r++) {
        const row = l.grid.slice(r * l.size, (r + 1) * l.size).map(v => `'${v}'`);
        rowStrs.push('      ' + row.join(', '));
    }
    return `  {\n    size: ${l.size},\n    grid: [\n${rowStrs.join(',\n')}\n    ]\n  }`;
});

const topHalfMatch = content.match(/const LEVELS = \[([\s\S]*?)\];\n\n\/\/ Helper/);
let internalStr = topHalfMatch[1];
let groups = internalStr.split('},');
let first3 = groups.slice(0, 3).join('},') + '}';

let newContent = content.substring(0, topHalfMatch.index);
newContent += 'const LEVELS = [\n' + first3 + ',\n' + levelsDesc.join(',\n') + '\n];\n\n// Helper';
newContent += content.substring(topHalfMatch.index + topHalfMatch[0].length);
fs.writeFileSync(filePaths, newContent, 'utf8');
console.log("Successfully fully replaced levels with structured hard generator.");
