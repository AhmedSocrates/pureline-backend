const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/Product');
const User = require('../models/User');
const connectDB = require('../config/db');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const products = [
    {
        name: "PureLine RO-100 Home Filter",
        category: "Home RO System",
        price: 299,
        image: "/Assets/Images/ro100.jpg",
        description: "5-stage RO system suitable for home drinking water purification.",
        specs: {
            capacity: "100 GPD",
            stages: 5,
            tank_size: "3.2 gallons",
            membrane: "TFC"
        },
        stock: 50
    },
    {
        name: "AquaPro 75GPD RO Membrane",
        category: "RO Membrane",
        price: 49,
        image: "/Assets/Images/membrane75.jpeg",
        description: "High-quality 75 GPD TFC membrane for household RO systems.",
        specs: {
            flow_rate: "75 GPD",
            rejection_rate: "98%",
            type: "Thin Film Composite"
        },
        stock: 100
    },
    {
        name: "HydraPure Sediment Filter (PP5)",
        category: "Pre-Filter",
        price: 12,
        image: "/Assets/Images/sediment5.jpg",
        description: "Standard PP sediment filter for removing dirt and rust particles.",
        specs: {
            micron: "5 micron",
            material: "Polypropylene",
            size: "10 inch"
        },
        stock: 200
    },
    {
        name: "CrystalCarbon CTO Filter",
        category: "Carbon Filter",
        price: 18,
        image: "/Assets/Images/cto.jpeg",
        description: "Carbon block filter for chlorine and odor removal.",
        specs: {
            material: "Coconut Shell Carbon",
            type: "CTO",
            size: "10 inch"
        },
        stock: 150
    },
    {
        name: "PureLine 4-Gallon Storage Tank",
        category: "Storage Tank",
        price: 65,
        image: "/Assets/Images/tank4g.jpg",
        description: "NSF-certified 4-gallon pressurized water storage tank.",
        specs: {
            capacity: "4 gallons",
            material: "Steel with liner",
            pressure: "Pre-pressurized"
        },
        stock: 75
    },
    {
        name: "AquaBoost Pressure Pump",
        category: "Booster Pump",
        price: 120,
        image: "/Assets/Images/boosterpump.jpeg",
        description: "High-efficiency booster pump for low water pressure areas.",
        specs: {
            power: "75W",
            flow_rate: "100 GPD",
            voltage: "110V"
        },
        stock: 40
    },
    {
        name: "UltraViolet UV Sterilizer Module",
        category: "UV Sterilizer",
        price: 95,
        image: "/Assets/Images/uvmodule.jpg",
        description: "UV lamp module for bacteria and virus elimination.",
        specs: {
            power: "11W",
            flow_rate: "1 GPM",
            lamp_life: "9000 hours"
        },
        stock: 60
    },
    {
        name: "Mineralizer Post-Filter",
        category: "Post-Filter",
        price: 22,
        image: "/Assets/Images/mineralizer.jpeg",
        description: "Adds essential minerals back to purified water.",
        specs: {
            minerals: "Calcium, Magnesium",
            lifespan: "6 months",
            size: "10 inch"
        },
        stock: 120
    },
    {
        name: "Designer RO Faucet (Chrome)",
        category: "Faucet",
        price: 35,
        image: "/Assets/Images/rofaucet.jpeg",
        description: "Premium chrome-finished RO water faucet.",
        specs: {
            material: "Brass",
            finish: "Chrome",
            thread: "1/4 inch"
        },
        stock: 90
    },
    {
        name: "Digital TDS Water Tester",
        category: "Accessories",
        price: 15,
        image: "/Assets/Images/tdstester.jpg",
        description: "Portable digital TDS meter for water quality testing.",
        specs: {
            range: "0-9999 ppm",
            accuracy: "±2%",
            battery: "Included"
        },
        stock: 180
    },
    {
        name: "Complete Tubing Kit",
        category: "Accessories",
        price: 25,
        image: "/Assets/Images/tubingkit.jpg",
        description: "Full set of tubing and fittings for RO installation.",
        specs: {
            tubing_size: "1/4 inch",
            length: "25 feet",
            fittings: "Quick-connect"
        },
        stock: 110
    },
    {
        name: "Professional Wrench Set",
        category: "Tools",
        price: 28,
        image: "/Assets/Images/wrenchset.jpg",
        description: "Specialized wrench set for filter housing installation.",
        specs: {
            pieces: "3-piece set",
            material: "Hardened plastic",
            sizes: "Various"
        },
        stock: 85
    },
    {
        name: "Commercial RO-500 System",
        category: "Commercial RO",
        price: 1299,
        image: "/Assets/Images/commercial500.jpg",
        description: "Heavy-duty 500 GPD commercial reverse osmosis system.",
        specs: {
            capacity: "500 GPD",
            stages: 7,
            application: "Restaurant, Office",
            warranty: "2 years"
        },
        stock: 15
    },
    {
        name: "Industrial RO-1000 Plant",
        category: "Industrial RO",
        price: 3499,
        image: "/Assets/Images/industrial1000.jpg",
        description: "Industrial-grade 1000 GPD water purification plant.",
        specs: {
            capacity: "1000 GPD",
            stages: 9,
            application: "Factory, Hospital",
            warranty: "3 years"
        },
        stock: 8
    },
    {
        name: "Car Wash RO System",
        category: "Commercial RO",
        price: 899,
        image: "/Assets/Images/carwashro.jpeg",
        description: "Specialized RO system for car wash and detailing businesses.",
        specs: {
            capacity: "300 GPD",
            features: "Spot-free rinse",
            application: "Car wash",
            warranty: "1 year"
        },
        stock: 20
    },
    {
        name: "Water Softener Unit",
        category: "Water Softener",
        price: 450,
        image: "/Assets/Images/softener.jpeg",
        description: "Automatic water softener for hard water treatment.",
        specs: {
            capacity: "32000 grains",
            regeneration: "Automatic",
            salt_capacity: "250 lbs"
        },
        stock: 25
    },
    {
        name: "Sand Filter System",
        category: "Pre-Treatment",
        price: 320,
        image: "/Assets/Images/sandfilter.jpeg",
        description: "Multi-media sand filter for pre-treatment of raw water.",
        specs: {
            flow_rate: "5 GPM",
            media: "Sand, Gravel, Anthracite",
            size: "10x54 inch"
        },
        stock: 18
    },
    {
        name: "Leak Detector Alarm",
        category: "Accessories",
        price: 42,
        image: "/Assets/Images/leakdetector.jpeg",
        description: "Automatic water leak detector with audible alarm.",
        specs: {
            power: "Battery",
            alarm: "85 dB",
            sensor: "Water-sensitive"
        },
        stock: 95
    }
];

const seedDatabase = async () => {
    try {
        console.log(' Starting database seed...');

        // Clear existing data
        await Product.deleteMany();
        await User.deleteMany();
        console.log(' Cleared existing data');

        // Insert products
        const createdProducts = await Product.insertMany(products);
        console.log(` Inserted ${createdProducts.length} products`);

        // Create admin user
        const adminUser = await User.create({
            name: 'Admin',
            email: 'heussien@pureline.ae',
            password: 'PuLine@112025',
            role: 'admin',
        });
        console.log(` Created admin user: ${adminUser.email}`);

        // Create test user
        const testUser = await User.create({
            name: 'Test User',
            email: 'user@test.com',
            password: 'password123',
            role: 'user',
        });
        console.log(` Created test user: ${testUser.email}`);

        console.log(' Database seeded successfully!');
        console.log('\n Login Credentials:');
        console.log('Admin: admin@pureline.com / admin123');
        console.log('User: user@test.com / password123');

        process.exit(0);
    } catch (error) {
        console.error(' Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();
