
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
        if (newIndex < 0 || newIndex >= this.currentGroupImages.length){
            return
        }

        const newImageGalleryItem = this.currentGroupImages[newIndex]
        const newImageSrc =newImageGalleryItem.querySelector('img').src

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
        console.log('zamiana slajdu na index'); // zamiana slajdu na index
    }
    handleNextSlide(){
        this.changeSlide(this.currentSlideIndex + 1)
    }
    handlePrevSlide() {
        this.changeSlide(this.currentSlideIndex - 1)
    }
    closeSlider() {
        this.sliderRootElement.classList.remove('js-slider--active')
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
    }
    run(){
        console.log('JSSlider został uruchomiony'); // JSSlider został uruchomiony

        this.initGalleryEvents()
        this.initSliderEvents()
    }
}

export default JSSlider;