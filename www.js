const nav_options = document.querySelectorAll('nav ul li');
const aside_divs = document.querySelectorAll('aside > div');
const main_divs = document.querySelectorAll('main div');

// Συνάρτηση για τον καθαρισμό των περιεχομένων
function remove_aside_main() {
    aside_divs.forEach((aside_div) => aside_div.classList.add('hidden'));
    main_divs.forEach((main_div) => main_div.classList.add('hidden'));
}

// Συνάρτηση για την προσθήκη event listener σε κάθε επιλογή του πλευρικού μενού και εμφάνιση του σωστού κομματιού στο main
function show_correct_aside_div(aside_div){
    const aside_divs_options = aside_div.querySelectorAll('li');
    aside_divs_options.forEach((aside_div_option) => {
        aside_div_option.addEventListener('click', () => {
            remove_aside_main();
    // Εμφάνιση του σωστού περιεχομένου στο main
    const main_tobe_shown = document.getElementById(aside_div_option.id.replace('sub_', ''));
    if(main_tobe_shown) {
        main_tobe_shown.classList.remove('hidden');
          }
      });
   }); 
} 

// Προσθήκη event listener σε κάθε επιλογή του κεντρικού μενού
nav_options.forEach((nav_option) => {
    nav_option.addEventListener('click', () => {
        remove_aside_main();
// Εμφάνιση του σωστού τμήματος του aside με βάση την επιλογή στο nav
const aside_tobe_shown = document.getElementById(`aside_${nav_option.id.split('_')[1]}`);
      if(aside_tobe_shown) {
        aside_tobe_shown.classList.remove('hidden');
        show_correct_aside_div(aside_tobe_shown);
      }
    });
});

// Συνάρτηση για την εμφάνιση των links με μορφή πίνακα
async function show_links(type){
    try{
        const server_response = await fetch('/links');
        const total_links = await server_response.json();
        const divided_links_based_ontype = total_links.filter(link => link.link_type === type);
        const links_table = document.createElement('table');
        links_table.innerHTML = `
        <div class="table_container">
        <thead>
            <tr>
                <th id="head_col1">Τύπος συνδέσμου</th>
                <th>Σύνδεσμος</th>
            </tr>
        </thead>
        <tbody>
            ${divided_links_based_ontype.map(link => `
            <tr>
                <td id="first_col">${type}</td>
                <td id="second_col"><a href="${link.url}" target="_blank">${link.url}</a></td>
            </tr>`).join('')}
        </tbody>
        </div>`;

        const main_div = document.getElementById(type === 'bibliography' ? 'links_bibliography' : 'links_web');
        main_div.innerHTML = `<h2 class="content_title"><i><b>${type === 'bibliography' ? 'Βιβλιογραφία' : 'Διαδυκτιακοί σύνδεσμοι'}</b></i></h2><br><br>`;
        main_div.appendChild(links_table);
        main_div.classList.remove('hidden');
        }
    catch (error){
        console.error("Couldn't fetch links: ",error);
        }
}

document.getElementById('sub_links_bibliography').addEventListener('click', () => show_links('bibliography'));
document.getElementById('sub_links_web').addEventListener('click', () => show_links('web'));

// Συνάρτηση για την εμφάνιση των exhibitions με μορφή πίνακα
async function show_exhibitions(type) {
    try{
        const server_response_ex = await fetch('/exhibitions');
        const total_exhibitions = await server_response_ex.json();
        const divided_exhibitions_basedon_type = total_exhibitions.filter(exhibition => exhibition.ex_type === type);
        const ex_table = document.createElement('table');
        ex_table.innerHTML = `
        <div class="table_container">
        <thead>
            <tr>
                <th id="head_col2">Τύπος έκθεσης</th>
                <th>Όνομα</th>
                <th>Ημερομηνία</th>
                <th>Περιοχή</th>
            </tr>
        </thead>
        <tbody>
            ${divided_exhibitions_basedon_type.map(exhibition => `
                <tr>
                   <td id="first_col">${type}</td>
                   <td id="second_col_ex">${exhibition.ex_name}</td>
                   <td id="third_col_ex">${exhibition.ex_date}</td>
                   <td id="fourth_col_ex">${exhibition.ex_location}</td>
                </tr>`).join('')}
        </tbody>
        </div>`;

        const main_div_ex = document.getElementById(type === 'past' ? 'exhibitions_past' : 'exhibitions_upcoming');
        main_div_ex.innerHTML = `<h2 class="content_title"><i><b>${type === 'past' ? 'Παλαιότερες εκθέσεις' : 'Προσεχείς εκθέσεις'}</b></i></h2><br><br>`;
        main_div_ex.appendChild(ex_table);
        main_div_ex.classList.remove('hidden');
        }
    catch(error){
        console.error("Couldn't fetch exhibitions: ",error);
    }
}

document.getElementById('sub_exhibitions_past').addEventListener('click', () => show_exhibitions('past'));
document.getElementById('sub_exhibitions_upcoming').addEventListener('click', () => show_exhibitions('upcoming'));