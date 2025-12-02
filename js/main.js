const initialProducts = [
    { 
        id: 1, 
        name: "Sony Alpha A7 IV Kit", 
        pricePerDay: 350000,
        availability: true,
        specs: "33MP, 4K Video, Full Frame"
    },
    { 
        id: 2, 
        name: "Canon EOS R6 Mark II", 
        pricePerDay: 400000,
        availability: true, 
        specs: "24.2MP, 40 FPS, Full Frame"
    },
    { 
        id: 3, 
        name: "Fujifilm X-T5", 
        pricePerDay: 280000,
        availability: false, 
        specs: "40.2MP, APS-C, Compact"
    }
];

let nextId = initialProducts.length > 0 ? initialProducts[initialProducts.length - 1].id + 1 : 1;

new Vue({
    el: '#app',
    data: {
        cameraProducts: initialProducts,
        searchTerm: '',
        newProduct: {
            name: '',
            pricePerDay: null,
        },
        calculatedTotals: {},
        nextProductId: nextId
    },
    
    computed: {
        filteredProducts() {
            if (!this.searchTerm) {
                return this.cameraProducts;
            }
            
            const lowerCaseSearch = this.searchTerm.toLowerCase();
            
            return this.cameraProducts.filter(product => {
                return product.name.toLowerCase().includes(lowerCaseSearch);
            });
        }
    },
    
    methods: {
        addProduct() {
            const productToAdd = {
                id: this.nextProductId++,
                name: this.newProduct.name,
                pricePerDay: this.newProduct.pricePerDay,
                availability: true,
                specs: "Data Spesifikasi Tambahan"
            };
            
            this.cameraProducts.push(productToAdd);
            this.newProduct.name = '';
            this.newProduct.pricePerDay = null;
        },
        
        deleteProduct(index) {
            this.cameraProducts.splice(index, 1);
        },
        
        toggleAvailability(productId) {
            const index = this.cameraProducts.findIndex(p => p.id === productId);
            if (index !== -1) {
                Vue.set(this.cameraProducts[index], 'availability', !this.cameraProducts[index].availability);
            }
        },

        sortProducts(order) {
            this.cameraProducts.sort((a, b) => {
                if (order === 'ascending') {
                    return a.pricePerDay - b.pricePerDay; 
                } else {
                    return b.pricePerDay - a.pricePerDay; 
                }
            });
        },
        
        calculateTotal(productId, pricePerDay, duration) {
            const dur = parseInt(duration) || 0;
            const total = dur * pricePerDay;
            
            Vue.set(this.calculatedTotals, productId, total);
        }
    }
    
})