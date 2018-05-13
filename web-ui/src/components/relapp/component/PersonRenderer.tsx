import * as React from "react";

import IVertexDataRenderer from "../../graph/IVertexDataRenderer";

export default class PersonRenderer implements IVertexDataRenderer {
    render(data: any): any {
        return (
            <span style={ { cursor: "default" } }>{ data.getName() }</span>
        );
    }
}