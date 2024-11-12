import React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';

const PointDistributionGraph = ({ filteredData }) => {
    // Transforming filtered data into a dataset suitable for the BarChart
    const dataset = createPointDistributionData(filteredData);

    const chartSetting = {
        yAxis: [
            {
                label: 'Points',
            },
        ],
        series: [{ dataKey: 'points', label: 'Points' }],
        height: 300,
        sx: {
            [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
                transform: 'translateX(-10px)',
            },
        },
    };

    return (
        <>
        <h3>Point Distribution</h3>
        <BarChart
            dataset={dataset}
            xAxis={[
                { scaleType: 'band', dataKey: 'teamName' },
            ]}
            {...chartSetting}
        />
        </>
    );
};

// Function to create the point distribution dataset
const createPointDistributionData = (filteredData) => {
    return filteredData.map(item => ({
        teamName: item.TeamName,
        points: item.Points, // Adjust this based on your data structure
    }));
};

export default PointDistributionGraph;
