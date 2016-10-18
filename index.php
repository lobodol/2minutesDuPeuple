<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">

    <title>Les 2 minutes du peuple</title>

    <link rel="stylesheet" type="text/css" href="web/css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.11.4/themes/smoothness/jquery-ui.css">
    <script src="//code.jquery.com/jquery-1.10.2.js"></script>
    <script src="//code.jquery.com/ui/1.11.4/jquery-ui.js"></script>
</head>
<body>
    <header>
        <div id="logo"></div>
        <a href="#recherche" id="loupe">
            <img src="web/images/search.svg"/>
        </a>

        <div id="recherche">
            <a href="#"></a>

            <input type="text" id="cherche" placeholder="Recherche rapide" />
            <img src="web/images/cross.svg" width="15" height="15" id="croix"/>

            <div id="results">
                <ul id="list-results"></ul>
            </div>
        </div>
    </header>

<?php

require_once 'autoload.php';
try {
    $repo = new EpisodeRepository();
    $episodes = $repo->getAll();
    
    echo "<ul id='listEpisodes'>";
    
    foreach ($episodes as $key => $episode) {
        echo "<li id='" . $key . "'";
        
        echo " attr-nb='{$episode->getFullEpisodeNr()}'";
        
        if ($key == 0) {
            echo ' class="active" ';
        }
        
        echo "><a href='" . $episode->getMp3() . "'><span>" . $episode->getTitre() . "</span>";
        
        if (!is_null($episode->getDetails())) {
            echo "<span class='details'>" . $episode->getDetails() . "</span>";
        }
        
        echo "</a></li>";
    }
    
    echo "</ul>";

} catch (Exception $e) {
    switch ($e->getCode()) {
        case 404:
            echo "erreur 404 not found";
            break;
            
        default:
            echo "erreur de ouf";
            break;
    }
    
    die();
}
?>

<div id="player">
    <div id="progressBar">
        <div id="currentTime" class="time">0:00</div>
        <div id="maxTime" class="time">0:00</div>
        <div id="duration"></div>
    </div>
    
    <div id="controls">
        <div id="prev">
            <div class="prev"></div><!--
            --><div class="prev"></div>
        </div>
        <div id="playpause" class="play"></div>
        <div id="next">
            <div class="next"></div><!--
            --><div class="next"></div>
        </div>
        <div id="loop"></div>
        <div id="shuffle"></div>
    </div>
</div>

<aside id="social-share">
    <a href="#social-share">
        <img alt="" src="web/images/share.svg" width="20" height="20" id="share-button">
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=www.firediy.fr" title="Partager sur Facebook" id="facebookButton" target="_blank"><!--
        --><img src="web/images/facebook.svg" width="30" height="30" /><!--
     --></a>
    <a href="https://twitter.com/home?status=www.firediy.fr" title="Partager sur Twitter" id="twitterButton" target="_blank"><!--
         --><img src="web/images/twitter.svg" width="30" height="30" /><!--
     --></a>
    <a href="https://plus.google.com/share?url=www.firediy.fr" title="Partager sur Google+" id="googleButton" target="_blank"><!--
         --><img src="web/images/google.svg" width="30" height="30" /><!--
     --></a>
</aside>

<div id="modale">
    <span>&#10005;</span>
    <span></span>
</div>

<script type="text/javascript" src="web/js/all.js"></script>

</body>
</html>

