const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const indicator = document.getElementById("indicator");

const ennemyRunGif = "Ennemos/NightBorne-run-unscreen.gif"; 
const ennemyAttackGif = "Ennemos/NightBorne_attack.gif";
const enemyHurtGif = "Ennemos/NightBorne_hurt.gif"; 
const enemyDeathGif = "Ennemos/NightBorne_death.gif";

const playerIdleGif = "Player/idle.gif";
const playerParadeGif = "Player/parer1.gif";
const playerAttackGif = "Player/attack.gif";
const playerDeathGif = "Player/death.gif";

const indicatorGif = "Player/Parryindicator.gif";
const noindicatorGif = "Player/noindicator.png";

const ButtonPresentation = document.getElementById("Presentation");
const ButtonPersonnages = document.getElementById("Personnages");
const ButtonHistoire = document.getElementById("Histoire");
const ButtonInformations = document.getElementById("Informations");
const scoreDisplay = document.getElementById("score-display");

const BGmusic = new Audio("Sounds/BG-music.mp3");
BGmusic.volume = 0.2;
const paradeSound = [   new Audio("Sounds/parry1.mp3"), 
                        new Audio("Sounds/parry2.mp3"),
                        new Audio("Sounds/parry3.mp3") ];
paradeSound.forEach(sound => sound.volume = 0.1);
const failSound = new Audio("Sounds/parryfail.mp3");
failSound.volume = 0.6;
const deathSound = new Audio("Sounds/dark-souls-gameover.mp3");
const attackSound = new Audio("Sounds/attack1.mp3");
attackSound.volume = 0.3;
const enemySound = new Audio("Sounds/enemyattack.mp3");
enemySound.volume = 0.3;

let score = 0;
let enemyPosition = 10;
let speed = 4;
let state = "running";
let hasParried = false;
let canAttack = false;
let isGameOver = false;
let attackTimeout;

function playRandomParrySound() {
    const randomIndex = Math.floor(Math.random() * paradeSound.length);
    const sound = paradeSound[randomIndex];
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    setTimeout(() => {
        sound.pause();
        sound.currentTime = 0;
    }, 1500);
}

document.getElementById('close-tutorial-btn').addEventListener('click', function() {
    document.getElementById('tutorial-overlay').style.display = "none";
    BGmusic.play();
    BGmusic.loop = true;
    moveEnemy();
});

function moveEnemy() {
    const enemyRect = enemy.getBoundingClientRect();
    const playerRect = player.getBoundingClientRect();
    const distance = Math.abs(enemyRect.left - playerRect.left);
    if (isGameOver || state === "dead") {
        return;
    }
    if (state === "running" && !((distance < 200 && window.innerWidth > 1000) || (distance < 100 && window.innerWidth <= 1000))) {
        enemyPosition += speed;
        enemy.style.right = enemyPosition + "px";
    }

    if (((distance < 200 && window.innerWidth > 1000) || (distance < 100 && window.innerWidth <= 1000)) && state === "running") {
        setTimeout(() => {
            enemy.src = ennemyAttackGif + "?" + new Date().getTime();
        }, 5);
        enemySound.currentTime = 3;
        enemySound.play();
        setTimeout(() => {
            state = "attacking";
        }, 10);
        
        setTimeout(() => {
            if (hasParried) {
                indicator.src = indicatorGif + "?" + new Date().getTime();
                failSound.pause();
                playRandomParrySound();
                enemySound.pause();
                enemy.src = enemyHurtGif + "?" + new Date().getTime();
                state = "hurt";
                canAttack = true;
                setTimeout(() => {                    
                    indicator.src = noindicatorGif;
                }, 300);
                setTimeout(() => {
                    if (isGameOver || state === "dead") {
                        return;
                    }
                    state = "running";
                    moveEnemy();
                }, 900);
            } else {
                setTimeout(() => {
                    if (state === "dead") {
                        return;
                    }
                    player.src = playerDeathGif + "?" + new Date().getTime();
                    endGame();
                },50)
            }
        }, 700);

    } else {
        requestAnimationFrame(moveEnemy);
    }
}

