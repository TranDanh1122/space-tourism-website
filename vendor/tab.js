
let tabs = document.querySelectorAll(".tab__item")
let tabWrapper = document.querySelector('.tab')
let handleChangeTab = (e) => {
    tabs.forEach(el => el.toggleAttribute('active', false))
    e.target.toggleAttribute('active')
    coreTab.index = e.target.getAttribute("tabindex")
    coreTab.loadTabContent()
}
tabs.forEach(el => el.addEventListener('click', handleChangeTab))
window.coreTab = {
    index: 1,
    data: null,
    init(contentType, contentWrapper, setContent, imageEL, setImage, imageType = 'webp') {
        coreTab.contentType = contentType
        coreTab.contentWrapper = contentWrapper
        coreTab.setContent = setContent
        coreTab.setImage = setImage
        coreTab.imageEL = imageEL
        coreTab.imageType = imageType
        coreTab.loadData()
    },
    loadData: () => {
        fetch("../starter-code/data.json").then(response => {
            if (!response.ok) return false;
            return response.json()
        }).then(data => {
            if (!data) return false
            coreTab.data = data[coreTab.contentType] ?? {}
        })
    },
    loadTabContent: () => {
        let contentTemplate = coreTab.setContent(coreTab.data[coreTab.index - 1])
        coreTab.contentWrapper.innerHTML = ""
        coreTab.contentWrapper?.insertAdjacentHTML('beforeend', contentTemplate)
        let src = coreTab.data[coreTab.index - 1]["images"][coreTab.imageType] ?? '../starter-code/assets/destination/image-moon.webp'
        let name = coreTab.data[coreTab.index - 1].name
        let imageHTMLTemplate = coreTab.setImage(src, name)
        coreTab.imageEL.innerHTML = ""
        coreTab.imageEL?.insertAdjacentHTML('beforeend', imageHTMLTemplate)
        coreTab.imageEL?.setAttribute('src', coreTab.data[coreTab.index - 1]["images"][coreTab.imageType] ?? '../starter-code/assets/destination/image-moon.webp')
    }
}

