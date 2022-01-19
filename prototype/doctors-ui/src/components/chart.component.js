import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


export default function BarChart(props) {

    const chartData = props.chartData

    let ref = React.useRef(null)

    React.useEffect(() => {
        const base64Image = ref.current.toBase64Image()
        props.callback(base64Image)
    }, [])
    return (
        <div style={{ height: "300px" }}>
            <Bar
                data={chartData}
                ref={ref}
                options={{
                    scales: {
                        y: {
                            display: true
                        }
                    },
                    maintainAspectRatio: false,
                    plugins: {
                        title: {
                            display: true,
                            text: "Kellgren-Lawrence Score Predictions"
                        },
                        legend: {
                            display: false,
                            position: "bottom"
                        }
                    }
                }}
            />
        </div>
    )
} 
