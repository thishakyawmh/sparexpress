// Smooth toggle for dropdowns
function toggleDropdown(element) {
    const isOpen = element.classList.contains('open');
    closeAllDropdowns();
    if (!isOpen) {
        element.classList.add('open');
    }
}

function closeAllDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('open');
    });
}

document.querySelectorAll('.dropdown-label').forEach(label => {
    label.addEventListener('click', function() {
        toggleDropdown(this.parentElement);
    });
});

document.querySelectorAll('.dropdown-menu li').forEach(item => {
    item.addEventListener('click', function() {
        const label = this.closest('.dropdown').querySelector('.dropdown-label');
        label.firstChild.nodeValue = this.textContent; // Set the selected item as label
        closeAllDropdowns();
    });
});

// Close when clicking outside
document.addEventListener('click', function(event) {
    const isDropdown = event.target.closest('.dropdown');
    if (!isDropdown) {
        closeAllDropdowns();
    }
});


document.getElementById('accountButton').onclick = function() {
    window.location.href = 'MyAccount.html';
};


document.getElementById('find-part-button-1').onclick = function() {
    window.location.href = 'Find-Part.html';
};

document.getElementById('find-part-button-2').onclick = function() {
    window.location.href = 'request.html';
};



function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}


function navigateTo(url) {
    window.location.href = url;
}




//Boot logo


window.addEventListener("load", function() {
     // Add the 'loading' class to the body to disable scrolling
     document.body.classList.add("loading");
    
     // Delay of 500ms before fading out
     setTimeout(function() {
     const bootingLogo = document.getElementById("bootingLogo");
     
     // Start the fade-out by changing opacity to 0
     bootingLogo.style.opacity = "0";
     
     // After the fade-out transition (1 second), completely hide the booting screen
     setTimeout(function() {
     bootingLogo.style.display = "none";
     // Remove the 'loading' class to allow scrolling again
     document.body.classList.remove("loading");
     }, 1000); // Matches the CSS transition duration
     }, 500); // Delay before the fade-out starts (500ms)
    });



    function filterCards(category) {
        const cards = document.querySelectorAll('.card');
        
        cards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block'; // Show the card
            } else {
                card.style.display = 'none'; // Hide the card
            }
        });
    }
    
    // Update this function to work with <span> elements
    function setActiveCategory(element) {
        const categories = document.querySelectorAll('.catogaries li span');
        
        categories.forEach(category => {
            category.classList.remove('active'); // Remove the active class from all
        });
    
        element.classList.add('active'); // Add the active class to the clicked element
    }





  document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const tCards = document.querySelectorAll('.t-card');
    const totalCards = tCards.length;
    const itemsToShow = 3;
    let autoSlideInterval;

    // Initially, show the first 3 testimonials
    function showCards(startIndex) {
      tCards.forEach((card, index) => {
        if (index >= startIndex && index < startIndex + itemsToShow) {
          card.style.display = "flex"; // Show the current 3 cards
        } else {
          card.style.display = "none"; // Hide other cards
        }
      });
    }

    // Show next set of 3 testimonials
    function showNext() {
      currentIndex = (currentIndex + itemsToShow) % totalCards;
      showCards(currentIndex);
    }

    // Show previous set of 3 testimonials
    function showPrev() {
      currentIndex = (currentIndex - itemsToShow + totalCards) % totalCards;
      showCards(currentIndex);
    }

    // Start automatic slider with 5s interval
    function startAutoSlide() {
      autoSlideInterval = setInterval(showNext, 5000); // Switch every 5 seconds
    }

    // Stop automatic slider
    function stopAutoSlide() {
      clearInterval(autoSlideInterval);
    }

    // Attach the click event for next and prev buttons, and stop auto slide when clicked
    document.getElementById('prevBtn').addEventListener('click', () => {
      stopAutoSlide();
      showPrev();
      startAutoSlide();
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
      stopAutoSlide();
      showNext();
      startAutoSlide();
    });

    // Initial display and start automatic slider
    showCards(currentIndex);
    startAutoSlide();
  });
