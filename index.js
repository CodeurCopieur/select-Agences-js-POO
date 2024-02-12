var lesMails = document.querySelector(".email"); //Pour afficher les emails
var agenceName = document.querySelector(".nom_de_lagence"); // Pour afficher les noms d'agences selectionnées avec select
var leSelecteur = document.getElementById('infos'); // Le selecteur HTML
var valueSelect 

class Search {

  #size = 20

  constructor(data) {
      this.data = data;
      this.selectChange()
  }


  insertGroups(start) {
    var indexEnd = Math.min(start + this.#size, this.data.length)
    var lesAgences = this.data.slice(start, indexEnd)

    lesAgences.forEach( function(agence) {
      // leSelecteur.innerHTML += '<option>' + agence.AGENCES + '</option>';
      var optionElt = document.createElement('option')
      optionElt.value = agence.AGENCES;
      optionElt.textContent = agence.AGENCES

      leSelecteur.appendChild(optionElt)
    } )

    if (indexEnd < this.data.length) {
        setTimeout(() => {
          this.insertGroups(indexEnd)
        }, 100)
    }
  }

  selectChange() {
    valueSelect = leSelecteur.options[leSelecteur.selectedIndex].value
    
    // if(valueSelect !== 'Toutes les agences') {
    //   injectContenu(valueSelect)
    // }

    leSelecteur.addEventListener('change', (e) => this.injectContenu(e.currentTarget))
  }

  injectContenu(target) {
    var valSelect = target.options[target.selectedIndex].value;
    var selectedIndex = target.selectedIndex - 1

    if(valSelect < 0) {
      agenceName.innerHTML = "";
      lesMails.innerHTML = "";
      return; // Sortir si l'indice est invalide
    } 

    const selectedAgency = this.data[selectedIndex];
    if (selectedAgency) {
      agenceName.innerHTML = selectedAgency.AGENCES;
      lesMails.innerHTML = selectedAgency.Adresse_mail;
    } else {
      agenceName.innerHTML = "";
      lesMails.innerHTML = "";
      // console.error('Agence non trouvée pour selectedIndex:', selectedIndex);
    }

    // if (selectedIndex === 1) {
    //   console.log(this.data[0]);
    //   agenceName.innerHTML = this.data[0].AGENCES;
    //   lesMails.innerHTML = this.data[0].Adresse_mail;
      
    // } else {
    //   agenceName.innerHTML = this.data[selectedIndex].AGENCES;
    //   lesMails.innerHTML = this.data[selectedIndex].Adresse_mail;  
    // }

  }
}

function loadData() {
  var xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
          if (xhr.status === 200) { // Assurez-vous que la requête a réussi
        var  allAgencies = JSON.parse(xhr.responseText);

        return new Search(allAgencies).insertGroups(0);
          }
        } 
    }
    xhr.open('GET', './all_agencies.json', true);
    xhr.send();

}


addEventListener('load', function(e) {
  e.preventDefault();
  
  loadData()

})