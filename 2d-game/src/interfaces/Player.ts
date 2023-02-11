import { RAINBOW_COLORS } from "../util/util";
import { Vector2 } from "./Vector2";

export interface Player {
    position: Vector2 
    color: RAINBOW_COLORS
}