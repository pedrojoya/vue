# Componentes
## Intro
Los componentes permiten crear elementos HTML personalizados para encapsular código reutilizable.
Para registrar un componente global, usaremos la siguiente sentencia, antes de crear la instancia principal de Vue, asignando al componente un nombre en minúsculas y sin espacios, y pasándole un objeto de configuración:
```javascript
Vue.component('mi-componente', {
  // Objeto de configuración
})
```
Una vez registrado, un componente puede ser utilizado en la plantilla de una instancia como una etiqueta personalizada:
```html
<mi-componente></mi-componente>
```
El objeto de configuración de un componente contendrá las siguientes propiedades, la mayoría similares a las que vimos en la instancia Vue:
- `template`: Plantilla del componente. Corresponde al código HTML por el que debe sustituirse la etiqueta personalizada del componente. Debe contener un único elemento raíz.
- `props`: Propiedades del componente. Corresponde a los parámetros de entrada al componente, que serán suministrados como propiedades de la etiqueta personalizada del componente.
- `data`: Modelo de datos manejado por el componente. A diferencia de en la instancia Vue, `data` **debe ser una función que retorne un objeto con el modelo de datos**.
- `methods`: Métodos del componente.
- `computed`: Propiedades calculadas del componente.
- Métodos del ciclo de vida de las instancias, como `created`, `mounted`, etc.

Así, el componente más sencillo que podemos crear es uno que solo contiene una plantilla estática, como por ejemplo:
```javascript
// Componente global
Vue.component('mi-titulo', {
  template: '<p>Soy el componente título</p>',
});

// Instancia principal
const vm = new Vue({
  el: "#principal",
});
```
que usaríamos en nuestro HTML de la siguiente manera:
```html
<mi-titulo></mi-titulo>
```
La mayoría de las propiedades del objeto constructor de la instancia Vue pueden ser utilizadas en un componente, pero hay un caso especial: `data` no debe ser un objeto, sino una función. Veamos un ejemplo:
```javascript
Vue.component('contador', {
  // Como la plantilla tiene más de una línea usamos las comillas ` de ES6.
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
```
## Propiedades
Cada componente tiene su propio ámbito aislado, por lo que NO se pueden referenciar directamente datos de un componente padre en la plantilla de un componente hijo, sino que deberemos pasar dichos datos desde el padre al hijo usando propiedades.

Una propiedad es un atributo HTML personalizado para pasar información desde componentes padres. Un componente hijo debe declarar explícitamente las propiedades que espera recibir utilizando `props: ['nombreprop1', 'nombreprop2']`.

Para usar una propiedad en la plantilla del componente hijo usaremos simplemente su nombre.

Los atributos HTML no distinguen entre mayúsculas y minúsculas, por lo que los nombres de propiedades definidos en formato *camelCase* deben ser escritos en la etiqueta usando su equivalente *kebab-case*. Por ejemplo, el componente
```javascript
Vue.component('mi-texto', {
  template: '<p>{{elTexto}}</p>',
  props: ['elTexto'],
});
```
debe ser usado de la siguiente manera:
```html
<mi-texto el-texto="Soy el componente mi-texto"></mi-texto>
```
Debemos tener en cuenta que el valor pasado a la propiedad es por defecto texto. Si queremos el valor sea evaluado por Vue, ya sea porque se trate de una expresión del modelo o simplemente porque no queramos que se pase como texto, en vez de especificar el atributo normalmente, debemos usar la directiva `v-bind:atributo=expr`, o su forma corta `:atributo=expr`. 

En el siguiente ejemplo el valor de la propiedad NO será la cadena `mensaje`, sino el valor al que se evalúe la variable `mensaje` del modelo de datos del componente padre:
```html
<mi-texto :el-texto="mensaje"></mi-texto>
```
Las propiedades establecen un enlace de un solo sentido desde el componente padre al componente hijo, de manera que, en el ejemplo anterior, si la variable `mensaje` del modelo del padre cambia, dicho cambio se propagará hacia la propiedad del hijo.

Sin embargo, no funcionará de igual manera en el sentido contrario. Si se cambia el valor de la propiedad en el componente hijo, dicho cambio NO será propagado a la variable modelo del componente padre. De hecho, Vue nos mostrará un *warning* en la consola. Por tanto NO debemos modificar las propiedades desde el componente hIjo.

¿Y si el componente hijo debe modificar el valor recibido porque éste es simplemente un valor inicial? La solución consiste en definir una variable del modelo de datos en el componente hijo y asignarle como valor inicial el valor de la propiedad. Podremos acceder a una propiedad del componente usando la palabra reservada `this.nombrepropiedad`, ya que Vue creará el proxy correspondiente para cada una de las propiedades.

¿Y si el componente hijo debe modificar el valor recibido para realizar alguna transformación? La solución consiste en definir una *computed property* correspondiente a la función de transformación que se aplica sobre el valor de la propiedad. Por ejemplo:

```javascript
Vue.component('contador', {
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
```
En lugar de definir las propiedades como un array de cadenas de texto con los nombres de las propiedades, podemos establecer como valor de `props` un objeto que contenga las distintas propiedades, incluyendo para cada una de ellas opciones de validación, que se deben realizar sobre el valor pasado desde el padre.

Estas opciones de validación incluyen:
- El tipo de la propiedad.
- El valor por defecto de la propiedad, ya sea un valor simple o calculada mediante una función.
- Si es obligatorio pasar un valor para la propiedad.
- Una función personalizada de validación., como por ejemplo: su tipo, si es obligatorio o el valor por defecto. Veamos el mismo ejemplo anterior, pero mejorado para incluir validación automática. 

Por ejemplo:

```javascript
Vue.component('contador', {
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
```

## Plantillas
Un aspecto muy importante de las plantillas de los componentes es que **deben contener un único elemento raíz**.

Las formas que hemos visto en los ejemplos anteriores de especificar el valor de la propiedad `template` en el objeto de configuración de un componente son útiles cuando la plantilla contiene pocas etiquetas HTML. 

Sin embargo, si la plantilla es compleja se recomienda usar una sintaxis alternativa. Por ejemplo:
```javascript
Vue.component('mi-componente', {
  template: '#mi_componente_template',
  // ...
}
```
Después en el archivo con nuestro HTML definiríamos:
```html
<template id="mi_componente_template">
  <!-- ... -->
</template>
```

Otra alternativa, conocida como plantilla en línea (*inline template*), consiste en incluir la plantilla como hijo de la etiqueta correspondiente al componente, en cuyo caso NO debemos especificar propiedad `template` en el objeto de configuración del mismo. Para que Vue acepte esta sintaxis es necesario que añadamos un atributo `inline-template` a la etiqueta del componente. Por ejemplo:
```html
<mi-componente inline-template>
  <!-- Plantilla del componente -->
  <!-- ... -->
</mi-componente>
```  

