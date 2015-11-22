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
require_once 'php/Controller/REST/Event.php';

// LDAP API

// Repositories
require_once 'php/Repositories/UserRepository.php';
require_once 'php/Repositories/EventRepository.php';

// View
require_once 'php/Classes/View.php';

// Merge $_GET and $_POST
$request = $_GET;
$request['type'] = $_SERVER['REQUEST_METHOD'];

if($_SERVER['REQUEST_METHOD'] == 'PUT' || $_SERVER['REQUEST_METHOD'] == 'DELETE') {
  parse_str(file_get_contents("php://input"), $post_vars);
} else {
  $post_vars = $_POST;
}

$request['data'] = $post_vars;

$request['path'] = explode("/", substr(@$_SERVER['PATH_INFO'], 1));

// Create Controller and print content
echo Router::getController($request)->display();


?>
