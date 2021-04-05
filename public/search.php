<?php

use App\Model\EpisodeRepository;

require_once '../vendor/autoload.php';

if (!empty($_POST['fulltext'])) {
    try {
        // Récupération des données
        $repo = new EpisodeRepository();
        $result = $repo->getFulltextDatas(clearString($_POST['fulltext']));

        // Mise en surbrillance des résultats
        $result = hightlightResult($result, $_POST['fulltext']);

        echo json_encode(utf8ize($result));
        returnHttpCode(200);

    } catch (Exception $e) {
        returnHttpCode($e->getCode());
    }
}

returnHttpCode(400);

/**
 * Highlights the part of text matching with fulltext research term
 *
 * @param array  $result
 * @param string $fulltext : term of research
 * @return array
 */
function hightlightResult($result, $fulltext)
{
    foreach ($result as $key => $value) {
        $titre = utf8ize($value['titre']);

        // Mise en surbrillance du titre
        if (stripos($titre, clearString($fulltext)) !== FALSE) {
            $pattern = "#(.*)(" . clearString($fulltext) . ")(.*)#i";
            $result[$key]['titre'] = preg_replace($pattern, "$1<span class='highlight'>$2</span>$3", $titre);

        } elseif (stripos($titre, $fulltext) !== FALSE) {
            $pattern = "#(.*)(" . $fulltext . ")(.*)#i";
            $result[$key]['titre'] = preg_replace($pattern, "$1<span class='highlight'>$2</span>$3", $titre);

        } else {
            $result[$key]['titre'] = $titre;
        }

        // Mise en surbrillance du details
        if (!empty($value['details']) && stripos(utf8ize($value['details']), clearString($fulltext)) !== FALSE) {
            $pattern = "#(.*)(" . clearString($fulltext) . ")(.*)#i";
            $result[$key]['details'] = preg_replace($pattern, "$1<span class='highlight'>$2</span>$3", utf8ize($value['details']));

        } elseif (!empty($value['details']) && stripos(utf8ize($value['details']), $fulltext) !== FALSE) {
            $pattern = "#(.*)(" . $fulltext . ")(.*)#i";
            $result[$key]['details'] = preg_replace($pattern, "$1<span class='highlight'>$2</span>$3", utf8ize($value['details']));
        }

        // Mise en surbrillance des mots-clés
        if (!empty($value['keywords'])) {
            $keywords = explode("\n", $value['keywords']);

            foreach ($keywords as $string) {
                $string = utf8ize($string);

                if (stripos($string, clearString($fulltext)) !== FALSE) {
                    $pattern = "#(.*)(" . clearString($fulltext) . ")(.*)#i";
                    $result[$key]['keywords'] = '"' . preg_replace($pattern, "...$1<span class='highlight'>$2</span>$3...", $string) . '"';

                    break;
                } elseif (stripos($string, $fulltext) !== FALSE) {
                    $pattern = "#(.*)(" . $fulltext . ")(.*)#i";
                    $result[$key]['keywords'] = '"' . preg_replace($pattern, "...$1<span class='highlight'>$2</span>$3...", $string) . '"';

                    break;
                } else {
                    $result[$key]['keywords'] = "";
                }
            }
        }
    }

    return $result;
}


/**
 * Returns HTTP code
 *
 * @param integer $code
 * @throws Exception
 */
function returnHttpCode($code)
{
    if (!preg_match("#^[0-9]+$#", $code)) {
        throw new Exception("Bad parameter", 400);
    }

    header("HTTP/1.0 $code");
    exit();
}

/**
 * UTF-8 encodes an array or a String
 *
 * @param array|string
 * @return array
 */
function utf8ize($d)
{
    if (is_array($d)) {
        foreach ($d as $k => $v) {
            $d[$k] = utf8ize($v);
        }
    } else if (is_string ($d)) {
        return utf8_encode($d);
    }

    return $d;
}

/**
 * Replaces accents in a string
 *
 * @param string $str
 * @param string $charset (default utf-8)
 * @return string
 */
function removeAccents($str, $charset='utf-8')
{
    $str = htmlentities($str, ENT_NOQUOTES, $charset);
    
    $str = preg_replace('#&([A-za-z])(?:acute|cedil|caron|circ|grave|orn|ring|slash|th|tilde|uml);#', '\1', $str);
    $str = preg_replace('#&([A-za-z]{2})(?:lig);#', '\1', $str); // pour les ligatures e.g. '&oelig;'
    $str = preg_replace('#&[^;]+;#', '', $str); // supprime les autres caractères
    
    return $str;
}

/**
 * Clears a string removing accents, whitespaces and encoding it in UTF-8
 *
 * @param string $str
 * @return string
 */
function clearString($str)
{
    if (!is_string($str)) {
        return $str;
    }

    return utf8ize(trim(removeAccents($str)));
}