import * as React from "react";
import { ICoordinate } from "./ICoordinate";
import { ICanvasUpdateEvent } from "./ICanvasEvent"

interface Props {
    onMouseDown?: any,
    onMouseUp: any, // mouseup and mouseleave are consolidated here.
    onMouseMove: any,
    isRightHandUser: boolean,
}
interface State {
    mouseDown: boolean,
    coordinate?: ICoordinate,
    width?: number,
    height?: number,
 }

export default class Canvas extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            mouseDown: false,
        };
    }

    componentDidMount() {
        window.addEventListener("mousedown",  this._onDragStart.bind(this));
        window.addEventListener("mouseup",    this._onDragStop.bind(this));
        window.addEventListener("mouseleave", this._onDragStop.bind(this));
        window.addEventListener("mousemove",  this._onDragMove.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener("mousedown",  this._onDragStart.bind(this));
        window.removeEventListener("mouseup",    this._onDragStop.bind(this));
        window.removeEventListener("mouseleave", this._onDragStop.bind(this));
        window.removeEventListener("mousemove",  this._onDragMove.bind(this));
    }

    render() {
        return (
            <div className="canvas"></div>
        );
    }

    _isPrimaryMouseButton(e: MouseEvent) {
        return e.buttons === (
            this.props.isRightHandUser
                ? 1 // left click
                : 2 // right click
        );
    }

    _onDragStart(e : MouseEvent) {
        e.preventDefault();
        e.stopPropagation();

        if (!this._isPrimaryMouseButton(e)) {
            return;
        }

        this.setState({mouseDown: true});
    }

    _onDragMove(e : MouseEvent) {
        if (!this.state.mouseDown) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (!this._isPrimaryMouseButton(e)) {
            return;
        }

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
        if (!this.state.mouseDown) {
            return;
        }

        e.preventDefault();
        e.stopPropagation();

        if (!this._isPrimaryMouseButton(e)) {
            return;
        }

        this.setState({mouseDown: false});

        this.props.onMouseUp();
    }
}