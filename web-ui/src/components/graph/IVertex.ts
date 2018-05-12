import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { ICoordinate } from "./ICoordinate";

export interface IVertexProps {
    uuid: string,
    content: any,
    // Callback on mousedown event
    onMouseDown?: any,
    // Initial Coordinate
    coordinate?: ICoordinate,
}

export interface IVertexStates {
    // Current Coordinate
    coordinate?: ICoordinate,
}

export interface IVertex {
    onCanvasUpdate(event : ICanvasUpdateEvent) : void;
}