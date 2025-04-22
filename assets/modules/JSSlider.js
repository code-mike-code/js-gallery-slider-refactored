
class JSSlider {
    constructor(galleryItemSelector) {
        this.imagesList = document.querySelectorAll(galleryItemSelector);

        console.log('lista zdjęć', this.imagesList); // lista zdjęć

        this.sliderRootElement = document.querySelector('.js-slider')
        this.imageElement = this.sliderRootElement.querySelector('.js-slider__image')
        this.captionElement = this.sliderRootElement.querySelector('.js-slider__caption')
        this.prevButton = this.sliderRootElement.querySelector('.js-slider__nav--prev')
        this.nextButton = this.sliderRootElement.querySelector('.js-slider__nav--next')
        this.thumbsContainer = this.sliderRootElement.querySelector('.js-slider__thumbs')
        this.currentSlideIndex = 0

        this.intervalId = null
        this.autoplayInterval = 2500

        console.log('JSSlider utworzony'); // JSSlider utworzony
    }
    initGalleryEvents() {
        this.imagesList.forEach(img => {
            img.addEventListener('click', event => {
                this.openSlider(event)
            })
        })
    }
    openSlider(event) {
        const clickedImageElement = event.currentTarget

        console.log('kliknięty obrazek',clickedImageElement); // kliknięty obrazek

        this.sliderRootElement.classList.add('js-slider--active')
        const imageSrc = clickedImageElement.querySelector('img').src
        this.imageElement.src = imageSrc
        const groupName = clickedImageElement.dataset.sliderGroupName

        this.autoplayStart() // uruchomienie autoplay

        console.log('grupa obrazków', groupName); // grupa obrazków

        this.createThumbs(groupName, imageSrc)
    }
    createThumbs(groupName, currentImageSrc) {
        const prototype = this.thumbsContainer.querySelector('.js-slider__thumbs-item--prototype')
        if (!prototype) {
            console.log('prototyp nie znaleziony'); // prototyp nie znaleziony
            return;
        }

        const existingThumbs = this.thumbsContainer.querySelectorAll('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype)')
        existingThumbs.forEach(thumb => thumb.remove())

        this.currentGroupImages = Array.from(this.imagesList).filter(img => img.dataset.sliderGroupName === groupName)

        console.log(this.currentGroupImages);

        this.currentSlideIndex = this.currentGroupImages.findIndex(img => img.querySelector('img').src === currentImageSrc)

        this.currentGroupImages.forEach((galleryImg) => {
            const thumbElement = prototype.cloneNode(true)
            thumbElement.classList.remove('js-slider__thumbs-item--prototype')

            const thumbImg = thumbElement.querySelector('img')
            const galleryImgSrc = galleryImg.querySelector('img').src
            thumbImg.src = galleryImgSrc

            if (galleryImgSrc === currentImageSrc) {
                thumbImg.classList.add('js-slider__thumbs-image--current')
            }
            this.thumbsContainer.appendChild(thumbElement)
        })

        console.log('utworzone miniatury', groupName); // utworzone miniatury
        console.log('aktualny index slajdu', this.currentSlideIndex); // aktualny index slajdu
    }
    changeSlide(newIndex) {
        const newImageGalleryItem = this.currentGroupImages[newIndex]
        const newImageSrc = newImageGalleryItem.querySelector('img').src

        this.imageElement.src = newImageSrc

        const currentThumb = this.thumbsContainer.querySelector('.js-slider__thumbs-image--current')
        if (currentThumb) {
            currentThumb.classList.remove('js-slider__thumbs-image--current')
        }

        const allThumbs = this.thumbsContainer.querySelectorAll('.js-slider__thumbs-item:not(.js-slider__thumbs-item--prototype) img')
        allThumbs.forEach(thumb => {
            if (thumb.src === newImageSrc) {
                thumb.classList.add('js-slider__thumbs-image--current')
            }
        })

        this.currentSlideIndex = newIndex
        console.log('zamiana slajdu na index', this.currentSlideIndex); // zamiana slajdu na index
    }
    handleNextSlide() {
        let newIndex = this.currentSlideIndex + 1
        if (newIndex >= this.currentGroupImages.length) {
            newIndex = 0
        }
        this.changeSlide(newIndex)
    }
    handlePrevSlide() {
        let newIndex = this.currentSlideIndex - 1
        if (newIndex < 0) {
            newIndex = this.currentGroupImages.length - 1
        }
        this.changeSlide(newIndex)
    }
    closeSlider() {
        this.sliderRootElement.classList.remove('js-slider--active')

        this.autoplayStop() // zatrzymanie autoplay

        console.log('zamknięcie slider-a'); // zamknięcie slider-a
    }
    initSliderEvents() {
        this.nextButton.addEventListener('click', () => {
            this.handleNextSlide()
        })
        this.prevButton.addEventListener('click', () => {
            this.handlePrevSlide()
        })

        const zoomElement = this.sliderRootElement.querySelector('.js-slider__zoom')
        if (zoomElement) {
            zoomElement.addEventListener('click', event => {
                if (event.target === event.currentTarget) {
                    this.closeSlider()
                }
            })
        }

        // zadanie dodatkowe
       const navButtons = [this.nextButton, this.prevButton]

       navButtons.forEach(button => {
        button.addEventListener('mouseenter', () => {

            console.log('mouse enter event'); // mouse enter event

            const stopSliderEvent = new CustomEvent('js-slider-stop')
            this.sliderRootElement.dispatchEvent(stopSliderEvent)
        })
       })

       navButtons.forEach(button => {
        button.addEventListener('mouseleave', () => {

            console.log('mouse leave event'); // mouse leave event

            const startSliderEvent = new CustomEvent('js-slider-start')
            this.sliderRootElement.dispatchEvent(startSliderEvent)
        })
       })

    }
    autoplayStart() {
        if (this.intervalId === null) {
            console.log('autoplay start'); // autoplay start
            this.intervalId = setInterval(() => {
                this.handleNextSlide()
            }, this.autoplayInterval)
        }
    }
    autoplayStop() {
        if (this.intervalId !== null) {
            console.log('autoplay stop'); // autoplay stop
            clearInterval(this.intervalId)
            this.intervalId = null
        }
    }
    run() {
        console.log('JSSlider został uruchomiony'); // JSSlider został uruchomiony

        this.initGalleryEvents()
        this.initSliderEvents()

        this.sliderRootElement.addEventListener('js-slider-start', () => {
            this.autoplayStart()
        })

        this.sliderRootElement.addEventListener('js-slider-stop', () => {
            this.autoplayStop()
        })
    }
}

export default JSSlider;