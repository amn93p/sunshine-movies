const getMethod = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization:
			"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNWY1MzRlOWY2YjA1OWNlNDA1ZTMzZmEwMjY4NTllMSIsInN1YiI6IjY0ZjIzYzcwMWYzMzE5MDBjNmY1NDdmMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.SW_HBVI1Ck7MmH9jOa-DJOgPhYWBxK2yU_AsE0bv0NY",
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

// Liste de films favoris
const favoris = [];

// Liste de films (accessible dans le contexte global)
let moviesList;

// Fonction pour ajouter un film aux favoris
function ajouterAuxFavoris(titre) {
	const film = moviesList.find((movie) => movie.title === titre);

	if (film) {
		favoris.push(film);
		console.log(`Le film "${titre}" a été ajouté aux favoris.`);
		afficherFilmsFavoris();
	} else {
		console.log(`Film non trouvé : "${titre}"`);
	}
}

// Fonction pour afficher les titres des films favoris
function afficherFilmsFavoris() {
	console.log("Films favoris :");
	for (const movie of favoris) {
		console.log(movie.title);
	}
}

// Fonction pour supprimer un film des favoris
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

// Fonction pour créer une carte de film
function creerCarteFilm(movie) {
	// Créez les éléments de la carte
	const card = document.createElement("div");
	card.className = "card text-bg-dark m-2";
	card.style.width = "18rem";

	const img = document.createElement("img");
	img.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
	img.className = "card-img-top p-2";
	img.alt = movie.title;

	const cardBody = document.createElement("div");
	cardBody.className = "card-body";

	const title = document.createElement("h5");
	title.className = "card-title";
	title.textContent = movie.title;

	const overview = document.createElement("p");
	overview.className = "card-text";
	overview.textContent = movie.overview.slice(0, 40) + "...";

	// Ajoutez un bouton pour ajouter aux favoris
	const addButton = document.createElement("button");
	addButton.textContent = "Ajouter aux favoris";
	addButton.className = "btn btn-primary";
	addButton.addEventListener("click", () => ajouterAuxFavoris(movie.title));

	// Ajoutez un bouton pour supprimer des favoris
	const removeButton = document.createElement("button");
	removeButton.textContent = "Supprimer des favoris";
	removeButton.className = "btn btn-danger";
	removeButton.addEventListener("click", () =>
		supprimerDesFavoris(movie.title)
	);

	// Ajoutez les éléments à la carte(les petits enfants)
	cardBody.appendChild(title);
	cardBody.appendChild(overview);
	cardBody.appendChild(addButton);
	cardBody.appendChild(removeButton);

	// Ajoutez les éléments à la carte (les parents)
	card.appendChild(img);
	card.appendChild(cardBody);

	// Ajoutez la carte au conteneur (Le grand père)
	container.appendChild(card);
}

// Fonction principale pour charger les films
async function loadMovies() {
	try {
		moviesList = await listMovies();
		console.log(moviesList);

		// Récupérez le conteneur
		const container = document.getElementById("container");

		// Parcourez la liste de films et créez des cartes pour chaque film
		moviesList.forEach((movie) => {
			creerCarteFilm(movie);
		});
	} catch (error) {
		console.error("Erreur lors du chargement des films:", error.message);
	}
}

// Appelez votre fonction asynchrone pour charger les films
loadMovies();
console.log("liste des favoris : ", moviesList);
