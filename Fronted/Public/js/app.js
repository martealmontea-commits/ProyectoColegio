console.log("APP CONECTADA");

const form = document.getElementById('formCita');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    try {
        const datos = Object.fromEntries(new FormData(form));
        console.log("DATOS A ENVIAR:", datos);

        const respuesta = await fetch('/api/citas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        const texto = await respuesta.text();
        console.log("RESPUESTA:", texto);

        if (respuesta.ok) {
            alert("Éxito: " + texto);
            form.reset();
        } else {
            alert("Error: " + texto);
        }

    } catch (err) {
        console.log("ERROR FETCH:", err); // 👈 más simple que console.error
        alert("No se pudo conectar con el servidor");
    }
});