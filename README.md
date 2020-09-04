# Mars Rover

Mars Rover is a TypeScript CLI for instructing rovers on Mars.

## Installation

Install node packages then start the script.

```bash
npm i
npm start
```

## Testing

Run tests by calling Jest.

```bash
npm test [test name]
```

## Explanation

The grid brounds must be defined by two integers as the plateau is rectangular. 
The starting position of a rover must exist within the grid bounds.
Furthermore, instructing a rover off the grid will result in an error prompt. 
The 2nd rover cannot start along the 1st rover's path to avoid collision. 
The 2nd rover also cannot be instructed to cross the 1st rover's end point. 