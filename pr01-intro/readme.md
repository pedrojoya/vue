# Introducción a Vue
- [Qué es Vue](#que-es-vue)
- [Instalación](#instalacion)
- [Instancia Vue](#instancia-vue)
- [Ciclo de vida de una instancia Vue](#ciclo-de-vida-de-una-instancia-vue)
- [Plantillas](#plantillas)
- [Directivas](#directivas)
- [Vinculación de contenido](#vinculacion-de-contenido)
- [Vinculación de atributos](#vinculacion-de-atributos)
- [Vinculación bidireccional](#vinculacion-bidireccional)
- [Renderizado condicional](#renderizado-condicional)
- [Renderizado de listas](#renderizado-de-listas)
- [Eventos](#eventos)
- [Computed properties](#computed-properties)
- [Vinculación de clases](#vinculacion-de-clases)
- [Efectos de transición](#efectos-de-transicion)
# Qué es Vue
Vue (pronunciado /vjuː/ en inglés, como *view*) es un framework Javascript para construir interfaces de usuario. 
Su web oficial es [https://vuejs.org/](https://vuejs.org/).
Sus principales características son:
- Es ligero, pesa muy poco.
- Tiene una curva de aprendizaje sencilla.
- Tiene mucha flexibilidad.
- Tiene mejor rendimiento que Angular o React.
# Instalación
Para empezar a trabajar con Vue se recomienda usar un CDN (*Content Delivery Network*, red de distribución de contenido), como por ejemplo:
[https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js](https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js).

> En concreto esta versión de Vue corresponde a una versión no minificada, que es la remomendada para desarrollo, y que funciona correctamente con las Vue devtools de Chrome.

Insertaremos el script de Vue correspondiente en nuestro documento HTML, antes del script con nuestro código.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
<script src="js/miscript.js"></script>
```
Además, para trabajar cómodo con Vue se recomienda instalar la extensión Vue devtools para el navegador deseado, que podemos encontrar en [https://github.com/vuejs/vue-devtools#vue-devtools](https://github.com/vuejs/vue-devtools#vue-devtools)
# Instancia Vue
Debemos crear una instancia Vue a través de la función constructora `Vue` y pasarle un objeto de configuración. Dicho objeto tendrá una serie de propiedades, entre las que destacamos:
- `el`: Corresponderá al elemento del HTML con el que se vincula la instancia. Podemos poner el nombre de una etiqueta, como `main` o el id de una etiqueta, como `#identificador`.
- `data`: Corresponderá al objeto modelo de datos. Es donde residirán los datos con los que trabaje la instancia Vue.
- `methods`: Corresponderá al objeto donde se encuentran los métodos que puede ser ejecutados en la instancia Vue. Podrán acceder a las variables del modelo de datos.
- `computed`: Corresponderá al objeto de propiedades calculadas, que son en realidad métodos que realicen cálculos sobre los datos del modelo de datos y retornan valores.
Veamos un ejemplo básico:
```javascript
const vm = new Vue({
  // Se vincula con la etiqueta main del HTML.
  el: "main",
  // Modelo de datos.
  data: {
    titulo: "Soy el título",
    mensaje: ""
  }
});
```
Vue se encarga de hacer que todas las propiedades que se encuentran en su objeto `data` sean directamente accesibles a través de la palabra reservada `this`, gracias a que se encarga de hacer un proxy que permite acceder a ellas como si se tratasen de propiedades de la propia instancia.
Por ejemplo, siguiendo el ejemplo anterior podremos hacer
```javascript
vm.mensaje = "Hola";
```
ya que Vue habrá creado una propiedad `mensaje` en la instancia, que apunta al atributo `mensaje` de la propiedad `data` de la misma.

Además, toda instancia Vue expone una serie de propiedades y métodos de utilidad cuyo nombre comienza con el prefijo `$`, para diferenciarlas de las propiedades provenientes del proxy realizado sobre los datos de la propiedad `data`. Un ejemplo de ésto es el método `$watch()`, que veremos más adelante.
# Ciclo de vida de una instancia Vue
Cada instancia Vue pasa por una serie de pasos en su ciclo de vida. Para cada paso se llama a un método de evento, que podemos implementar para ejecutar una determinada lógica. Estos métodos son:
- `beforeCreate`: Antes de iniciar la inyección y la reactividad.
- `created`: Cuando se ha iniciado la inyección y la reactividad.
- `beforeMount`: Antes de realizar el montado de la plantilla.
- `mounted`: Después de realizar el montado de la plantilla.
- `beforeUpdate`: Antes de volver a renderizar por motivo de un cambio en los datos.
- `updated`: Después de volver a renderizar por motivo de un cambio en los datos.
- `beforeDestroy`: Antes de finalizar la observación para reactividad.
- `destroyed`: Justo antes de destruir la instancia.
En todos estos métodos `this` apunta a la propia instancia Vue.
Por ejemplo:
```javascript
var vm = new Vue({
  data: {
    a: 1
  },
  created() {
    // `this` apunta a la instancia vm
    console.log('a vale ' + this.a);
  }
});
```
# Plantillas
Vue.js utiliza una sintaxis de plantilla basada en HTML lo que te permite enlazar declarativamente el DOM con los datos de la instancia de Vue subyacente.
Usando la sintaxis `{{expr_modelo}}`, conocida como sintaxis del bigote (*moustache syntax*), haremos que el contenido de la etiqueta corresponda al valor de la variable, que se interpreta como texto plano. Por ejemplo:
```html
<p>
  {{mensaje}}
</p>
```
De igual forma, con la sintáxis  `{{método_instancia()}}` haremos que el valor retornado por el método de la instancia se muestre como contenido de la etiqueta. Por ejemplo:
```html
<p>
  {{mostrarAyuda()}}
</p>
```
Si el método debe acceder al modelo (propiedad `data`), podremos hacer uso dentro de él de la palabra reservada `this`, ya que, a pesar de estar dentro de una función, Vue la habrá asociado al modelo.
# Directivas
Las directivas son atributos especiales HTML identificadas con el prefijo `v-`. El trabajo de una directiva es aplicar reactivamente efectos secundarios al DOM cuando el valor de su expresión cambia.

Los valores de las directivas deben ser una sola expresión JavaScript (con la excepción de `v-for`, que veremos luego). Estas expresiones serán evaluadas como JavaScript en el ámbito de datos de la instancia de Vue. El valor solo puede contener una única expresión simple, por lo que, por ejemplo, NO están permitidas declaraciones, sentencias de control de flujo o el acceso a variables globales definidas por el usuario.

Algunas directivas pueden recibir un argumento, indentificado con `:` después del nombre de la directiva. Por ejemplo:
```html
<a v-bind:href="url"></a>
```
Los modificadores son sufijos especiales identificados con un `.`, los cuales indican que la directiva debe ser enlazada de alguna forma especial. Por ejemplo:

```html
<form v-on:submit.prevent="onSubmit"></form>
```
# Vinculación de contenido
Con la directiva `v-text="expr_modelo"` asociamos el contenido de una etiqueta al resultado de una expresión del modelo, de manera que cuando cambie el valor de algún elemento de la expresión, como una variable del modelo, se actualizará automáticamente el contenido de la etiqueta en tiempo de ejecución. Por ejemplo:
```html
<h1 v-text="titulo"></h1>
```
Utilizaremos esta directiva frente a la sintaxis `{{expr_modelo}}` cuando la expresión determine el contenido al completo de la etiqueta.
# Vinculación de atributos
Con la directiva `v-bind:atributo="expr_modelo"` hacemos que el valor del atributo especificado de la etiqueta corresponda al valor al que se evalúa la expresión del modelo. 
Vue nos permite acortar la sintaxis de la directiva anterior simplemente indicando `:atributo`. Por ejemplo:
```html
<img v-bind:src="urlFoto" :alt="mensaje">
```
# Vinculación bidireccional
Con la directiva `v-model="var_modelo"` asociamos el valor de control de formulario a una determinada variable del modelo de datos. 

Cada vez que el usuario cambie el valor de input se cambiará el valor de la variable. De igual forma, si el valor de la variable cambia, el control del formulario reflejará dicho cambio de la manera adecuada dependiendo del tipo de campo. A esto se le conoce como vinculación bidireccional (*two-way data binding*).

Si se hubiera especificado un valor inicial en el campo de formulario, éste será descartado.

Veamos ejemplos:
```html
<!-- Texto -->
<input type="text" id="nombre" placeholder="(nombre)" v-model="nuevoAlumno.nombre">
<!-- Booleano -->
<input type="checkbox" id="repetidor" v-model="nuevoAlumno.isRepetidor">
<!-- Varios checkbox enlazados a un array del modelo -->
<input type="checkbox" id="android" value="Android" v-model="nuevoAlumno.asignaturas">
<input type="checkbox" id="multihilo" value="Multihilo" v-model="nuevoAlumno.asignaturas">
<input type="checkbox" id="hlc" value="HLC" v-model="nuevoAlumno.asignaturas">
<!-- Radio -->
<input type="radio" id="hombre" value="Hombre" v-model="nuevoAlumno.sexo">
<input type="radio" id="mujer" value="Mujer" v-model="nuevoAlumno.sexo">
<!-- Select -->
<select v-model="nuevoAlumno.curso">
  <option>1º CFGS</option>
  <option>2º CFGS</option>
</select>
```
Si deseas que el valor de un campo de formulario sea convertido automáticamente a un número, puedes agregar el modificador `v-model.number="var_modelo"`. Por ejemplo:
```html
<input v-model.number="nuevoAlumno.edad" type="number">
```
# Renderizado condicional
Con la directiva `v-show="expr_booleana_modelo"` podemos hacer que una etiqueta se muestre o no dependiendo de una condición. La etiquta será siempre renderizada, aunque dependiendo de la condición se le aplicará o no `display: none`. Esta directiva NO se puede usar con la etiqueta `<template>`, que veremos más adelante. Por ejemplo:
```html
<h2 v-show="isSaludoChecked">Aquí viene el saludo</h2>
```
Con la directiva `v-if="expr_bool_modelo"` hacemos que dicha renderice o no dependiendo de una condición. Los *listeners* de eventos y componentes hijo dentro del bloque condicional serán destruidos y recreados apropiadamente durante los cambios de condición. Por ejemplo:
```html
<p v-if="isSaludoChecked">Quillo que</p>
```
También tenemos las directivas `v-else` y `v-else-if="expr_booleana_modelo"`, que deben encontrarse inmediatamente después de un elemento con `v-if` o `v-else-if`, o no serán reconocidos. Por ejemplo:
```html
<p v-if="isSaludoChecked">Quillo que</p>
<p v-else>No te saludo porque no quiero</p>
```
Si queremos que varias etiquetas HTML se rendericen o no en base a una condición del modelo, en vez de tener que usar `v-if` en varias etiquetas, podemos usar una etiqueta `<template v-if="condicion">`y poner dentro de ella todo lo que se deba de mostrar si se cumple la condición. La etiqueta `<template>` actúa como elemento envolvente invisible, que no es incluido en el renderizado. Por ejemplo:
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
Generalmente, `v-if` tiene un costo de alternancia mayor mientras que `v-show` tiene un costo de renderizado inicial mayor. Por tanto, se recomienda usar `v-show` si se necesita alternar el elemento muy frecuentemente o `v-if` si es poco probable que la condición cambie durante la ejecución.
# Renderizado de listas
Con la directiva `v-for="item in items"` aplicada a una etiquta podemos hacer que se cree una etiqueta de dicho tipo por cada elemento del array indicado. Por ejemplo:
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
Podemos usar la directiva `v-for` en una etiqueta `<template>` para renderizar un bloque de múltiples elementos. 
Cuando existen en el mismo elemento, `v-for` tiene mayor prioridad que `v-if`. Esto significa que `v-if` será ejecutado en cada iteración del bucle separadamente, lo que es muy útil cuando quieres renderizar elementos solo para algunos elementos de la colección. En el siguiente ejemplo sólo se renderizan los alumnos repetidores:
```html
<li v-for="alumno in alumnos" v-if="alumno.isRepetidor">
  {{ alumno }}
</li>
```
Para facilitar la reactividad, Vue crea un *wrapper* sobre los métodos tradicionales de mutación de arrays, de manera que cuando se llaman sobre arrays de modelo sean disparadas actualizaciones en la vistas. Dichos métodos son: `push()`, `pop()`, `shift()`, `unshift()`, `splice()`, `sort()`, `reverse()`.

Cuando se usen métodos que no produzcan cambios en el array, sion que retornen uno nuevo, como `filter()`, `concat()` y `slice()`, para conserguir la reactividad podemos simplemente reemplazar el array original por el nuevo.
```javascript
example1.items = example1.items.filter(item => item.message.match(/Foo/));
```
Debido a las limitaciones en JavaScript, Vue no puede detectar los cambios cuando explícitamente se establece el valor de un elemento a través del índice o se modifica explícitamente la longitud de un array. Para esos casos se recomienda realizar las mismas operaciones mediante el método `splice()` para el que sí existe *wrapper* y por tanto cuyos cambios si son detectables.
```javascript
// Asignar a un elemento de un array.
items.splice(indiceDelElemento, 1, nuevoValor);
// Aumentar la longitud del array.
items.splice(nuevaLongitud)
```
# Eventos
Mediante la directiva `v-on:evento="sentencia_modelo"` podemos hacer que cuando se produzca el evento indicada en la etiqueta HTML correspondiente, se ejecute la sentencia indicada. Por ejemplo:
```html
<button v-on:click="counter += 1">Agregar 1 al contador</button>
``` 
Si la lógica a ejecutar es más compleja que una simple sentencia, tendremos que definir un método en la propiedad ```methods``` de la instancia, y asociarlo a la directiva. 
```javascript
const vm = new Vue({
  el: "main",
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
    agregarAlumno(event) {
      // Se crea una copia del objeto y se agrega al array.
      // (hay que hacerlo con una copia para que no se vea afectado
      // por los futuros cambios en nuevoAlumno).
      // `this` dentro de los métodos apunta a la instancia de Vue.
      this.alumnos.push(JSON.parse( JSON.stringify(this.nuevoAlumno)));
      this.nuevoAlumno.nombre = "",
      this.nuevoAlumno.edad = 18
    },
    eliminarAlumno(indice) {
      this.alumnos.splice(indice, 1);
    },
    avisar(mensaje, event) {
      if (event) event.preventDefault() {
        alert(mensaje)
      }
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
A veces necesitamos acceder al evento original del DOM en una declaración JavaScript en línea. Puedes pasarlo al método utilizando la variable especial `$event`. Por ejemplo:
```html
<button v-on:click="avisar('El formulario aún no puede ser enviado', $event)">Enviar</button>
```
Vue proporciona una manera de acortar la directiva ```v-on:evento="metodo"``` para que sea más rápida de escribir, simplemente substituyéndolo por ```@click="metodo"```. Por ejemplo:
```html
<button @click="agregarAlumno">Agregar alumno</button>
```
También tenemos disponibles una serie de modificadores de la directiva, que permite por ejemplo evitar que se realice el evento por defecto:
```html
<form v-on:submit.prevent="agregarAlumno">
```
# Computed properties
Con objeto de no llevarnos demasiado lógica a la vista (a las directivas de las etiquetas HTML), podemos crear las conocidas como *computed properties* o propiedades calculadas, que no dejan de ser atributos correspondientes a funciones que calculan un valor a partir de alguna variable del modelo.
Las propiedades calculadas se definen en la propiedad ```computed``` dentro de la instancia Vue. Por ejemplo:
```javascript
const vm = new Vue({
  el: 'main',
  data: {
    mensaje: 'Hola'
  },
  computed: {
    mensajeAlReves() {
      // `this` apunta a la instancia de vm
      return this.mensaje.split('').reverse().join('');
    }
  }
})
```
Las propiedades calculadas se usan tal y como se haría con una propiedades del modelo.
```html
<p>Mensaje original: "{{ mensaje }}"</p>
<p>Mensaje al revés: "{{ mensajeAlReves }}"</p>
```
Las *computed properties* solo son recalculadas cuando cambian las propiedades del modelo de las que dependen, su valor es cacheado basándose en sus dependencias. Por el contrario, los métodos (*methods*) son ejecutados cada vez que se renderiza un elemento que haga uso de él.
# Vinculación de clases
Con la directiva ```v-bind:class="{ clase: expr_booleana_modelo }"``` podemos establecer o quitar una clase de la etiqueta correspondiente dependiendo del modelo. El valor pasado a la directiva es un objeto donde los nombres de las propiedades son las clases y los valores de las propiedades las expresiones booleanas del modelo. Por ejemplo:
```html
// Activa la clase suspenso si el alumno no está aprobado.
<tr v-for="(alumno, index) in alumnos" v-bind:class="{ suspenso: !alumno.aprobado }">
```
Podemos usar la sintaxis corta ```:class```:
```html
<tr v-for="(alumno, index) in alumnos" :class="{ suspenso: !alumno.aprobado }">
```
El objeto que se asigna como valor de la directiva NO tiene por qué definirse inline, sino que puede corresponder a un objeto del modelo o una computed property.
Tenemos disponible una sintaxis alternativa para esta directiva, en la que se le asigna como valor un array de expresiones correspondientes a los nombres de las clases con las que debe mostrarse el elemento. Por ejemplo:
```html
<div v-bind:class="[isActive ? activeClass : '', errorClass]">
```
# Efectos de transición
Vue proporciona varias maneras de aplicar efectos de transición cuando nuevos elementos son insertados, actualizados o quitados del DOM.
Mediante el componente ```<transition name="nombre_trans">``` podemos hacer que las transciones al mostrar u ocultar elementos sean mucho más elegantes.

Cuando un elemento encerrado en un componente transition es insertado o eliminado del DOM, Vue verificará automáticamente si el elemento objetivo tiene transiciones CSS aplicadas o no. Si tiene, las clases CSS para estas transiciones serán agregadas/quitadas en el momento oportuno. Si no se detectan transiciones/animaciones CSS, las operaciones para la inserción y/o eliminación del DOM serán ejecutadas inmediatamente. 
Hay seis clases aplicadas a las transiciones de entrada/salida. Los sufijos de las clases para cuando se agrega un elemento al DOM son:
- `enter`: Estado inicial para la transición de entrada. Se agrega antes que el elemento sea insertado, y se quita un *frame* después.
- `enter-active`: Estado activo para la entrada. Es aplicada durante la fase de entrada completa. Se agrega antes que el elemento sea insertado, se quita cuando la transición/animación finaliza. Esta clase puede ser usada para definir la duración, *delay* y curva de aplicación para la transición de entrada.
- `enter-to`: Estado final para la entrada. Se agrega un marco después de haber insertado el elemento (al mismo tiempo que v-enter es removida), se quita cuando la transición/animación finaliza.
Los sufijos de las clases para cuando se elimina un elemento del DOM son:
- `leave`: Estado inicial para la salida. Se agrega inmediatamente cuando se dispara una transición de salida, se quita pasado un *frame*.
- `leave-active`: Estado activo para la salida. Es aplicada durante la fase de salida al completo. Se agrega inmediatamente cuando una transición de salida es disparada, y se quita cuando la transición/animación finaliza. Esta clase puede ser usada para definir la duración, *delay* y la curva de aplicación para la transición de salida.
- `leave-to`: Estado final para la salida. Se agrega un *frame* despúes de que se dispare la transición de salida (al mismo tiempo que `leave` es quitada), y se quita cuando la transición/animación finaliza.

Una de las alternativas es transiciones CSS. Para ello primero tendremos que incluir las etiquetas que puedan ser añadidas o eliminadas del DOM dentro de un componente `<transition>`. Por ejemplo:
```html
<transition name="saludo">
  <p v-if="isSaludoChecked">Quillo que</p>
</transition>
``` 
Y luego definir las clases CSS que deben emplearse en la transición, cuyo nombre debe comenzar con el nombre de la transición y tener como sujijo alguno de los explicados anteriormente. Por ejemplo:
```css
/* Al iniciar la transición de entrada */
.saludo-enter {
  transform: translateX(10px);
  opacity: 0;
}
/* Durante la transición de entrada, antes de añadir el elemento al DOM */
.saludo-enter-active {
  transition: all 2s;
}

/* Durante la transición de salida */
.saludo-leave-active {
  transition: all 2s;
}
/* Al finalizar la transición de salida, 
   justo antes de quitar el elemento del DOM */
.saludo-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
```