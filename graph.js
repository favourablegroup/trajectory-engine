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
            let csvData = e.target.result;
            csvData = csvData.replace(/,/g, ''); // Remove all commas
            const lines = csvData.split('\n');
            const data = lines.map(line => line.replace(/\d+/g, '$&\n').trim()); // Insert newline after numbers

            // Clear previous graph
            scrollableArea.innerHTML = '';

            // Generate rows
            data.forEach(row => {
                const rowElement = document.createElement('div');
                rowElement.classList.add('row');
                rowElement.textContent = row;
                scrollableArea.appendChild(rowElement);
            });

            // Scroll to the middle of the scrollableArea
            scrollToMiddle(scrollableArea);
        };

        reader.readAsText(file);
    });

    // Function to scroll to the middle of an element
    function scrollToMiddle(element) {
        const middle = element.scrollWidth / 2.275;
        element.scrollTo({
            left: middle,
            behavior: 'smooth'
        });
    }
});