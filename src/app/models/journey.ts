import { Section } from "./section";

export interface Journey {
    departureTime: string,
    arrivalTime: string,
    departureDate: string,
    arrivalDate: string,
    sourceStop: string,
    targetStop: string,
    changes?: number,
    sections: Section[],
}