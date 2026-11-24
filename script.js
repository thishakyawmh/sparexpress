// Shared browser interactions for the static SpareXpress prototype.

function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach((dropdown) => {
        dropdown.classList.remove('open');
    });
}

function toggleDropdown(element) {
    if (!element) return;

    const shouldOpen = !element.classList.contains('open');
    closeAllDropdowns();

    if (shouldOpen) {
        element.classList.add('open');
    }
}

function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) navLinks.classList.toggle('active');
}

function navigateTo(url) {
    if (typeof url !== 'string' || !url.trim()) return;

    try {
        const destination = new URL(url, window.location.href);
        // The prototype only needs same-origin page navigation.
        if (destination.origin === window.location.origin) {
            window.location.assign(destination.href);
        }
    } catch {
        // Ignore invalid navigation targets.
    }
}

function filterCards(category) {
    document.querySelectorAll('.card').forEach((card) => {
        const cardCategory = card.getAttribute('data-category');
        card.style.display = category === 'all' || cardCategory === category ? 'block' : 'none';
    });
}

function setActiveCategory(element) {
    if (!element) return;

    document.querySelectorAll('.catogaries li span').forEach((category) => {
        category.classList.remove('active');
    });
    element.classList.add('active');
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.dropdown-label').forEach((label) => {
        label.addEventListener('click', () => toggleDropdown(label.parentElement));
    });

    document.querySelectorAll('.dropdown-menu li').forEach((item) => {
        item.addEventListener('click', () => {
            const dropdown = item.closest('.dropdown');
            const label = dropdown?.querySelector('.dropdown-label');

            if (label) {
                const textNode = Array.from(label.childNodes).find((node) => node.nodeType === Node.TEXT_NODE);
                if (textNode) {
                    textNode.nodeValue = item.textContent.trim();
                } else {
                    label.textContent = item.textContent.trim();
                }
            }

            closeAllDropdowns();
        });
    });

    document.addEventListener('click', (event) => {
        if (!(event.target instanceof Element) || !event.target.closest('.dropdown')) {
            closeAllDropdowns();
        }
    });

    const accountButton = document.getElementById('accountButton');
    accountButton?.addEventListener('click', () => navigateTo('MyAccount.html'));

    const findPartButton = document.getElementById('find-part-button-1');
    findPartButton?.addEventListener('click', () => navigateTo('Find-Part.html'));

    const requestPartButton = document.getElementById('find-part-button-2');
    requestPartButton?.addEventListener('click', () => navigateTo('request.html'));

    const testimonialCards = Array.from(document.querySelectorAll('.t-card'));
    const previousButton = document.getElementById('prevBtn');
    const nextButton = document.getElementById('nextBtn');
    const visibleCount = 3;

    if (testimonialCards.length === 0) return;

    let currentIndex = 0;
    let autoSlideInterval = null;

    const showCards = () => {
        testimonialCards.forEach((card, index) => {
            const isVisible = index >= currentIndex && index < currentIndex + visibleCount;
            card.style.display = isVisible ? 'flex' : 'none';
        });
    };

    const stopAutoSlide = () => {
        if (autoSlideInterval !== null) {
            window.clearInterval(autoSlideInterval);
            autoSlideInterval = null;
        }
    };

    const showNext = () => {
        currentIndex = (currentIndex + visibleCount) % testimonialCards.length;
        showCards();
    };

    const showPrevious = () => {
        currentIndex = (currentIndex - visibleCount + testimonialCards.length) % testimonialCards.length;
        showCards();
    };

    showCards();

    if (testimonialCards.length > visibleCount) {
        const restartAutoSlide = () => {
            stopAutoSlide();
            autoSlideInterval = window.setInterval(showNext, 5000);
        };

        previousButton?.addEventListener('click', () => {
            showPrevious();
            restartAutoSlide();
        });

        nextButton?.addEventListener('click', () => {
            showNext();
            restartAutoSlide();
        });

        restartAutoSlide();
    }
});

window.addEventListener('load', () => {
    document.body.classList.add('loading');

    window.setTimeout(() => {
        const bootingLogo = document.getElementById('bootingLogo');
        if (bootingLogo) {
            bootingLogo.style.opacity = '0';
            window.setTimeout(() => {
                bootingLogo.style.display = 'none';
                document.body.classList.remove('loading');
            }, 1000);
        } else {
            document.body.classList.remove('loading');
        }
    }, 500);
});
