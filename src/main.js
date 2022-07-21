import './css/main.css';

import Swiper, {Navigation} from 'swiper';

import 'swiper/css';

document.addEventListener('DOMContentLoaded', () => {
    /* SLIDERS */
    const cardsSlider = new Swiper('.cards-slider', {
        modules: [Navigation],
        navigation: {
            nextEl: '.swiper-cards-button-next',
            prevEl: '.swiper-cards-button-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            320: {
                slidesPerView: 1.2,
                spaceBetween: 10,
            },
            569: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 4,
                spaceBetween: 10,
            },
        },
    });

    const productsSlider = new Swiper('.products-slider', {
        modules: [Navigation],
        loop: true,
        centeredSlides: true,
        navigation: {
            nextEl: '.swiper-products-button-next',
            prevEl: '.swiper-products-button-prev',
        },
        breakpoints: {
            320: {
                slidesPerView: 1.3,
                spaceBetween: 5,
                centeredSlides: true
            },
            569: {
                slidesPerView: 2,
                spaceBetween: 10,
                centeredSlides: false
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 2,
            },
        }
    });

    /* CARDS ATC FUNCTIONALITY */
    let cards = document.querySelectorAll('.card-atc');

    if (cards.length) {
        cards.forEach(card => {
            card.addEventListener('click', (e) => {
                e.preventDefault();

                let cardVariantId = card.dataset.variant;
                let data = {
                    'items': [{
                        id: cardVariantId,
                        quantity: 1
                    }]
                }

                fetch('/cart/add.js', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                }).then(() => {
                    fetch('/cart.js', {
                        method: 'GET'
                    }).then(response => {
                        return response.json();
                    }).then((response) => {
                        console.log('Updated cart object: ', response);

                        let cartItemsCount = response.item_count;
                        let cartItemsCountWrapper = document.querySelector('.cart-items-count');

                        if (cartItemsCount > 0) {
                            if (cartItemsCountWrapper.classList.contains('hidden')) {
                                cartItemsCountWrapper.classList.remove('hidden');
                            }

                            cartItemsCountWrapper.innerText = cartItemsCount;
                        } else {
                            cartItemsCountWrapper.classList.add('hidden');
                        }
                    });
                }).catch(e => {
                    console.log(e.json());
                });
            });
        });
    }

    /* SAME HEIGHT FOR CARDS TEXT */
    let cardHeight = 0;
    let cardsContent = document.querySelectorAll('.card-content');

    if (cardsContent.length) {
        cardsContent.forEach(card => {
            if (card.getBoundingClientRect().height > cardHeight) {
                cardHeight = card.getBoundingClientRect().height;
            }
        });

        cardsContent.forEach(card => {
            card.style.height = cardHeight + 'px';
        });
    }

    /* BURGER MENU */
    let burger = document.querySelector('.burger');
    let header = document.querySelector('header');

    if (burger) {
        burger.addEventListener('click', (e) => {
            e.preventDefault();

            let eventTarget = e.target

            if (!eventTarget.classList.contains('burger')) {
                eventTarget = e.target.closest('.burger');
            }

            let burgerIcon = eventTarget.querySelector('.burger-icon');
            let closeIcon = eventTarget.querySelector('.close-icon');

            header.classList.toggle('header-active');
            burgerIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('hidden');
        });
    }
});