Group :
EL GHORCHI Omar    N°:16030711 M2I
EL Rhabi Nassime   N°:16032147 M2I
Souilah Mohamed    N°:16031435 M2I

on a utilisé le POO avec JS pour bien organisé le codage.
alors, il y a quatre class qui represente les objects de jeux et une class pour manipuler les commandes 
de clavier .
les quatres classes contient deux methodes nécessaire et un constructeur pour instancié l'object: 
draw() : pour dessiner le object .
update() : pour controler le mouvement d'object .

//-----------
les classes :
class Ball : il represente le ballon rouge , et controler les proprites de ce ballon, par Exemple : la position , la taille , la vitesse de mouvement ...

class Paddle : il represente la palette blue , et controler les proprites de dernier ,il contient trois methods en plus : 
stop() : pour stoper la palette.
moveleft(): pour se déplacer  la palette à gauche .
moveright(): pour se déplacer  la palette à droit .

class Rectangle : il represente les niveaux des briques,il incremente le score si le ballon touche une brique.

class Game : il contient tous les autres objects .

class InputHandler : pour manipuler les commandes de clavier .


//------- 


les methodes JavaScript et les elements HTML utilisé dans le project  .

-canvas : un élément HTML qui est utilisé pour dessiner des graphiques dans une page Web.

-getContext : retourne un contexte de dessin sur le canevas.

-clearRect: de l'API 2D des Canvas met en noir transparent tous les pixels dans le rectangle 
 défini par le point de départ de coordonnées (x, y) et par les tailles (largeur, hauteur), supprimant tout contenu précédemment dessiné.

-requestAnimationFrame : notifie le navigateur que vous souhaitez exécuter une animation et demande 
 que celui-ci exécute une fonction spécifique de mise à jour de l'animation.

-fillStyle: spécifie la couleur ou style à utiliser à l'intérieur des formes.

-fillRect:dessine un rectangle plein aux coordonnées (x, y), aux dimensions 
 déterminées par largeur et hauteur et au style déterminé par l'attribut fillStyle.

-getElementById : de Document renvoie un objet  Element représentant l'élément dont la propriété
  id correspond à la chaîne de caractères spécifié

addEventListener: met en place une fonction à appeler chaque fois que l'événement spécifié est remis à la cible. 


