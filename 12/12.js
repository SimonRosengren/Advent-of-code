const { inputToStringArray, isWithinGridBounds } = require("../utils");
const input = inputToStringArray("12/input.txt");
const caves = [];
const routes = [];

input.forEach(path => {
    const split = path.split('-');
    if (!caves.find(cave => cave.id === split[0])) {
        caves.push({
            id: split[0],
            paths: [split[1]]
        });
    } else {
        let cave = caves.find(cave => cave.id === split[0]);
        if (!cave.paths.includes(split[0])) cave.paths.push(split[1])
    }
    if (!caves.find(cave => cave.id === split[1])) {
        caves.push({
            id: split[1],
            paths: [split[0]]
        });
    } else {
        let cave = caves.find(cave => cave.id === split[1]);
        if (!cave.paths.includes(split[1])) cave.paths.push(split[0])
    }
});

caves.forEach(cave => {
    cave.paths.forEach(path => {
        let otherCave = caves.find(cave => cave.id === path);
        if (!otherCave.paths.includes(cave.id)) otherCave.paths.push(cave.id)
    })
})

let breadcrumbs = [];
const crawl = cave => {
    console.log(cave.id)
    breadcrumbs.push(cave.id)
    for (let i = 0; i < cave.paths.length; i++) {
        if (cave.paths[i] === 'end') {
            breadcrumbs.push(cave.paths[i])
            let route = [];
            breadcrumbs.forEach(e => {
                route.push(e)
            });
            routes.push(route);
            breadcrumbs.pop();
            continue;
        } else if (breadcrumbs.includes(cave.paths[i]) && (cave.paths[i] === cave.paths[i].toLowerCase())) {
            continue;
        } else {
            crawl(caves.find(c => c.id === cave.paths[i]));
        }  
    }
    
}

crawl(caves.find(cave => cave.id === 'start'))

console.log(routes);