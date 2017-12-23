# Qué es Vue
* Vue es un framework JavaScript.
* Web oficial: https://vuejs.org/
* Se recomienda instalar las Vue devtools para el navegador deseado, en https://github.com/vuejs/vue-devtools#vue-devtools
# Instalación
* Se recomienda a un CDN, como https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js. Esta se trata de la versión no minificada, especial para desarrollo, que funciona con las Vue devtools de Chrome.
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
```
* Ponerlo siempre antes de nuestro script.
# Creación de la instancia Vue
Debemos crear una instancia Vue y pasarle un objeto de configuración. Dicho objeto tendrá una serie de propiedades:
* `el`: Corresponderá al elemento del HTML con el que se vincula la instancia.
* `data`: Corresponderá al objeto modelo de datos.
* `methods`: Corresponderá al objeto donde se encuentran los métodos que puede ser ejecutados. Podrán acceder a las variables del modelo de datos (¿y a las calculadas?)
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
* Con la directiva `v-text="variable_del_modelo"` se asociamos el contenido de una etiqueta al valor de una variable del modelo, de manera que cuando cambia el valor de la variable se actualiza automáticamente en contenido de la etiqueta en tiempo de ejecución. Por ejemplo:
```html
<h1 v-text="titulo"></h1>
```
* Otra alternativa es usar la sintaxis `{{variable_del_modelo}}` como si del contenido de la etiqueta se tratase. Por ejemplo:
```html
<p>
  {{mensaje}}
</p>
```
