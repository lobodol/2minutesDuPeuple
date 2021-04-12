<?php
    require_once '../vendor/autoload.php';
    $asset = new \App\AssetLoader\AssetLoader();
    $encoreLinkTags = new \App\AssetLoader\EncoreEntryLinkTags();
    $encoreScriptTags = new \App\AssetLoader\EncoreEntryScriptTags();
?><!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, user-scalable=no">
    <meta name="description" content="Le player du peuple, le meilleur moyen d'écouter et de rechercher un épisode des 2 minutes du peuple de François Pérusse !">
    <meta name="rating" content="safe for kids">

    <meta property="og:type" content="music.playlist">
    <meta property="og:title" content="Les 2 minutes du peuple">
    <meta property="og:url" content="https://www.les2minutesdupeuple.ml">
    <meta property="og:image" content="https://www.les2minutesdupeuple.ml<?php $asset('build/images/miniature.jpg')?>">
    <meta property="og:description" content="Le player du peuple, le meilleur moyen d'écouter et de rechercher un épisode des 2 minutes du peuple de François Pérusse !">
    <meta property="og:audio" content="https://www.les2minutesdupeuple.ml">

    <title>Les 2 minutes du peuple</title>

    <?php $encoreLinkTags(); ?>
    <link href='https://fonts.googleapis.com/css?family=Open+Sans' rel='stylesheet' type='text/css'>
</head>
<body>
    <header>
        <div id="logo"></div>
        <a href="#recherche" id="loupe">
            <img src="<?php $asset('build/images/search.svg')?>" alt="Search"/>
        </a>

        <div id="recherche">
            <a href="#"></a>

            <input type="text" id="cherche" placeholder="Recherche rapide" />
            <img src="<?php $asset('build/images/cross.svg')?>" width="15" height="15" id="croix" alt="Close"/>

            <div id="results">
                <ul id="list-results"></ul>
            </div>
        </div>
    </header>

<?php

try {
    $repo = new App\Model\EpisodeRepository();
    /** @var App\Model\Episode[] $episodes */
    $episodes = $repo->getAll();

    echo "<ul id='listEpisodes'>";

    foreach ($episodes as $key => $episode) {
        echo "<li id='" . $key . "'";

        echo " data-nb='{$episode->getFullEpisodeNr()}'";

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
        <img alt="Social share buttons" src="<?php $asset('build/images/share.svg')?>" width="20" height="20" id="share-button">
    </a>
    <a href="https://www.facebook.com/sharer/sharer.php?u=www.les2minutesdupeuple.tk" title="Partager sur Facebook" id="facebookButton" target="_blank" rel="noreferrer noopener"><!--
        --><img src="<?php $asset('build/images/facebook.svg')?>" width="30" height="30" alt="Partager sur Facebook"/><!--
     --></a>
    <a href="https://twitter.com/home?status=www.les2minutesdupeuple.tk" title="Partager sur Twitter" id="twitterButton" target="_blank" rel="noreferrer noopener"><!--
         --><img src="<?php $asset('build/images/twitter.svg')?>" width="30" height="30" alt="Partager sur Twitter"/><!--
     --></a>
</aside>

<div id="modale">
    <span>&#10005;</span>
    <span></span>
</div>
<?php $encoreScriptTags(); ?>
</body>
</html>

