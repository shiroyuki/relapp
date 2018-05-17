import * as React from "react";

import Canvas from "./Canvas";
import Vertex from "./Vertex";
import IVertexDataRenderer from "./IVertexDataRenderer";
import IVertexRepository from "./IVertexRepository";
import { ICoordinate } from "./ICoordinate";
import { IVertex } from "./IVertex";
import { ICanvasUpdateEvent } from "./ICanvasEvent";
import { IVertexMouseDownEvent } from "./IVertexEvent";

interface Props {
    debug?: boolean,
    repository: IVertexRepository,
    renderer: IVertexDataRenderer,
    isRightHandUser?: boolean,
}

interface State {
    activeVertex?: IVertex,
    offsetCoordinate?: ICoordinate,
    isRightHandUser: boolean,
}

export default class Graph extends React.Component<Props, State> {
    canvas: any;
    dataCollection: Array<any>;
    dataMap: Map<any, any>;

    constructor(props: Props) {
        super(props);

        this.dataCollection = [];
        this.dataMap = new Map<any, any>();

        this.state = {
            isRightHandUser: this.props.isRightHandUser === undefined ? true : this.props.isRightHandUser,
        };
    }

    getDataCollection() {
        if (this.dataCollection.length > 0) {
            return this.dataCollection;
        }

        this.dataCollection = this.props.repository.findMany();

        this.dataCollection.forEach((value: any) => {
            this.dataMap.set(value.getId(), value);
        })

        return this.dataCollection;
    }

    getPrioritizedDataCollection() {
        return this.getDataCollection()
            .sort((a, b) => a.getPriority() - b.getPriority())
        ;
    }

    componentWillMount() {
        this.canvas = (
            <Canvas
                onMouseMove={ this._onCanvasMouseMove.bind(this) }
                onMouseUp={ this._onCanvasMouseUp.bind(this) }
                isRightHandUser={ this.state.isRightHandUser }
            />
        );
    }

    render() {
        var classNames = ["graph"];

        if (this.props.debug) {
            classNames.push("debug");
        }

        var contentList = this.getPrioritizedDataCollection()
            .map((item) => (
                <Vertex
                    key={ item.getId() }
                    uuid={ item.getId() }
                    onMouseDown={ this._onVertexMouseDown.bind(this) }
                    onMouseUp={ this._onVertexMouseUp.bind(this) }
                    content={ this.props.renderer.render(item) }
                    isRightHandUser={ this.state.isRightHandUser }
                />
            ))
        ;

        return (
            <div className={ classNames.join(' ') }>
                { this.canvas }

                <div className="card-container">
                    { contentList }
                </div>
            </div>
        )
    }

    _onCanvasMouseMove(event: ICanvasUpdateEvent) {
        var mouseCoordinate = event.coordinate;

        if (!this.state.activeVertex) {
            return;
        }

        var activeVertex = this.state.activeVertex;
        var offsetCoordinate = this.state.offsetCoordinate;

        if (!this.state.offsetCoordinate) {
            var vertexCoordinate = activeVertex.getCoordinate();

            var offsetCoordinate : ICoordinate = {
                x: vertexCoordinate.x - mouseCoordinate.x,
                y: vertexCoordinate.y - mouseCoordinate.y,
            };

            this.setState({offsetCoordinate: offsetCoordinate});
        }

        var newVertexCoordinate : ICoordinate = {
            x: mouseCoordinate.x + offsetCoordinate.x,
            y: mouseCoordinate.y + offsetCoordinate.y,
        };

        activeVertex.onCanvasUpdate({
            coordinate: newVertexCoordinate,
        });
    }

    _onCanvasMouseUp() {
        console.log('Graph._onCanvasMouseUp');

        if (!this.state.activeVertex) {
            return;
        }

        this.state.activeVertex.markAsInactive();

        this.setState({
            activeVertex: null,
            offsetCoordinate: null, // do not seem to reset property for some reason.
        });
    }

    _onVertexMouseUp() {
        console.log('Graph._onVertexMouseUp');

        this.state.activeVertex.markAsInactive();

        this.setState({
            activeVertex: null,
            offsetCoordinate: null, // do not seem to reset property for some reason.
        });
    }

    _onVertexMouseDown(event: IVertexMouseDownEvent) {
        var activeVertex = event.vertex;
        var prioritizedCollection = this.getPrioritizedDataCollection();

        this.dataMap
            .get(activeVertex.getUUID())
            .setPriority(
                (prioritizedCollection.length > 0 ? prioritizedCollection[prioritizedCollection.length - 1].getPriority() : 0) + 1
            )
        ;

        activeVertex.markAsActive();

        this.setState({
            activeVertex: activeVertex,
            offsetCoordinate: null,
        });
    }
}