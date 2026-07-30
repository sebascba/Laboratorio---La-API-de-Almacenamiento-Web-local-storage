let gastos = [];

const Descripcion = document.querySelector('#descripcion');
const Monto = document.querySelector('#monto');
const Categoria = document.querySelector('#categoria');
const btnAgregar = document.querySelector('#btnAgregar');

const totalHoy = document.querySelector('#totalHoy');
const totalMes = document.querySelector('#totalMes');
const totalesCategoria = document.querySelector('#totalesCategoria');
const listaGastos = document.querySelector('#listaGastos');

function agregarGasto() {
    const descripcionDada = Descripcion.value.trim();  
    const montoDado = Number(Monto.value);
    const categoriaDada = Categoria.value;

    if (descripcionDada === "" || isNaN(montoDado) || montoDado <= 0) {
        alert("Por favor valida que no hay campos vacios y/o que el monto sea menor a cero");
        return;
    }

    const gastoNuevo = {
        id: Date.now(),
        descripcion: descripcionDada,
        monto: montoDado,
        categoria: categoriaDada,
        fecha: new Date().toISOString()  
    };

    gastos.push(gastoNuevo);

    Descripcion.value = "";
    Monto.value = "";
    Categoria.value = "Comida";

    guardarYActualizar();
}

function renderizarGastos() {
    listaGastos.innerHTML = "";
    
    if (gastos.length === 0) {
        listaGastos.innerHTML = "<p>No hay gastos registrados.</p>";
        return;
    }

    gastos.forEach(gasto => {
        const gastoDiv = document.createElement('div');
        const fechaLegible = new Date(gasto.fecha).toLocaleString();

        gastoDiv.innerHTML = `
            <div>
                <p><strong>${gasto.descripcion}</strong></p>
                <p>$${gasto.monto}</p>
                <p>(${gasto.categoria})</p>
                <p><small>${fechaLegible}</small></p>
                <button onclick="eliminarGasto(${gasto.id})">Eliminar</button>
            </div>
        `;

        listaGastos.appendChild(gastoDiv);
    });
}

function esDeHoy(gasto) {
    const fechaGasto = new Date(gasto.fecha);
    const hoy = new Date();

    return (
        fechaGasto.getDate() === hoy.getDate() &&
        fechaGasto.getMonth() === hoy.getMonth() &&
        fechaGasto.getFullYear() === hoy.getFullYear()
    );
}

function esDeEsteMes(gasto) {
    const fechaGasto = new Date(gasto.fecha);
    const hoy = new Date();

    return (
        fechaGasto.getMonth() === hoy.getMonth() &&
        fechaGasto.getFullYear() === hoy.getFullYear()
    );
}

function calcularTotales() {
    const gastosDeHoy = gastos.filter(esDeHoy);
    const gastosDelMes = gastos.filter(esDeEsteMes);

    const sumaHoy = gastosDeHoy.reduce((total, gasto) => total + gasto.monto, 0);
    const sumaMes = gastosDelMes.reduce((total, gasto) => total + gasto.monto, 0);

    totalHoy.textContent = `Total de hoy: $${sumaHoy}`;
    totalMes.textContent = `Total del mes: $${sumaMes}`;

    const categoriasFijas = ["Comida", "Transporte", "Entretenimiento", "Servicios", "Otros"];
    
    let htmlCategorias = `<p><strong>Por Categoría:</strong></p>`;

    categoriasFijas.forEach(cat => {
        const gastosDeLaCategoria = gastos.filter(gasto => gasto.categoria === cat);
        const sumaCat = gastosDeLaCategoria.reduce((total, gasto) => total + gasto.monto, 0);
        htmlCategorias += `<p>${cat}: $${sumaCat}</p>`;
    });

    totalesCategoria.innerHTML = htmlCategorias;
}

function guardarYActualizar() {
    localStorage.setItem("gastos", JSON.stringify(gastos));
    renderizarGastos();
    calcularTotales();
}

function eliminarGasto(id) {
    gastos = gastos.filter(gasto => gasto.id !== id);
    guardarYActualizar();
}

window.addEventListener('DOMContentLoaded', () => {
    const gastosGuardados = localStorage.getItem("gastos");
    if (gastosGuardados) {
        gastos = JSON.parse(gastosGuardados);
        renderizarGastos();
        calcularTotales();
    }
});

btnAgregar.addEventListener('click', agregarGasto);