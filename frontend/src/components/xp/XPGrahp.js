import React from "react";
import {
    VictoryLine,
    VictoryChart,
    VictoryTheme,
    VictoryScatter
} from "victory";

const XPGraph = (xpEvents) => {
    return (
        <VictoryChart
            theme={VictoryTheme.material}
            minDomain={{ y: 0 }}
            width={1000}
        >
            <VictoryLine 
                interpolation="basis"
                style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                }}
                data={xpEvents.xpEvents}
                x={"date"}
                y={"amount"}
                animate={{
                    duration: 2000,
                    onLoad: { duration: 1000 }
                }}
            />
            <VictoryScatter
                data={xpEvents.xpEvents}
                x={"date"}
                y={"amount"}
            />
        </VictoryChart>
        
    );
}

export default XPGraph;