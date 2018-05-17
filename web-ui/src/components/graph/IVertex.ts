import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { ICoordinate } from "./ICoordinate";

export interface IVertexProps {
    uuid: string,
    content: any,
    // Callback on mousedown event
    onMouseDown: any,
    onMouseUp: any,
    // Initial Coordinate
    coordinate?: ICoordinate,
    isRightHandUser: boolean,
}

export interface IVertexStates {
    // Current Coordinate
    coordinate: ICoordinate,
    active?: boolean,
}

export interface IVertex {
    getUUID(): any;
    getCoordinate() : ICoordinate;
    onCanvasUpdate(event : ICanvasUpdateEvent) : void;
    markAsActive(): void;
    markAsInactive(): void;
}