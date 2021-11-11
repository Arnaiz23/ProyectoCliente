<?php
    $json = file_get_contents('php://input');
    $datos = json_decode($json, false);
    $fichero = fopen("../datos/usuarios.json","r+");
    fseek($fichero, -2, SEEK_END);
    fwrite($fichero,",\n{\n".$datos."}\n]");
    fclose($fichero);
?>