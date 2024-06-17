
/**
 * Realiza un sorteo entre los participantes ingresados y dibuja los ganadores en un canvas
 * @function realizarSorteo
 */
const realizarSorteo = () => {
    const titulo = document.getElementById('IngresoDatos').value;
    const numeroPremios = parseInt(document.getElementById('Numeropremios').value);
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');

    const ganadores = [];
    const participantes = [...listaParticipantes];

    while (ganadores.length < numeroPremios) {
        const indice = Math.floor(Math.random() * participantes.length);
        ganadores.push(participantes.splice(indice, 1)[0]);
    }
    dibujarEnCanvas(titulo, ganadores);
};

/**
 * Borra el contenido del campo Lista de Participantes
 * @function borrarParticipantes
 */
const borrarParticipantes = () => {
    document.getElementById('ListaParticipantes').value = '';
};

/**
 * Comprueba que los valores ingresados sean correctos
 * @function comprobarValores
 */
const comprobarValores = () => {
    const numeroPremios = parseInt(document.getElementById('Numeropremios').value);
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');

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
 * @param titulo {string} - El título del sorteo
 * @param ganadores {array} - Lista de ganadores
 */
const dibujarEnCanvas = (titulo, ganadores) => {
    const canvas = document.getElementById('myCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas

    ctx.font = '16px Calibri';
    ctx.fillStyle = 'black';
    ctx.fillText(`Título: ${titulo}`, 10, 20);
    ctx.fillText('Ganadores:', 10, 40);

    ganadores.forEach((ganador, index) => {
        ctx.fillText(`${index + 1}. ${ganador}`, 10, 60 + (index * 20));
    });
};

const realizarAmigoInvisible = () => {
    const listaParticipantes = document.getElementById('ListaParticipantes').value.trim().split('\n');

    if (listaParticipantes.length < 2) {
        alert('Error, mínimo de 2 participantes');
        return;
    }
    listaParticipantes.toLowerCase();
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