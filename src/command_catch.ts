import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0 || args.length >= 2) {
        throw new Error("Which Pokemon do you want to catch?");
    }
    const pokeName = args[0];
    
    const pokemon = await state.pokeAPI.fetchPokemon(pokeName);
    
    console.log(`Throwing a Pokeball at ${pokeName}...`);
    
    const roll = Math.floor(Math.random() * pokemon.base_experience);
    // console.log(roll);
    
    if (roll > 40) {
        console.log(`${pokemon.name} escaped. Try again!`);
        return;
    }

    console.log("You caught it!");
    console.log("You may now inspect it with the inspect command.");
    state.caughtPokemon[pokemon.name] = pokemon;    
}