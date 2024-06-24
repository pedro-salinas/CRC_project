export const CreateChart = (labels, prevData, nextData) => {
    const data = {
        labels: labels,
        datasets: [
            {
                label: "Antes de Kinesiología",
                data: prevData,
                backgroundColor: "#E59F92",
                borderColor: "#F02626",
                borderWidth: 1,
            },
            {
                label: "Después de Kinesiología",
                data: nextData,
                backgroundColor: "#C1FCF6",
                borderColor: "#31b6ad",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        elements: {
            line: {
                borderWidth: 1,
            },
        },
        scales: {
            r: {
                angleLines: {
                    display: true,
                },
                suggestedMin: 0,
                suggestedMax: 100,
                ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    font: {
                        size: 12,
                    },
                },
                pointLabels: {
                    font: {
                        size: 12,
                    },
                    padding: 1,
                },
            },
        },
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return { data, options };
};
