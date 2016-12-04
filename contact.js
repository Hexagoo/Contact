$( function() {

	var buttons = $(".section button");
	var status = $("#status");

	startGame();

	//Dès qu'un bouton sera cliqué
	buttons.click( function() {
		//Ici on sauvegarde la section parent du bouton appuyé à cacher
		var sectionACacher = $(this).parents("div.section");

		//Animation
		//var test = $(this).parents("div").attr('id');
		//if(test == "histoire") { alert("coucou")}

		//On récupère l'identifiant de la section vers laquelle l'on veut aller
		var keyInt = $(this).attr('go');
		if ( keyInt == "mortRapide") { setLife() }
		else if ( keyInt == "histoire" || keyInt == "poster") { $("img").toggleClass("bounce") }

		var key = eval(keyInt);
		//Ici on regarde si le joueur perd une vie
		var strAction = $(key).children("action").attr('name');
		//Si la balise action possède le nom "hit" on enlève 1 point de vie
		if (strAction == "hit") { loseOneLife() }
		else if (strAction == "reset") { setLife() }

		//On cache la section actuelle
		sectionACacher.hide();
		//...et on affiche la nouvelle seciton
		gotoSection(key);
	} );

	//Déclaration fonction de perte de vie
	function loseOneLife() {
		//On stocke le dernier coeur encore plein
		var derCoeur = getLife();
		//et on modifie sa classe pour
		derCoeur.attr('class', 'fa fa-heart-o');
		//Quand le joueur n'a plus de vie
		var encoreEnVie = $("#status").find("i.fa-heart");
		if ( !(encoreEnVie.length > 0) ) {
			$(".section#death").show();
			setLife();
			}
		}

	//Fonction qui permet d'être redirigé vers la section voulu
	function gotoSection(key) {
		//On affiche la partie sur laquelle on a cliqué
		$(key).fadeIn(150);
	}

	//Renvoie la vie
	function getLife() {
		return $("#status i.fa-heart:last");
	}

	//Affiche la nouvelle vie
	function setLife() {
		//Réinitialisation de la vie à 3
		$("#status i").attr('class', 'fa fa-heart');
		endGame();
	}

	//initialisation du jeu
	function startGame() {
		$("div.section").hide();
		$("div#intro").show();
	}

	//Fin du jeu
	function endGame() {
		$("div.section").hide();
		startGame();
	}

	//Mouvement
	function animation() {
	  $("img").addClass(".bounce");
	}

});
