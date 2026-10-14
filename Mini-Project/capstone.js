
const readline = require("readline");

// Create an interface for user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Function to ask questions
function askQuestion(question) {
    return new Promise(resolve => {
        rl.question(question, answer => resolve(answer));
    });
}

// Main program
async function main() {
    console.log("--- Initializing Inventory System ---");

    // Initial inventory
    const inventory = [
        { name: "Laptop", price: 800 },
        { name: "Mouse", price: 25 }
    ];

    // Get product details
    const productName = await askQuestion("Enter product name: ");
    const priceInput = await askQuestion("Enter product price: ");
    const productPrice = Number(priceInput);

    // Validate input
    if (
        productName.trim() === "" ||
        priceInput.trim() === "" ||
        !Number.isFinite(productPrice) ||
        productPrice <= 0
    ) {
        console.log("Invalid product details. Product not added.");
    } else {
        inventory.push({
            name: productName.trim(),
            price: productPrice
        });

        console.log(
            `[Prompt executed: User adds "${productName.trim()}" at "$${productPrice}"]`
        );
    }

    // Assign product category
    function getCategory(price) {
        let category;

        if (price < 50) {
            category = "Budget";
        } else if (price >= 200) {
            category = "Premium";
        } else {
            category = "Standard";
        }

        switch (category) {
            case "Budget":
                return "Budget";
            case "Standard":
                return "Standard";
            case "Premium":
                return "Premium";
            default:
                return "Unknown";
        }
    }

    // Demonstrate break and continue
    console.log("\n--- Searching Inventory ---");

    for (const product of inventory) {
        if (product.price <= 0) {
            continue;
        }

        if (product.name === "Stop Search") {
            break;
        }
    }

    // Display inventory
    console.log("\n--- Processing Inventory Roster (forEach) ---");

    inventory.forEach(function(product) {
        console.log(
            `* Item: ${product.name} ($${product.price}) -> Category: ${getCategory(product.price)}`
        );
    });

    // Calculate total inventory value
    function calculateTotal(items) {
        let total = 0;

        for (let i = 0; i < items.length; i++) {
            if (items[i].price <= 0) {
                continue;
            }

            total += items[i].price;
        }

        return total;
    }

    // Arrow function for tax and discount
    const calculateFinalPrice = (price, taxRate = 0, discountRate = 0) => {
        const discountedPrice = price - price * discountRate / 100;
        const tax = discountedPrice * taxRate / 100;

        return discountedPrice + tax;
    };

    // Financial analytics
    console.log("\n--- Financial Analytics ---");

    console.log("Total Inventory Value: $" + calculateTotal(inventory));

    console.log(
        "Laptop Price after 10% discount and 5% tax: $" +
        calculateFinalPrice(800, 5, 10).toFixed(2)
    );

    // Filter products under $200
    const affordableItems = inventory.filter(product => product.price < 200);
    const affordableNames = affordableItems.map(product => product.name);

    console.log(
        "Filtered Affordable Items (Under $200): " +
        JSON.stringify(affordableNames)
    );

    // Create formatted report
    const report = inventory.map(product =>
        `${product.name.toUpperCase()}: $${product.price}`
    );

    console.log("Formatted Report List: " + JSON.stringify(report));

    // Demonstrate block scope
    {
        let blockVar = "Inside the block";
        console.log("Scope Demo: " + blockVar);
    }

    // Close input interface
    rl.close();
}

// Run program
main();
