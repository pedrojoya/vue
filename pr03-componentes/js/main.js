Vue.component('mi-texto', {
  template: '<p>Soy el componente mi-texto</p>',
});

Vue.component('contador', {
  template: `
    <div>
      <span>Contador: {{ counter }}</span>
      <button @click="incrementar">Incrementar</button>
    </div>
  `,
  data() {
    return { 
      counter: 0,
    };
  },
  methods: {
    incrementar() {
      this.counter++;
    },
  },
});

Vue.component('mi-texto-2', {
  template: '<p>{{elTexto}}</p>',
  props: ['elTexto'],
});

Vue.component('contador-2', {
  template: `
    <div>
      <span>Contador: {{ counter }}</span>
      <button @click="incrementar">{{textoEnMayusculas}}</button>
    </div>
  `,
  props: ['inicial', 'incremento', 'texto'],
  data() {
    return { 
      counter: this.inicial,
    };  
  },  
  methods: {
    incrementar() {
      this.counter = this.counter + this.incremento;
    },  
  },  
  computed: {
    textoEnMayusculas() {
      return this.texto.trim().toUpperCase();
    }
  }
});  

Vue.component('contador-3', {
  template: `
    <div>
      <span>Contador: {{ counter }}</span>
      <button @click="incrementar">{{textoEnMayusculas}}</button>
    </div>
  `,
  props: {
    inicial: {
      type: Number,
      default: 0,
    },
    incremento: {
      type: Number,
      default() {
        return 1;
      },
      validator(valor) {
        return valor > 0;
      },
    },
    texto: {
      type: String,
      required: true,
    },
  },
  data() {
    return { 
      counter: this.inicial,
    };  
  },  
  methods: {
    incrementar() {
      this.counter = this.counter + this.incremento;
    },  
  },  
  computed: {
    textoEnMayusculas() {
      return this.texto.trim().toUpperCase();
    }
  }
});  

const vm = new Vue({
  el: "#principal",
  data: {
    mensaje: "No te digo trigo...",
    textoBoton: "Incrementar",
  },
});