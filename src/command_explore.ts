import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]): Promise<void> {
    if (args.length === 0 || args.length >= 2) {
        throw new Error("you must provide one location name");
    }

    const [loc, ...others] = args;
    const locationData = await state.pokeAPI.fetchLocation(loc);

    console.log(`Exploring ${loc}...`);
    console.log(`Found Pokemon:`);
    for (const enc of locationData.pokemon_encounters) {
        console.log(` - ${enc.pokemon.name}`);
    }
}