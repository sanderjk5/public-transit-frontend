import {Node} from "./node";
import { Cluster } from "./cluster";
import { Link } from "./link";

export interface DecisionGraph {
    sourceStop?: string,
    targetStop?: string,
    departureTime?: string,
    departureDate?: string,
    meatTime?: string,
    meatDate?: string,
    eatTime?: string,
    esatTime?: string,
    nodes: Node[],
    links: Link[],
    clusters: Cluster[],
}