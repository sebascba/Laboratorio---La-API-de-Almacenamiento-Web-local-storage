let gastos = [];

const Descripcion = document.querySelector('#descripcion');
const Monto = document.querySelector('#monto');
const Categoria = document.querySelector('#categoria');
const btnAgregar = document.querySelector('#btnAgregar');

const totalHoy = document.querySelector('#totalHoy');
const totalMes = document.querySelector('#totalMes');
const totalesCategoria = document.querySelector('#totalesCategoria');
const listaGastos = document.querySelector('#listaGastos');

function agregarGasto(){
    const descripcionDada = Descripcion.value.trim();  
    const montoDado= Number(Monto.value);
    const categoriaDada = Categoria.value;

if (descripcionDada === "" || isNaN(montoDado) || montoDado <= 0) {
        alert("Por favor valida que no hay campos vacios y/o que el monto sea menor a cero");
        return;
    }


const gastoNuevo = {
        descripcion: descripcionDada,
        monto: montoDado,
        categoria: categoriaDada,
        fecha: new Date().toISOString()  
    };

    gastos.push(gastoNuevo);

    Descripcion.value = "";
    Monto.value = "";
    Categoria.value = "";

    localStorage.setItem("gastos", JSON.stringify(gastos));
     renderizarGastos()
}
    function renderizarGastos() {
    ListaGastos.innerHTML = "";
    
    gastos.forEach(gasto => {
        const gastoDiv = document.createElement('div');
        const fechaHoy = new Date(gasto.fecha).toLocaleString();

        gastoDiv.innerHTML = `
            <div>
                <p>${gasto.descripcion}</p>
                <p>${gasto.monto}</p>
                <p>(${gasto.categoria})</p>
                <p>${fechaHoy}</p>
            </div>
        `;

        ListaGastos.appendChild(gastoDiv);
    });
}

btnAgregar.addEventListener('click', agregarGasto);