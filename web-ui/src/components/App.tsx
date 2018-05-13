import * as React from "react";
import Graph from "./graph/Graph";
import PersonRenderer from "./relapp/component/PersonRenderer";
import PersonRepository from "./relapp/repo/PersonRepository";

export interface AppProps { name: string; version: string; }
export interface AppStates { }


export class App extends React.Component<AppProps, AppStates> {
    repository: PersonRepository;
    renderer: PersonRenderer;

    constructor(props: AppProps) {
        super(props);

        this.repository = new PersonRepository();
        this.renderer = new PersonRenderer();

        this.state = {
            mouseDown: false,
        };
    }

    render() {
        return (
            <div className="relapp graphapp">
                <Graph
                    debug={ true }
                    repository={ this.repository }
                    renderer={ this.renderer }
                />
                {/* <div className="main-controls">
                    { this.props.name } {this.props.version}
                </div> */}
            </div>
        );
    }
}