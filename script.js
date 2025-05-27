document.addEventListener('DOMContentLoaded', () => {
    const body = document.body
    const header = document.getElementById('header')
    const navLinksContainer = document.querySelector('.nav-links')
    const navLinks = document.querySelectorAll('.nav-links a')
    const hamburgerMenu = document.getElementById('hamburgerMenu')
    const themeToggleBtn = document.getElementById('themeToggleBtn')
    const scrollToTopBtn = document.getElementById('scrollToTopBtn')
    const preloader = document.querySelector('.preloader')
    const typingEffectEl = document.getElementById('typing-effect')
    const contactForm = document.getElementById('contactForm')
    const formStatus = document.getElementById('formStatus')
    const currentYearEl = document.getElementById('currentYear')
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter .filter-btn')
    const portfolioItemsAll = document.querySelectorAll('.portfolio-grid .portfolio-item')

    const typingWords = [
    "Landing Page Modern & Interaktif",
    "Tools Otomatisasi Berbasis Python",
    "Web Responsif & Adaptif",
    "Solusi Frontend Elegan & Efisien",
    "Desain UI/UX yang Menarik dan Fungsional",
    "Website Cepat, Ringan, dan SEO-Friendly"
]

    let wordIndex = 0
    let charIndex = 0
    let isDeleting = false

    function initPreloader() {
        if (preloader) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    preloader.classList.add('loaded')
                }, 500)
            })
        }
    }

    function initCurrentYear() {
        if (currentYearEl) {
            currentYearEl.textContent = new Date().getFullYear()
        }
    }

    function initScrollBehaviors() {
        window.addEventListener('scroll', () => {
            if (header) {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled')
                } else {
                    header.classList.remove('scrolled')
                }
            }

            if (scrollToTopBtn) {
                if (window.scrollY > 300) {
                    scrollToTopBtn.classList.add('show')
                } else {
                    scrollToTopBtn.classList.remove('show')
                }
            }
        })

        if (scrollToTopBtn) {
            scrollToTopBtn.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' })
            })
        }
    }

    function initMobileMenu() {
        if (hamburgerMenu && navLinksContainer) {
            hamburgerMenu.addEventListener('click', () => {
                navLinksContainer.classList.toggle('active')
                const icon = hamburgerMenu.querySelector('i')
                if (icon) {
                    icon.classList.toggle('fa-bars')
                    icon.classList.toggle('fa-times')
                }
            })

            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    if (navLinksContainer.classList.contains('active')) {
                        navLinksContainer.classList.remove('active')
                        const icon = hamburgerMenu.querySelector('i')
                        if (icon) {
                            icon.classList.add('fa-bars')
                            icon.classList.remove('fa-times')
                        }
                    }
                })
            })
        }
    }

    function initThemeSwitcher() {
        const userPreferredTheme = localStorage.getItem('theme')
        const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

        function applyTheme(theme) {
            if (theme === 'dark-mode') {
                body.classList.add('dark-mode')
                if (themeToggleBtn) {
                    const icon = themeToggleBtn.querySelector('i')
                    if (icon) {
                        icon.classList.remove('fa-sun')
                        icon.classList.add('fa-moon')
                    }
                }
            } else {
                body.classList.remove('dark-mode')
                if (themeToggleBtn) {
                    const icon = themeToggleBtn.querySelector('i')
                    if (icon) {
                        icon.classList.remove('fa-moon')
                        icon.classList.add('fa-sun')
                    }
                }
            }
        }

        if (userPreferredTheme) {
            applyTheme(userPreferredTheme)
        } else if (systemPrefersDark) {
            applyTheme('dark-mode')
            localStorage.setItem('theme', 'dark-mode')
        } else {
            applyTheme('light-mode')
            localStorage.setItem('theme', 'light-mode')
        }

        if (themeToggleBtn) {
            themeToggleBtn.addEventListener('click', () => {
                let newTheme = body.classList.contains('dark-mode') ? 'light-mode' : 'dark-mode'
                applyTheme(newTheme)
                localStorage.setItem('theme', newTheme)
            })
        }
    }

    function initSmoothScrollAndActiveNav() {
        navLinks.forEach(link => {
            link.addEventListener('click', function (e) {
                e.preventDefault()
                const targetId = this.getAttribute('href')?.substring(1)
                if (!targetId) return

                const targetSection = document.getElementById(targetId)
                let offset = header ? header.offsetHeight : 0

                if (targetSection) {
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - offset
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    })
                }
            })
        })

        const sections = document.querySelectorAll('main section[id]')
        if (sections.length > 0) {
            window.addEventListener('scroll', () => {
                let currentSectionId = ''
                const scrollPosition = window.pageYOffset
                const headerOffset = header ? header.offsetHeight : 0

                sections.forEach(section => {
                    const sectionTop = section.offsetTop - headerOffset - 50
                    const sectionBottom = sectionTop + section.offsetHeight
                    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                        currentSectionId = section.getAttribute('id')
                    }
                })
                
                if (!currentSectionId && scrollPosition < sections[0].offsetTop - headerOffset) {
                    currentSectionId = "home"
                }


                navLinks.forEach(link => {
                    link.classList.remove('active')
                    if (link.getAttribute('href')?.substring(1) === currentSectionId) {
                        link.classList.add('active')
                    }
                })
            })
        }
    }

    function initTypingEffect() {
        if (!typingEffectEl || !typingWords || typingWords.length === 0) return

        function type() {
            const currentWord = typingWords[wordIndex % typingWords.length]
            if (isDeleting) {
                typingEffectEl.textContent = currentWord.substring(0, charIndex - 1)
                charIndex--
            } else {
                typingEffectEl.textContent = currentWord.substring(0, charIndex + 1)
                charIndex++
            }

            if (!isDeleting && charIndex === currentWord.length) {
                setTimeout(() => isDeleting = true, 1500)
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false
                wordIndex++
            }

            const typeSpeed = isDeleting ? 50 : 100
            setTimeout(type, typeSpeed)
        }
        type()
    }

    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal')
        if (revealElements.length > 0) {
            const revealObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible')

                        const progressBars = entry.target.querySelectorAll('.progress-bar')
                        if (progressBars.length > 0) {
                            progressBars.forEach(pb => {
                                pb.style.width = pb.dataset.progress || pb.style.width || '0%'
                            })
                        } else if (entry.target.classList.contains('progress-bar')) {
                            entry.target.style.width = entry.target.dataset.progress || entry.target.style.width || '0%'
                        }
                    }
                })
            }, { threshold: 0.1 })

            revealElements.forEach(el => revealObserver.observe(el))
        }
    }

    function initLightbox() {
        const lightboxModal = document.getElementById("lightboxModal")
        const lightboxImg = document.getElementById("lightboxImg")
        const lightboxCaption = document.getElementById("lightboxCaption")
        const portfolioViewBtns = document.querySelectorAll('.btn-view-project')
        const lightboxClose = document.querySelector(".lightbox-close")

        if (lightboxModal && lightboxImg && lightboxCaption && portfolioViewBtns.length > 0) {
            portfolioViewBtns.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault()
                    lightboxModal.style.display = "block"
                    const imgSrc = item.dataset.imgSrc
                    const portfolioItemElement = item.closest('.portfolio-item')
                    const captionText = portfolioItemElement ? portfolioItemElement.querySelector('h3')?.textContent : ''
                    lightboxImg.src = imgSrc || ''
                    if (captionText) lightboxCaption.innerHTML = captionText
                    body.style.overflow = 'hidden'
                })
            })

            if (lightboxClose) {
                lightboxClose.addEventListener('click', () => {
                    lightboxModal.style.display = "none"
                    body.style.overflow = 'auto'
                })
            }

            window.addEventListener('click', (event) => {
                if (event.target == lightboxModal) {
                    lightboxModal.style.display = "none"
                    body.style.overflow = 'auto'
                }
            })

            document.addEventListener('keydown', (event) => {
                if (event.key === 'Escape' && lightboxModal.style.display === "block") {
                    lightboxModal.style.display = "none"
                    body.style.overflow = 'auto'
                }
            })
        }
    }

    function initTestimonialCarousel() {
        const carousel = document.querySelector('.testimonial-carousel')
        const slides = document.querySelectorAll('.testimonial-slide')
        const prevBtn = document.getElementById('testimonialPrev')
        const nextBtn = document.getElementById('testimonialNext')
        let currentSlide = 0

        if (carousel && slides.length > 0) {
            function showSlide(index) {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active')
                    if (i === index) {
                        slide.classList.add('active')
                    }
                })
            }

            showSlide(currentSlide)

            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide + 1) % slides.length
                    showSlide(currentSlide)
                })
            }

            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    currentSlide = (currentSlide - 1 + slides.length) % slides.length
                    showSlide(currentSlide)
                })
            }
        }
    }

    function initContactForm() {
        if (contactForm) {
            function showError(inputElement, message) {
                if (!inputElement) return
                inputElement.style.borderColor = 'red'
                let errorSpan = inputElement.parentNode.querySelector('.error-message-span')
                if (!errorSpan) {
                    errorSpan = document.createElement('span')
                    errorSpan.classList.add('error-message-span') 
                    inputElement.parentNode.appendChild(errorSpan)
                }
                errorSpan.textContent = message
            }

            function clearError(inputElement) {
                if (!inputElement) return
                inputElement.style.borderColor = ''
                const errorSpan = inputElement.parentNode.querySelector('.error-message-span')
                if (errorSpan) {
                    errorSpan.textContent = ''
                }
            }

            function clearAllErrors() {
                document.querySelectorAll('.error-message-span').forEach(span => span.textContent = '')
                document.querySelectorAll('.form-group input, .form-group textarea').forEach(input => {
                    input.style.borderColor = ''
                })
            }

            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
                return emailRegex.test(email)
            }

            contactForm.addEventListener('submit', function (e) {
                e.preventDefault()
                if (formStatus) {
                    formStatus.textContent = ''
                    formStatus.className = ''
                }

                const nameInput = document.getElementById('name')
                const emailInput = document.getElementById('email')
                const subjectInput = document.getElementById('subject')
                const messageInput = document.getElementById('message')

                const name = nameInput ? nameInput.value.trim() : ''
                const email = emailInput ? emailInput.value.trim() : ''
                const subject = subjectInput ? subjectInput.value.trim() : ''
                const message = messageInput ? messageInput.value.trim() : ''
                let isValid = true

                clearAllErrors()

                if (name === '') {
                    showError(nameInput, 'Nama wajib diisi.')
                    isValid = false
                }
                if (email === '') {
                    showError(emailInput, 'Email wajib diisi.')
                    isValid = false
                } else if (!isValidEmail(email)) {
                    showError(emailInput, 'Format email tidak valid.')
                    isValid = false
                }
                if (subject === '') {
                    showError(subjectInput, 'Subjek wajib diisi.')
                    isValid = false
                }
                if (message === '') {
                    showError(messageInput, 'Pesan wajib diisi.')
                    isValid = false
                }

                if (isValid) {
                    if (formStatus) {
                        formStatus.textContent = 'Mengirim pesan Anda...'
                        formStatus.classList.add('pending')
                    }

                    setTimeout(() => {
                        if (formStatus) {
                            formStatus.textContent = 'Pesan berhasil terkirim! Terima kasih.'
                            formStatus.className = 'success'
                        }

                        contactForm.reset()
                        document.querySelectorAll('.form-group label').forEach(label => {
                            label.classList.remove('active-label-style')
                        })
                        clearAllErrors()

                        setTimeout(() => {
                            window.location.href = 'https://www.instagram.com/adipentestsantuy'
                        }, 700) 

                    }, 1500)
                } else {
                    if (formStatus) {
                        formStatus.textContent = 'Harap isi semua kolom yang wajib diisi dengan benar.'
                        formStatus.className = 'error'
                    }
                }
            })

            ;['name', 'email', 'subject', 'message'].forEach(id => {
                const inputField = document.getElementById(id)
                if (inputField) {
                    const label = inputField.closest('.form-group')?.querySelector('label')
                    inputField.addEventListener('input', () => clearError(inputField))

                    inputField.addEventListener('focus', () => {
                        if (label) label.classList.add('active-label-style')
                    })
                    inputField.addEventListener('blur', () => {
                        if (label && inputField.value.trim() === '') {
                            label.classList.remove('active-label-style')
                        }
                    })
                    if (inputField.value.trim() !== '') {
                        if (label) label.classList.add('active-label-style')
                    }
                }
            })
        }
    }

    function initButtonRippleEffect() {
        const buttons = document.querySelectorAll('.btn')
        buttons.forEach(button => {
            button.addEventListener('click', function (e) {
                if (this.type === 'submit' && this.closest('form') === contactForm) {
                } else {
                    const existingRipple = this.querySelector('.ripple-effect-span')
                    if (existingRipple) {
                        existingRipple.remove()
                    }

                    const rect = this.getBoundingClientRect()
                    const ripple = document.createElement('span')

                    const diameter = Math.max(this.clientWidth, this.clientHeight)
                    const radius = diameter / 2

                    ripple.style.width = ripple.style.height = `${diameter}px`
                    ripple.style.left = `${e.clientX - rect.left - radius}px`
                    ripple.style.top = `${e.clientY - rect.top - radius}px`

                    ripple.style.position = 'absolute'
                    ripple.style.borderRadius = '50%'
                    ripple.style.backgroundColor = 'rgba(255, 255, 255, 0.4)'
                    ripple.style.transform = 'scale(0)'
                    ripple.style.animation = 'ripple-animation 0.6s linear'
                    ripple.classList.add('ripple-effect-span')

                    this.appendChild(ripple)

                    setTimeout(() => {
                        ripple.remove()
                    }, 600)
                }
            })
        })
    }

    function initPortfolioFilter() {
        if (portfolioFilterBtns.length > 0 && portfolioItemsAll.length > 0) {
            portfolioItemsAll.forEach((item, index) => {
                item.style.animationDelay = `${index * 0.05}s`
            })

            portfolioFilterBtns.forEach(btn => {
                btn.addEventListener('click', function () {
                    portfolioFilterBtns.forEach(b => b.classList.remove('active'))
                    this.classList.add('active')
                    const filterValue = this.dataset.filter

                    portfolioItemsAll.forEach(item => {
                        const itemMatchesFilter = filterValue === 'all' || item.dataset.category === filterValue
                        
                        if (itemMatchesFilter) {
                            item.classList.remove('hidden-item')
                            void item.offsetWidth 
                            item.style.opacity = '1'
                            item.style.transform = 'scale(1)'
                        } else {
                            item.style.opacity = '0'
                            item.style.transform = 'scale(0.9)'
                            setTimeout(() => {
                                item.classList.add('hidden-item')
                            }, 300) 
                        }
                    })
                })
            })
        }
    }

    initPreloader()
    initCurrentYear()
    initScrollBehaviors()
    initMobileMenu()
    initThemeSwitcher()
    initSmoothScrollAndActiveNav()
    initTypingEffect()
    initRevealAnimations()
    initLightbox()
    initTestimonialCarousel()
    initContactForm()
    initButtonRippleEffect()
    initPortfolioFilter()
})