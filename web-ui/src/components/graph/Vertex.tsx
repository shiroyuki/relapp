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
        var vertexStyle : React.CSSProperties = {
            position: "absolute",
        };

        if (this.state.coordinate) {
            vertexStyle.left = this.state.coordinate.x;
            vertexStyle.top  = this.state.coordinate.y;
        }

        return (
            <div
                className="vertex"
                style={ vertexStyle }
                onMouseDown={ this._onMouseDown.bind(this) }
                onContextMenu={ this.onContextMenu.bind(this) }
            >
                { this.props.content }
            </div>
        );
    }

    getCoordinate() : ICoordinate {
        return this.state.coordinate;
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
    }
}