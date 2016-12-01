$( function() {

	var buttons = $(".section button");
	var status = $("#status");

	//Lancement de l'initialisation du jeu avec 3 de vie
	startGame();

	//Dès qu'un bouton sera cliqué
	buttons.click( function() {
		//Ici on sauvegarde la section parent du bouton appuyé à cacher
		var sectionACacher = $(this).parents("div.section");
		//On récupère l'identifiant de la section vers laquelle l'on veut aller
		var keyInt = $(this).attr('go');
		var key = eval(keyInt);

		//Ici on regarde si le joueur perd une vie
		var strAction = $(key).children("action").attr('name');
		//Si la balise action possède le nom "hit" on enlève 1 point de vie
		if (strAction == "hit") {
			loseOneLife();
		}

		//Le joueur a-t-il gagné ?
		if( keyInt == "exit") {
			endGame();
			$("div.#exit").fadeOut(150);
		}

		//Ici on cache la section actuelle
		sectionACacher.hide();
		gotoSection(key);
	} );

	//Déclaration fonction de perte de vie
	function loseOneLife() {
	  	var v = getLife();
			v -= 1;
			//Quand le joueur n'a plus de vie
			if ( v == 0 ) {
				endGame();
				$("div.#death").fadeOut(200);
			}
			setLife(v);
		}

	//Fonction qui permet d'être redirigé vers la section voulu
	function gotoSection(key) {
		//On affiche la partie sur laquelle on a cliqué
		$(key).fadeIn(150);
	}

	//Renvoie la vie
	function getLife() {
		//On récupère le texte présent dans l'élément span
		return $("span").text();
	}

	//Affiche la nouvelle vie
	function setLife(v) {
		$("#status span").text(v);
	}

	function startGame() {
		//Réinitialisation de la vie à 3
		//$("#status span").text(3);
		$("div.section").hide();
		$("div#intro").show();
	}

	function endGame() {
		$("div#death").show();

		startGame();
	}

} );
