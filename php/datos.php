<?php
    $json = file_get_contents('php://input');
    $datos = json_decode($json, false);

    $cabecera = getallheaders();
    if(isset($cabecera["tipo"])){
        if($cabecera["tipo"] == "preguntas"){
            $preguntas = file("../datos/preguntas.json");
            foreach($preguntas as $pregunta){
                print $pregunta;
            }
        }else if($cabecera["tipo"] == "usuarioNuevo"){
            $fichero = fopen("../datos/usuarios.json","r+");
            fseek($fichero, -2, SEEK_END);
            fwrite($fichero,",\n{\n".$datos."}\n]");
            fclose($fichero);
        }else if($cabecera["tipo"] == "usuarios"){
            $fichero = file("../datos/usuarios.json");
            foreach($fichero as $usuarios){
                print $usuarios;
            }
            // print json_encode($fichero);
        }
    }

    /* $fichero = fopen("../datos/usuarios.json","r+");
    fseek($fichero, -2, SEEK_END);
    fwrite($fichero,",\n{\n".$datos."}\n]");
    fclose($fichero); */
?>