let menuToggle = document.querySelector(".nav__mobile_menu")
let nav = document.querySelector("nav")
menuToggle.addEventListener('click', () => nav.toggleAttribute('open'))