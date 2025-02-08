document.getElementById("superheroesForm").addEventListener("submit", async function() {
    //Here I get the values from the form and store them in variables so I can store them in the database
    const superheroes = document.getElementById("superhero").value;
    const superpowers = document.getElementById("superpower").value;
    const humblescores = document.getElementById("humblescore").value;
    try {
        const response = await fetch ('/superheroes/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({superhero: superheroes, superpower: superpowers, humblescore: humblescores})
        });
    } catch (error) {
        console.error("Error:", error);
    }
});

async function displaySuperheroes() {
    //display the supeheroes from database in my HTML page
    try {
        const response = await fetch('/superheroes/display');
        const data = await response.json();
        let tableBody = document.getElementById("superheroesTableBody");
        tableBody.innerHTML = "";

        data.forEach((hero, index) => {
            let row = `
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${hero.superhero}</td>
                    <td>${hero.superpower}</td>
                    <td>${hero.humblescore}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    } catch (error) {
        console.error("Error:", error);
    }
 }
 displaySuperheroes();