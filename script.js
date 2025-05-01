// Document Ready Function
document.addEventListener("DOMContentLoaded", () => {
  // Navbar scroll behavior
  const navbar = document.querySelector(".navbar")
  const scrollTopBtn = document.getElementById("scrollToTop")
  const navbarBrand = document.querySelector(".navbar-brand")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("sticky")
      scrollTopBtn.style.display = "block"
      // navbarBrand will automatically be white due to CSS class
    } else {
      navbar.classList.remove("sticky")
      scrollTopBtn.style.display = "none"
      // navbarBrand will automatically have gradient due to CSS class
    }
  })

  // Scroll to top
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      const targetId = this.getAttribute("href")
      if (targetId === "#") return

      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        const navbarHeight = document.querySelector(".navbar").offsetHeight
        const targetPosition = targetElement.offsetTop - navbarHeight

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        })

        // Update active nav link
        document.querySelectorAll(".nav-link").forEach((link) => {
          link.classList.remove("active")
        })
        this.classList.add("active")

        // Close mobile menu if open
        const navbarCollapse = document.querySelector(".navbar-collapse")
        if (navbarCollapse.classList.contains("show")) {
          document.querySelector(".navbar-toggler").click()
        }
      }
    })
  })

  // Update active nav link on scroll
  window.addEventListener("scroll", () => {
    const sections = document.querySelectorAll("section")
    const navLinks = document.querySelectorAll(".nav-link")

    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight
      const navbarHeight = document.querySelector(".navbar").offsetHeight

      if (window.scrollY >= sectionTop - navbarHeight - 100) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  })

  // Typewriter effect for hero section
  const typewriterElement = document.getElementById("typewriter")
  if (typewriterElement) {
    const phrases = ["Web Application Backend Developer", "Data Science Enthusiast"]
    let phraseIndex = 0
    let charIndex = 0
    let isDeleting = false
    let typingSpeed = 100

    function typeWriter() {
      const currentPhrase = phrases[phraseIndex]

      if (isDeleting) {
        // Deleting text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1)
        charIndex--
        typingSpeed = 50 // Faster when deleting
      } else {
        // Typing text
        typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1)
        charIndex++
        typingSpeed = 100 // Normal speed when typing
      }

      // If completed typing the phrase
      if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at the end of phrase
        isDeleting = true
        typingSpeed = 1500 // Wait before deleting
      }
      // If completed deleting the phrase
      else if (isDeleting && charIndex === 0) {
        isDeleting = false
        // Move to next phrase
        phraseIndex = (phraseIndex + 1) % phrases.length
        // Pause before typing next phrase
        typingSpeed = 500
      }

      setTimeout(typeWriter, typingSpeed)
    }

    // Start the typewriter effect
    setTimeout(typeWriter, 1000)
  }

  // Form submission
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const name = document.getElementById("contactName").value
      const email = document.getElementById("contactEmail").value
      const subject = document.getElementById("contactSubject").value
      const message = document.getElementById("contactMessage").value

      // Create mailto link with form data
      const mailtoLink = `mailto:ananthakumars.22cse@kongu.edu?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`

      // Open email client
      window.location.href = mailtoLink

      // Show success message
      alert("Thank you for your message! Your email client will open to send the message.")
      contactForm.reset()
    })
  }

  // Initialize progress bars animation
  const progressBars = document.querySelectorAll(".progress-bar")
  const animateProgressBars = () => {
    // Animate linear progress bars
    const progressBars = document.querySelectorAll(".progress-bar")
    progressBars.forEach((bar) => {
      const width = bar.style.width
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = width
      }, 100)
    })

    // Animate circular progress bars
    const circularBars = document.querySelectorAll(".circular-progress .progress")
    circularBars.forEach((bar) => {
      // Reset the animation by removing and re-adding the classes
      const currentClass = bar.classList.contains("basic")
        ? "basic"
        : bar.classList.contains("intermediate")
          ? "intermediate"
          : bar.classList.contains("advanced")
            ? "advanced"
            : ""

      if (currentClass) {
        bar.classList.remove(currentClass)
        // Force reflow
        void bar.offsetWidth
        // Add the class back to trigger animation
        setTimeout(() => {
          bar.classList.add(currentClass)
        }, 100)
      }
    })
  }

  // Animate progress bars when skills section is in viewport
  const skillsSection = document.getElementById("skills")
  if (skillsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateProgressBars()
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 },
    )

    observer.observe(skillsSection)
  }

  // Project filtering
  const filterButtons = document.querySelectorAll(".filter-btn")
  const projectItems = document.querySelectorAll(".project-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove active class from all buttons
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Add active class to clicked button
      this.classList.add("active")

      const filterValue = this.getAttribute("data-filter")

      projectItems.forEach((item) => {
        if (filterValue === "all" || item.classList.contains(filterValue)) {
          item.style.display = "block"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "scale(1)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "scale(0.8)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Experience carousel navigation
  const experienceCarousel = document.querySelector(".experience-carousel")
  const prevExperienceBtn = document.getElementById("prevExperience")
  const nextExperienceBtn = document.getElementById("nextExperience")

  if (experienceCarousel && prevExperienceBtn && nextExperienceBtn) {
    const scrollAmount = 350 // Adjust based on card width + gap

    prevExperienceBtn.addEventListener("click", () => {
      experienceCarousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    })

    nextExperienceBtn.addEventListener("click", () => {
      experienceCarousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    })
  }

  // Projects carousel navigation
  const projectsCarousel = document.querySelector(".projects-carousel")
  const prevProjectBtn = document.getElementById("prevProject")
  const nextProjectBtn = document.getElementById("nextProject")

  if (projectsCarousel && prevProjectBtn && nextProjectBtn) {
    const scrollAmount = 350 // Adjust based on card width + gap

    prevProjectBtn.addEventListener("click", () => {
      projectsCarousel.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      })
    })

    nextProjectBtn.addEventListener("click", () => {
      projectsCarousel.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      })
    })
  }

  // Fix the Book Worm project image path
  const bookWormImg = document.querySelector('.project-card img[alt="Book Worm"]')
  if (bookWormImg) {
    bookWormImg.src = "bookworm.png"
  }

  // Make navbar more responsive
  const adjustNavbar = () => {
    const navbar = document.querySelector(".navbar")
    if (window.innerWidth <= 767 && !navbar.classList.contains("sticky")) {
      navbar.classList.add("mobile-view")
    } else {
      navbar.classList.remove("mobile-view")
    }
  }

  // Call on load and resize
  adjustNavbar()
  window.addEventListener("resize", adjustNavbar)
})
