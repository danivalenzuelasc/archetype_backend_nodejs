# API Restful de integraciones para Chile (NodeJS)

[![Travis branch](https://img.shields.io/travis/nubox-spa/integraciones_backend_cl/master.svg?style=for-the-badge)](https://travis-ci.org/nubox-spa/integraciones_backend_cl)
[![David](https://img.shields.io/david/nubox-spa/integraciones_backend_cl.svg?style=for-the-badge)](http://david-dm.org/nubox-spa/integraciones_backend_cl)
[![David](https://img.shields.io/david/dev/nubox-spa/integraciones_backend_cl.svg?style=for-the-badge)](http://david-dm.org/nubox-spa/integraciones_backend_cl?type=dev)
[![Codecov branch](https://img.shields.io/codecov/c/github/nubox-spa/integraciones_backend_cl/master.svg?style=for-the-badge)](https://codecov.io/github/nubox-spa/integraciones_backend_cl?branch=master)

## Configuración inicial del proyecto


## Uso de Gitflow Workflow
<div align='justify'>
Gitflow Workflow es un diseño de flujo de trabajo de Git que fue publicado y popularizado por <a href="http://nvie.com/posts/a-successful-git-branching-model/">Vincent Driessen en nvie</a>. El flujo de trabajo de Gitflow define un modelo de ramificación estricto diseñado en torno a la versión del proyecto. Esto proporciona un marco robusto para la gestión de proyectos más grandes.
<br /><br />
Gitflow es ideal para proyectos que poseen un ciclo de lanzamiento programado. Este flujo de trabajo no agrega ningún concepto o comando nuevo más allá de lo que se requiere para el <a href="https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow">flujo de trabajo de la rama <b>Feature</b></a>. En cambio, asigna funciones muy específicas a diferentes ramas y define cómo y cuándo deberían interactuar. Además de las ramas Features, usa ramas individuales para preparar, mantener y registrar lanzamientos. Por supuesto, también puede aprovechar todos los beneficios del Flujo de trabajo de la función Feature: Pull Request, experimentos aislados y colaboración más eficiente.
</div>

### Comencemos
<div align='justify'>
Gitflow es solo una idea abstracta de un flujo de trabajo con Git. Esto significa que dicta qué tipo de ramas configurar y cómo combinarlas. El conjunto de herramientas Gitflow es una herramienta de línea de comando real que tiene un proceso de instalación. Los paquetes para Gitflow están disponibles en múltiples sistemas operativos. En sistemas OSX, puede ejecutar brew install git-flow. En Windows, deberá descargar e instalar Gitflow. Después de instalar Gitflow, puede usarlo en su proyecto ejecutando git flow init. Gitflow es un envoltorio alrededor de Git. El comando git flow init es una extensión del comando git init predeterminado y no cambia nada en su repositorio que no sea crear ramas por usted.
</div>

### Ramas master y develop
<div align='justify'>
<br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg?cdnVersion=jv' width='600' alt='Ramas Master y Develop'>
</p>
<br />
En lugar de una única rama maestra, este flujo de trabajo utiliza dos ramas para registrar el historial del proyecto. La rama Master almacena el historial de versiones oficial, y la rama Develop sirve como una rama de integración para las características. También es conveniente etiquetar todas las confirmaciones en la rama Master con un número de versión.
<br /><br />
El primer paso es complementar la rama Master predeterminada con una rama Develop. Una forma simple de hacerlo es que un desarrollador cree localmente una rama Develop vacía y la envíe al servidor:
<br /><br />
</div>

```sh
$ git branch develop
$ git push -u origin develop
```

<div align='justify'>
Esta rama contendrá el historial completo del proyecto, mientras que Master contendrá una versión abreviada. Otros desarrolladores deberían ahora clonar el repositorio central y crear una rama de seguimiento para su desarrollo.
<br /><br />
Al usar la biblioteca de extensión Gitflow, la ejecución de git flow init en un repositorio existente creará la rama Develop:
<br /><br />
</div>

```sh
$ git flow init
Initialized empty Git repository in ~/project/.git/
No branches exist yet. Base branches must be created now.
Branch name for production releases: [master]
Branch name for "next release" development: [develop]

How to name your supporting branch prefixes?
Feature branches? [Feature]
Release branches? [release/]
Hotfix branches? [hotfix/]
Support branches? [support/]
Version tag prefix? []

$ git branch
* develop
master
```

### Rama Feature
<div align='justify'>
Cada nueva característica debe residir en su propia rama, que puede enviarse al depósito central para copia de <b>backup/collaboration</b>. Pero, en lugar de ramificarse fuera de Master, las ramas Features utilizan Develop como su rama padre. Cuando se completa una característica, se fusiona de nuevo en Develop. Las características nunca deben interactuar directamente con Master.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:2bef0bef-22bc-4485-94b9-a9422f70f11c/02%20(2).svg?cdnVersion=jv' width='600' alt='Rama Feature'>
</p>
<br />
Tenga en cuenta que las ramas Features combinadas con la rama Develop son, a todos los efectos, el flujo de trabajo de las rama Features. Pero, el flujo de trabajo de Gitflow no se detiene allí.
<br /><br />
Las ramas Features generalmente se crean en la última rama Develop.
</div>

### Creando una rama Feature
<div align='justify'>
Sin las extensiones de Gitflow:
<br /><br />
</div>

```sh
$ git checkout develop
$ git checkout -b feature_branch
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git flow feature start feature_branch
```

<div align='justify'>
Continúa tu trabajo y usa Git como lo harías normalmente.
</div>

### Finalizando una rama Feature
<div align='justify'>
Cuando hayas terminado el trabajo de desarrollo de la rama Feature, el siguiente paso es fusionar la rama Feature en Develop.
<br /><br />
Sin las extensiones de Gitflow:
<br /><br />
</div>

```sh
$ git checkout develop
$ git merge feature_branch
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git flow feature finish feature_branch
```

### Rama release/
<div align='justify'>
<br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:a9cea7b7-23c3-41a7-a4e0-affa053d9ea7/04%20(1).svg?cdnVersion=jv' width='600' alt='Rama Release'>
</p>
<br />
Una vez que el desarrollo ha adquirido las características suficientes para un lanzamiento (o se acerca una fecha de lanzamiento predeterminada), se bifurca una rama de liberación del desarrollo. La creación de esta rama inicia el siguiente ciclo de publicación, por lo que no se pueden agregar nuevas características después de este punto; solo las correcciones de errores, la generación de documentación y otras tareas orientadas a la versión deberían ir en esta rama. Una vez que está listo para enviar, la rama de lanzamiento se fusiona en Master y se etiqueta con un número de versión. Además, debería fusionarse nuevamente Develop, que puede haber progresado desde que se inició el lanzamiento.
<br /><br />
El uso de una rama dedicada para preparar lanzamientos permite que un equipo pueda pulir la versión actual mientras que otro equipo continúa trabajando en las funciones para la próxima versión. También crea fases de desarrollo bien definidas (por ejemplo, es fácil decir: "Esta semana nos estamos preparando para la versión 4.0" y verla realmente en la estructura del repositorio).
<br /><br />
Hacer ramas de liberación es otra operación directa de ramificación. Al igual que las ramas Features, las ramas de publicación se basan en la rama Develop. Se puede crear una nueva rama de publicación utilizando los siguientes métodos.
<br /><br />
Sin las extensiones de Gitflow:
<br /><br />
</div>

```sh
$ git checkout develop
$ git checkout -b release/0.1.0
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git flow release start 0.1.0
Switched to a new branch 'release/0.1.0'
```

<div align='justify'>
Una vez que el lanzamiento esté listo para enviarse, se fusionará en Master y en Develop, luego se eliminará la rama de lanzamiento. Es importante fusionarse nuevamente en Develop porque las actualizaciones críticas se pueden haber agregado a la rama de publicación y deben ser accesibles a las nuevas características. Si su organización hace hincapié en la revisión del código, este sería un lugar ideal para un <b>Pull Request</b>.
<br /><br />
Para finalizar una rama de publicación, use los siguientes métodos:
<br /><br />
Sin las extensiones de Gitflow:
<br /><br />
</div>

```sh
$ git checkout develop
$ git merge release/0.1.0
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git checkout master
$ git checkout merge release/0.1.0
$ git flow release finish '0.1.0'
```

### Rama hotfix/
<div align='justify'>
<br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:61ccc620-5249-4338-be66-94d563f2843c/05%20(2).svg?cdnVersion=jv' width='600' alt='Rama Hotfix'>
</p>
<br />
Las ramas de mantenimiento o <b>hotfix</b> se utilizan para parchear rápidamente las versiones de producción. Las ramas de revisión se parecen mucho a las ramas de versión y ramas de excepción, excepto que se basan en Master en lugar de desarrollarse. Esta es la única rama que debe partir directamente de Master. Tan pronto como se complete el arreglo, se debe fusionar en Master y en Develop (o la rama de la versión actual), y la rama Master debe etiquetarse con un número de versión actualizado.
<br /><br />
Tener una línea dedicada de Develop para corregir fallas le permite a su equipo solucionar los problemas sin interrumpir el resto del flujo de trabajo o esperar el siguiente ciclo de publicación. Puede pensar en las ramas de mantenimiento como ramas de publicación ad hoc que trabajan directamente con Master. Se puede crear una rama de revisión utilizando los siguientes métodos:
<br /><br />
Sin las extensiones de Gitflow:
<br /><br />
</div>

```sh
$ git checkout master
$ git checkout -b hotfix_branch
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git flow hotfix start hotfix_branch
```

<div align='justify'>
De forma similar a finalizar una rama de publicación, una rama de revisión se fusiona tanto en Master como en Develop.
<br /><br />
</div>

```sh
$ git checkout master
$ git merge hotfix_branch
$ git checkout develop
$ git merge hotfix_branch
$ git branch -D hotfix_branch
```

<div align='justify'>
Cuando se utiliza la extensión Gitflow:
<br /><br />
</div>

```sh
$ git flow hotfix finish hotfix_branch
```


## Uso de Pull Request
<div align='justify'>
Los <b>Pull Request</b> son una función que facilita que los desarrolladores colaboren con diversos repositorios Git. Proporcionan una interfaz web fácil de usar para discutir los cambios propuestos antes de integrarlos en el proyecto oficial.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:ff6b00cc-0ca3-4d5b-8235-8d4cbcedd19e/01.svg?cdnVersion=jv' width='400' alt='Pull Request 1'>
</p>
<br /><br />
En su forma más simple, los Pull Request son un mecanismo para que un desarrollador notifique a los miembros del equipo que se ha completado una funcionalidad. Una vez que su rama Feature está lista, el desarrollador presenta un Pull Request a través de su cuenta en el repositorio. Esto permite que todos los involucrados sepan que necesitan revisar el código y fusionarlo en la rama Master.
<br /><br />
Sin embargo, el Pull Request es más que solo una notificación: es un foro dedicado para analizar la funcionalidad propuesta. Si hay algún problema con los cambios, los compañeros de equipo pueden publicar comentarios en el Pull Request e incluso modificar la funcionalidad presionando commits de seguimiento. Toda esta actividad se rastrea directamente dentro del Pull Request.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:dc1a0821-efd6-4852-b7e6-c3a787656c61/02.svg?cdnVersion=jv' width='600' alt='Pull Request 2'>
</p>
<br />
En comparación con otros modelos de colaboración, esta solución formal para compartir confirmaciones hace que el flujo de trabajo sea mucho más optimizado. SVN y Git pueden enviar automáticamente correos electrónicos de notificación con una secuencia de comandos simple; Sin embargo, cuando se trata de discutir cambios, los desarrolladores generalmente tienen que depender de los hilos del correo electrónico. Esto puede volverse aleatorio, especialmente cuando se trata de compromisos de seguimiento. Los Pull Request ponen toda esta funcionalidad en una interfaz web amigable junto a sus repositorios.
</div>

### Anatomía de un Pull Request
<div align='justify'>
Cuando archivas un Pull Request, todo lo que estás haciendo es solicitar que otro desarrollador (por ejemplo, el mantenedor del proyecto) retire una rama de tu repositorio en su repositorio. Esto significa que debe proporcionar 4 elementos de información para presentar un Pull Request: el repositorio de origen, la rama de origen, el respositorio de destino y la rama de destino.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:3a777a86-6106-4484-b75d-f2f19abc0e7f/03.svg?cdnVersion=jv' width='600' alt='Anatomía de un Pull Request'>
</p>
<br />
Muchos de estos valores serán configurados por el sistema administrador del repositorio de forma predetermina. Sin embargo, dependiendo de su flujo de trabajo de colaboración, su equipo puede necesitar especificar diferentes valores. El diagrama anterior muestra un Pull Request que solicita fusionar una rama Feature en la rama maestra oficial, pero hay muchas otras maneras de usar Pull Request.
</div>

### Como funciona
<div align='justify'>
Los Pull Request se pueden utilizar junto con Flujo de trabajo de la rama Feature, Flujo de trabajo de Gitflow o Flujo de trabajo de bifurcación. Pero un Pull Request requiere dos ramas distintas o dos repositorios distintos, por lo que no funcionarán con el flujo de trabajo centralizado. El uso de Pull Request con cada uno de estos flujos de trabajo es ligeramente diferente, pero el proceso general es el siguiente:
<br /><br />
1. Un desarrollador crea un Feature en una rama dedicada en su repositorio local.
<br />
2. El desarrollador sube la rama a un repositorio.
<br />
3. El desarrollador crea un Pull Request a través del sistema de gestión de repositorios.
<br />
4. El resto del equipo revisa el código, lo discute y lo modifica de ser necesario.
<br />
5. El mantenedor del proyecto fusiona la funcionalidad nueva en el repositorio oficial y cierra el Pull Request.
<br /><br />
El resto de esta sección describe cómo los Pull Request se pueden aprovechar frente a diferentes flujos de trabajo de colaboración.
</div>

### Flujo de un Pull Request desde una rama Feature
<div align='justify'>
El flujo de trabajo desde una rama Feature utiliza un repositorio compartido para administrar la colaboración, y los desarrolladores crean nuevas funcionalidades en ramas aisladas. Pero, en lugar de fusionarlos inmediatamente en Master, los desarrolladores deben abrir un Pull Request para iniciar una discusión sobre la funcionalidad antes de que se integre en la base de código principal.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:8c784aa1-3393-49b7-b4c5-2b91bf3aa48a/04.svg?cdnVersion=jv' width='600' alt='Flujo de trabajo de un Pull Request con Feature'>
</p>
<br />
Solo hay un repositorio público en el flujo de trabajo de la rama Feature, por lo que el repositorio de destino del Pull Request y el repositorio de origen siempre serán los mismos. Normalmente, el desarrollador especificará su rama Feature como la rama de origen y la rama principal como la rama de destino.
<br /><br />
Después de recibir el Pull Request, el responsable del proyecto debe decidir qué hacer. Si la funcionalidad se encuentra lista, simplemente pueden fusionarla en Master y cerrar el Pull Request. Pero, si hay problemas con los cambios propuestos, pueden publicar comentarios en el Pull Request. Las confirmaciones de seguimiento aparecerán justo al lado de los comentarios relevantes.
<br /><br />
También es posible presentar el Pull Request para una funcionalidad que está incompleta. Por ejemplo, si un desarrollador tiene problemas para implementar un requisito en particular, puede presentar el Pull Request que contenga su trabajo en progreso. Otros desarrolladores pueden proporcionar sugerencias dentro del Pull Request, o incluso arreglar el problema ellos mismos con confirmaciones adicionales.
</div>

### Flujo de un Pull Request con Gitflow
<div align='justify'>
El flujo de trabajo de Gitflow es similar al flujo de trabajo desde una rama Feature, pero define un modelo de ramificación estricto diseñado en torno a la versión del proyecto. Agregar Pull Request a Gitflow Workflow les brinda a los desarrolladores un lugar conveniente para hablar sobre una rama de versión o una rama de mantenimiento mientras trabajan en ello.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:a5c54fd9-09d7-4f59-90c1-8b228fec80a5/06.svg?cdnVersion=jv' width='600' alt='Flujo de trabajo de un Pull Request con Gitflow'>
</p>
<br />
La mecánica de los Pull Request en Gitflow Workflow es exactamente la misma que en la sección anterior: un desarrollador simplemente presenta un Pull Request cuando se debe revisar una característica, versión o revisión, y el resto del equipo recibirá una notificación a través de Bitbucket.
<br /><br />
Las ramas Features generalmente se fusionan en la rama Develop, mientras que las ramas de lanzamiento y revisión se fusionan en Develop y Master. Los Pull Request se pueden usar para gestionar formalmente todas estas fusiones.
</div>

### Flujo de un Pull Request con Forking
<div align='justify'>
En el flujo de trabajo con Forking, un desarrollador empuja una rama Feature completa a su propio repositorio público en lugar de uno compartido. Después de eso, presentan un Pull Request para informar al responsable del proyecto que está listo para su revisión.
<br /><br />
El aspecto de notificación de los Pull Request es particularmente útil en este flujo de trabajo porque el responsable del proyecto no tiene forma de saber cuándo otro desarrollador ha agregado confirmaciones a su repositorio.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:2510a321-ba5f-4c31-82ec-f3ad062c8e6d/07.svg?cdnVersion=jv' width='600' alt='Flujo de trabajo de un Pull Request con Gitflow'>
</p>
<br />
Como cada desarrollador tiene su propio repositorio público, el repositorio de origen del Pull Request diferirá de su repositorio de destino. El repositorio fuente es el repositorio público del desarrollador y la rama fuente es la que contiene los cambios propuestos. Si el desarrollador intenta fusionar la rama Feature en la base de código principal, entonces el repositorio de destino es el proyecto oficial y la rama de destino es Master.
<br /><br />
Los Pull Request también se pueden usar para colaborar con otros desarrolladores fuera del proyecto oficial. Por ejemplo, si un desarrollador estaba trabajando en una rama Feature con un compañero de equipo, podría presentar un Pull Request utilizando el repositorio del compañero de equipo para el destino en lugar del proyecto oficial. Luego utilizarían la misma rama Feature para las ramas de origen y destino.
<br /><br />
<p align='center'>
  <img src='https://wac-cdn.atlassian.com/dam/jcr:0907a594-5786-47fb-87b4-05fc08e0c8dc/08.svg?cdnVersion=jv' width='600' alt='Flujo de trabajo de un Pull Request con Gitflow'>
</p>
<br />
Los dos desarrolladores podrían discutir y desarrollar la rama Feature dentro del Pull Request. Cuando terminen, uno de ellos presentará otro Pull Request solicitando fusionar la rama Feature en la rama principal oficial. Este tipo de flexibilidad hace que los Pull Request sean una herramienta de colaboración muy poderosa en el flujo de trabajo de Forking.
</div>


## Uso de Linters


## Uso de Unit Test


## Uso de Coverage Test


## Uso de Precommit


