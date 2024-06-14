/**
 *
 */
const realizarSorteo = () => {
    const titulo = document.getElementById("IngresoDatos").value();
    const numeroPremios=parseInt(document.getElementById("Numeropremios").value);
    const listaParticipantes=document.getElementById("ListaParticipantes").value.trim().split('\n');

    if(isNaN(numeroPremios) || numeroPremios<=0){
        alert("Error, el número de premios debe ser mayor a cero");
        return
    }
    if (listaParticipantes.length<2){
        alert("Error, como mínimo 2 participantes");
        return;
    }

    const ganadores=[];
    const participantes=[...listaParticipantes];

    while(ganadores.length<numeroPremios){
        const indice=Math.floor(Math.random()*participantes.length);
        ganadores.push(participantes.splice(indice,1)[0]);
    }

    const canvas=document.getElementById("myCanvas");
    const ctx=canvas.getContext("2d");

    ctx.font="16px Arial";
    ctx.fillStyle="black";
    ctx.fillText(`Titulo: ${titulo}`,10,10);
    ctx.fillText("Ganadores: ",10,40);

    ganadores.forEach((ganador,index)=>{
        ctx.fillText(`${index+1}.${ganador}`,10,60+(index*20));
    });
};