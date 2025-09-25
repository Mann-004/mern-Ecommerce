  import React, { useState, useEffect, useRef } from "react"
  import { NavLink, Link, useNavigate } from "react-router-dom"
  import {
    ShoppingCart,
    CircleUserRound,
    X,
    Menu,
    PackageSearchIcon
  } from "lucide-react"
  import Profile from "../Profile/Profile"
  import { useSelector } from "react-redux"
  import toast from "react-hot-toast"
  import gsap from "gsap"

  const Navbar = () => {
    const [showProfile, setShowProfile] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const { user, isAuthenticated } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const navRef = useRef(null)
    const linksRef = useRef([])

    const links = [
      { name: "Luggage", path: "/luggage" },
      { name: "Backpacks", path: "/backpacks" },
      { name: "Duffles", path: "/duffles" }
    ]

    const handleProfileClick = () => {
      if (!isAuthenticated || !user) {
        toast.error("Please login to view your profile")
        navigate("/auth")
        return
      }
      setShowProfile((prev) => !prev)
    }

    // GSAP animations
    useEffect(() => {
      gsap.from(navRef.current, {
        y: -80,
        duration: 1,
        ease: "power4.out"
      })

      gsap.from(linksRef.current, {
        opacity: 0,
        y: 20,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.3
      })
    }, [])

    return (
      <nav
        ref={navRef}
        className="navbar px-6 md:px-10 py-3 flex justify-between items-center bg-[#f2f2f2] fixed w-full z-50 shadow-sm"
      >
        {/* Logo */}
        <div className="logo text-[var(--heading-color)] text-xl md:text-4xl font-bold tracking-tighter lg:text-4xl">
          <Link to={"/"}>Scatch</Link>
        </div>

        {/* Links for Desktop */}
        <div className="hidden md:flex items-center gap-20">
          <div className="flex gap-6 text-zinc-700 text-[1rem]">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                ref={(el) => (linksRef.current[index] = el)}
                className={({ isActive }) =>
                  `capitalize transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]"
                      : "hover:text-[var(--primary-color)]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 text-zinc-700 cursor-pointer">
            <Link to={"/cart"}>
              <ShoppingCart className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
            </Link>
            <Link to={"/orders"}>
              <PackageSearchIcon className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
            </Link>
            <CircleUserRound
              className="w-6 h-6 hover:text-[var(--primary-color)] transition"
              onClick={handleProfileClick}
            />
          </div>
        </div>

        {/* Mobile Icons */}
        <div className="md:hidden flex items-center gap-4">
          <Link to={"/cart"}>
            <ShoppingCart className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
          </Link>
          <Link to={"/orders"}>
            <PackageSearchIcon className="w-6 h-6 hover:text-[var(--primary-color)] transition" />
          </Link>
          <CircleUserRound
            className="w-6 h-6 hover:text-[var(--primary-color)] transition"
            onClick={handleProfileClick}
          />
          <button onClick={() => setMenuOpen((prev) => !prev)}>
            {menuOpen ? (
              <X className="w-7 h-7 text-zinc-700" />
            ) : (
              <Menu className="w-7 h-7 text-zinc-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-12 left-0 w-full bg-[#f2f2f2] flex flex-col items-center gap-2 py-2 shadow-md md:hidden">
            {links.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `capitalize text-lg transition-colors duration-200 ${
                    isActive
                      ? "text-[var(--primary-color)] border-b-2 border-[var(--primary-color)]"
                      : "hover:text-[var(--primary-color)]"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        )}

        {/* Profile */}
        {showProfile && isAuthenticated && user && (
          <Profile setShowProfile={setShowProfile} />
        )}
      </nav>
    )
  }

  export default Navbar
