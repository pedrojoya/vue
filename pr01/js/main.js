const vm = new Vue({
  // Elemento con el que se vincula la instancia Vue
  el: "main",
  // Modelo de datos.
  data: {
    titulo: "Soy el título",
    mensaje: "",
    isSaludoChecked: false,
    alumnos: [
      {
        nombre: "Baldomero",
        edad: 25,
        aprobado: false
      },
      {
        nombre: "Germán Ginés",
        edad: 17,
        aprobado: false
      },
      {
        nombre: "Rodolfo",
        edad: 20,
        aprobado: false
      }
    ],
    nuevoAlumno: {
      nombre: "",
      edad: 18,
      aprobado: false
    }
  },
  // Métodos que pueden acceder al modelo.
  methods: {
    agregarAlumno() {
      // Se crea una copia del objeto y se agrega al array.
      // (hay que hacerlo con una copia para que no se vea afectado
      // por los futuros cambios en nuevoAlumno).
      this.alumnos.push(JSON.parse( JSON.stringify(this.nuevoAlumno)));
      // Reseteamos nuevo alumno.
      this.nuevoAlumno.nombre = "",
      this.nuevoAlumno.edad = 18
    },
    eliminarAlumno(indice) {
      console.log("Eliminar " + indice);
      this.alumnos.splice(indice, 1);
    },
    toggleAprobado(alumno) {
      console.log("Aprobar " + alumno.nombre);
      alumno.aprobado = !alumno.aprobado;
    }
  },
  // Propiedades calculadas (dependientes del modelo).
  computed: {
    alumnosMayores() {
      return this.alumnos.filter(alumno => alumno.edad >= 18);
    },
    jubilacion() {
      return 65 - this.nuevoAlumno.edad;
    },
    alumnosAprobados() {
      return this.alumnos.filter(alumno => alumno.aprobado);
    }
  }
});
// Para que Vue esté en modo depuración.
Vue.config.devtools = true;