document.addEventListener('DOMContentLoaded', () => {
    Promise.all([
        fetch('https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff').then(res => res.json()),
        fetch('https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065').then(res => res.json())
    ])

    .then(([populationData, employmentData]) => {
        const municipalitiesIndex = populationData.dataset.dimension.Alue.category.index; 
        const municipalitiesLabel = populationData.dataset.dimension.Alue.category.label;
        const populationIndex = populationData.dataset.value; 
        const employmentIndex = employmentData.dataset.value;
        const tableBody = document.querySelector('#data-table tbody');
        tableBody.innerHTML = ''; 

        const municipalityIndexValues = Object.values(municipalitiesIndex);
        const municipalityLabelValues = Object.values(municipalitiesLabel);

        for (let i = 0; i < municipalityIndexValues.length; i++) {
            const municipalityIndex = municipalityIndexValues[i]; 
            const municipalityName = municipalityLabelValues[municipalityIndex];
            const population = populationIndex[i]; 
            const employment = employmentIndex[i];
            const employmentPercentage = ((employmentIndex[i]/populationIndex[i]) * 100).toFixed(2);

            const row = '<tr>' +
                        '<td>' + municipalityName + '</td>' + 
                        '<td>' + population + '</td>' + 
                        '<td>' + employment + '</td>' + 
                        '<td class="percentageCell">' + employmentPercentage + '</td>' + 
                        '</tr>';
            tableBody.insertAdjacentHTML('beforeend', row); 
        }

const rows = document.querySelectorAll('tr');
const threshold1 = 45;
const threshold2 = 25;

rows.forEach(row => {
    const cell = row.querySelector('.percentageCell');
    if (cell) {
        const value = parseFloat(cell.textContent);
        if (value > threshold1) {
            row.classList.add('highlight-green');
        } else if (value < threshold2) {
            row.classList.add('highlight-red');
        }
    }
});
    })
});
