import React, { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Truck, Package, ArrowRight, Sparkles, StarIcon, BaggageClaim } from "lucide-react"
import bag3 from "../../assets/bag3.jpeg"
import duf1 from "../../assets/duf1.jpeg"
import { Link } from "react-router-dom"
gsap.registerPlugin(ScrollTrigger)

const BrandToday = () => {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const img1Ref = useRef(null)
    const img2Ref = useRef(null)

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 70%",
                    toggleActions: "play none none reverse",
                    once: true,
                }
            })
                .from(textRef.current, {
                    x: 80,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                })
                .from([img1Ref.current, img2Ref.current], {
                    scale: 0,
                    opacity: 0,
                    duration: 1,
                    stagger: 0.5,
                    ease: "power3.out"
                }, "-=0.5")
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    const features = [
        { icon: Truck, title: "Free Shipping", desc: "On all orders", color: "from-green-500 to-green-600" },
        { icon: Package, title: "Limited Stock", desc: "Only a few left", color: "from-blue-500 to-blue-600" },
        { icon: StarIcon, title: "Premium Quality", desc: "Lifetime warranty", color: "from-yellow-500 to-yellow-600" },
        { icon: BaggageClaim, title: "Fast Delivery", desc: "2-3 business days", color: "from-orange-500 to-orange-600" }
    ]

    return (
        <section ref={sectionRef} className="w-full flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-10 px-6 md:px-12 lg:px-16 py-10 lg:py-14 bg-gray-50">

            {/* Images */}
            <div className="w-full lg:w-1/2 flex justify-center lg:block relative">
                <div className="relative w-full max-w-md lg:max-w-lg h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] xl:h-[500px] mx-auto">
                    <div className="img1 relative w-full h-full rounded-2xl shadow-2xl border-2 border-white/50 overflow-hidden hover:scale-105 transition-transform duration-300">
                        <img ref={img1Ref} src={bag3} alt="Collection" className="w-full h-full object-cover rounded-2xl" />
                    </div>
                    <div className="img2 absolute top-[60%] right-2 sm:right-4 w-[50%] sm:w-[45%] lg:w-[40%] rounded-xl shadow-2xl border-2 border-white/50 overflow-hidden hover:scale-105 transition-transform duration-300">
                        <img ref={img2Ref} src={duf1} alt="Featured Product" className="w-full h-full object-cover rounded-xl" />
                    </div>
                </div>
            </div>

            {/* Text Content */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center gap-6 text-center lg:text-left">
                <div ref={textRef} className="space-y-6">

                    {/* Badge */}
                    <div className="inline-flex items-center justify-center lg:justify-start gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-[var(--secondary-bg-color)] to-[var(--heading-color)] text-white rounded-full text-sm font-semibold w-fit mx-auto lg:mx-0 shadow-lg">
                        <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span className="tracking-wide uppercase">Just In</span>
                    </div>

                    {/* Heading */}
                    <div className="heading space-y-3 lg:space-y-4">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl xl:text-5xl tracking-tight font-extrabold leading-tight">
                            <span className="block lg:inline text-gray-900">THE BRAND</span>
                            <span className="block lg:inline text-transparent bg-clip-text bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)]">
                                TODAY
                            </span>
                        </h2>
                        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-[var(--heading-color)] to-[var(--secondary-bg-color)] rounded-full mx-auto lg:mx-0" />
                    </div>

                    {/* Description */}
                    <div className="space-y-3 max-w-md mx-auto lg:mx-0">
                        <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
                            Redefining travel gear for a new generation of explorers
                        </p>
                        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                            Crafted with precision and designed for adventure, our collection blends functionality with timeless style.
                        </p>
                    </div>

                    {/* Features */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 max-w-md mx-auto lg:mx-0">
                        {features.map(({ icon: Icon, title, desc, color }, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200/50 hover:bg-white hover:shadow-sm transition-all duration-300 group">
                                <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight group-hover:text-[var(--heading-color)] transition-colors">{title}</h4>
                                    <p className="text-xs text-gray-500 leading-tight">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Button */}
                    <div className="pt-4 flex justify-center lg:justify-start">
                        <Link to={"/backpacks"}>
                            <button className="group inline-flex items-center gap-2 bg-[var(--heading-color)] hover:bg-[#4f8951] text-white px-6 sm:px-8 py-3 lg:py-4 rounded-lg font-semibold uppercase tracking-wide transition-all duration-300 mx-auto lg:mx-0 shadow-md hover:shadow-lg">
                                <span>Discover</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                            </button>
                        </Link>
                    </div>

                </div>
            </div>

        </section>
    )
}

export default BrandToday
