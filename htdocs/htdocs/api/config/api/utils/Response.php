<?php
function jsonResponse(array $d,int $c=200):void{http_response_code($c);header('Content-Type: application/json; charset=utf-8');echo json_encode($d,JSON_UNESCAPED_UNICODE);}
