Asistente de Notas Administrativas
Qué construí

Construí una aplicación web sencilla llamada Asistente de Notas Administrativas, destinada a generar borradores de notas formales a partir de datos ingresados por el usuario. Permite completar asunto, destinatario, antecedente, actividad, fecha, lugar e información adicional, y transforma esos datos en un texto administrativo organizado. La aplicación está pensada para facilitar una tarea administrativa repetitiva y reducir el tiempo necesario para estructurar un primer borrador.

Cómo se lo pedí

Primero verifiqué que el agente tuviera acceso al repositorio:

Quiero trabajar sobre mi repositorio público de GitHub llamado asistente-notas-ia.

Primero verificá si tenés acceso al repositorio y decime qué archivos contiene actualmente.

No hagas cambios todavía. Solo confirmame que podés acceder al repositorio y describime brevemente su contenido.

Luego le pedí que construyera la primera versión:

Quiero que construyas en este repositorio una primera versión funcional de una aplicación web sencilla llamada “Asistente de Notas Administrativas”.

Objetivo:
La aplicación debe ayudar a una persona a preparar el borrador de una nota administrativa formal a partir de datos básicos ingresados por el usuario.

Quiero una interfaz simple, clara y profesional, en español.

La aplicación debe permitir ingresar:

Asunto
Destinatario
Antecedente o motivo
Actividad o tema principal
Fecha
Lugar
Información adicional

Debe tener un botón “Generar borrador”.

Al presionarlo, la aplicación debe construir automáticamente un borrador de nota formal utilizando la información ingresada.

El resultado debe mostrarse claramente debajo del formulario y debe existir un botón “Copiar texto”.

También debe existir un botón “Limpiar” para comenzar una nueva nota.

Por ahora no quiero utilizar información sensible ni servicios externos. La aplicación debe funcionar con datos ficticios ingresados manualmente por el usuario.

Quiero que vos decidas la estructura técnica más sencilla para que pueda ejecutarse y demostrarse fácilmente.

Importante: yo no quiero escribir código manualmente. Creá vos todos los archivos necesarios y explicame al finalizar qué hiciste y cómo puedo probar la aplicación.

No modifiques todavía el README, porque más adelante vamos a documentar allí el proceso completo de construcción e iteración.

Después de probar la primera versión, detecté que la redacción era demasiado mecánica, por lo que realicé una segunda iteración:

Probé la primera versión de la aplicación y funciona correctamente, pero detecté que la redacción del borrador puede mejorar.

En la prueba aparecieron expresiones demasiado mecánicas, por ejemplo:

“Me dirijo a usted en relación con el siguiente antecedente o motivo”

y

“En este marco, se informa y pone a consideración lo siguiente: Solicitar autorización...”

Quiero que mejores la generación del borrador para que el texto resulte más natural, formal y administrativo.

La aplicación debe interpretar los datos ingresados y construir una nota coherente, evitando mencionar literalmente nombres de campos como “antecedente o motivo”, “actividad o tema principal” o “información adicional”.

También quiero que:

Mantenga el lugar y la fecha al comienzo.
Mantenga claramente identificado el destinatario.
Mantenga el asunto.
Integre antecedente, solicitud e información adicional en párrafos coherentes.
Utilice un lenguaje formal y conciso.
Evite repeticiones innecesarias.
Termine con un cierre formal apropiado.
Mantenga los botones “Copiar texto” y “Limpiar”.
No utilice servicios externos ni envíe información fuera del navegador.

No modifiques todavía el README.

Actualizá los archivos necesarios, publicá los cambios en el mismo repositorio y explicame brevemente qué modificaste.

Qué funciona

La aplicación funciona desde el navegador y fue publicada utilizando GitHub Pages.

Permite completar los datos de una nota, presionar “Generar borrador” y obtener automáticamente una propuesta de redacción administrativa. También permite copiar el texto generado y limpiar el formulario para comenzar una nueva nota.

Probé la aplicación con datos ficticios relacionados con una solicitud de autorización para participar en una actividad de capacitación. La primera versión generó correctamente la nota, aunque la redacción era demasiado mecánica. Después de la segunda iteración, el texto resultó más natural y formal, integrando mejor el antecedente, la solicitud y la información adicional.

La aplicación publicada puede probarse en:

[https://hectorgustavoberetta-art.github.io/asistente-notas-ia/](https://hectorgustavoberetta-art.github.io/asistente-notas-ia/)

Qué falta o qué falló

La primera versión funcionó técnicamente, pero utilizaba expresiones demasiado rígidas, como “el siguiente antecedente o motivo” o “se informa y pone a consideración lo siguiente”. Esto hacía evidente que el texto se estaba construyendo directamente a partir de los nombres de los campos del formulario.

Le pedí al agente que modificara la lógica de generación para integrar la información de manera más natural. El agente actualizó la aplicación y mejoró la redacción.

Al probar la segunda versión inicialmente seguía apareciendo el texto anterior. El problema no estaba en la modificación realizada por el agente, sino en que el navegador estaba mostrando una versión almacenada anteriormente. Después de realizar una recarga forzada de la página, apareció correctamente la nueva versión.

Como posible mejora futura, la aplicación podría incorporar distintos tipos de notas o estilos de redacción según el objetivo de la comunicación.

Qué aprendí

Entendí que trabajar con un agente no consiste solamente en darle una instrucción inicial y aceptar el primer resultado. Una parte importante del proceso es probar lo construido, detectar concretamente qué no funciona como esperaba y volver a explicarle al agente qué quiero mejorar.

También comprobé que no necesito saber escribir el código para poder construir una aplicación pequeña, pero sí necesito poder definir con claridad el problema, evaluar el resultado y tomar decisiones durante las iteraciones.

Finalmente, aprendí que algunos problemas que aparecen durante el proceso no necesariamente están en el código: en este caso, una versión anterior almacenada por el navegador hizo parecer inicialmente que la modificación no había funcionado.
