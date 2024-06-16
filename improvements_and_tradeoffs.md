# Improvements and Trade-offs

### What would you improve from your code
Explorar alternativas que mejoren la velocidad de busqueda, como la implementación de un radio de busqueda como parametro de entrada. Aunque esto también depende de como este pensada la funcionalidad de forma mas detallada.

### Which trade offs would you make to accomplish this on time? What'd you do next time to deliver more and sacrifice less?
Se simplificó mucho la logica de negocio debido a que habian muchos más puntos a tratar como la contrucción y configuración de todo el servicio, la documentación del mismo, configurar y montar los tests, agregar seguridad, entre otros detalles. Ya teniendo un proyecto inicial y más contexto se puede hacer mas focus en la logica de negocio hacerla más robusta.

### Do you think your service is secure?
Sí, ya que la implementación de autenticación JWT con firma asimétrica (llave privada y publica) genera un alto grado de seguridad. Pero de todas maneras se deberia cambiar las llaves cada cierto tiempo y guardar la llave privada en un lugar seguro (para este ejercicio se dejo en el repo ya que es solo una prueba)

### What would you do to measure the behavior of your product in a production environment?
Hay varias formas como por ejemplo medir el profiler de mongoDB donde se muestra información detallada de las queries que se han ejecutado y el tiempo que han tardado.
También se puede usar herramienta de AWS (si se tiene acceso) como amazon cloudWatch o alarmas.
También se puede hacer pruebas de estres en mi caso he usado Jmeter