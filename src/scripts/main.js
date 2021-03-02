// Smooth scroll control
// https://dev.to/surjithctly/solved-2020-pure-vanilla-javascript-smooth-scroll-to-element-on-a-click-id-2cek
let triggers = document.querySelectorAll(
    '.address__info-link[href="#contact"], .logo[href="#header"],.nav__item .nav__link[href^="#"]'
)

triggers.forEach((trigger) => {
    trigger.onclick = function(e) {
        e.preventDefault()
        let hashTag = this.getAttribute('href')
        let target = document.querySelector(hashTag)
        let headerOffset = 0
        let elementPosition = target.offsetTop
        let offsetPosition = elementPosition - headerOffset

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
        })
    }
})
