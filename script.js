document.addEventListener('DOMContentLoaded', () => {
    const resultForm = document.getElementById('resultForm');
    const studentNameInput = document.getElementById('studentName');
    const studentGradeInput = document.getElementById('studentGrade');
    const resultsTableBody = document.querySelector('#resultsTable tbody');

    // Load existing results from the JSON file
    loadResults();

    resultForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const name = studentNameInput.value.trim();
        const grade = studentGradeInput.value.trim();

        if (name && grade) {
            const result = { name, grade };
            addResultToTable(result);
            saveResult(result);
            studentNameInput.value = '';
            studentGradeInput.value = '';
        }
    });

    function loadResults() {
        fetch('results.json')
            .then(response => response.json())
            .then(data => {
                data.results.forEach(result => addResultToTable(result));
            })
            .catch(error => console.error('Error fetching data:', error));
    }

    function addResultToTable(result) {
        const row = document.createElement('tr');
        const nameCell = document.createElement('td');
        const gradeCell = document.createElement('td');

        nameCell.textContent = result.name;
        gradeCell.textContent = result.grade;

        row.appendChild(nameCell);
        row.appendChild(gradeCell);
        resultsTableBody.appendChild(row);
    }

    function saveResult(result) {
        fetch('save_result.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(result)
        })
        .then(response => response.json())
        .then(data => console.log('Success:', data))
        .catch(error => console.error('Error:', error));
    }
});
