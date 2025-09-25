import React, { useLayoutEffect, useRef } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import SmoothSailing from "../SmoothSailing/SmoothSailing"
import { Sparkles } from "lucide-react"

import cat1 from "../../assets/cat1.jpeg"
import cat2 from "../../assets/cat2.jpeg"
import cat3 from "../../assets/cat3.jpeg"

gsap.registerPlugin(ScrollTrigger)

const categories = [
  { id: 1, title: "Luggage", img: cat1, link: "/luggage" },
  { id: 2, title: "Backpacks", img: cat2, link: "/backpacks" },
  { id: 3, title: "Duffles", img: cat3, link: "/duffles" },
]

const Category = () => {
  const sectionRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".category-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 50%",
          toggleActions: "play none none reset",
          once: true
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="px-6 md:px-12 mt-16">
      <div className="relative px-4 ">
        {/* Header Section */}
        <div className="text-center mb-16 lg:mb-20 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-gradient-to-r from-[var(--secondary-bg-color)] to-[var(--heading-color)] text-white rounded-full shadow-lg">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold tracking-wide uppercase">Explore Categories</span>
          </div>

          <h1 className="text-2xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] lg:py-4">
            Shop by Category
          </h1>

          <p className="text-mb sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Discover our curated collection of travel essentials designed for every adventure
          </p>
        </div>
      </div>

      <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map(({ id, title, img, link }) => (
          <div
            key={id}
            className="category-card relative group h-[300px] sm:h-[350px] md:h-[400px] rounded-xl overflow-hidden shadow-lg cursor-pointer"
          >

            <img
              src={img}
              alt={title}
              className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

            <div className="absolute bottom-4 left-4 text-white">
              <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
              <Link
                to={link}
                className="text-sm underline hover:text-[var(--secondary-bg-color)]"
              >
                More
              </Link>
            </div>
          </div>
        ))}
      </div>

      <SmoothSailing />
    </div>
  )
}

export default Category
