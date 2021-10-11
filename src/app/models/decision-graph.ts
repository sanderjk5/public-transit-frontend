import {Node} from "./node";
import { Cluster } from "./cluster";
import { Link } from "./link";

export interface DecisionGraph {
    nodes: Node[],
    links: Link[],
    clusters: Cluster[],
}