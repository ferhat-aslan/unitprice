import './style.css';
import illerData from './iller-json.json';
import csbData from './csb-json.json';
import './style.css';
const tableParent = document.getElementById('pozTableParent');
const sonucDiv = document.getElementById('sonucDiv');

var foundPoz = [];
//TODO csv baştaki boş satırı sil
//TODO maliyet bul
const searchInput = document.getElementById('searchInput');

searchInput.addEventListener('input', (e) => {
	const pozProvider = document.querySelector('input[name=kurum]:checked').value;
	var data = [];
	if (pozProvider === 'iller') {
		data = illerData;
	} else {
		data = csbData;
	}

	foundPoz = [];
	let dataLen = data.length;
	for (let i = 0; i < dataLen; i++) {
		const element = data[i];
		for (const key in element) {
			let value = element[key].length > 0 ? element[key] : ' ';
			if (
				element.detay.length > 0 &&
				e.target.value.length > 2 &&
				value.toLowerCase().includes(e.target.value.toLowerCase())
			) {
				foundPoz.push(element);
				console.log(element[key], element);
			}
		}
	}
	createTable();
});
function createTable() {
	tableParent.innerHTML = ``;
	let dataLen = foundPoz.length;
	sonucDiv.innerHTML = `Sonuçlar: <b> ${dataLen} </b> adet poz`;
	console.log(dataLen, foundPoz);
	/* let tableStructure = `<table>
        
      `;
	tableParent.innerHTML = tableStructure;
 */
	for (let i = 0; i < dataLen; i++) {
		const tr = document.createElement('div');
		tr.classList.add('row');
		tr.innerHTML = `
   <span class="row-item w-fit"> ${foundPoz[i].pozNo}</span>
   <span class="row-item"> ${foundPoz[i].detay}</span>
   <span class="row-item w-fit"> ${foundPoz[i].a}</span>
   <span class="row-item w-fit"> ${foundPoz[i].b}</span>
   <span class="row-item"w-fit"> ${foundPoz[i].c}</span>
   <span class="row-item w-fit"> <button class=" px-4 bg-slate-500 h-10 rounded-md py-2 hover:opacity-80 active:opacity-80">Add</button></span>
    
   `;
		tableParent.appendChild(tr);
	}
}
