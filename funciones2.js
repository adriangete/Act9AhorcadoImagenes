var nimagen;
var guiones;
var letra= document.getElementById('letraBuscar');
var aciertos= document.getElementById('aciertos');
var fallos= document.getElementById('fallos');
var encontrarGuiones;
var anteriores ="";
var palabras = new Array();
aciertos.addEventListener('blur', crearGuiones, false);
letra.addEventListener('keyup', buscarCaracter, false);

 // Leer ficheros del directorio seleccioando
 function SeleccionImagenes(evt) {
                       
    var files = evt.target.files; // FileList object
   
    // Bucle que recorre las imagenes obtenidos de la carpeta seleccionada.
    var columnas = 0;
    for (var i = 0, f; f = files[i]; i++) {
        console.log(files.length);

        // Si f no es de type image , no continua y vuelve al inicio del bucle(continue)
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Function(Clousure) que obtiene la información de cada archivo. la funcion 
        // se ejecuta al cargar (load) cada unop de los archivos seleccionadso
        
        reader.onload = (function (ElFichero) {
            return function (e) {
                // Render thumbnail.
               
              
                //ElFichero.name contiene el nombre de los ficheros seleccionados
                // e.target.result contiene el Data de la imagen,que asigándo el mismo
                // a la prpiedad src de un elemento html img, sevisualiza en el mismo
                var cadena = escape(ElFichero.name);
                var ppunto = cadena.indexOf(".");
                nimagen = cadena.substring(0, ppunto)
                //  Creamos la 
                imm = document.createElement("img");
                imm.src = e.target.result;
                imm.alt = ElFichero.name;//Podemos guardar el nombre de la imagen  a adivinar 
                                         //en esta propiedad alt
                /*if (i<files.length){
                    files[i]=nimagen;
                }else if (i==files.length-1){

                }*/
                imm.title = nimagen;
                imm.addEventListener("click",sacarNombre,false);

                /*if (imm.onclick){
                    console.log(imm.src);
                }*/
                // Programamos en  evento clic sobre la imagen para jugar con ella
                imm.onclick = copiaPalabra;
                
                    document.getElementById('contenedorImagen').insertBefore(imm, null);
                }
                
            
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

document.getElementById('files').addEventListener('change', SeleccionImagenes, false);

function sacarNombre(){
    console.log(imm.title);
}

function copiaPalabra() {
//   Gestionar la palabra a adivinar obtendia de la palabra pulsada
crearGuiones();
buscarCaracter();
}
function crearGuiones(){
guiones=nimagen;
guiones=guiones.replace(/[a-z]/gi,"-");
aciertos=guiones;
document.getElementById('aciertos').value=aciertos;
}

function buscarCaracter(){
if(letra==""){
    return;
}
var palabraA =nimagen.toUpperCase();
//console.log(palabraA);
var caracterBuscar=letra.value.toUpperCase();
var posicion=palabraA.indexOf(caracterBuscar,0);
var es_acierto=false;

while(posicion > -1 & caracterBuscar!=""){
    guiones=guiones.substring(0,posicion) 
    +caracterBuscar 
    +guiones.substr(posicion+1,guiones.length);

    aciertos=guiones;

    console.log(aciertos);

    posicion= palabraA.indexOf(caracterBuscar,posicion +1);
    console.log(posicion);
    es_acierto=true;
}

if(es_acierto==false){
    anteriores=anteriores+caracterBuscar;
    fallos.innerHTML =anteriores;
// fallos.innerHTML =fallos.innerHTML+caracterBuscar;
}
encontrarGuiones=guiones.indexOf("-",0);

if (encontrarGuiones>-1){
        
}else{
    victoria();
}
document.getElementById('aciertos').value=aciertos;
letra.value="";
}

function victoria(){
alert("HAS GANADO!!!");
letra.value="";
guiones.value="";
aciertos.value="";
fallos.value="";
fallos.innerHTML = "";
}