class ProductList {
    constructor (productsUrl, renderContainer, cart) {
        this.cart = cart;
        fetch(productsUrl)
            .then(result => result.json() )
            .then(products => {
                this.products = products;
                this.renderProducts(renderContainer, products);
                this.addEventListeners();
            })
    }
    getProductById(id) {
        return this.products.find(el => el.id === id);
    }
    renderProducts(container, products) {
        let productListDomString = ''
        products.forEach(product => {
            productListDomString += 
                `<div class="card col-12 col-md-6 col-lg-4 wew bounceInLeft">
                  <div class="card product">
                    <img class="card-img-top" src="images/images/${product.image}" 
                        alt="${product.title}">
                    <div class="card-body">
                      <h4 class="card-title">${product.title}</h4>
                      <p class="card-text">${product.description}</p>
                      <button class="btn btn-info" data-toggle="modal"
                        data-target="#productInfoModal" data-id="${product.id}">Докладніше
                      </button>
                      <button class="btn btn-primary buy" data-id="${product.id}">
                        Грн ${product.price} - Купити
                      </button>
                    </div>
                  </div>
                </div>`;
        });
        container.html(productListDomString);
    }
    addEventListeners() {
        $('#productInfoModal').on('show.bs.modal', event => {
            const button = $(event.relatedTarget); // Button that triggered the modal
            const id  = String(button.data('id')); // Extract info from data-* attributes
            const product = this.getProductById(id);
            const modal = $('#productInfoModal');
            modal.find('.modal-body .card-img-top')
                .attr('src', 'images/images/'+product.image)
                .attr('alt', product.title);
            modal.find('.modal-body .card-title').text(product.title);
            modal.find('.modal-body .card-text').text(product.description);
            modal.find('button.buy')
                .text(`${product.price} - Купити`)
                .data('id', id);
        });
        $('.card.product button.buy, #productInfoModal button.buy').click( event => {
            const button = $(event.target);
            const id  = button.data('id'); 
            this.cart.addProduct(id);
            window.showAlert('Товар додано у кошик');
        });
    }
}