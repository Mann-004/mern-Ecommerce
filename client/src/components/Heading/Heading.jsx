import React, { useEffect, useRef } from "react"
import img4 from "../../assets/img4.jpg"
import gsap from "gsap"

const Heading = () => {
  const headingRef = useRef(null)
  const imgRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

    // Animate headings
    tl.from(headingRef.current.querySelectorAll("h1"), {
      x: -50,
      opacity: 0,
      stagger: 0.3,
      duration: 1.5,
    })
      // Animate image
      .from(
        imgRef.current,
        {
          y: 30,
          opacity: 0,
          duration: 1.2,
        },
        "-=1"
      )

    // Hover effect for image (only on devices that support hover)
    const imgEl = imgRef.current
    const handleMouseEnter = () => {
      gsap.to(imgEl, { scale: 1.05, duration: 0.5, ease: "power3.out" })
    }
    const handleMouseLeave = () => {
      gsap.to(imgEl, { scale: 1, duration: 0.5, ease: "power3.out" })
    }
    if (window.matchMedia("(hover: hover)").matches) {
      imgEl.addEventListener("mouseenter", handleMouseEnter)
      imgEl.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (window.matchMedia("(hover: hover)").matches) {
        imgEl.removeEventListener("mouseenter", handleMouseEnter)
        imgEl.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div className="mainsection flex flex-col-reverse md:flex-row items-center justify-between px-4 sm:px-6 md:px-8 lg:px-12 py-14 sm:py-10 md:py-12 lg:py-20 gap-1 sm:gap-8 md:gap-12 lg:gap-16 lg:min-h-screen">

      {/* Text Section */}
      <div
        ref={headingRef}
        className="heading w-full md:w-3/5 text-center md:text-left uppercase font-bold tracking-tight text-[var(--text-color)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight sm:leading-snug md:leading-[3.5rem] lg:leading-[4.5rem]"
      >
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl">
          From Office to
          <span className="block sm:inline text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)]">
            Adventure
          </span>
        </h1>
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl">
          We’ve Got Your Back
        </h1>
      </div>

      {/* Image Section */}
      <div
        ref={imgRef}
        className="images-section w-full md:w-2/5 flex justify-center mb-6 sm:mb-8 md:mb-0"
      >
        <div className="img overflow-hidden shadow-xl rounded-lg w-11/12 sm:w-4/5 md:w-full max-w-[400px] transition-transform duration-300">
          <img
            src={img4}
            alt="bag"
            className="object-cover w-full h-full rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default Heading