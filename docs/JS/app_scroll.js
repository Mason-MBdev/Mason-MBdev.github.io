const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        console.log(entry)
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
});

const hiddenRightElements = document.querySelectorAll('.hidden-right')
hiddenRightElements.forEach((el) => observer.observe(el));

const hiddenLeftElements = document.querySelectorAll('.hidden-left')
hiddenLeftElements.forEach((el) => observer.observe(el));

const blurElements = document.querySelectorAll('.blurred')
blurElements.forEach((el) => observer.observe(el));