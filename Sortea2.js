
/**
 * Realiza un sorteo entre los participantes ingresados y dibuja los ganadores en un canvas
 * @function realizarSorteo
 * @return {void}
 */
const realizarSorteo = () => {
    const titulo = document.getElementById('IngresoDatos').value; //obtiene el valor ingresado en la en el campo "IngresoDatos" y lo asigna titulo
    const numeroPremios = parseInt(document.getElementById('Numeropremios').value); //obtiene el valor ingresado en la en el campo "NumeroPremios", lo convierte a entero con parseInt() y lo asigna numeroPremios
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');//obtiene el valor ingresado en la en el campo "ListaParticipantes", borra los espacios en blanco del principio y del final con trim(), divide el texto en lineas con split("\n") y guarda cada linea como un elemento del arreglo listaParticipantes

    const ganadores = []; //arreglo que guardará el nombre de los ganadores
    const participantes = [...listaParticipantes]; //copia del arreglo listaParticipantes, para que no cambie el arreglo original cuando se hacen sorteos

    while (ganadores.length < numeroPremios) { //se hará hasta que se hayan seleccionado la cantidad de numeroPremios ganadores
        const indice = Math.floor(Math.random() * participantes.length); //genera un numero aleatorio entre 0 y participantes[] y lo guarda en indice
        ganadores.push(participantes.splice(indice, 1)[0]); //saca un elemento de participantes[] en el indice y lo elimina de participantes[], despues lo agrega a ganadores[]
    }
    dibujarEnCanvas(titulo, ganadores);
};

/**
 * Borra el contenido del campo Lista de Participantes
 * @function borrarParticipantes
 * @returns {void}
 */
const borrarParticipantes = () => {
    document.getElementById('ListaParticipantes').value = '';
};

/**
 * Comprueba que los valores ingresados sean correctos
 * @function comprobarValores
 * @returns {void}
 */
const comprobarValores = () => {
    const numeroPremios = parseInt(document.getElementById('Numeropremios').value); //obtiene el valor ingresado en la en el campo "NumeroPremios", lo convierte a entero con parseInt() y lo asigna numeroPremios
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');//obtiene el valor ingresado en la en el campo "ListaParticipantes", borra los espacios en blanco del principio y del final con trim(), divide el texto en lineas con split("\n") y guarda cada linea como un elemento del arreglo listaParticipantes

    if (listaParticipantes.length < 2) {
        alert('Error, mínimo de 2 participantes');
        return;
    }

    if (numeroPremios < 0 || isNaN(numeroPremios)) {
        alert("Error, número de premios debe ser mayor a cero");
        document.getElementById("Numeropremios").value = "";
        return;
    }
    realizarSorteo();
};

/**
 * Dibuja en el canvas
 * @function dibujarEnCanvas
 * @param {string} titulo - El título del sorteo
 * @param {array} ganadores - Lista de ganadores
 * @returns {void}
 */
const dibujarEnCanvas = (titulo, ganadores) => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas

    ctx.font = '16px Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(`Título: ${titulo}`, 10, 20);
    ctx.fillText('Ganadores:', 10, 40);

    ganadores.forEach((ganador, index) => { //recorre el arreglo ganadores, donde ganador es cada elemento del arreglo y indice es el indice actual del elemento
        ctx.fillText(`${index + 1}. ${ganador}`, 10, 60 + (index * 20)); //dibuja cada ganador en el canvas
    });
};

const realizarAmigoInvisible = () => {
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');

    if (listaParticipantes.length < 2) {
        alert('Error, mínimo de 2 participantes');
        return;
    }
    listaParticipantes.toLowerCase(); //Conversión a minúsculas
    const parti_que_regala = [listaParticipantes];
    const destinario = [];


    for (let i = 0; i < parti_que_regala.length; i++) {
        const indice = Math.floor(Math.random() * parti_que_regala.length);
        if (i != indice) {
            destinario.push(parti_que_regala[indice]);
        }
    }
    let destinatarioSeleccionado = '';
    const Nombre_ingresado=document.getElementById('IngresoDatos').value.trim();
    Nombre_ingresado.toLowerCase(); //Conversión a minúsculas
    for (let i=0;i<parti_que_regala.length;i++){
        if(Nombre_ingresado===parti_que_regala[i]){
            destinatarioSeleccionado=destinario[i];
            dibujarEnCanvas2(Nombre_ingresado,destinatarioSeleccionado)
        }
    }
    document.getElementById('sorteado').value=destinatarioSeleccionado;



};
const dibujarEnCanvas2 = (participante, destinatario) => {
    const canvas = document.getElementById('mycanvasInvisible');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas

    ctx.font = '16px Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(' ${participante}', 10, 20);
    ctx.fillText('&{destinatario}', 10, 40);
}