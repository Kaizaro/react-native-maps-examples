# React Native Maps Examples
---

Инструкции по использованию нативных карт в React Native (react-native-maps, react-native-maps-super-cluster).

  1. Инициализация карты и кластеризация
  2. Улучшение производительности карты
  3. Домашняя работа #1
  4. Описание дополнительных параметров
  5. Использование изображений в маркерах
  6. Домашняя работа #2
  7. [**TODO**] Установка Placeholder при работе с картой
  8. [**TODO**] Использование контента в маркерах
  9. [**TODO**]
 
---
Пример применения вышеуказанных рекомендаций
(UI 60 FPS, 7500+ маркеров)

![react-native-maps-examples](https://s2.gifyu.com/images/ezgif-3-88188b345c9c.gif)
---

### Установка

> Для успешного запуска проекта необходимо воспользоваться 
> решением **Expo** по быстрой сборке проектов React Native.
> 
> Инструкция по установке Expo
> https://docs.expo.io/get-started/installation/
>
> Скачать приложение **Expo Go** для запуска проектов на собственном устройстве
> iOS: https://apps.apple.com/ru/app/expo-go/id982107779

После клонирования проекта необходимо установить зависимости:
```sh
yarn
```

Запустить проект:
```sh
expo start
```

После запуска проекта необходимо запустить приложение **Expo Go** и выбрать наш проект в списке

### 1. Инициализация карты и кластеризация
---

Для реализации карты будем использовать библиотеку **react-native-maps-super-cluster**, 
https://github.com/novalabio/react-native-maps-super-cluster

Разработчики которой объединили оригинальную библиотеку **react-native-maps** 
с другой популярной библиотекой **supercluster** для кластеризации гео-точек на карте.
https://github.com/mapbox/supercluster


Импортируем библиотеку
```JSX
import ClusteredMapView from 'react-native-maps-super-cluster';
```

Добавим главный компонент **ClusteredMapView** в раздел render нашего кода с обязательными параметрами:

```JSX
<ClusteredMapView
    initialRegion={INITIAL_REGION}
    data={this.state.data}
    renderCluster={this.renderCluster}
    renderMarker={this.renderMarker}
    animateClusters={false}
    style={styles.map}
/>
```

Описание обязательных параметров:
| Prop | Description |
| ------ | ------ |
| initialRegion | Изначальная позиция камера ны карте |
| data | Массив данных для маркеров на карте |
| renderCluster | Функция колл-бек для отображения маркеров кластеризации на карте (1 или больше гео-точек)  |
| renderMarker | Функция колл-бек для отображения маркера, к которому не применима кластеризация (только 1 гео-точка) |
| animateClusters | Встроенная функция для автоматической анимации маркеров на карте |
| style | Параметры стиля |

###
> **initialRegion**

Данный параметр должен принимать объект в определенном формате из константы, в котором 

```JSX
const INITIAL_REGION = {
    latitude: 55.7414887,
    longitude: 37.5790672,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0461,
};
```

**latitude, longitude** отвечают за позицию камеры на карте
**latitudeDelta, longitudeDelta** отвечает за размер карты (zoom) 

Подробнее про latitudeDelta и longitudeDelta можно почитать здесь
https://stackoverflow.com/questions/50882700/react-native-mapview-what-is-latitudedelta-longitudedelta

###
> **data**

Данный параметр должен принимать массив объеков, данные которых мы ходим отобразить на карте.
Формат объектов по типу **GeoPoint** + уникальный **id** (желательно в формате uuid).

```JSX
[
   {
        id: 'cb3d1012-6182-434c-a21e-2bc86c8e1e00',
        location: {
            latitude: 55.7414887, 
            longitude: 37.5790672
        },
   },
   {
        id: '385917c8-e03d-4fdc-817c-1bc80ace17d0',
        location: {
            latitude: 55.6414887, 
            longitude: 37.4790672
        },
    },
    ...
]
```

Если вы принимаете из Вашего API данные другого формата, вы должны их преобразовать в этот формат.

###
> **renderCluster**

Данный параметр принимает callback-функцию для отображения точек кластеризации. 
Например, это могут быть кружки с количественным числом.

```JSX
renderCluster(cluster, onPress) {
    const pointCount = cluster.pointCount;
    const coordinate = cluster.coordinate;

    return (
        <Marker
            coordinate={coordinate}
            onPress={onPress}>
                <View style={styles.myClusterStyle}>
                    <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
                </View>
        </Marker>
    );
}
```

Компонент **Marker** импортируется напрямую из **react-native-maps**

```JSX
import {Marker} from 'react-native-maps';
```

Описание параметров входящих данных:
| Prop | Description |
| ------ | ------ |
| cluster | Объект с данными по определенному кластеру |
| cluster.clusterId | Уникальный id кластера |
| cluster.coordinate | Местонахождение кластера по координатам |
| cluster.pointCount | Количество объектов в данном кластере |
| onPress | Функция, выполняющая передвижение камеры к внутренним объектам указанного кластера  |

###
> **renderMarker**

Данный параметр принимает callback-функцию для отображения маркера, который находится в единственнои числе. 
Например, это могут быть так же круг с числом "1".

```JSX
renderMarker(data) {
    const {location} = data;

    return (
        <Marker coordinate={location}>
            <View style={styles.myMarkerStyle}>
                <Text style={styles.myMarkerTextStyle}>1</Text>
            </View>
        </Marker>
    );
}
```

###

Таким образом, мы получаем решение с картой и кластеризацией объектов на ней.

![supercluster](https://pix.my/tuV2u0)

###
> **animateClusters**

Данный параметр отвечает за анимацию маркеров на карте.
Но, я рекомендую устанавливать данный параметр **false**, 
потому что под капотом этой функции выполняется работа с **LayoutAnimation** из **react-native**.

**LayoutAnimation** выполняет анимацию при изменении любого UI элемента, 
и вместе с маркерами у вас будут анимироваться и другие компоненты. 

К примеру, могут возникнуть проблемы с **react-navigation**, при перехода на экран с картой.

###
###

### 2. Улучшение производительности карты
---

Решение выше имеет недостатки в производительности.

Если воспользоваться **console.log** в функции **renderMarker** или **renderCluster** 
и начать простое передвижение камеры по карте, то мы увидим множественные re-renders в консоли.

Дело в том, что библиотека **react-native-maps-super-cluster** взаимодействует с **supercluster** по "реактивному методу", и функции **renderMarker** и **renderCluster** вызываются в любом случае, даже если
ваши действия не произвели визуальных изменений на карте.

Представьте, что было бы, если бы мы имели больше чем **10 000** маркеров на карте.

**Наша задача избавиться от множественных re-renders, которые "притормаживают" наше приложение:**

 - Вынесем контент из renderMarker и renderCluster в отдельные компоненты ***<ClusterMarker>*** и ***<MyMarker>***
 - Установим ***key***, ***identifier***, **tracksViewChanges** и **tracksInfoWindowChanges** в компоненте <Marker>
 - Воспользуемся функцией жизненного цикла **shouldComponentUpdate**

###
> ClusterMarker.js
```JSX
export default class ClusterMarker extends Component {
    shouldComponentUpdate() {
        return false;
    }

    render() {
        const clusterId = this.props.cluster.clusterId;
        const pointCount = this.props.cluster.pointCount;
        const coordinate = this.props.cluster.coordinate;
        const onPress = this.props.onPress;

        const identifier = `cluster-marker-${clusterId}`;

        return (
            <Marker
                identifier={identifier}
                coordinate={coordinate}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                onPress={onPress}>
                <View style={styles.myClusterStyle}>
                    <Text style={styles.myClusterTextStyle}>{pointCount}</Text>
                </View>
            </Marker>
        );
    }
}
```

###

> MyMarker.js
```JSX
export default class MyMarker extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const {id, location} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}>
                <View style={styles.myMarkerStyle}>
                    <Text style={styles.myMarkerTextStyle}>1</Text>
                </View>
            </Marker>
        );
    }
}
```

> Заменить функции **renderCluster** и **renderMarker** в компоненте с картой

```JSX
    renderCluster(cluster, onPress) {
        const key = `cluster-marker-${cluster.clusterId}`;

        return <ClusterMarker key={key} cluster={cluster} onPress={onPress} />;
    }

    renderMarker(data) {
        const {id, location} = data;

        const key = `marker-${id}`;

        return <MyMarker key={key} id={id} location={location} />;
    }
```

Описание указанных параметров:
| Prop | Description | Additional url |
| ------ | ------ | ------ |
| key | В React любые итерированные компоненты должны иметь уникальный ключ | https://ru.reactjs.org/docs/lists-and-keys.html |
| identifier | Суть применения похожа на **key**. Используется в компоненте **Marker** из **react-native-maps**.  | https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md |
| tracksViewChanges | Отслеживать ли изменения маркера. Используется в компоненте **Marker**. | https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md |
| tracksInfoWindowChanges | Отслеживать ли изменения информационного окна в маркере. Используется в компоненте **Marker**. | https://github.com/react-native-maps/react-native-maps/blob/master/docs/marker.md |
| shouldComponentUpdate | Функция жизненого цикла. Встроенный функционал React для ручного управления по обновлению  компонента (re-render). | https://ru.reactjs.org/docs/react-component.html#shouldcomponentupdate |

> **tracksViewChanges** и **tracksInfoWindowChanges** мы должны установить **false**.
> Это рекомендация от разработчиков **react-native-maps**. 
>
> **shouldComponentUpdate** должен вернуть **false**, чтобы исключить любые переотрисовки компонента.
>
> В данном случае это работает отлично.
> Но в случае использовании изображений в маркере, либо какого-лобо полезного контента, мы будем обязаны оперировать данными параметрами. Примеры мы рассмотрем далее.

### 3. Домашняя работа #1
---

Мы имеем карту из примера #2, в котором добавили метод **onRegionChange**, с помощью которого мы записываем в **state** текущую позицию камеры на карте. Имея данную информацию, мы прокидываем её в другой компонент через **props**

 Необходимо увеличить производительность в коде файла **HomeWork1Screen.js** (избежать лишние re-renders)

### 4.  Описание дополнительных параметров
---

###
| Prop | Description | Default value |
| ------ | ------ | ------ |
| radius | Радиус работы кластера на экране | screen width * 4.5% |
| edgePadding | Отступы между краев экрана и маркеров при нажатии на кластер | { top: 10, left: 10, bottom: 10, right: 10 } |
| accessor | Название key с содержимым координат в значении data | location |
| minZoom | Минимальное значение Zoom для работы кластеризации | 1 |
| maxZoom | Максимальное значение Zoom для работы кластеризации | 16 |
| minZoomLevel | Минимальный предел Zoom для карты | 0 |
| maxZoomLevel | Максимальный предел Zoom для карты | 20 |
| showsPointsOfInterest | Отображать ли достопримечательности на карте | true |
| showsBuildings | Отображать ли 3D-эффект домов при максимальном Zoom | true |
| showsTraffic | Отображать ли информацию о дорожном движении | true |
| showsIndoors | Отображать ли карту помещений | true |

### 5. Использование изображений в маркерах

Рассмотрим несколько способов использования изображений в маркерах:
1. Подключение изображения через встроенный проп маркера **image**

```JSX
const MARKER_IMAGE = require('../../../../assets/favicon.png');

export default class MyMarkerExample1 extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const {id, location} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                image={MARKER_IMAGE}
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}
            />
        );
    }
}
```

2. Через компонент **Image** внутри **Marker**

```JSX
const MARKER_IMAGE = require('../../../../assets/favicon.png');

export default class MyMarkerExample2 extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const {id, location} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}>
                <View style={styles.myMarkerStyle}>
                    <Image source={MARKER_IMAGE} style={styles.imageStyle} />
                </View>
            </Marker>
        );
    }
}
```

3. Использование изображение в Base64 формате

```JSX
const LOGO_BASE64 = `iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAQAAAGKDAGaAAAFgUlEQVRYw7WXa2wUVRTH/20p7fZBW0p5iAplaUELCqEFlUCMYKwJKMYgaEwIUpQYNCIWRYgvQtTS6AeiKEqIQDBIAEFAEEm1DUVUoIqPVqhCC/IoammhC9vt/vywM7szu7NLLfHMl7n3nP/533vuPefMSHap8wNIoG57pxIYSErZDyCgB8qogTYUeKT+v2C+SlLanqA3v4EBwSdAasAI4CUUcA7wRsiBMbDIjQDQd4M0ogimtkrbMWSgAVzibUIouTIwfc4kJaVIkpT+PTxLiGplkHCo6Wq+uSOydlrYl3jD1xOSAQ5zdzcA1CJJK/ygOEk91kIhAMsQmeMDq9MRg7ojGExIINkrOAm8D4DHSg9QwiQApiDmeQzFWaDE2LUQ4DXjedimsAQaShgbqXj4NM4ISZpmVeTbdt6vGISrWtElfs76Fuig9+9hij7qFjbTs6GecEnxSdKa4DjbK0nFrzWFTI4yE/jVsvDsMaauP0JxX0ARviBgOg0A3GnZaVpO4N3llZRYYZrez8dhC/KRxrBVYSt37TPVgSh6GQN8FFxSQPLOqbsBSP3Wy2gLwJIRQcC91mPIOGyaTaTKARBxbllH7EtqZkJsgCRlvrTbF21JQiS3KN7pkFNH/BMOiJ+nq8vQTTNI8ChZnZabXJs7bxzf9zjAO/8kTLfNxynXwTpze6PlnG8/o16B+fzTfqCRgq1W62nXtYff1X1orjRiqzn2M8TgySlqAFjNuqDxFdIRKpWeag/Vo7zfJWXXei1ep3AaKDYDWypNvhLQnETk1+kWf/hC3iUrdGil0i3lAE8iRM/r1cpm3g0aNzAdgB8sACnvm8Bo0AuSLgLwKMeBQjosTEuCAJu0BSPgjsjo5WS0KyUM4Amqf6aO2cFRPUKU0cLAOhvgsgUAUM4u/PQz9lAGwC5/75eDgFlhAHuxKzNmynGtMwDtvMWOmIBahEjbYAACBWYCzY6A18kx3jI2WXolQJvRKMLqb6g5bbO0AnMPlbwSFdBrpwMA4FkOOwJ6mw08q/J8jChZnhtCR9HdfTo2IP6JyGQrfKbVGZBeETWdB723PwzQ/ZISr1IDchs9IcCtnasbWWMvCC3SNUhm2ophJ2raq9pyjycvjbju1yTje/604IzHllMXmH0256BGRBoPTipaO/jv4ktTPaNaC+rd02I5dqUsdTdUXiaGfOYbdKbPi2bnLkjLO3cszGJx+00fRLoemXlg1qkLVDOOxVyM6v4MM4kLlpQh6cObI22OIcatNh0nJj3X/8S2S3aTFhZwJ9/Z5raTZ71npZKUOWVxhPtDuBD5jZI7c+8DJ8/Giga7GcObzCMxMkFKJWlUYm6ztU0cYbihH7lccbv3cw9z+Tuq+yrG8gptNDGHBEcCSXGDjz7NDG6zWQyYLylhTyDSl1nK7VRYHLfxKmOpjCDcaH5dR5T1obPddekel9f95/BPs/ubwa+wB76acTzPRJ6hOWbYGnkEEb/wqlc96eu2CHAJ1cznLg5Fdf8lBQjxBqv87qbcx2MQJFd5HAjMyrSD0bxN6ABbWUiSQ9f4jQnNA7epjwNBSvWVGATmrX+M+xjjUGbLbHbtLLvU7w/dYf/0OrCV0ZTjjUEQ/WOxzJYh+QiRut5GkP6dz/jBms0kartA0ByWIekbbQQ9DnXYHG2gkIJOE7gc5jK32AgyavwOZ/A504N/AjG/px2entvtxf5Hoh5yByspZMN/JMjZbQ/RwRrf1W5RLZMY3Pkd7Ii8q5N71y9rae/CLbI/PY5qfKyk7ttvy13nj3aBIN6XslwZnW2TcX1KMlre8vk7RZB6QsVd7ccD3dUPXTwVhSCuI+lD80fi2iQhb1H+X5ssBEmn9KD+B7k54yut0XX/HfgvpUkmTvPggOsAAAAASUVORK5CYII=`;

export default class MyMarkerExample3 extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
        const {id, location} = this.props;

        const identifier = `marker-${id}`;

        return (
            <Marker
                identifier={identifier}
                tracksViewChanges={false}
                tracksInfoWindowChanges={false}
                coordinate={location}>
                <View style={styles.myMarkerStyle}>
                    <Image
                        source={{
                            uri: `data:image/png;base64,${LOGO_BASE64}`,
                        }}
                        style={styles.imageStyle}
                    />
                </View>
            </Marker>
        );
    }
}
```

### 6. Домашняя работа #2

На карте используется пример из пункта 5, с изображением в маркере (вариант 2).
В компоненте добавлена возможность смены изображения, но изображение не изменяется, необходимо это пофиксить.

Файл **HomeWork2Screen.js**
