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
        }else if($cabecera["tipo"] == "deleteusuario"){
            $fichero = fopen("../datos/usuarios.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            /* fwrite($fichero,"[\n");
            foreach($datos as $valor){
                fwrite($fichero,json_encode($valor).",");
            }
            fwrite($fichero,"\n]"); */
            fclose($fichero);
        }else if($cabecera["tipo"] == "usuarioModificar"){
            $fichero = fopen("../datos/usuarios.json","w");
            fwrite($fichero,json_encode($datos));
            print "Modificado";
            /* fwrite($fichero,"[\n");
            foreach($datos as $valor){
                fwrite($fichero,json_encode($valor).",");
            }
            fwrite($fichero,"\n]"); */
            fclose($fichero);
        }else if($cabecera["tipo"] == "futbol"){
            $futbol = file("../datos/futbol.json");
            foreach($futbol as $producto){
                print $producto;
            }
            // print json_encode($futbol);
        }else if($cabecera["tipo"] == "baloncesto"){
            $baloncesto = file("../datos/baloncesto.json");
            foreach($baloncesto as $producto){
                print $producto;
            }
        }else if($cabecera["tipo"] == "voleibol"){
            $voleibol = file("../datos/voleibol.json");
            foreach($voleibol as $producto){
                print $producto;
            }
        }else if($cabecera["tipo"] == "running"){
            $running = file("../datos/running.json");
            foreach($running as $producto){
                print $producto;
            }
        }else if($cabecera["tipo"] == "todos"){
            $array[] = file("../datos/futbol.json");
            $array[] = file("../datos/baloncesto.json");
            $array[] = file("../datos/voleibol.json");
            $array[] = file("../datos/running.json");
            foreach($array as $producto){
                print $producto;
            }
            // print json_encode($futbol);
        }else if($cabecera["tipo"] == "modificarfutbol"){
            // print $datos;
            $fichero = fopen("../datos/futbol.json","w");
            fwrite($fichero,json_encode($datos));
            print "Modificado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "modificarbaloncesto"){
            // print $datos;
            $fichero = fopen("../datos/baloncesto.json","w");
            fwrite($fichero,json_encode($datos));
            print "Modificado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "modificarvoleibol"){
            // print $datos;
            $fichero = fopen("../datos/voleibol.json","w");
            fwrite($fichero,json_encode($datos));
            print "Modificado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "modificarrunning"){
            // print $datos;
            $fichero = fopen("../datos/running.json","w");
            fwrite($fichero,json_encode($datos));
            print "Modificado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "deletefutbol"){
            // print $datos;
            $fichero = fopen("../datos/futbol.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "deletebaloncesto"){
            // print $datos;
            $fichero = fopen("../datos/baloncesto.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "deletevoleibol"){
            // print $datos;
            $fichero = fopen("../datos/voleibol.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "deleterunning"){
            // print $datos;
            $fichero = fopen("../datos/running.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "futboladd"){
            // print $datos;
            $futbol = fopen("../datos/futbol.json","r+");
            fseek($futbol, -2, SEEK_END);
            fwrite($futbol,",\n{\n".$datos."}\n]");
            fclose($futbol);
        }else if($cabecera["tipo"] == "baloncestoadd"){
            // print $datos;
            $baloncesto = fopen("../datos/baloncesto.json","r+");
            fseek($baloncesto, -2, SEEK_END);
            fwrite($baloncesto,",\n{\n".$datos."}\n]");
            fclose($baloncesto);
        }else if($cabecera["tipo"] == "voleiboladd"){
            // print $datos;
            $voleibol = fopen("../datos/voleibol.json","r+");
            fseek($voleibol, -2, SEEK_END);
            fwrite($voleibol,",\n{\n".$datos."}\n]");
            fclose($voleibol);
        }else if($cabecera["tipo"] == "runningadd"){
            // print $datos;
            $running = fopen("../datos/running.json","r+");
            fseek($running, -2, SEEK_END);
            fwrite($running,",\n{\n".$datos."}\n]");
            fclose($running);
        }else if($cabecera["tipo"] == "preguntaadd"){
            // print $datos;
            $preguntas = fopen("../datos/preguntas.json","r+");
            fseek($preguntas, -2, SEEK_END);
            fwrite($preguntas,",\n{\n".$datos."}\n]");
            fclose($preguntas);
            print "OK";
        }else if($cabecera["tipo"] == "deletepregunta"){
            $fichero = fopen("../datos/preguntas.json","w");
            fwrite($fichero,json_encode($datos));
            print "Eliminado";
            fclose($fichero);
        }else if($cabecera["tipo"] == "direccionadd"){
            $listausuarios = file("../datos/usuarios.json");
            // print json_encode($usuarios);
            foreach($listausuarios as $usuarios){
                print $usuarios;
            }
        }
    }

    /* $fichero = fopen("../datos/usuarios.json","r+");
    fseek($fichero, -2, SEEK_END);
    fwrite($fichero,",\n{\n".$datos."}\n]");
    fclose($fichero); */
?>