document.addEventListener("keydown", (e) => {
    if ((e.key === "F" || e.key === "f") && !hasParried && !isGameOver && !(state === "hurt")) {
            failSound.currentTime = 0;
            failSound.play();

        player.src = playerParadeGif + "?" + new Date().getTime();
        hasParried = true;
        setTimeout(() => {
            if(!isGameOver && !(state === "dead")){
                player.src = playerIdleGif + "?" + new Date().getTime();
            }
        }, 400);
        setTimeout(() => {
            hasParried = false;
        },275);
    }

    if ((e.key === "R" || e.key === "r") && canAttack && !isGameOver) {
        player.src = playerAttackGif + "?" + new Date().getTime();
        enemySound.pause();
        attackSound.pause();
        attackSound.currentTime = 0;
        attackSound.play();
        state = "dead"
        enemy.src = enemyDeathGif + "?" + new Date().getTime();
        setTimeout(() => {
            setTimeout(() => {
                enemy.style.display = "none";
                player.src = playerIdleGif + "?" + new Date().getTime();
                respawnEnemy();
            },1000)
        },300)

        canAttack = false;
        if (score < 400 ){
            score += 40;
        }
        else if (score >= 400) {
            score +=20;
        }
        updateBG(score);
        document.getElementById("score-display").innerHTML = "Score : " + score;
        state = "dead";
        clearTimeout(attackTimeout);
    }
});

function respawnEnemy(){
    if(score <= 100){
        enemyPosition = 10;
        speed *= 1.2;
        enemy.style.right = "-5%";
    }
    else if (score <= 200){
        enemyPosition = 10;
        speed *= 1.4;
        enemy.style.right = "-5%";
    }
    else if (score <= 300){
        enemyPosition = 10;
        speed *= 1.5;        
        enemy.style.right = "-5%";
    }
    else if (score <= 400){
        enemyPosition = 10;
        speed *= 1.6;
        enemy.style.right = "-5%";

    }
    else {
        enemyPosition = 10;
        speed = 50;
        enemy.style.right = "-5%"
        
    }
    state = "running"; 
    enemy.src = ennemyRunGif + "?" + new Date().getTime();
    enemy.style.display = "block";
    isGameOver = false;
    moveEnemy();
}

function updateBG(score){
    if (score === 0) {
        const gameElement = document.querySelector('.game');
        gameElement.style.backgroundImage = "url('Images/backgroung_game1.gif')";
    }
    if (score >= 200) {
        const gameElement = document.querySelector('.game');
        gameElement.style.backgroundImage = "url('Images/background_game_4.gif')";
    }
    if (score >= 400) {
        const gameElement = document.querySelector('.game');
        gameElement.style.backgroundImage = "url('Images/background_game3.gif')";
    }
}
function endGame() {
    player.src = playerDeathGif + "?" + new Date().getTime();
    deathSound.pause();
    deathSound.currentTime = 0;
    deathSound.play();
    BGmusic.volume = 0.05;
    paradeSound.forEach(sound => sound.pause());
    attackSound.pause();
    document.getElementById('final-score').textContent = "Votre score : " + score; 
    document.getElementById('gameover-overlay').style.display = "flex";
    isGameOver = true;
    if(score >= 100){
        ButtonPresentation.classList.remove('disabled');
    }
    if(score >= 200){
        ButtonPersonnages.classList.remove('disabled');
    }
    if(score >= 300){
        ButtonHistoire.classList.remove('disabled');
    }
    if(score >= 400){
        ButtonInformations.classList.remove('disabled');
    }
    bonus(score);

}

document.getElementById('restart-btn').addEventListener('click', function() {
    document.getElementById('gameover-overlay').style.display = "none";    
    BGmusic.currentTime = 0;
    BGmusic.volume = 0.3;
    score = 0;
    updateBG(score);
    enemyPosition = 10;
    speed = 4;
    state = "running";
    hasParried = false;
    canAttack = false;
    isGameOver = false;
    player.src = playerIdleGif + "?" + new Date().getTime();
    enemy.src = ennemyRunGif + "?" + new Date().getTime();
    enemy.style.right = enemyPosition + "px";
    enemy.style.display = "block";
    document.getElementById("score-display").innerHTML = "Score : " + 0;
    moveEnemy();
});


