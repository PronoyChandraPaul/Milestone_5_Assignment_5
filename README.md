1.var: The old-school way. It's generally avoided now because it can lead to bugs due to its loose scoping.

let: Use this for variables that you know will change later (like a loop counter).

const: Use this by default. It prevents you from accidentally overwriting a variable.

2.The spread operator allows you to "unpack" elements from an array or object into a new one. It’s like taking everything out of a box and laying it out on the floor.

3.forEach(): Just loops through the array. It doesn’t return anything. Use it if you just want to log data or save to a database.

map(): Creates a new array by transforming every element (e.g., doubling every number).

filter(): Creates a new array containing only the items that pass a specific test (e.g., only numbers greater than 10).

4.Arrow functions provide a shorter syntax for writing functions and handle the this keyword differently (they "inherit" it from the surrounding code).

5.These are strings that allow you to embed variables directly without clunky plus signs (+). They use backticks (`) instead of quotes.