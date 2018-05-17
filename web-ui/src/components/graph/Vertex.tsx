import * as React from "react";

import { ICoordinate } from "./ICoordinate";
import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { IVertexMouseDownEvent } from "./IVertexEvent";
import { IVertex, IVertexProps, IVertexStates } from "./IVertex";

export default class Vertex extends React.Component<IVertexProps, IVertexStates> implements IVertex {
    constructor(props: IVertexProps) {
        super(props);

        var randomRatio = 0.25;
        var offsetRatio = (1 - randomRatio) / 2;
        var startingCoordinate = props.coordinate || {
            x: Math.floor(window.innerWidth  * offsetRatio) + Math.floor(Math.random() * window.innerWidth  * randomRatio),
            y: Math.floor(window.innerHeight * offsetRatio) + Math.floor(Math.random() * window.innerHeight * randomRatio),
        };

        this.state = {
            coordinate: startingCoordinate,
        };
    }

    getUUID(): any {
        return this.props.uuid;
    }

    render() {
        var classNames = ["vertex"];
        var vertexStyle : React.CSSProperties = {
            position: "absolute",
        };

        if (this.state.coordinate) {
            vertexStyle.left = this.state.coordinate.x;
            vertexStyle.top  = this.state.coordinate.y;
        }

        if (this.state.active) {
            classNames.push("active");
        }

        return (
            <div
                className={ classNames.join(" ") }
                style={ vertexStyle }
                onMouseDown={ this._onMouseDown.bind(this) }
                onMouseUp={ this._onMouseUp.bind(this) }
                onContextMenu={ this.onContextMenu.bind(this) }
            >
                { this.props.content }
            </div>
        );
    }

    getCoordinate() : ICoordinate {
        return this.state.coordinate;
    }

    isActive(): boolean {
        return this.state.active;
    }

    markAsActive(): void {
        this.setState({active: true});
    }

    markAsInactive(): void {
        console.log('Vertex.markAsInactive');
        this.setState({active: false});
    }

    onContextMenu(e: MouseEvent) {
        e.preventDefault();
    }

    onCanvasUpdate(event : ICanvasUpdateEvent) : void {
        var mouseCoordinate = event.coordinate;

        this.setState({
            coordinate: event.coordinate,
        });
    }

    _isPrimaryMouseButton(e: MouseEvent) {
        return e.buttons === (
            this.props.isRightHandUser
                ? 1 // left click
                : 2 // right click
        );
    }

    _onMouseDown(e : MouseEvent) {
        if (!this._isPrimaryMouseButton(e)) {
            return;
        }

        var relayedEvent : IVertexMouseDownEvent = {
            vertex: this,
        };

        e.preventDefault();

        this.props.onMouseDown(relayedEvent);

        console.log("Vertex._onMouseDown");
    }

    _onMouseUp(e : MouseEvent) {
        if (!this.state.active) {
            return;
        }

        e.preventDefault();

        this.props.onMouseUp();

        console.log("Vertex._onMouseUp");
    }
}