['Presentation', 'Personnages', 'Histoire', 'Informations'].forEach(section => {
    document.getElementById(section).addEventListener('click', function(e) {
        if (!this.classList.contains('disabled')) {
            document.getElementById('main').style.display = 'block';
            e.preventDefault();
            loadSection('main'); 
            loadSection(section+"-wiki");
        }

    });
});
function loadSection(sectionName) {
    fetch(`struggle.php?section=${sectionName}`)
        .then(response => response.text())
        .then(html => {
            document.getElementById(sectionName).innerHTML = html;
        });
}

const personnages = [
    {
        img : "https://qph.cf2.quoracdn.net/main-qimg-cc328f0d8e8b96538377c87d34eec4e2",
        nom : "GUTS",
        desc1 : "Guts est le héros de l'histoire. Il est le guerrier noir qui demeure sur le seuil, motivé par la volonté de défendre Casca et de défier Griffith. Il se bat avec une violence inouïe.",
        desc2 : "En anglais, guts signifie « tripes », « entrailles ». Ce nom fait référence aux circonstances impitoyables de sa naissance, extirpé des entrailles de sa mère morte pendue à un grand arbre pour s'échouer dans une mare de sang et de chair, avant d'être recueilli par Sys, la femme du chef d'un groupe de mercenaires. C'est aussi une référence à une expression populaire anglaise sur le fait d'être courageux (to have guts, littéralement « avoir des tripes »)"
    },

    {
        img : "https://www.anime-colors.com/wp-content/uploads/griffith.png",
        nom : "GRIFFITH",
        desc1 : "Griffith est le charismatique chef de la Troupe du Faucon, une bande de mercenaires redoutables. Grâce à ses talents stratégiques, il enchaîne les victoires et grimpe rapidement les échelons, jusqu'à être anobli et promu général. Sa rencontre avec Guts, un guerrier exceptionnel, change la dynamique du groupe. Après l'avoir vaincu dans un duel, il l'intègre à la troupe et en fait le chef de la cavalerie. ",
        desc2 : "Mais quand Guts quitte la troupe après l’avoir battu en duel, Griffith perd le contrôle. Il est arrêté par le roi pour sa relation avec la princesse et subit une année entière de torture. Sauvé trop tard, brisé physiquement et mentalement, il active le Béhélit rouge. C’est l’Éclipse. Pour accomplir son rêve de royaume parfait, il sacrifie la Troupe du Faucon. Tous meurent, sauf Guts et Casca — qui paient un prix atroce : Guts perd un bras, Casca perd la raison, et Griffith renaît en tant que Femto, membre de la God Hand, vidé de toute humanité."
    },

    {
        img : "https://i.pinimg.com/736x/00/d2/e0/00d2e0371b60c0737001b367df761741.jpg",
        nom : "CASCA",
        desc1 : "Casca est l'ancien officier de la Troupe du Faucon, qui a perdu l'esprit après les événements traumatisants du sabbat. Elle a été guérie grâce au couloir des rêves, un rituel de Danan, la reine d'Elf Helm.",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/d3/38/60/d33860f48838f6832a890799ee361a2c.jpg",
        nom : "SCHIERKE",
        desc1 : "Schierke est la disciple de Flora, la sorcière de l'arbre aux esprits. Elle aide Guts et ses compagnons grâce à ses nombreux sortilèges. Il est même arrivé qu'elle les sauve au prix de grands dangers, en employant des sorts qu'elle ne maîtrisait pas. Elle a un côté bonne élève.",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/f5/dc/7d/f5dc7d5317986ccbe0d9f358aa789927.jpg",
        nom : "FARNESE",
        desc1 : "Ancien chef de la troupe des Chaînes d'acier sacrées, milice de la papauté, et héritière de l'influente famille Vandimion. Elle veut apprendre de Guts à s'accepter et à survivre par elle-même, ainsi que la vérité sur le monde. ",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/e7/6a/ab/e76aab13f97953d23a513bed3ec896f4.jpg",
        nom : "SERPICO",
        desc1 : "Serviteur et demi-frère de Farnèse, bien que celle-ci ignore leur lien de parenté. Déjà doué pour le combat, il a de plus reçu la protection et les armes de l'esprit élémentaire du vent. ",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/c5/1a/38/c51a386e374a102c3cc6d41e49920ca3.jpg",
        nom : "ISIDRO",
        desc1 : "Le rêve d'Isidro est de devenir le plus puissant des guerriers. Même si sa force ne le suit pas encore, ce qui le met sans cesse en danger, il s'accroche afin de pouvoir réaliser ce rêve. Il vient de recevoir une arme lui assurant la protection de l'esprit élémentaire du feu. ",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/d3/b8/98/d3b898ebbf152de3548e457da0a9ede2.jpg",
        nom : "PUCK",
        desc1 : "Puck est un elfe qui voyage depuis longtemps avec Guts. Sa poudre permet de guérir les blessures. Il a découvert récemment qu'il faisait partie de la famille des esprits élémentaires du vent. Il est aussi surnommé Puck la châtaigne.",
        desc2 : ""
    },

    {
        img : "https://pnganime.com/web/image-thumbnails/110/452-md.png",
        nom : "CHEVALIER SQUELETTE",
        desc1 : "Guerrier spectral en croisade contre le destin, il sauva Guts, Casca et Rickert de l’Éclipse avant de disparaître dans les ombres.",
        desc2 : ""
    },

    {
        img : "https://i.pinimg.com/736x/ab/dd/98/abdd989c634f4c0fcc34590b5fc47ad3.jpg",
        nom : "RICKERT",
        desc1 : "Plus jeune membre de la Troupe du Faucon, Rickert restait souvent en retrait, suivant Guts, Judeau et Pippin. Il quitte la troupe avant l’Éclipse et devient forgeron chez Godo, échappant ainsi au massacre et à la marque du sacrifice.",
        desc2 : "Il mûrit après la chute des Faucons, mais ne découvre la vérité qu’à la renaissance de Griffith. Malgré son désir de vengeance, il admet ne pas haïr Griffith autant que Guts, et choisit de rester pour veiller sur Erika et la forge"
    }

];

