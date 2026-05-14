console.log("ADMIN JS CARGADO");
async function guardarFormulario(event) {
    console.log("BOTON FUNCIONA");
    event.preventDefault();

    // Datos del niño
    const nino = {
        nombre: document.getElementById("nombreNino").value,
        apellido: document.getElementById("Apellido").value,
        edad: document.getElementById("edad").value,
        sexo: document.querySelector('input[name="sexo"]:checked')?.value,
        lugar_de_nacimiento: document.getElementById("Lugar").value,
        nacionalidad: document.getElementById("nacionalidad").value,
        mensualidad: document.getElementById("mensualidad").value,
        ha_asistido_a_otro_centro: document.querySelector('input[name="asistencia"]:checked')?.value,
        grado: document.getElementById("grado").value,
        tanda: document.getElementById("tanda").value,
        motivacion: document.getElementById("motivacion").value
    };

    // Datos del padre
    const cliente = {
        nombre: document.getElementById("nombrePadre").value,
        telefono: document.getElementById("telefono").value,
        correo: document.getElementById("correo").value,
        cedula: document.getElementById("cedula").value,
        fecha_nacimiento: document.getElementById("fecha_nacimiento").value,
        ocupacion: document.getElementById("ocupacion").value,
        lugar_trabajo: document.getElementById("lugar_trabajo").value,
        telefono_laboral: document.getElementById("telefono_laboral").value,
        estado: document.getElementById("estado").value
    };

    // Embarazo
    const embarazo = {
        semanas_gestacion: document.getElementById("semanas_gestacion").value,
        tipo_parto: document.querySelector('input[name="tipo_parto"]:checked')?.value
    };

    // Hábitos
    const habitos = {
        hora_despierta: document.getElementById("hora_despierta").value,
        hora_duerme: document.getElementById("hora_duerme").value,
        se_despierta_noche: document.getElementById("se_despierta_noche").value,
        toma_siesta: document.getElementById("toma_siesta").value,
        comparte_habitacion: document.getElementById("comparte_habitacion").value,
        con_quien: document.getElementById("con_quien").value,
        juguete_favorito: document.getElementById("juguete_favorito").value
    };

    // Salud
    const salud = {
        problemas_respiratorios: document.getElementById("problemas_respiratorios").value,
        condiciones_especiales: document.getElementById("condiciones_especiales").value,
        usa_lentes: document.getElementById("usa_lentes").value,
        ha_convulsionado: document.getElementById("ha_convulsionado").value,
        edad_camino: document.getElementById("edad_camino").value,
        edad_hablo: document.getElementById("edad_hablo").value,
        dificultad_habla: document.getElementById("dificultad_habla").value,
        enfermedades: document.getElementById("enfermedades").value,
        alergias: document.getElementById("alergias").value,
        medicamentos: document.getElementById("medicamentos").value,
        motivo_medicamentos: document.getElementById("motivo_medicamentos").value,
        controla_esfinteres: document.getElementById("controla_esfinteres").value
    };

    const datosFormulario = {
        cliente,
        nino,
        embarazo,
        habitos,
        salud
    };

    try {

        const respuesta = await fetch("http://localhost:4000/api/admin", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(datosFormulario)

        });

        const resultado = await respuesta.text();

        alert(resultado);

    } catch (error) {

        console.log(error);
        alert("Ocurrió un error");

    }

}