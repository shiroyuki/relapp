import * as React from "react";
import { ICoordinate } from "./ICoordinate";
import { ICanvasUpdateEvent } from "./ICanvasEvent"

export interface CanvasProps {
    onMouseDown?: any,
    onMouseUp: any, // mouseup and mouseleave are consolidated here.
    onMouseMove: any,
}
export interface CanvasStates {
    mouseDown: boolean,
    coordinate?: ICoordinate,
    width?: number,
    height?: number,
 }

export class Canvas extends React.Component<CanvasProps, CanvasStates> {
    constructor(props: CanvasProps) {
        super(props);

        this.state = {
            mouseDown: false,
        };
    }

    componentDidMount() {
        window.addEventListener("mousedown", this._onDragStart.bind(this));
        window.addEventListener("mouseup", this._onDragStop.bind(this));
        window.addEventListener("mouseleave", this._onDragStop.bind(this));
        window.addEventListener("mousemove", this._onDragMove.bind(this));
    }

    render() {
        return (
            <div className="canvas"></div>
        );
    }

    _onDragStart(e : MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        this.setState({mouseDown: true});

        console.log("Started");
    }

    _onDragMove(e : MouseEvent) {
        if (!this.state.mouseDown) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        // console.log("CX", e.clientX, "CY", e.clientY, "OX", e.offsetX, "OY", e.offsetY);

        var currentCoordinate : ICoordinate = {
            x: e.clientX,
            y: e.clientY,
        }

        var updateEvent : ICanvasUpdateEvent = {
            coordinate: currentCoordinate,
        }

        this.setState({
            coordinate: currentCoordinate,
        });

        this.props.onMouseMove(updateEvent);
    }

    _onDragStop(e : MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!this.state.mouseDown) {
            return;
        }

        this.setState({mouseDown: false});

        this.props.onMouseUp();

        console.log("Ended");
    }
}