let index = 0;
function afficherPersonnage(){
    document.getElementById('perso-img').src = personnages[index].img;
    document.getElementById('perso-nom').textContent = personnages[index].nom;
    document.getElementById('perso-desc1').textContent = personnages[index].desc1;
    document.getElementById('perso_desc2').textContent = personnages[index].desc2;

}

function suivant() {
    index = (index + 1) % personnages.length;
    afficherPersonnage();
}
function precedent() {
    index = (index - 1 + personnages.length) % personnages.length;
    afficherPersonnage();
}

const bonusImage = ["bonus/bonus1.jpg", "bonus/bonus2.jpg", "bonus/bonus3.jpg", "bonus/bonus4.jpg",
    "bonus/bonus5.jpg","bonus/bonus6.jpg","bonus/bonus7.jpg","bonus/bonus8.jpg","bonus/bonus9.jpg","bonus/bonus10.jpg","bonus/bonus11.jpg","bonus/bonus12.jpg"
    ,"bonus/bonus13.jpg","bonus/bonus14.jpg", "bonus/bonus15.jpg"
];
let idx = 0;

function bonus(score){
    const gallery = document.getElementById("gallery-container");
    const bimg = document.getElementById("gallery-image");
    const ulC = Math.floor((score - 400) / 20);
    if (ulC > 0){
        gallery.style.display = "flex";
        idx = Math.min(idx, ulC -1 );
        bimg.src = bonusImage[idx];
    }
    else{
        gallery.style.display = "none";
    }
}

document.getElementById("prev-btn").addEventListener("click", () => {
    const ulC = Math.floor((score-400)/20);
    if(ulC > 0 && idx > 0){
        idx = (idx - 1 + ulC) % ulC;
        document.getElementById("gallery-image").src = bonusImage[idx];
    }
});

document.getElementById("next-btn").addEventListener("click", () => {
    const ulC = Math.floor((score-400)/20);
    if(ulC > 0 && idx < 14){
        idx = (idx + 1) % ulC;
        document.getElementById("gallery-image").src = bonusImage[idx];
    }
});