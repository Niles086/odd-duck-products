'use strict';

Product.activeProducts = [];

let products = [];
let leftProductInstance = null;
let centerProductInstance = null;
let rightProductInstance = null;
let clicker = 0;
const maxClicks = 25;
const viewResults = document.querySelector('button');
const ulElem = document.querySelector('ul');
// Select the <section> element
const leftProduct = document.querySelector('section img:first-child');
const centerProduct = document.querySelector('section img:nth-child(2)');
const rightProduct = document.querySelector('section img:nth-child(3)');


function Product(name, src, views = 0, clicks = 0) {
    this.name = name;
    this.src = src;
    this.views = views;
    this.clicks = clicks;

    Product.activeProducts.push(this);
}

let bag = new Product('Bag Product', './img/bag.jpg');
let banana = new Product('Banana Product', './img/banana.jpg');
let bathroom = new Product('Bathroom Product', './img/bathroom.jpg');
let boots = new Product('Boots Product', './img/boots.jpg');
let breakfast = new Product('Breakfast Product', './img/breakfast.jpg');
let bubblegum = new Product('Bubblegum Product', './img/bubblegum.jpg');
let chair = new Product('Chair Product', './img/chair.jpg');
let cthulhu = new Product('Cthulhu Product', './img/cthulhu.jpg');
let dogduck = new Product('Dog-duck Product', './img/dogduck.jpg');
let dragon = new Product('Dragon Product', './img/dragon.jpg');
let pen = new Product('Pen Product', './img/pen.jpg');
let petsweep = new Product('Pet-sweep Product', './img/petsweep.jpg');
let scissors = new Product('Scissors Product', './img/scissors.jpg');
let shark = new Product('Shark Product', './img/shark.jpg');
let sweep = new Product('Sweep Product', './img/sweep.png');
let tauntaun = new Product('Tauntaun Product', './img/tauntaun.jpg');
let unicorn = new Product('Unicorn Product', './img/unicorn.jpg');
let watercan = new Product('Water-can Product', './img/watercan.jpg');
let wineglass = new Product('Wine-glass Product', './img/wineglass.jpg');

// products = [bag, banana, bathroom, boots, breakfast, bubblegum, chair, cthulhu, dogduck, dragon, pen, petsweep, scissors, shark, sweep, tauntaun, unicorn, watercan, wineglass]
const savedProductData = localStorage.getItem('productsData');
if (savedProductData) {
    products = JSON.parse(savedProductData);
    console.log('products', products)
} else {
    
    products.push(bag)
    products.push(banana)
    products.push(bathroom)
    products.push(boots)
    products.push(breakfast)
    products.push(bubblegum)
    products.push(chair)
    products.push(cthulhu)
    products.push(dogduck)
    products.push(dragon)
    products.push(pen)
    products.push(petsweep)
    products.push(scissors)
    products.push(shark)
    products.push(sweep)
    products.push(tauntaun)
    products.push(unicorn)
    products.push(watercan)
    products.push(wineglass)
    console.log('prodicts', products)
}
// Save the products array to local storage
localStorage.setItem('productsData', JSON.stringify(products));


function renderProducts() {
    console.log('products', products);
    // set clicker max
    if(clicker == maxClicks) {
        saveProductsToLocalStorage();
        //make view results clickable
        viewResults.addEventListener('click', viewResultsClick);
        
        //dissable product clicking
        leftProduct.removeEventListener('click', handleLeftProduct);
        centerProduct.removeEventListener('click', handleCenterProduct);
        rightProduct.removeEventListener('click', handleRightProduct);
    }
    // Show 1st product img
    // Show 2nd product img
    // Show 3rd product img
    if(Product.activeProducts.length <= 1) {
        Product.activeProducts =[...products];
        shuffleArray(Product.activeProducts);
    }
    leftProductInstance = Product.activeProducts.pop(); //retrives and removes last item
    leftProduct.setAttribute('src', leftProductInstance.src);
    
    centerProductInstance = Product.activeProducts.pop();
    centerProduct.setAttribute('src', centerProductInstance.src);
    
    rightProductInstance = Product.activeProducts.pop();
    rightProduct.setAttribute('src', rightProductInstance.src);
    
    
    leftProductInstance.views += 1;
    centerProductInstance.views += 1;
    rightProductInstance.views += 1;
    // saveProductsToLocalStorage(); // Save products to local storage after the views are updated
}
renderProducts();

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // Generate a random index from 0 to i
        [array[i], array[j]] = [array[j], array[i]]; // Swap elements at i and j
    }
}

function handleLeftProduct() {
    leftProductInstance.clicks += 1;
    clicker += 1;
    console.log(leftProductInstance);
    renderProducts();
}

function handleCenterProduct() {
    centerProductInstance.clicks += 1;
    clicker += 1;
    renderProducts();
}

function handleRightProduct() {
    rightProductInstance.clicks += 1;
    clicker += 1;
    renderProducts();
}

function viewResultsClick() {
    console.log('Products', products)
    renderResults();
}

function saveProductsToLocalStorage() {
    localStorage.setItem('productsData', JSON.stringify(products));
}

leftProduct.addEventListener('click', handleLeftProduct);
centerProduct.addEventListener('click', handleCenterProduct);
rightProduct.addEventListener('click', handleRightProduct);


function renderResults() {
        const labels = [];
    const votesData = [];
    const viewsData = [];

    for (let i = 0; i < products.length; i++) {
        const thisProduct = products[i];
        labels.push(thisProduct.name);
        votesData.push(thisProduct.clicks);
        viewsData.push(thisProduct.views);
    }

    
    const ctx = document.getElementById('votingChart').getContext('2d');

    const chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Votes',
                    data: votesData,
                    backgroundColor: 'rgba(245, 0, 0, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Views',
                    data: viewsData,
                    backgroundColor: 'rgba(22, 124, 158, 0.8)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

// Call renderResults after data collection
// renderResults();
