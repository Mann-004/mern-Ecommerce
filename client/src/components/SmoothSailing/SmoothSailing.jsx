import React, { useLayoutEffect, useRef } from "react"
import { FaTruck, FaGlobe, FaShieldAlt } from "react-icons/fa"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const SmoothSailing = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(sectionRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reset",
        },
      })
      gsap.from(".feature", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "back.out(1.7)",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          toggleActions: "play none none reset",
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={sectionRef}
      className="hidden  bg-[var(--heading-color)] text-white rounded-2xl w-full px-4 sm:px-8 md:px-16 py-8 sm:py-12 md:py-20 sm:flex flex-col md:flex-row items-center justify-center md:justify-between gap-10 md:gap-12 mt-10 "
    >
      {/* Heading */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-light leading-snug">
          It's all smooth sailing, <br />
          when you roll with us.
        </h2>
      </div>

      {/* Features */}
      <div className="md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8 text-center">
        <div className="feature flex flex-col items-center gap-3">
          <FaTruck className="text-4xl sm:text-5xl" />
          <span className="text-lg sm:text-xl font-medium">Express Delivery</span>
        </div>
        <div className="feature flex flex-col items-center gap-3">
          <FaGlobe className="text-4xl sm:text-5xl" />
          <span className="text-lg sm:text-xl font-medium">All-India Shipping</span>
        </div>
        <div className="feature flex flex-col items-center gap-3">
          <FaShieldAlt className="text-4xl sm:text-5xl" />
          <span className="text-lg sm:text-xl font-medium">5-year Lifespan</span>
        </div>
        <div className="feature flex flex-col items-center gap-3">
          <FaTruck className="text-4xl sm:text-5xl" />
          <span className="text-lg sm:text-xl font-medium">Express Delivery</span>
        </div>
      </div>
    </div>
  )
}

export default SmoothSailing
