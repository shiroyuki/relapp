import * as React from "react";
import { Graph } from "./graph/Graph";

export interface AppProps { name: string; version: string; }
export interface AppStates { }


export class App extends React.Component<AppProps, AppStates> {
    constructor(props: AppProps) {
        super(props);

        this.state = {
            mouseDown: false,
        };
    }

    render() {
        return (
            <div className="relapp graphapp">
                <Graph />
                {/* <div className="main-controls">
                    { this.props.name } {this.props.version}
                </div> */}
            </div>
        );
    }
}