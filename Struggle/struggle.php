<?php
$section = $_GET['section'] ?? '';

switch($section) {
    case 'main':
        echo " 
        <div id='widget'>        
            <div id='tab-content'>
                <div id='Presentation-wiki' class='tab-content-1'></div>
                <div id='Personnages-wiki' class='tab-content-2'></div>
                <div id='Histoire-wiki' class='tab-content-3'></div>
                <div id='Informations-wiki' class='tab-content-4'></div>
            </div>
        </div>
        ";
    break;
    case 'Presentation-wiki':
        echo 
            "<h1>Présentation</h1>
                <p>Berserk, ce n’est pas simplement un manga de dark fantasy, c’est une œuvre à part, une descente vertigineuse dans les ténèbres humaines. Créé par Kentaro Miura en 1989, il suit le destin tragique de Guts, un mercenaire solitaire au passé brisé, qui manie une épée colossale dans un monde ravagé par la guerre, les complots et des forces surnaturelles impitoyables. L’univers de Berserk est sans pitié, où l’innocence est souvent écrasée, et où l’espoir vacille constamment. Au cœur de ce chaos, Guts incarne la lutte contre le destin, refusant de plier face aux épreuves, même quand tout semble perdu. Son parcours croise celui de Griffith et de la Troupe des Faucons, et c’est là que l’histoire prend une tournure à la fois sublime et dévastatrice.</p>
                <p>Ce qui frappe immédiatement dans Berserk, c’est la puissance visuelle et narrative de l’œuvre. Kentaro Miura possédait une maîtrise artistique exceptionnelle : ses planches sont d’une finesse et d’un détail rarement égalés, allant des champs de bataille monumentaux aux expressions les plus intimes de douleur ou de rage. Mais au-delà de l’esthétique, c’est l’émotion brute qui traverse chaque page qui touche les lecteurs. L’histoire ne cherche jamais à adoucir la réalité : elle montre la violence, la cruauté, la perte… mais aussi des moments de grâce. Des liens profonds, une humanité qui survit malgré tout, une lumière ténue qui subsiste même dans les ténèbres les plus épaisses.</p>
                <p>Berserk touche profondément parce qu’il parle à ceux qui ont connu la chute, la solitude, la trahison et qui se relèvent quand même. Guts n’est pas un héros parfait. Il est enragé, brisé, souvent guidé par la colère. Mais c’est justement ce qui le rend réel, puissant. Sa lutte devient celle du lecteur. Lire Berserk, c’est affronter l’abîme, mais aussi apprendre à y survivre. C’est une œuvre qui marque, qui reste, parce qu’elle parle de ce qu’il y a de plus vrai : continuer d’avancer, même quand le monde veut vous écraser.</p>";
        break;
    case 'Personnages-wiki':
        echo 
            "<div class=container>
                <div class='arrow' onclick = precedent()>🢦</div>
                <img id='perso-img' src='https://qph.cf2.quoracdn.net/main-qimg-cc328f0d8e8b96538377c87d34eec4e2' alt = 'perso'>
                <div class='text'>
                    
                    <h2 id='perso-nom'>GUTS</h2>
                    <p id='perso-desc1'>Guts est le héros de l'histoire. Il est le guerrier noir qui demeure sur le seuil, motivé par la volonté de défendre Casca et de défier Griffith. Il se bat avec une violence inouïe.</p> 
                    <p id='perso_desc2'>En anglais, guts signifie « tripes », « entrailles ». Ce nom fait référence aux circonstances impitoyables de sa naissance, extirpé des entrailles de sa mère morte pendue à un grand arbre pour s'échouer dans une mare de sang et de chair, avant d'être recueilli par Sys, la femme du chef d'un groupe de mercenaires. C'est aussi une référence à une expression populaire anglaise sur le fait d'être courageux (to have guts, littéralement « avoir des tripes »).</p>
                </div>
                <div class='arrow' onclick = suivant()>🢧</div>";
        break;
    case 'Histoire-wiki':
        echo 
        "<h1>Histoire</h1>
<h3>L’arc du Guerrier Noir</h3>
            <p>Un solitaire épéiste nommé Guts arrive dans la ville de Koka, où il affronte et tue plusieurs ennemis, se faisant rapidement connaître comme le « Black Swordsman ». Il libère un elfe nommé Puck, qui devient son allié et le soigne après une capture. Guts combat un puissant apôtre, le Snake Lord, qu’il interroge sur le mystérieux « God Hand » avant de le laisser mourir.</p>
            <p>Plus tard, Guts infiltre le château d’un autre apôtre, le Count, avec l’aide d’un complice nommé Vargas, dont il récupère un précieux beherit. Après la capture et l’exécution de Vargas, Guts attaque le Count, qui se transforme en créature monstrueuse. Grâce à Puck et à la prise en otage de la fille du Count, Theresia, Guts inflige un coup décisif, mais le Count invoque la God Hand.</p>
            <p>Face à Femto, incarnation de Griffith, Guts est rempli de rage mais échoue à le vaincre. Traîné dans l’Abîme en tant que sacrifice marqué, Guts parvient à s’en échapper. Il sauve Theresia d’un suicide, suscitant chez elle une haine envers lui, qu’il accepte calmement malgré la douleur qu’elle lui cause.</p>
            <h3>L’arc L’Âge d’or</h3>
            <p>Le Royaume de Midland et l’Empire Tudor sont en guerre depuis cent ans. Guts, un solitaire épéiste, rejoint la troupe du Faucon dirigée par Griffith après un duel décisif. Pendant trois ans, il contribue à leurs victoires militaires et devient capitaine. Le Faucon gagne la confiance du roi de Midland et met fin à la guerre en reprenant la forteresse de Doldrey.</p>
            <p>Insatisfait de servir Griffith, Guts quitte la troupe. Peu après, Griffith, dans un accès de désespoir, couche avec la princesse Charlotte, est capturé, torturé un an, puis libéré par Guts et la troupe. Le roi envoie des assassins et les Chevaliers du Chien Noir, dirigés par l’apôtre Wyald, pour les éliminer. Guts bat Wyald, mais Zodd intervient pour sauver Griffith.</p>
            <p>Griffith, brisé, active alors le Beherit Rouge et déclenche l’Éclipse, sacrifiant la troupe pour renaître en Femto, membre du God Hand. Les mercenaires sont dévorés, Guts perd un bras et un œil, Casca devient folle après un viol par Femto. Ils survivent grâce au Skull Knight.</p>
            <p>Guts jure vengeance, s’arme du Dragon Slayer et d’un bras-canon, et part en guerre personnelle contre les apôtres et le God Hand en tant que « Black Swordsman ».</p>
            <h3>L’arc L’ère des châtiments</h3>
            <p>L’ère qui suit l’Éclipse est marquée par la survie douloureuse de Guts et Casca, profondément transformés par l’horreur de l’événement. Guts devient un guerrier rongé par la haine et la vengeance, prêt à tout pour traquer Griffith, désormais devenu Femto, membre de la God Hand. Ce nouvel âge est dominé par la lutte contre des ennemis surnaturels, la recherche de réponses dans un monde où le mal semble triompher, et la quête d’une justice presque impossible. Tandis que la noirceur s’étend, certains personnages comme Schierke ou Farnese apportent un peu de lumière grâce à la magie et à la foi, mais le chemin reste semé d’épreuves. C’est une époque de renaissance, de douleur et de combats incessants pour refuser le destin imposé par les puissances obscures.</p>
            <h3>L’arc L’ère des châtiments</h3>
            <p>Guts rencontre un village terrorisé par Rosine, une apostate enfant transformée en elfe. Après l’avoir combattue et involontairement causé des destructions dont il est accusé, il poursuit Rosine dans la Vallée Brumeuse, la tue, mais est blessé et doit fuir.</p>
            <p>Capturé par les Chevaliers de la Sainte Chaîne qui le tiennent responsable de plusieurs atrocités, Guts résiste mais est finalement maîtrisé et emprisonné. Il s’échappe avec Farnèse en otage, reçoit des visions de Casca et apprend qu’elle a disparu.</p>
            <p>À Albion, Guts cherche Casca, affronte des cultistes et des pseudo-apôtres puissants, mais échoue à la protéger de la capture par les Chevaliers. La Tour de la Conviction s’effondre lors d’une purge surnaturelle des âmes souffrantes. L’arc se termine par le retour mystérieux de Griffith, observé par Guts et d’autres.</p>
            <h3>L’arc du Faucon Millénaire</h3>
            <p>Cet arc est, à ce jour, le plus long du manga. Il prend place après la réapparition de Griffith à la fin de L’ère des châtiments. Guts y fait face à un nouvel adversaire : Ganishka, empereur des Kushans. Il rencontre également la sorcière Schierke lui révélant les secrets de l’armure du berserker. De son côté, Griffith se lance concrètement dans son rêve de conquête du monde aux côtés de sa nouvelle troupe du faucon.</p>
            <p>Ganishka, devenu un puissant apôtre, déclenche une invasion dévastatrice contre Midland, poussant Guts et ses compagnons à le combattre pour protéger le royaume. Au fil des batailles, Guts apprend à maîtriser davantage son armure maudite, qui décuple sa force mais menace de le consumer.</p>
            <p>Pendant ce temps, Griffith étend son influence politique et militaire, établissant un nouvel empire fondé sur son charisme et le pouvoir des God Hand. Son ascension provoque de nombreuses tensions et conflits, plaçant Guts et ses alliés dans une lutte à la fois contre des forces humaines et surnaturelles.</p>
            <p>L’arc explore également la progression des personnages secondaires comme Casca, qui commence à retrouver lentement ses souvenirs grâce à Schierke, et Isidro, qui grandit en tant que combattant. L’affrontement final contre Ganishka culmine en une bataille spectaculaire mêlant magie, forces surnaturelles et guerriers d’exception, préparant le terrain pour les enjeux encore plus vastes des arcs suivants.</p>
            <h3>L’arc Fantasia</h3>
            <p>L’arc Fantasia suit les conséquences de l’Éclipse, où les mondes physique et astral se confondent, provoquant l’apparition massive de créatures magiques et d’esprits dans le monde réel, ce qui entraîne chaos et dangers surnaturels.</p>
            <p>Guts et ses compagnons poursuivent leur quête pour protéger Casca, encore fragile après ses traumatismes. Ils rencontrent Schierke, une jeune sorcière qui lui apprend à maîtriser l’Armure du Berserker et la magie astrale.</p>
            <p>De son côté, Griffith consolide son pouvoir politique et étend son empire, exploitant habilement forces humaines et surnaturelles pour réaliser ses ambitions.</p>
            <p>Cet arc explore la lutte pour la survie dans un monde où magie et esprit se mêlent, tandis que Guts affronte de nouvelles menaces pour protéger ses proches.</p>
            ";
        break;
    case 'Informations-wiki':
        echo 
        "<h1>Informations</h1>
        <h2>Kentaro Miura</h2>
        <p>Créateur et auteur du manga Berserk, Kentarō Miura est reconnu pour son travail exceptionnel dans le domaine du dark fantasy. Son œuvre, commencée en 1989, est saluée pour son dessin détaillé, sa narration complexe et ses thèmes profonds explorant la lutte, la destinée, et la nature humaine. Miura est malheureusement décédé en 2021, laissant Berserk inachevé, mais son influence continue de marquer le monde du manga et de la fantasy.</p>
        <h2>Les adaptations animées</h2>
        <ul>
            <li>Une série en 1997 qui couvre l’Arc de l’Âge d’Or, acclamée pour son ambiance sombre et sa fidélité à l’œuvre originale malgré des limitations techniques.</li>
            <li>Une trilogie de films (2012-2013) reprenant également l’Âge d’Or, avec des améliorations visuelles mais divisant les fans sur le style d’animation</li>
            <li>Une série animée (2016-2017) couvrant les arcs plus récents, notamment L’Âge d’Acier et Fantasia, avec une animation 3D controversée mais une expansion du récit.</li>
        </ul>
        <h2>Les jeux vidéo</h2>
        <p>Plusieurs jeux ont été développés, principalement dans les genres action et hack’n’slash, exploitant l’univers brutal et l’esthétique médiévale-fantastique de Berserk. Le plus connue d'entre eux : Berserk and the Band of the Hawk (2016), un jeu d’action musô basé sur la série, reprenant des personnages et arcs majeurs.</li>
        <h3>L’influence sur les jeux vidéo et la pop culture</h3>
        <p>Berserk a exercé une influence majeure sur la culture geek et vidéoludique, notamment sur la série Dark Souls de FromSoftware. Hidetaka Miyazaki, le créateur de Dark Souls, a souvent cité Berserk comme source d’inspiration.</p>";
        break;
    default:
        echo "<div class='content-box'><p>Section inconnue.</p></div>";
}
?>
