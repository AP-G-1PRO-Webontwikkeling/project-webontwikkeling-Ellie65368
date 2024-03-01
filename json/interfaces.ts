

export interface Movies {
    id: string
    name: string
    description: string
    age: number
    seen: boolean
    première: string
    imageUrl: string
    time: string
    personages: string[]
    genre: string
    producer: Producer
  }
  
  export interface Producer {
    id: string
    name: string
    age: string
  }

  async function fetchJson(file:string) {
    const data = await fetch(`https://github.com/AP-G-1PRO-Webontwikkeling/project-webontwikkeling-Ellie65368/blob/main/json/${file}.json`)
    return data.json()
}

import readline from "readline-sync";

(async function main()
{
    const disney = await fetchJson("disney");
    const producer = await fetchJson("producer");

    let exit: boolean = false;
while (!exit) {
    console.log(`Welkom to the JSON data viewer!`);
    console.log("")
    console.log(`1. View all data`);
    console.log(`2. Filter by ID`);
    console.log(`3. Exit`);

    const choice: number = readline.questionInt("\nPlease enter your choice: ");
    console.log("");

switch (choice) {
    case 1:
        showAll(disney);
        break;
    case 2:
        findById(disney);
        break;
    case 3:
        exit = true;
        break;
  
    default:
        console.log("Indvalid command!");
        break;
  }

  if (!exit) 
    readline.question("Hit Enter key to continue.", {
        hideEchoBack : true, mask: "",
    });
  }
})();

function showAll(disney: Movies[]) {
	for (const movie of disney)
		console.log(movie.name, `(${movie.id})`);
}

function findById(disney: Movies[]) {
	const id: string = readline.question("Please enter the ID: ");
	const movie = disney.find(
		(m) => m.id.toLowerCase() === id.toLowerCase()
	);

	let key: keyof Movies;

	
	const maxWidth = Object.keys(disney[0]).reduce(
		(max, key) => Math.max(max, key.length),
		0
	);

    if (!movie) console.log("Could not find mathematician with ID", id);
	else {
		for (key in movie)
			console.log(
				(key as string).padEnd(maxWidth + 1),
				"-",
				movie[key],
				
			);
	}
	console.log();
}

export {};
