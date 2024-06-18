/**
 * Realiza un sorteo entre los participantes ingresados y dibuja los ganadores en un canvas
 * @function realizarSorteo
 */

const realizarSorteo = () => {
    const titulo = document.getElementById("IngresoDatos").value;

    const numeroPremios = parseInt(
        document.getElementById("Numeropremios").value
    );
    const listaParticipantes = document
        .getElementById("ListaParticipantes")
        .value.trim()
        .split("\n");

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
    document.getElementById("ListaParticipantes").value = "";
};

/**
 * Comprueba que los valores ingresados sean correctos
 * @function comprobarValores
 */
const comprobarValores = () => {
    const numeroPremios = parseInt(
        document.getElementById("Numeropremios").value
    );
    const listaParticipantes = document
        .getElementById("ListaParticipantes")
        .value.trim()
        .split("\n");


    if (listaParticipantes.length < 2) {
        alert("Error, mínimo de 2 participantes");
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
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); //limpia el canvas

    ctx.font = "16px Calibri";
    ctx.fillStyle = "black";
    ctx.fillText(`Título: ${titulo}`, 10, 20);
    ctx.fillText("Ganadores:", 10, 40);

    ganadores.forEach((ganador, index) => {
        ctx.fillText(`${index + 1}. ${ganador}`, 10, 60 + index * 20);
    });
};
/**
 * realiza sorteo del amigo invisible
 * @function realizarAmigoInvisible
 * @param destinatarios {array} - participantes sorteados
 *@param listaParticipantes {string}
 */
const realizarAmigoInvisible = () => {
    const listaParticipantes = document
        .getElementById("ListaParticipantes")
        .value.trim()
        .toLowerCase()
        .split("\n");

    errores(listaParticipantes);
    let destinatarios = listaParticipantes
        .slice()
        .sort(() => Math.random() - 0.5);

    // Asegurarse de que ningún participante se regale a sí mismo
    for (let i = 0; i < listaParticipantes.length; i++) {
        if (listaParticipantes[i] === destinatarios[i]) {
            destinatarios = listaParticipantes
                .slice()
                .sort(() => Math.random() - 0.5);
            i = -1; // Reiniciar el chequeo
        }
    }

    const nombreIngresado = document
        .getElementById("Ingresonombre")
        .value.trim()
        .toLowerCase();

    const indexParticipante = listaParticipantes.findIndex(
        (participante) => participante === nombreIngresado
    );
    if (indexParticipante !== -1) {
        const destinatario = destinatarios[indexParticipante];
        document.getElementById(
            "resultado"
        ).innerText = `regala a: ${destinatario}`;
    } else {
        document.getElementById(
            "resultado"
        ).innerText = `No se encontró a ${nombreIngresado} en la lista de participantes.`;
    }
};
/**
 * Función para verificar errores en la lista de participantes.
 * Muestra una alerta si la lista no cumple con los requisitos mínimos.
 * @param listaParticipantes {Array} - Lista de participantes a verificar.
 */
const errores = (listaParticipantes) => {
    if (listaParticipantes.length < 3) {
        alert("Error, mínimo de 3 participantes");
        return;
    }
    if (listaParticipantes === '') {
        alert("Error, mínimo de 3 participantes");
        return;
    }
};


/**
 * Función para manejar el envío del formulario de preguntas y contacto.
 * Verifica que los campos de consulta y correo electrónico estén llenos antes de enviar el formulario.
 * Muestra una alerta si alguno de los campos está vacío.
 * @param {Event} event - El evento de envío del formulario.
 */
const manejarEnvioFormulario = (event) => {
    event.preventDefault();

    const consulta = document.getElementById('IngresoDatos').value.trim();
    const correo = document.getElementById('Ingresomail').value.trim();

    if (consulta === '' || correo === '') {
        alert('Por favor, complete todos los campos antes de enviar.');
        return;
    }

    event.target.submit();
};
