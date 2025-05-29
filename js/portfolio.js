document.addEventListener('DOMContentLoaded', function() {
    // Get all category items and portfolio items
    const categoryItems = document.querySelectorAll('.category-list li');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    // Add click event listeners to category items
    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all category items
            categoryItems.forEach(cat => cat.classList.remove('active'));
            
            // Add active class to clicked category
            this.classList.add('active');
            
            // Get the selected category
            const selectedCategory = this.getAttribute('data-category');
            
            // Filter portfolio items
            portfolioItems.forEach((portfolioItem, index) => {
                const itemCategory = portfolioItem.getAttribute('data-category');
                
                if (selectedCategory === 'all' || selectedCategory === itemCategory) {
                    portfolioItem.classList.remove('hidden');
                    // Add staggered animation delay
                    portfolioItem.style.animation = `fadeIn 0.5s ease forwards ${index * 0.1}s`;
                } else {
                    portfolioItem.classList.add('hidden');
                    portfolioItem.style.animation = 'none';
                }
            });
        });
    });

    // Initialize with "All Projects" category active
    const allProjectsCategory = document.querySelector('.category-list li[data-category="all"]');
    if (allProjectsCategory) {
        allProjectsCategory.classList.add('active');
    }

    // Portfolio Modal Functionality
    const modal = document.querySelector('.portfolio-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalClose = document.querySelector('.modal-close');
    const modalTriggers = document.querySelectorAll('.portfolio-modal-trigger');

    // Portfolio data
    const portfolioData = {
        1: {
            image: 'images/portfolio-1.png',
            title: 'Fashion E-commerce Store',
            description: 'A modern and responsive fashion e-commerce store built with Shopify. The project involved custom theme development, product catalog optimization, and seamless checkout integration.',
            client: 'Fashion Forward Inc.',
            category: 'Fashion & Apparel',
            services: 'Custom Theme Development, Product Catalog Setup, Checkout Optimization',
            results: 'Increased conversion rate by 35% and average order value by 25%'
        },
        2: {
            image: 'images/portfolio-2.png',
            title: 'Health & Beauty Store',
            description: 'A comprehensive health and beauty store with advanced app integrations and performance optimization. The store features a subscription model and personalized product recommendations.',
            client: 'Beauty Essentials Co.',
            category: 'Health & Beauty',
            services: 'App Integration, Performance Optimization, Subscription Setup',
            results: 'Reduced page load time by 50% and increased mobile conversions by 40%'
        },
        3: {
            image: 'images/portfolio-3.png',
            title: 'Electronics Store',
            description: 'A feature-rich electronics store with custom app development for inventory management and real-time pricing updates. The store includes advanced search functionality and product comparison tools.',
            client: 'Tech Gadgets Ltd.',
            category: 'Electronics',
            services: 'Custom App Development, Inventory Management, Search Optimization',
            results: 'Improved inventory accuracy by 95% and reduced customer service inquiries by 30%'
        },
        4: {
            image: 'images/portfolio-4.png',
            title: 'Home & Living Store',
            description: 'A successful migration from WooCommerce to Shopify with custom theme development and enhanced user experience. The store features a visual product configurator and AR preview functionality.',
            client: 'Home Comfort Living',
            category: 'Home & Living',
            services: 'Platform Migration, Custom Theme Development, AR Integration',
            results: 'Increased sales by 60% and reduced cart abandonment by 45%'
        },
        5: {
            image: 'images/portfolio-5.png',
            title: 'Food & Beverage Store',
            description: 'A specialized food and beverage store with custom checkout development and subscription management. The store includes advanced inventory tracking and automated reordering features.',
            client: 'Gourmet Delights',
            category: 'Food & Beverage',
            services: 'Custom Checkout Development, Subscription Management, Inventory Tracking',
            results: 'Increased repeat purchases by 50% and reduced checkout time by 40%'
        },
        6: {
            image: 'images/portfolio-6.png',
            title: 'Sports & Fitness Store',
            description: 'A multi-vendor marketplace for sports and fitness equipment with advanced vendor management and commission tracking. The store includes real-time inventory sync and automated order routing.',
            client: 'FitLife Marketplace',
            category: 'Sports & Fitness',
            services: 'Multi-vendor Setup, Vendor Management, Order Routing',
            results: 'Increased vendor participation by 70% and improved order fulfillment time by 60%'
        },
        7: {
            image: 'images/portfolio-7.png',
            title: 'Jewelry & Accessories Store',
            description: 'A luxury jewelry store with 3D product visualization and virtual try-on features. The store includes advanced product customization and AR preview capabilities.',
            client: 'Luxury Gems Co.',
            category: 'Jewelry & Accessories',
            services: '3D Visualization, AR Integration, Product Customization',
            results: 'Increased engagement by 80% and reduced returns by 45%'
        },
        8: {
            image: 'images/portfolio-8.png',
            title: 'Fashion Boutique',
            description: 'A high-end fashion boutique with AR try-on integration and virtual styling features. The store includes personalized recommendations and social media integration.',
            client: 'Elite Fashion House',
            category: 'Fashion & Apparel',
            services: 'AR Try-On, Virtual Styling, Social Integration',
            results: 'Increased average order value by 55% and improved customer satisfaction by 40%'
        },
        9: {
            image: 'images/portfolio-9.png',
            title: 'Tech Gadgets Store',
            description: 'A tech gadgets store with subscription box integration and automated inventory management. The store includes advanced product bundling and personalized recommendations.',
            client: 'TechBox Solutions',
            category: 'Electronics',
            services: 'Subscription Box Setup, Inventory Management, Product Bundling',
            results: 'Increased subscription signups by 65% and improved inventory turnover by 50%'
        }
    };

    // Open modal function
    function openModal(portfolioId) {
        const data = portfolioData[portfolioId];
        if (!data) return;

        // Update modal content
        document.querySelector('.modal-image img').src = data.image;
        document.querySelector('.modal-title').textContent = data.title;
        document.querySelector('.modal-description').textContent = data.description;
        document.querySelector('.detail-value.client').textContent = data.client;
        document.querySelector('.detail-value.category').textContent = data.category;
        document.querySelector('.detail-value.services').textContent = data.services;
        document.querySelector('.detail-value.results').textContent = data.results;

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close modal function
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Add click event listeners to portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Check if the click was on a link (to prevent double triggers)
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }
            
            // Get the portfolio ID from the clicked item
            const portfolioId = this.getAttribute('data-portfolio');
            
            // Show the modal with the portfolio data
            openModal(portfolioId);
        });
    });

    // Close modal when clicking overlay or close button
    modalOverlay.addEventListener('click', closeModal);
    modalClose.addEventListener('click', closeModal);

    // Close modal when pressing Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}); 