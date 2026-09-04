# Explorador de Países

Aplicación móvil desarrollada con React Native y Expo que permite explorar información de distintos países, buscarlos y guardar los preferidos en una lista de favoritos.

## Integrantes

- Franco Urquizo
- Matías Brasburg

## API utilizada

La aplicación consume la API de REST Countries:

- Endpoint: `https://api.restcountries.com/countries/v5`
- Autenticación: token Bearer.
- Información consultada: nombre, código, bandera, capital, continente, población, idiomas y monedas.

Los resultados se solicitan de manera paginada y se ordenan alfabéticamente antes de mostrarse.

## Organización de los componentes

El proyecto se dividió por responsabilidades dentro de la carpeta `src`:

- `screens`: contiene las pantallas principales. `HomeScreen` muestra todos los países y el buscador, mientras que `FavoritesScreen` presenta únicamente los países guardados como favoritos.
- `components`: contiene elementos reutilizables de la interfaz. `CountryCard` representa cada país de la lista y `CountryDetailsModal` muestra su información ampliada.
- `hooks`: contiene la lógica reutilizable. `useCountries` consulta y transforma los datos de la API, y `useFavorites` administra y persiste los favoritos.
- `styles`: centraliza los colores, tamaños de fuente y espacios utilizados por la aplicación.
- `config.js`: almacena la configuración necesaria para conectarse con la API.

La navegación inferior entre las pantallas de exploración y favoritos se configura en `App.js` mediante React Navigation.

## Funcionalidades implementadas

- Consulta paginada de países desde una API externa.
- Listado de países con nombre, bandera, capital y continente.
- Búsqueda por nombre de país o continente.
- Pantallas de carga, error y resultados vacíos.
- Vista de información ampliada al presionar un país.
- Visualización de capital, región, población, idiomas y monedas.
- Posibilidad de agregar y quitar países de favoritos.
- Persistencia local de favoritos mediante AsyncStorage.
- Pantalla independiente para consultar los países favoritos.
- Navegación mediante pestañas inferiores.
- Interfaz adaptable para Android, iOS y web mediante Expo.

## Diferencias entre React y React Native

Aunque ambos utilizan componentes, propiedades, estado y hooks, encontramos algunas diferencias importantes:

- En React se utilizan elementos HTML como `div`, `p`, `input` o `img`. En React Native se reemplazan por componentes como `View`, `Text`, `TextInput` e `Image`.
- React web utiliza CSS tradicional, clases y archivos de estilos. En React Native los estilos se escriben como objetos de JavaScript mediante `StyleSheet` y algunas propiedades tienen nombres diferentes.
- Los eventos también cambian. Por ejemplo, en React web se usa normalmente `onClick`, mientras que React Native utiliza `onPress` junto con componentes como `Pressable`.
- React Native no trabaja directamente con el DOM ni con las APIs específicas del navegador.
- Para guardar datos en una aplicación web se puede utilizar `localStorage`. En React Native usamos `AsyncStorage`, cuya API es asincrónica.
- La navegación web suele estar basada en URLs y React Router. En la versión móvil utilizamos React Navigation y una barra de pestañas inferior.
- En dispositivos móviles hay que considerar distintos tamaños de pantalla, áreas seguras, comportamiento del teclado y diferencias entre Android e iOS.
- Expo simplifica la ejecución y las pruebas de la aplicación en Android, iOS y web desde una misma base de código.

## Ejecución del proyecto

Primero se deben instalar las dependencias:

```bash
npm install
```

Luego se inicia Expo:

```bash
npm start
```

Desde la terminal de Expo se puede abrir la aplicación en Android, iOS o en el navegador.
