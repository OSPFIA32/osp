<?php

error_reporting(E_ALL);
ini_set("display_errors", 1);

// Credentials


// Connection
require_once 'php/Classes/Connection.php';

// Router
require_once 'php/Classes/Router.php';

// Controller
require_once 'php/Controller/Login.php';
require_once 'php/Controller/Events.php';
require_once 'php/Controller/Default.php';

// REST API
require_once 'php/Controller/REST/User.php';

// LDAP API

// Repositories
require_once 'php/Repositories/UserRepository.php';

// View
require_once 'php/Classes/View.php';

// Merge $_GET and $_POST
$request = array_merge($_GET, $_POST);
// Create Controller and print content
echo Router::getController($request)->display();




?>
