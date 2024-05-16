document.addEventListener('DOMContentLoaded', function() {
    const fileInput = document.getElementById('fileInput');
    const scrollableArea = document.getElementById('scrollableArea');

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
            const data = lines.map(line => line.replace(/["',]/g, '').trim()); // Replace commas and quotation marks with nothing

            // Clear previous graph
            scrollableArea.innerHTML = '';

            // Create table
            const table = document.createElement('table');
            const tbody = document.createElement('tbody');
            table.appendChild(tbody);

            // Generate rows and cells
            data.forEach(row => {
                const tr = document.createElement('tr');
                const cells = row.split(';'); // Assuming comma as delimiter
                cells.forEach(cell => {
                    const td = document.createElement('td');
                    td.textContent = cell;
                    tr.appendChild(td);
                });
                tbody.appendChild(tr);
            });

            // Append the table to the scrollable area
            scrollableArea.appendChild(table);
        };

        reader.readAsText(file);
    });
});