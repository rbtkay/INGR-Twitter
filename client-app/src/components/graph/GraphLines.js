//module
import React, { useEffect } from "react";
import Highcharts from "highcharts";

const GraphLines = ({ id, series, title }) => {
    useEffect(() => {
        console.log("graph rerendered");
        Highcharts.chart(id, {
            chart: {
                type: "line",
            },
            title: { text: title },
            series: series,
            xAxis: {
                title: { text: null },
                // categories: x ? x : null,
            },
            yAxis: {
                title: { text: null },
            },
            credits: {
                enabled: false,
            },
        });
    }, [series]);

    return <div id={id} className="graph"></div>;
};

export default GraphLines;
