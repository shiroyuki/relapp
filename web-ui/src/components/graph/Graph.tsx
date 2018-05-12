import * as React from "react";

import { Canvas } from "./Canvas";
import { Vertex } from "./Vertex";
import { IVertex } from "./IVertex";
import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { IVertexMouseDownEvent } from "./IVertexEvent";

interface Props {}

interface State {
    activeVertex?: IVertex,
}

export class Graph extends React.Component<Props, State> {
    canvas: any;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    componentWillMount() {
        this.canvas = (
            <Canvas
                onMouseMove={ this._onCanvasMouseMove.bind(this) }
                onMouseUp={ this._onCanvasMouseUp.bind(this) }
            />
        );
    }

    componentDidUpdate(nextProps: Props, nextState: State) {
        console.log('!');
    }

    render() {
        return (
            <div className="graph">
                { this.canvas }

                <div className="card-container">
                    <Vertex
                        uuid="ABC"
                        content={ <span style={ { cursor: "default" } }>Kanata Iwata</span> }
                        onMouseDown={ this._onVertexMouseDown.bind(this) }
                    />
                    <Vertex
                        uuid="DEF"
                        content={ <span style={ { cursor: "default" } }>Koichi Nakayama</span> }
                        onMouseDown={ this._onVertexMouseDown.bind(this) }
                    />
                </div>
            </div>
        )
    }

    _onCanvasMouseMove(event: ICanvasUpdateEvent) {
        this.state.activeVertex.onCanvasUpdate({
            coordinate: event.coordinate,
        });
    }

    _onCanvasMouseUp() {
        this.setState({activeVertex: null});
    }

    _onVertexMouseDown(event: IVertexMouseDownEvent) {
        this.setState({activeVertex: event.vertex});
    }
}