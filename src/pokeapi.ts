import { Cache, CacheEntry } from "./pokecache.js";

export class PokeAPI {
    private static readonly baseURL = "https://pokeapi.co/api/v2";
    cache: Cache;

    constructor(cacheInterval: number) {
        this.cache = new Cache(cacheInterval);
    }

    closeCache() {
        this.cache.stopReapLoop();
    }

    async fetchLocations(pageURL?: string): Promise<ShallowLocations> {

        const url = pageURL || `${PokeAPI.baseURL}/location-area`;

        try {
            const cachedVal: ShallowLocations | undefined = this.cache.get(url);
            if (cachedVal !== undefined) {
                return cachedVal;
            } else {
                const resp = await fetch(url);
                if (!resp.ok) {
                    throw new Error(`${resp.status} ${await resp.text()}`);
                }

                const locations: ShallowLocations = await resp.json();

                this.cache.add(url, locations);
                return locations;
            }
        } catch (e) {
            throw new Error(`Error fetching locations: ${(e as Error).message}`);
        }
    }

    async fetchLocation(locationName: string): Promise<Location> {
        const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

        try {
            const cachedVal: Location | undefined = this.cache.get(url);
            if (cachedVal !== undefined) {
                return cachedVal;
            } else {
                const resp = await fetch(url);

                if (!resp.ok) {
                    throw new Error(`${resp.status} ${await resp.text()}`);
                }

                const location: Location = await resp.json();

                this.cache.add(url, location);
                return location;
            }
        } catch (e) {
            throw new Error(`Error fetching location "${locationName}": ${(e as Error).message}`,);
        }
    }

    async fetchPokemon(pokemonName: string): Promise<Pokemon> {
        const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

        try {
            const cachedVal: Pokemon | undefined = this.cache.get(url);
            if (cachedVal !== undefined) {
                return cachedVal;
            } else {
                const resp = await fetch(url);

                if (!resp.ok) {
                    throw new Error(`${resp.status} ${await resp.text()}`);
                }

                const pokemonLit: Pokemon = await resp.json();

                this.cache.add(url, pokemonLit);
                
                return pokemonLit;
            }
        } catch (e) {
            throw new Error(`Error fetching pokemon "${pokemonName}": ${(e as Error).message}`,);
        }
    }
}

export type ShallowLocations = {
    count: number;
    next: string;
    previous: string;
    results: {
        name: string;
        url: string;
    }[];
};

export type Location = {
    encounter_method_rates: {
        encounter_method: {
            name: string;
            url: string
        };
        version_details: {
            rate: number;
            version: {
                name: string;
                url: string
            };
        }[];
    }[];
    game_index: number;
    id: number;
    location: {
        name: string;
        url: string
    };
    name: string;
    names: {
        language: {
            name: string;
            url: string
        };
        name: string
    }[];
    pokemon_encounters: {
        pokemon: {
            name: string;
            url: string
        };
        version_details: {
            encounter_details: {
                chance: number;
                condition_values: any[];
                max_level: number;
                method: {
                    name: string;
                    url: string
                };
                min_level: number
            }[];
            max_chance: number;
            version: {
                name: string;
                url: string
            }
        }[];
    }[];
};

export type Pokemon = {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: {
        is_hidden: boolean;
        slot: number;
        ability: {
            name: string;
            url: string;
        };
    }[];
    forms: {
        name: string;
        url: string;
    }[];
    game_indices: {
        game_index: number;
        version: {
            name: string;
            url: string;
        };
    }[];
    held_items: any[];
    location_area_encounters: string;
    moves: {
        move: {
            name: string;
            url: string;
        };
        version_group_details: {
            level_learned_at: number;
            version_group: {
                name: string;
                url: string;
            };
            move_learn_method: {
                name: string;
                url: string;
            };
            // order: number;
        }[];
    }[];
    species: {
        name: string;
        url: string;
    };
    sprites: {
        back_default: string;
        back_female: any;
        back_shiny: string;
        back_shiny_female: any;
        front_default: string;
        front_female: any;
        front_shiny: string;
        front_shiny_female: any;
        other: {
            dream_world: {
                front_default: string;
                front_female: any;
            };
            home: {
                front_default: string;
                front_female: any;
                front_shiny: string;
                front_shiny_female: any;
            };
            official_artwork: {
                front_default: string;
                front_shiny: string;
            };
            /* showdown: {
                back_default: string;
                back_female: any;
                back_shiny: string;
                back_shiny_female: any;
                front_default: string;
                front_female: any;
                front_shiny: string;
                front_shiny_female: any;
            }; */
        };
        versions: {
            [generation: string]: {
                [game: string]: {
                back_default: string;
                back_female?: any;
                back_shiny: string;
                back_shiny_female?: any;
                front_default: string;
                front_female?: any;
                front_shiny: string;
                front_shiny_female?: any;
                };
            };
        };
        /* versions: {
            "generation-i": GenerationI
            "generation-ii": GenerationIi
            "generation-iii": GenerationIii
            "generation-iv": GenerationIv
            "generation-v": GenerationV
            "generation-vi": GenerationVi
            "generation-vii": GenerationVii
            "generation-viii": GenerationViii
        }; */
    };
    cries: {
        latest: string;
        legacy: string;
    };
    stats: {
        base_stat: number;
        effort: number;
        stat: {
            name: string;
            url: string;
        };
    }[];
    types: {
        slot: number;
        type: {
            name: string;
            url: string;
        };
    }[];
    past_types: any[];
    /* {
        generation: {
            name: string;
            url: string;
        };
        types: {
            slot: number;
            type: {
                name: string;
                url: string;
            };
        }[];
    }[]; */
    /* past_abilities: {
        generation: {
            name: string;
            url: string;
        };
        abilities: {
            ability: any;
            is_hidden: boolean;
            slot: number;
        }[];
    }[]; */
};