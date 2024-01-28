const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};

fetch("https://api.themoviedb.org/3/list/1?language=fr-FR&page=1", options)
	.then((response) => response.json())
	.then((response) => console.log(response))
	.catch((err) => console.error(err));
// on crée une fonction associée à la méthode GET
const getMethod = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGZkNTE5Yjk2NzQwMjFiODMwZTVlMTVjNmM1OWMzZCIsInN1YiI6IjY1YjM3MjFhNTk0Yzk0MDE3YzNkYTAxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.C2_C-cbzlNRhTWYDBv6BBRv6mh8AkSf6px_C7B1cz4w",
	},
};

async function listMovies() {
	try {
		const response = await fetch(
			"https://api.themoviedb.org/3/list/1?language=fr-FR&page=1",
			getMethod
		);
		const data = await response.json();
		//console.log(data.items);
		return data.items;
	} catch (error) {
		// Gérer les erreurs ici, si nécessaire
		console.error("Erreur lors de la requête:", error.message);
	}
}

const favoris = [];

let moviesList;
// Fonction pour ajouter un favoris
function ajouterAuxFavoris(titre){
	const film = moviesList.find((movie) => movie.title === titre);

	if (film) {
		favoris.push(film);
		console.log(`Le film "${titre}" a été ajouté aux favoris.`);
		afficherFilmsFavoris();
	} else {
		console.log(`Film non trouvé : "${titre}"`);
	}
}
// Fonction pour supprimer des favoris
function supprimerDesFavoris(titre) {
	const index = favoris.findIndex((movie) => movie.title === titre);

	if (index !== -1) {
		favoris.splice(index, 1);
		console.log(`Le film "${titre}" a été supprimé des favoris.`);
		afficherFilmsFavoris();
	} else {
		console.log(`Film non trouvé dans les favoris : "${titre}"`);
	}
}


// Utilisez une fonction asynchrone pour attendre la résolution de la promesse
async function loadMovies() {
	const liste = await listMovies();
	console.log(liste);

	// Récupérez le conteneur
	const container = document.getElementById("container");

	liste.forEach((movie) => {
		// Créez les éléments de la carte
		const card = document.createElement("div");
		//v3 pour la couleur
		card.className = "card text-bg-dark m-2";
		card.style.width = "18rem";

		const img = document.createElement("img");
		img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
		img.className = "card-img-top p-2";
		img.alt = movie.title;

		const bodyCard = document.createElement("div");
		bodyCard.className = "card-body";

		const titre = document.createElement("h5");
		titre.className = "card-title";
		titre.textContent = movie.title;

		const resume = document.createElement("p");
		bodyCard.resume = "card-text";
		resume.textContent = movie.overview;
		resume.textContent = movie.overview.slice(0, 40) + "...";

		const addButton = document.createElement("button");
		addButton.className = "btn btn-warning";
		addButton.textContent = "Ajouter aux favoris "

		const removeButton = document.createElement("button");
		removeButton.className = "btn btn-danger";
		removeButton.textContent = "Supprimer des favoris "



		// les petits enfants
		bodyCard.appendChild(titre);
		bodyCard.appendChild(resume);
		bodyCard.appendChild(addButton);
		bodyCard.appendChild(removeButton);
		

		// les parents
		card.appendChild(img);
		card.appendChild(bodyCard);

		// Ajoutez la carte au conteneur le papi
		container.appendChild(card);
	});
}
loadMovies();
