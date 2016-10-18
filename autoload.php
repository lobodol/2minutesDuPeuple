<?php
/**
 * Class autoloader
 *
 * @param string $class_name : name of the required class
 */
function __autoload($class_name) {
    include "class/".$class_name . '.php';
}