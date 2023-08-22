import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';

const Graph: React.FC = () => {
    const dims = { height: 500, width: 1100 };

    const [data, setData] = useState<any[]>([]);

    useEffect(() => {
        const svg = d3.select('.canvas')
            .append('svg')
            .attr('width', dims.width + 100)
            .attr('height', dims.height + 100);

        const graph = svg.append('g')
            .attr('transform', 'translate(50, 50)');

        const stratify = d3.stratify()
            .id((d: any) => d.name)
            .parentId((d: any) => d.parent);

        const tree = d3.tree()
            .size([dims.width, dims.height]);

        const colour = d3.scaleOrdinal(['#f4511e', '#e91e63', '#e53935', '#9c27b0']);

        const update = (data: any[]) => {
            graph.selectAll('.node').remove();
            graph.selectAll('.link').remove();

            colour.domain(data.map(d => d.department));

            const rootNode = stratify(data);
            const treeData = tree(rootNode).descendants();

            const link = graph.selectAll('.link')
                .data(tree(rootNode).links());

            link.enter()
                .append('path')
                .transition().duration(300)
                .attr('class', 'link')
                .attr('fill', 'none')
                .attr('stroke', '#aaa')
                .attr('stroke-width', 2)
                .attr('d', d3.linkVertical()
                    .x((d: any) => d.x)
                    .y((d: any) => d.y)
                );

            const enterNodes = graph.selectAll('.node')
                .data(treeData)
                .enter()
                .append('g')
                .attr('class', 'node')
                .attr('transform', (d: any) => `translate(${d.x}, ${d.y})`);

            enterNodes.append('rect')
                .attr('fill', (d: any) => colour(d.data.department))
                .attr('stroke', '#555')
                .attr('stroke-width', 2)
                .attr('width', (d: any) => d.data.name.length * 20)
                .attr('height', 50)
                .attr('transform', (d: any) => {
                    const x = (d.data.name.length * 10);
                    return `translate(${-x}, -25)`
                });

            enterNodes.append('text')
                .attr('text-anchor', 'middle')
                .attr('dy', 5)
                .attr('fill', 'white')
                .text((d: any) => d.data.name);
        };

        const fetchData = async () => {
            // Simulate fetching data from Firebase
            const res = await fetch('URL_TO_YOUR_FIREBASE_COLLECTION');
            const jsonData = await res.json();
            setData(jsonData);
            update(jsonData);
        };

        fetchData();
    }, []);

    return (
        <div className="canvas"></div>
    );
};

export default Graph;
