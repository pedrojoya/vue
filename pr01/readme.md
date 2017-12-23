# Qué es Vue
Vue es un framework JavaScript. Su web oficial es https://vuejs.org/
# Instalación
Para su instalación se recomienda usar un CDN, como https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js . Esta se trata de la versión no minificada, especial para desarrollo, que funciona con las Vue devtools de Chrome.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script src="js/miscript.js"></script>
```
Para trabajar cómodo con Vue se recomienda instalar las Vue devtools para el navegador deseado, que podemos encontrar en https://github.com/vuejs/vue-devtools#vue-devtools
# Creación de la instancia Vue
Debemos crear una instancia Vue y pasarle un objeto de configuración. Dicho objeto tendrá una serie de propiedades:
* `el`: Corresponderá al elemento del HTML con el que se vincula la instancia.
* `data`: Corresponderá al objeto modelo de datos.
* `methods`: Corresponderá al objeto donde se encuentran los métodos que puede ser ejecutados. Podrán acceder a las variables del modelo de datos.
* `computed`: Corresponderá al objeto de propiedades calculadas.
Veamos un ejemplo básico:
```javascript
const vm = new Vue({
  // Se vincula con la etiqueta main del HTML.
  el: "main",
  // Modelo de datos.
  data: {
    // Variable titulo del modelo de datos.
    titulo: "Soy el título",
    // Variable mensaje del modelo de datos.
    mensaje: ""
  }
});
```
# Directivas
Las directivas son pseudoatributos HTML utilizados para indicar a Vue lo que debe hacer.
# Comunicación desde el HTML al modelo de datos
Con la directiva `v-model="variable_del_modelo"` asociamos el valor de una etiqueta input del HTML a una determinada variable del modelo de datos. Cada vez que el usuario cambie el valor de input se cambiará el valor de la variable. Por ejemplo:
```html
<input type="text" placeholder="(mensaje)" v-model="mensaje">
```
# Comunicación desde el modelo de datos al HTML
Con la directiva `v-text="variable_del_modelo"` se asociamos el contenido de una etiqueta al valor de una variable del modelo, de manera que cuando cambia el valor de la variable se actualiza automáticamente en contenido de la etiqueta en tiempo de ejecución. Por ejemplo:
```html
<h1 v-text="titulo"></h1>
```
Otra alternativa es usar la sintaxis `{{variable_del_modelo}}` como si del contenido de la etiqueta se tratase. Por ejemplo:
```html
<p>
  {{mensaje}}
</p>
```
# Renderizado condicional
Con la directiva `v-show="expr_booleana_modelo"` podemos hacer que una etiqueta se muestre o no dependiendo de una condición. Lo que hace es poner `display: none`. Por ejemplo:
```html
<h2 v-show="isSaludoChecked">Aquí viene el saludo</h2>
```
Con la directiva `v-if="expr_booleana_modelo"` hacemos que dicha etiqueta se elimine o no del DOM. Por ejemplo:
```html
<p v-if="isSaludoChecked">Quillo que</p>
```
También tenemos las directivas `v-else` y `v-else-if="expr_booleana_modelo"`. Por ejemplo:
```html
<p v-if="isSaludoChecked">Quillo que</p>
<p v-else>No te saludo porque no quiero</p>
```
Si queremos que varias etiquetas HTML se rendericen o no en base a una condición del modelo, en vez de tener que usar `v-if` en varias etiquetas, podemos usar una etiqueta `<template v-if="condicion">`y poner dentro de ella todo lo que se deba de mostrar si se cumple la condición. Por ejemplo:
```html
<template v-if="isSaludoChecked">
  <p>Maneras de saludar:</p>
  <ul>
    <li>Buenos días tenga usted</li>
    <li>Hola, ¿cómo está usted?</li>
    <li>Quillo que</li>
  </ul>
</template>
```
# Bucles
Con la directiva `v-for="item in items"` aplicada a una etiquta podemos hacer que se cree una etiqueta de dicho tipo por cada elemento de la colección indicada. Por ejemplo:
```html
<tr v-for="alumno in alumnos">
  <td v-text="alumno.nombre"></td>
  <td v-text="alumno.edad"></td>
</tr>
```
Si queremos acceder al índice del array correspondiente a dicho elemento deberemos indicar la variable index (debe llamarse exactamente así)
```html
<tr v-for="(alumno, index) in alumnos">
  <td v-text="index"></td>
  <td v-text="alumno.nombre"></td>
  <td v-text="alumno.edad"></td>
