const express = require("express");
const router = express.Router();
const Product = require("../models/ProductModel");

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get("/", async (req, res) => {
    try {
        const products = await Product.find({});
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Server error fetching products" });
    }
});

// @desc    Get single product by ID
// @route   GET /api/products/:id
// @access  Public
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.json(product);
    } catch (error) {
        console.error("Error fetching product:", error);
        res.status(500).json({ message: "Server error fetching product" });
    }
});

// @desc    Temporary Seed Route - Imports your collection items into MongoDB
// @route   POST /api/products/seed
// @access  Public (temporary)
router.post("/seed", async (req, res) => {
    try {
        const collectionItems = [
            { name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, category: "Jerseys", stock: 15, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/112125_PATTA_MARTINE_PARADISE4414_510x.jpg?v=1763684688", description: "Engineered with high-density technical weaves and intense tonal framing.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, category: "Hoodies", stock: 12, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_embro_classic_zip_up_hooded_sweater_black_POC-SS26-2050-325-0036-001_003_515x.jpg?v=1780123708", description: "Classic zip-up hooded sweater featuring reinforced industrial stitching.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: 499.00, category: "Shirts", stock: 8, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/100925_DRIES_MODEL020_510x.jpg?v=1760041906", description: "Lightweight linen-cotton blend optimized for structural draping.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "EMBER-SYS LINEN-COTTON LONG SLEEVE", price: 499.00, category: "Shirts", stock: 10, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/073125_KAPITAL_MODEL039_515x.jpg?v=1753995926", description: "Heavyweight seasonal edition built with tactile raw textures.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "BUCKLER LS SHIRT", price: 399.00, category: "Shirts", stock: 20, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/UNION_SP26_ECOM19922_bf43218e-4b19-412e-88a6-3c159da236ac_510x.jpg?v=1775257841", description: "Signature utility long sleeve constructed for everyday functional carry.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "Timmons Shirt", price: 499.00, category: "Shirts", stock: 14, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/082525_UNION_FALL252944_515x.jpg?v=1756381319", description: "Refined silhouette tailored with subtle industrial hardware accents.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "NBNK BD SHIRT", price: 399.00, category: "Shirts", stock: 15, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/012826_NOBISHOP13553_515x.jpg?v=1769768858", description: "Button-down variant optimized with crisp structural lines.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "UNION TEE", price: 499.00, category: "Tees", stock: 25, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_double_weave_twill_regular_collar_shirtspurple_26AAP-02-05_1004_510x.jpg?v=1784846752", description: "Double-weave twill configuration with enhanced durability.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "RCC IMAGER ZIP CYCLE JERSEY", price: 399.00, category: "Tees", stock: 30, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_crest_tee_vintage_black_KTS-517-00001-002_005_634x.jpg?v=1778795391", description: "Vintage washed base layer engineered with heavy cotton yarns.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "EMBERSYS TEE", price: 499.00, category: "Tees", stock: 18, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_response_tee_vintage_pastel_yellow_KTS-516-00001-740_005_634x.jpg?v=1778795446", description: "Response tee profile featuring custom pigment treatments.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "AGED TEE", price: 399.00, category: "Tees", stock: 22, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/union_los_angeles_u_crew_tee_optic_white_KTS-518-00001-106_005_634x.jpg?v=1778795279", description: "Optic white crew execution with structural neck binding.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "EMBER-SYS TEE", price: 499.00, category: "Tees", stock: 16, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/patta_patta_croco_t-shirt_white_POC-SS26-1000-290-0140-002_05_515x.jpg?v=1778229177", description: "Croco graphic pattern printed on dense compact cotton.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "A.PRESSE No.37 Washed Wide Denim Pants", price: 399.00, category: "Denim", stock: 10, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no_37_washed_wide_denim_pants_bleach_26AAP-04-22_004_510x.jpg?v=1783064657", description: "Bleached wide-leg denim silhouette with articulated seams.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "Smoked Double-Wide Denim", price: 499.00, category: "Denim", stock: 9, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/032526_BWA_UNION_NIKES21683_510x.jpg?v=1775198987", description: "Extra-wide profile treated with a deep smoked wash.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "Fathers Engine He Rose 2", price: 399.00, category: "Archive", stock: 5, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/031425_RRR_BODY027_4bb693df-8c7d-4ac8-8600-f99a82afb507_510x.jpg?v=1741924970", description: "Experimental archive release featuring custom screen prints.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] },
            { name: "No.37 Washed Wide Denim Pants", price: 499.00, category: "Denim", stock: 11, image: "https://cdn.shopify.com/s/files/1/0051/0392/files/apresse_no37_washed_wide_denim_pants_bleach_26SAP-04-22_01_510x.jpg?v=1777006169", description: "Standard indigo wash variation of the signature wide silhouette.", sizes: [{ size: "S", inStock: true }, { size: "M", inStock: true }, { size: "L", inStock: true }, { size: "XL", inStock: true }] }
        ];

        await Product.insertMany(collectionItems);
        res.json({ message: "Successfully imported your collection items into MongoDB!" });
    } catch (error) {
        console.error("Error seeding products:", error);
        res.status(500).json({ message: "Server error seeding products", error });
    }
});

module.exports = router;