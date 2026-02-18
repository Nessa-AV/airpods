// Данные продуктов - ГЛОБАЛЬНЫЕ
const productDetails = {
    lite: {
        name: 'AirPods 4', basePrice: 129,
        colors: [
            { name: 'White', code: '#f5f5f7', image: 'https://img.freepik.com/free-vector/headphones-wireless-realistic-composition-with-isolated-image-phones-with-power-bank-dock-station-with-reflections-vector-illustration_1284-73201.jpg?t=st=1770564185~exp=1770567785~hmac=ce38564149b5ca5fc6fc04eb9140e03706ea2aa83c545189693d8ef6661c39d7' },
            { name: 'Black', code: '#1d1d1f', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&auto=format&fit=crop&q=80' }
        ]
    },
    pro: {
        name: 'AirPods 3', basePrice: 249,
        colors: [
            { name: 'White', code: '#f5f5f7', image: 'freepik__airpods-3-pro-without-background-crisp-white-earbu__56747.png' },
            { name: 'Black', code: '#1d1d1f', image: 'https://images.unsplash.com/photo-1612442449529-8d3f25956c74?w=600&auto=format&fit=crop&q=80' }
        ]
    },
    max: {
        name: 'Pods Max', basePrice: 549,
        colors: [
            { name: 'Black', code: '#1d1d1f', image: 'https://i.pinimg.com/1200x/4e/84/e3/4e84e33d9ed16efa781cd656e748a896.jpg' },
            { name: 'White', code: '#f5f5f7', image: 'https://i.pinimg.com/736x/25/85/cf/2585cf3a0c21fd7677ac97f210153637.jpg' },
            { name: 'Blue', code: '#3a5d80', image: 'https://i.pinimg.com/736x/de/30/fd/de30fd1cf525cd9458f3b9d565375104.jpg' },
            { name: 'Pink', code: '#df737c', image: 'https://i.pinimg.com/1200x/4f/d2/07/4fd2075c7782fc6dd8abcc1a3d732bc4.jpg' }
        ]
    }
};

// Глобальное состояние
let selectedColors = {
    lite: productDetails.lite.colors[0],
    pro: productDetails.pro.colors[0],
    max: productDetails.max.colors[0]
};

let quantities = { lite: 1, pro: 1, max: 1 };
let currentProductId = null;
let cart = []; // <- корзина здесь, чтобы быть глобальной