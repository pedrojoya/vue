const vm = new Vue({
  el: "main",
  data: {
    tareas: [
      {
        texto: "Aprender VueJS",
        terminada: false,
      },
      {
        texto: "Aprender JavaScript",
        terminada: false,
      },
    ],
    nuevaTarea: {
      texto: "",
      terminada: false,
    },
  },
  methods: {
    agregarTarea() {
      this.tareas.push(JSON.parse(JSON.stringify(this.nuevaTarea)));
      this.nuevaTarea.texto = "";
      this.nuevaTarea.terminada = false;
    }
  }
});