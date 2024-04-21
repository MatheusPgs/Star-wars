let currentPageUrl = 'https://swapi.dev/api/planets/'

window.onload = async() => {
    try{
        await loadWords(currentPageUrl)
    } catch (error) {
        console.log(error);
        alert ('Erro ao carregar cards')
    }

    const nextButton = document.getElementById('next-button')
    const backButton = document.getElementById('back-button')

    nextButton.addEventListener('click', loadNextPage)
    backButton.addEventListener('click', loadPreviousPage)
};

async function loadWords(Url) {
    const mainContent = document.getElementById('main-content')
    mainContent.innerHTML = ''; // Limpar os resultados anteriores

    try {

        const response = await fetch(Url);
        const responseJson = await response.json();

        responseJson.results.forEach(async (word) => {
            const card = document.createElement("div")
            let UrlImg =`https://starwars-visualguide.com/assets/img/planets/${word.url.replace(/\D/g, "")}.jpg`;
            
            const response = await fetch(UrlImg);
            if (response.status == '404') {
                
                 UrlImg = 'https://starwars-visualguide.com/assets/img/placeholder.jpg';

            }
            card.style.backgroundImage = `Url('${UrlImg}')`;
            card.className = "cards"



            const wordNameBg = document.createElement("div")
            wordNameBg.className = "word-name-bg"

            const wordName = document.createElement("span")
            wordName.className = "word-name"
            wordName.innerText = `${word.name}`
            
            wordNameBg.appendChild(wordName)
            card.appendChild(wordNameBg)

            card.onclick = () => {
                const modal = document.getElementById ("modal")
                modal.style.visibility = "visible"

                const modalContent = document.getElementById ("modal-content")
                modalContent.innerHTML = ''

                const wordImage = document.createElement ("div")
                wordImage.style.backgroundImage =
                `Url('https://starwars-visualguide.com/assets/img/planets/${word.url.replace(/\D/g, "")}.jpg')`
                wordImage.className = "word-image" 

                const name = document.createElement("span")
                name.className = "word-details"
                name.innerText = `nome: ${word.name}`

                const rotation_period = document.createElement("span")
                rotation_period.className = "word-details"
                rotation_period.innerText = `rotacao: ${word.rotation_period}`

                const climate = document.createElement("span")
                climate.className = "word-details"
                climate.innerText = `clima: ${word.climate}`

                const terrain = document.createElement("span")
                terrain.className = "word-details"
                terrain.innerText = `terreno: ${word.terrain}`

                const gravity = document.createElement("span")
                gravity.className = "word-details"
                gravity.innerText = `gravidade: ${word.gravity}`

                const population = document.createElement("span")
                population.className = "word-details"
                population.innerText = `populacao: ${word.population}`

                modalContent.appendChild (wordImage)
                modalContent.appendChild (name)
                modalContent.appendChild (rotation_period)
                modalContent.appendChild (climate)
                modalContent.appendChild (terrain)
                modalContent.appendChild (gravity)
                modalContent.appendChild (population)
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
        alert('erro ao carregar planetas')
    }
}

 async function loadNextPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadWords(responseJson.next)

    }   catch (error){
        console.log(error)
        alert('Erro ao carregar a próxima página')
    }
}

 async function loadPreviousPage() {
    if (!currentPageUrl) return;

    try {
        const response = await fetch(currentPageUrl)
        const responseJson = await response.json()

        await loadWords(responseJson.previous)

    } catch (error) {
        console.log(error)
        alert('Erro ao carregar pagina anterior')
    }
}

function hidemodal() {
    const modal = document.getElementById("modal")
    modal.style.visibility = "hidden"
} 