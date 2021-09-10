import { Section } from "./section";

export interface Journey {
    id: number,
    departure: string,
    arrival: string,
    date: string,
    startStop: string,
    targetStop: string,
    sections: Section[]
}