 // Randomize the order of products
 const randomizedProducts = products.slice(); // Create a copy of the products array
 for (let i = randomizedProducts.length - 1; i > 0; i--) {
     const j = Math.floor(Math.random() * (i + 1));
     [randomizedProducts[i], randomizedProducts[j]] = [randomizedProducts[j], randomizedProducts[i]];
 }

 // // Check if there are at least three randomized products
 // if (randomizedProducts.length >= 3) {
 //     // Display the first three randomized products in the left, center, and right images
 //     imgElements[0].src = randomizedProducts[0].src;
 //     imgElements[0].alt = randomizedProducts[0].name;
 //     imgElements[1].src = randomizedProducts[1].src;
 //     imgElements[1].alt = randomizedProducts[1].name;
 //     imgElements[2].src = randomizedProducts[2].src;
 //     imgElements[2].alt = randomizedProducts[2].name;
 // }