const vm = new Vue({
  el: "main",
  data: {
    tareas: [
      {
        num: 1,
        texto: "Aprender VueJS",
        terminada: false,
        editando: false,
      },
      {
        num: 2,
        texto: "Aprender JavaScript",
        terminada: false,
        editando: false,
      },
    ],
    nuevaTarea: {
      num: 3,
      texto: "",
      terminada: false,
      editando: false,
    },
    textoTareaEditada: "",
    textoFiltro: "",
    orden: {
      propiedad: "texto",
      sentido: "asc",
    },
    autoincremental: 3,
    tareaActual: "",
  },
  methods: {
    agregarTarea() {
      this.nuevaTarea.num=this.autoincremental++;
      this.tareas.push(JSON.parse(JSON.stringify(this.nuevaTarea)));
      this.nuevaTarea.texto = "";
      this.nuevaTarea.terminada = false;
      // Se quita el filtro.
      this.textoFiltro = "";
    },
    toggleTareaTerminada(tarea) {
      tarea.terminada = !tarea.terminada; 
    },
    eliminarTarea(tarea) {
      this.tareas = this.tareas.filter(t => t.num !== tarea.num);
    },
    editarTarea(tarea) {
      // El resto de tareas dejan de editarse.
      this.tareas.forEach(t => t.editando = false);
      this.textoTareaEditada = tarea.texto;
      tarea.editando = true;
      this.tareaActual = "tarea" + tarea.num;
    },
    guardarTarea(tarea) {
      tarea.texto = this.textoTareaEditada;
      tarea.editando = false;
    },
    cancelarTarea(tarea) {
      tarea.editando = false;
    },
    eliminarTareasTerminadas() {
      this.tareas = this.tareas.filter(tarea => !tarea.terminada);
    },
    ordenarPor(propiedad) {
      if (propiedad == this.orden.propiedad) {
        this.orden.sentido = (this.orden.sentido == 'asc') ? 'desc' : 'asc';
      } else {
        this.orden.propiedad = propiedad;
        this.orden.sentido = 'asc';
      }
    },
  },
  computed: {
    numTareasTerminadas() {
      return this.tareasFiltradas.filter(tarea => tarea.terminada).length;
    },
    tareasFiltradas() {
      return this.tareas.filter(tarea => tarea.texto.includes(this.textoFiltro));
    },
    tareasOrdenadas() {
      return this.tareasFiltradas.sort(compareValues(this.orden.propiedad, this.orden.sentido));
    }
  },
  updated() {
    const elemento = document.getElementById(this.tareaActual);
    if (elemento != null) {
      elemento.focus();
    }
  }
});

function compareValues(key, order='asc') {
  return function(a, b) {
    if(!a.hasOwnProperty(key) || 
       !b.hasOwnProperty(key)) {
  	  return 0; 
    }
    
    const varA = (typeof a[key] === 'string') ? 
      a[key].toUpperCase() : a[key];
    const varB = (typeof b[key] === 'string') ? 
      b[key].toUpperCase() : b[key];
      
    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return (
      (order == 'desc') ? 
      (comparison * -1) : comparison
    );
  };
}
