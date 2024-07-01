let scale = 1;
let growing = true;
let animationFrameId;

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

const borrarParticipantes = () => {
    document.getElementById("ListaParticipantes").value = "";
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // limpia el canvas
    cancelAnimationFrame(animationFrameId); // Cancela cualquier animación en curso
    scale = 1; // Reinicia la escala
    growing = true; // Reinicia la dirección de la animación
};

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

    if (listaParticipantes.length <= numeroPremios) {
        alert("Error, el número de premios debe ser menor a la cantidad de participantes");
        return;
    }

    if (numeroPremios < 1 || isNaN(numeroPremios)) {
        alert("Error, número de premios debe ser mayor a cero");
        document.getElementById("Numeropremios").value = "";
        return;
    }
    realizarSorteo();
};
const dibujarEnCanvas = (titulo, ganadores) => {
    const canvas = document.getElementById("myCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas

    const canvasCenterX = canvas.width / 2;
    const canvasCenterY = canvas.height / 2;

    let scale = 1;
    let growing = true;

    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpia el canvas
        ctx.save(); // Guarda el estado actual del canvas

        // Ajusta la escala
        ctx.translate(canvasCenterX, canvasCenterY); // Traslada el contexto al centro del canvas
        ctx.scale(scale, scale); // Escala el contexto

        // Ajusta el tamaño del texto de acuerdo a la escala
        const fontSize = 30; // Tamaño base del texto
        ctx.font = `${fontSize}px Castoro Titling`;
        ctx.fillStyle = '#DE6449FF';



        // Dibuja el título en el centro
        if (titulo) {
            const textWidth = ctx.measureText(titulo).width;
            ctx.fillText(titulo, -textWidth / 2, -90);
        }
        // Texto adicional
        const textoAdicional = "Los ganadores son:";
        const textoAdicionalWidth = ctx.measureText(textoAdicional).width;
        ctx.fillText(textoAdicional, -textoAdicionalWidth / 2, -50);

        // Dibuja los ganadores en el centro
        ganadores.forEach((ganador, index) => {
            const textWidth = ctx.measureText(`${index + 1}. ${ganador}`).width;
            const lineHeight = 30; // Altura de línea
            const startY = 50 + index * (lineHeight + 10); // Espacio entre líneas ajustado

            ctx.fillText(`${index + 1}: ${ganador}`, -textWidth / 2, startY);
        });

        ctx.restore(); // Restaura el estado del canvas

        // Modifica la escala
        if (growing) {
            scale += 0.005; // Aumenta la escala lentamente
            if (scale >= 1.5) {
                growing = false;
            }
        } else {
            scale -= 0.005; // Reduce la escala lentamente
            if (scale <= 0.8) {
                growing = true;
            }
        }

        requestAnimationFrame(animate);
    };

    // Inicia la animación
    animate();
};

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

    for (let i = 0; i < listaParticipantes.length; i++) {
        if (listaParticipantes[i] === destinatarios[i]) {
            destinatarios = listaParticipantes
                .slice()
                .sort(() => Math.random() - 0.5);
            i = -1;
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
