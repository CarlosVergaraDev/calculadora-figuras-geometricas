// Esperamos a que todo el contenido del HTML esté cargado antes de ejecutar el script.
document.addEventListener('DOMContentLoaded', function () {

  // El objeto de configuración de figuras permanece igual.
  const FIGURAS = {

    triangulo: {  
      nombre: "Triángulo Escaleno",
      area: {
        campos: ['Lado A', 'Lado B', 'Lado C'],
        calcular: (a, b, c) => {
        const s = (a + b + c) / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
        }
      },
      perimetro: {
        campos: ['Lado A', 'Lado B', 'Lado C'],
        calcular: (a, b, c) => a + b + c
      }
    },

    rectangulo: {
      nombre: "Rectángulo",
      area: {
        campos: ['Base', 'Altura'],
        calcular: (base, altura) => base * altura
      },
      perimetro: {
        campos: ['Base', 'Altura'],
        calcular: (base, altura) => 2 * (base + altura)
      }
    },

    cuadrado: {
      nombre: "Cuadrado",
      area: {
        campos: ['Lado'],
        calcular: (lado) => lado * lado
      },
      perimetro: {
        campos: ['Lado'],
        calcular: (lado) => 4 * lado
      }
    },

    circulo: {
      nombre: "Círculo",
      area: {
        campos: ['Radio'],
        calcular: (radio) => Math.PI * Math.pow(radio, 2)
      },
      perimetro: {
        campos: ['Radio'],
        calcular: (radio) => 2 * Math.PI * radio
      }
    }

  };

    // Creacion de los contenedores de los contenedores
    const contenedor = document.getElementById('contenedor-calculadora');
    const selectorContenedor = document.createElement('div');
    const radiosContenedor = document.createElement('div');
    const camposContenedor = document.createElement('div');
    const botonContenedor = document.createElement('div');
    const resultadoContenedor = document.createElement('div');
    contenedor.append(selectorContenedor, radiosContenedor, camposContenedor, botonContenedor, resultadoContenedor);

    // FUNCION DE LIMPIEZA
    // Esta función limpia un elemento de forma segura y eficiente.
    function limpiarElemento(elemento) {
      while (elemento.firstChild) {
        elemento.removeChild(elemento.firstChild);
      }
    }

    // FUNCIÓN PARA CREAR EL SELECTOR DE FIGURAS 
    function crearSelector() {
      const selector = document.createElement('select');
      selector.id = 'selector-figura';
      const opcionDefecto = document.createElement('option');
      opcionDefecto.value = "";
      opcionDefecto.textContent = "​📐 ​Seleccione una figura...";
      selector.appendChild(opcionDefecto);

      for (const claveFigura in FIGURAS) {
        const opcion = document.createElement('option');
        opcion.value = claveFigura;
        opcion.textContent = FIGURAS[claveFigura].nombre;
        selector.appendChild(opcion);
      }

      selector.addEventListener('change', gestionarCambioDeFigura);
      selectorContenedor.appendChild(selector);
    }

    // FUNCIÓN DE GESTIÓN 
    function gestionarCambioDeFigura(evento) {
      const figuraSeleccionada = evento.target.value;
      limpiarContenedores(); // Ahora usamos la funcion de limpieza desarrollada abajo.
      if (figuraSeleccionada) {
        mostrarRadios(figuraSeleccionada);
      }
    }
    
    // FUNCIÓN PARA MOSTRAR RADIOS 
    function mostrarRadios(figura) {
      const grupoDiv = document.createElement('div');
      grupoDiv.className = 'grupo-radios';

      // Creamos una función auxiliar para no repetir código
      const crearOpcionRadio = (valor, texto) => {
        const label = document.createElement('label');
        const radio = document.createElement('input');
        radio.type = 'radio';
        radio.name = 'calculo';
        radio.value = valor;
        
        label.appendChild(radio);
        // Usamos createTextNode para añadir texto de forma segura.
        label.appendChild(document.createTextNode(` ${texto}`)); 
        return label;
      };

      const radioArea = crearOpcionRadio('area', 'Área');
      const radioPerimetro = crearOpcionRadio('perimetro', 'Perímetro');
      
      grupoDiv.appendChild(radioArea);
      grupoDiv.appendChild(radioPerimetro);
      
      grupoDiv.addEventListener('change', (evento) => {
        const tipoCalculo = evento.target.value;
        mostrarCamposEntrada(figura, tipoCalculo);
      });

      radiosContenedor.appendChild(grupoDiv);
    }

    // FUNCIÓN PARA MOSTRAR CAMPOS
    // Solo cambiamos la forma de limpiar los contenedores.
    function mostrarCamposEntrada(figura, tipoCalculo) {
      limpiarElemento(camposContenedor);
      limpiarElemento(botonContenedor);
      limpiarElemento(resultadoContenedor);
      resultadoContenedor.id = ''; // También reseteamos el id
     
      // Asignamos la selección del campo
      const campos = FIGURAS[figura][tipoCalculo].campos;

      // Hacemos un un ciclo de recorrido con el metodo forEach para la construccion de los campos
      campos.forEach((nombreCampo, indice) => {
        const etiqueta = document.createElement('label');
        etiqueta.textContent = `${nombreCampo}:`;
        const campo = document.createElement('input');
        campo.type = 'number';
        campo.id = `campo-${indice}`;
        campo.placeholder = `Ingrese el valor para ${nombreCampo}`;
        camposContenedor.appendChild(etiqueta);
        camposContenedor.appendChild(campo);
      });

      mostrarBotonCalcular(figura, tipoCalculo);
    }
    
    // FUNCIÓN PARA MOSTRAR BOTÓN
    function mostrarBotonCalcular(figura, tipoCalculo) {
      const boton = document.createElement('button');
      boton.textContent = 'Calcular';
      boton.id = 'btn-calcular';
      boton.addEventListener('click', () => realizarCalculo(figura, tipoCalculo));
      botonContenedor.appendChild(boton);
    }

    // FUNCIÓN DE CÁLCULO
    function realizarCalculo(figura, tipoCalculo) {
      limpiarElemento(resultadoContenedor); // Limpiamos antes de mostrar nuevo resultado.
      const definicion = FIGURAS[figura][tipoCalculo];
      const valores = [];

      for (let i = 0; i < definicion.campos.length; i++) {
        const campo = document.getElementById(`campo-${i}`);
        const valor = parseFloat(campo.value);
        if (isNaN(valor) || valor <= 0) {
          // Creación del mensaje de error
          resultadoContenedor.id = '';
          const pError = document.createElement('p');
          pError.textContent = 'Error: Ingrese un valor numérico válido y positivo.';
          pError.style.color = 'red';
          pError.style.fontWeight = 'bold';
          pError.style.textAlign = 'center';
          resultadoContenedor.appendChild(pError);
          return;
        }
        valores.push(valor);
      }
      
      const resultado = definicion.calcular(...valores);
      
      // Creación del mensaje de resultado sin innerHTML
      resultadoContenedor.id = 'resultado';
      const strongElement = document.createElement('strong');
      strongElement.textContent = tipoCalculo;
      
      // Inserciones
      resultadoContenedor.appendChild(document.createTextNode('El '));
      resultadoContenedor.appendChild(strongElement);
      resultadoContenedor.appendChild(document.createTextNode(` es: ${resultado.toFixed(2)}`));
    }

    // FUNCIÓN DE LIMPIEZA GENERAL
    function limpiarContenedores() {
      limpiarElemento(radiosContenedor);
      limpiarElemento(camposContenedor);
      limpiarElemento(botonContenedor);
      limpiarElemento(resultadoContenedor);
      resultadoContenedor.id = ''; // Reseteamos el id al limpiar
    }

    // INICIO DEL PROGRAMA
    crearSelector();
});


// Desarrollado por Carlos Vergara.