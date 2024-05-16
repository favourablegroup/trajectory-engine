document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const scrollableArea = document.getElementById('scrollableArea'); // Corrected variable name

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        if (!file) {
            alert('No file selected.');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            const lines = csvData.split('\n');
            const data = lines.slice(0, 12).map(line => {
                const values = line.split(','); // Assuming comma as delimiter
                if (values.length!== 3) {
                    console.error(`Invalid line format: ${line}`);
                    return null; // Skip invalid lines
                }
                return values.map(Number); // Convert strings to numbers
            }).filter(Boolean); // Filter out any null entries

            // Clear previous charts
            if (scrollableArea) {
                scrollableArea.innerHTML = ''; // Clear the scrollableArea
            } else {
                console.error('scrollableArea is null');
            }

            data.forEach((ratios, index) => {
                const roundNumber = index + 1;
            
                // Create a wrapper div for each label-chart pair
                const wrapperDiv = document.createElement('div');
                wrapperDiv.style.display = 'flex';
                wrapperDiv.style.flexDirection = 'column';
                wrapperDiv.style.alignItems = 'center';
                wrapperDiv.style.justifyContent = 'center';
            
                // Create and append the label to the wrapperDiv
                const label = document.createElement('p');
                label.textContent = `Round ${roundNumber}:`;
                wrapperDiv.appendChild(label);
            
                // Create and append the canvas to the wrapperDiv
                const canvasId = `chart-${index}`;
                const canvas = document.createElement('canvas');
                canvas.id = canvasId;
                canvas.width = 50;
                canvas.height = 50;
                wrapperDiv.appendChild(canvas);
            
                // Initialize the chart with the canvas
                const ctx = canvas.getContext('2d');
                const chart = new Chart(ctx, {
                    type: 'pie',
                    data: {
                        datasets: [{
                            data: ratios,
                            backgroundColor: ['#808080', '#a0a0a0', '#c0c0c0'], // Shades of grey
                            borderWidth: 1,
                            borderColor: '#fff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false
                    }
                });
            
                // Append the wrapperDiv (containing the label and chart) to the scrollableArea
                scrollableArea.appendChild(wrapperDiv);
            });
        };

        reader.readAsText(file);
    });
});
