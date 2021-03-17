// Smooth scroll control
// reference: https://www.npmjs.com/package/zenscroll
import zenscroll from 'zenscroll'
let triggers = document.querySelectorAll('a[href^="#"]')

triggers.forEach((trigger) => {
    trigger.onclick = function (e) {
        e.preventDefault()
        let hashTag = this.getAttribute('href')
        let target = document.querySelector(hashTag)
        zenscroll.setup(null, 0)
        zenscroll.to(target)
    }
})
