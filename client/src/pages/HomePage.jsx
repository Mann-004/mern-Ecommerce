import React from 'react'
import Heading from '../components/Heading/Heading'
import Slider from '../components/Slider/Slider'
import NewArrival from '../components/NewArrival/NewArrival'
import Category from '../components/Category/Category'
import BrandToday from '../components/BrandToday/BrandToday'

const HomePage = () => {
  return (
    <>
      <section className="bg-[#f1f1f1] py-6 ">
        <Heading />
      </section>

      <section className="lg:px-12 lg:py-16">
        <Slider />
      </section>

      <section className="lg:px-12 lg:py-24 bg-[#f1f1f1] ">
        <NewArrival />
      </section>

      <section className="lg:px-12 lg:py-16 ">
        <Category />
      </section>

      <section className="lg:px-12 lg:py-8 bg-[#f1f1f1]">
        <BrandToday />
      </section>
    </>
  )
}

export default HomePage
