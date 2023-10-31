//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Qué son las  TIC?",
        op0:"Es una red social",
        op1:"Es un lugar donde puedes encontrar información",
        op2:"Tecnologías de la información y la comunicación",
        correcta:"2"
    },
    {
        id:1,
        pregunta:"¿Qué significa las siglas ISO?",
        op0:"International Standardization International Organización",
        op1:"International Organization for Standardization",
        op2:"Organización International International Standardization",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿De que trata la norma iso 9001?",
        op0:"Gestión de la Calidad",
        op1:"Gestión Ambiental",
        op2:"Gestión de la Seguridad de la Información",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿Que es una red lan?",
        op0:"Red de área personal",
        op1:"Una red de área local",
        op2:"La red CAN o Red de Área de Campus",
        correcta:"1"
    },
    {
        id:4,
        pregunta:"¿Qué es una red informática?",
        op0:"Los dispositivos conectados a una red informática",
        op1:"Una red informática es un conjunto de dispositivos interconectados entre si",
        op2:"El medio es la conexión que hace posible que los dispositivos se relacionen entre si",
        correcta:"1"
    },
    {
        id:5,
        pregunta:"¿que cable trenzado no blindado se conoce como?",
        op0:"UDP",
        op1:"STP",
        op2:"UTP",
        correcta:"2"
    },
    {
        id:6,
        pregunta:"¿una ventajas de trabajar en redes es?",
        op0:"Transferir archivos entre equipos",
        op1:"Realizar trabajos en computadoras",
        op2:"Invertir en equipos de computo",
        correcta:"0"
    },
    {
        id:7,
        pregunta:"¿son las siglas del protocolo de transmision de datos por internet?",
        op0:"IP 192.168.2.1",
        op1:"TCP/IP",
        op2:"TCP",
        correcta:"1"
    },
    {
        id:8,
        pregunta:"¿El nivel de cobertura de una red depende de?",
        op0:"El número de puntos de acceso",
        op1:"La longitud del aire",
        op2:"Las aplicaciones instaladas",
        correcta:"0"
    },
    {
        id:9,
        pregunta:"¿algunos de los dispositivos inalámbricos que se manejan en la actualidad son?",
        op0:"Impresora, camara ip",
        op1:"altavoces, telefonos",
        op2:"todas son correctas",
        correcta:"2"
    }
]

//para guardar las respuestas elegidas
let respuestas = [];
//cantidad correctas
let cantiCorrectas = 0;
//pregunta acutal que debe ser cargada
let numPregunta = 0;

//Cargo una pregunta del JSON
function cargarPreguntas(){
    //tomo la pregunta actual de la bd
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

    //vamos a crear los tres labels
    //Lo vamos a hacer mediante una funciòn.
    // A dicha función le envio el numero de label y la opcion
    // el texto, de dicho label
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

    //agrego los labels al contendor de las opciones
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    //agrego las opciones al contenedor principal
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}

//creo la funciòn que que retornará el label con todo su contenido
function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}

//Mediante un for cargo todas las preguntas del JSON
for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    //actualizo el numero de pregunta actual
    numPregunta++;
}

//Función que carga la opción elegida en el arreglo respuestas.
function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}

//botón corregir
let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    //recorro el arreglo que tiene las respuestas y comparo
    for(i=0;i<bd_juego.length;i++){
        //cargo la pregunta
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    //desabilitamos todos los inputs
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    //hacemos un scroll hacia arriba
    window.scrollTo(0,0);
    //colocamos la cantidad que acertoy las que no acertó
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}
