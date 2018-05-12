import * as React from "react";

import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { IVertexMouseDownEvent } from "./IVertexEvent";
import { IVertex, IVertexProps, IVertexStates } from "./IVertex";

export class Vertex extends React.Component<IVertexProps, IVertexStates> implements IVertex {
    constructor(props: IVertexProps) {
        super(props);

        var startingCoordinate = props.coordinate || {
            x: Math.floor(Math.random() * window.innerWidth),
            y: Math.floor(Math.random() * window.innerHeight),
        };

        this.state = {
            coordinate: startingCoordinate,
        };
    }

    render() {
        var vertexStyle : React.CSSProperties = {
            position: "absolute"
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
            >
                { this.props.content }
            </div>
        );
    }

    onCanvasUpdate(event : ICanvasUpdateEvent) : void {
        this.setState({
            coordinate: event.coordinate,
        });
    }

    _onMouseDown(e : MouseEvent) {
        var relayedEvent : IVertexMouseDownEvent = {
            vertex: this,
        };

        e.preventDefault();

        this.props.onMouseDown(relayedEvent);
    }
}