</tr>
```
Pero la directiva ```v-for=(key, value) in objeto``` también sirve para recorrer las propiedades de un objeto. Podemos usar la variable ```key``` para acceder al nombre de la propiedad y la variable ```value```para acceder al valor.
```html
<tr v-for="alumno in alumnos">
  <td v-text="index"></td>
  <td v-for="(value, key) in alumno">{{key}}: {{value}}</td>
</tr>
```
# Eventos
Mediante la directiva `v-on:evento=método` podemos hacer que cuando se produzca el evento indicado en la etiqueta HTML correspondiente se ejecute el método indicado de la instancia Vue. 
Los métodos se definen en la propiedad ```methods``` de la instancia Vue. Por ejemplo:
```javascript
const vm = new Vue({
  // Elemento con el que se vincula la instancia Vue
  el: "main",
  // Modelo de datos.
  data: {
    alumnos: [
      {
        nombre: "Baldomero",
        edad: 25
      }
    ],
    nuevoAlumno: {
      nombre: "",
      edad: 18
    }
  },
  // Métodos que pueden acceder al modelo.
  methods: {
    agregarAlumno() {
      // Se crea una copia del objeto y se agrega al array.
      // (hay que hacerlo con una copia para que no se vea afectado
      // por los futuros cambios en nuevoAlumno).
      this.alumnos.push(JSON.parse( JSON.stringify(this.nuevoAlumno)));
      // Reseteamos nuevoAlumno.
      this.nuevoAlumno.nombre = "",
      this.nuevoAlumno.edad = 18
    }
  }
});
```
Para asociar un evento a un método haremos
```html
<button v-on:click="agregarAlumno">Agregar alumno</button>
```
En vez de recibir el nombre del método, también puede simplemente llamarlo. Por ejemplo:
```html
<a href="#" v-on:click="eliminarAlumno(index)">Borrar</a>
```
Vue proporciona una manera de acortar la directiva ```v-on:evento="metodo"``` para que sea más rápida de escribir, simplemente substituyéndolo por ```@click="metodo"```. Por ejemplo:
```html
<button @click="agregarAlumno">Agregar alumno</button>
```
También tenemos disponibles una serie de modificadores de la directiva, que permite por ejemplo evitar que se realice el evento por defecto:
```html
<form v-on:submit.prevent="agregarAlumno">
```
# Propiedades calculadas (computed)
Con objeto de no llevarnos demasiado lógica a la vista (a las directivas de las etiquetas HTML), podemos crear las conocidas como *computed properties* o propiedades calculadas, que no dejan de ser atributos correspondientes a funciones que calculan un valor a partir de alguna variable del modelo.

Las *computed properties* solo son recalculadas cuando cambian las propiedades del modelo de las que dependen, a diferencia de los métodos (*methods*), que siempre son evaluados.
Las propiedades calculadas se definen en la propiedad ```computed``` dentro de la instancia Vue. Por ejemplo:
```javascript
const vm = new Vue({
  // Elemento con el que se vincula la instancia Vue
  el: "main",
  // Modelo de datos.
  data: {
    nuevoAlumno: {
      nombre: "",
      edad: 18
    }
  },
  // Métodos que pueden acceder al modelo.
  methods: {

  },
  // Propiedades calculadas (dependientes del modelo).
  computed: {
    jubilacion() {
      return 65 - this.nuevoAlumno.edad;
    }
  }
});
```
# Vinculación de clases
Con la directiva ```v-bind:class="{ clase: expr_booleana_modelo }"``` podemos establecer o quitar una clase de la etiqueta corresondiente dependiendo del modelo. El valor pasado a la directiva es un objeto donde los nombres de las propiedades son las clases y los valores de las propiedades las expresiones booleanas. Por ejemplo:
```javascript
// Activa la clase suspenso si el alumno no está aprobado.
<tr v-for="(alumno, index) in alumnos" v-bind:class="{ suspenso: !alumno.aprobado }">
```
Vue nos permite realizar usar la directiva ```v-bind:class``` con una sintaxis más corta, mediante ```:class```. Así, el ejemplo anterior quedaría como:
```javascript
<tr v-for="(alumno, index) in alumnos" :class="{ suspenso: !alumno.aprobado }">
```

