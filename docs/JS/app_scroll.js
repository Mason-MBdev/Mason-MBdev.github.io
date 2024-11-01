const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry);
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    rootMargin: '0px 0px 250px 0px' // Adjust the bottom margin to trigger 100px early
});

// const hiddenRightElements = document.querySelectorAll('.hidden-right')
// hiddenRightElements.forEach((el) => observer.observe(el));

// const hiddenLeftElements = document.querySelectorAll('.hidden-left')
// hiddenLeftElements.forEach((el) => observer.observe(el));

// const blurElements = document.querySelectorAll('.blurred')
// blurElements.forEach((el) => observer.observe(el));

const slideUpElements = document.querySelectorAll('.slide-up')
slideUpElements.forEach((el) => observer.observe(el));