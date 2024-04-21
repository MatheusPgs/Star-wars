let currentPageUrl = 'https://swapi.dev/api/vehicles/'

window.onload = async() => {
    try {
        await loadVehicles(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadVehicles(Url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anterios

    try {

        const response = await fetch(Url);
        const responseJson = await response.json();

        responseJson.results.forEach((vehicles) => {
            const card = document.createElement("div")
            card.style.backgroundImage =
            `url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')`
            card.className = "cards"
            

            const vehiclesNameBg = document.createElement("div")
            vehiclesNameBg.className = "vehicles-name-bg"

            const vehiclesName = document.createElement("span")
            vehiclesName.className = "vehicles-name"
            vehiclesName.innerText = `${vehicles.name}`

            vehiclesNameBg.appendChild(vehiclesName)
            card.appendChild (vehiclesNameBg)

            card.onclick = () => {
                const modal = document.getElementById ("modal")
                modal.style.visibility ="visible"

                const modalContent = document.getElementById ("modal-content")
                modalContent.innerHTML = ''

                const vehiclesImage = document.createElement ("div")
                vehiclesImage.style.backgroundImage =
                `Url('https://starwars-visualguide.com/assets/img/vehicles/${vehicles.url.replace(/\D/g, "")}.jpg')`
                vehiclesImage.className = "vehicles-image"
                
                const name = document.createElement("span")
                name.className = "vehicles-details"
                name.innerText = `Nome: ${vehicles.name}`

                const model = document.createElement("span")
                model.className = "vehicles-details"
                model.innerText = `Modelo: ${vehicles.model}`

                const passengers = document.createElement("span")
                passengers.className = "vehicles-details"
                passengers.innerText = `Passageiros: ${vehicles.passengers}`

                const length = document.createElement ("span")
                length.className = "vehicles-details"
                length.innerText = `Comprimento: ${vehicles.length}`

                const manufacturer = document.createElement("span")
                manufacturer.className = "vehicles-details"
                manufacturer.innerText = `Fabricante: ${vehicles.manufacturer}`

                modalContent.appendChild (vehiclesImage)
                modalContent.appendChild (name)
                modalContent.appendChild (model)
                modalContent.appendChild (passengers)
                modalContent.appendChild (length)
                modalContent.appendChild (manufacturer)
            
            }

            mainContent.appendChild(card)
        });

        const nextButton = document.getElementById('next-button')
        const backButton = document.getElementById('back-button')

        nextButton.disabled = !responseJson.next
        backButton.disabled = !responseJson.previous

        backButton.style.visibility = responseJson.previous? "visible" : "hidden"
        nextButton.style.visibility = responseJson.next? "visible" : "hidden"



        currentPageUrl = Url

    } catch (error) {
        console.log(error);
        alert('Erro ao carregar naves')
    }
}

async function loadNextPage (){
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadVehicles(responseJson.next)

    } catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima pagina')
    }
}

async function loadPreviousPage (){
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadVehicles(responseJson.previous)

    } catch (error){
        console.log(error)
        alert('Erro ao carregar pagina anterior')
    }
}

function hidemodal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
}