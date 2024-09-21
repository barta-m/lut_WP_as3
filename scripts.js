let green = Boolean;
let red = Boolean;
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
            const threshold1 = 45.00;
            const threshold2 = 25.00;
            let employmentPercentage = parseFloat((employment / population) * 100);
            console.log(employmentPercentage);

            if (Number(employmentPercentage) > Number(threshold1)) {
                green = true;
                red = false;
            } else if (Number(employmentPercentage) < Number(threshold2)) {
                red = true;
                green = false;
            } else {
                green = false;
                red = false;
            }

            const row = document.createElement('tr');
            row.innerHTML = 
                '<td>' + municipalityName + '</td>' + 
                '<td>' + population + '</td>' + 
                '<td>' + employment + '</td>' + 
                '<td class="percentageCell">' + employmentPercentage.toFixed(2) + '</td>'; 

            if (green){
                row.classList.add("highlight-green");
            } else if (red) {
                row.classList.add('highlight-red');
            }

            tableBody.appendChild(row);
        }

    })
});
