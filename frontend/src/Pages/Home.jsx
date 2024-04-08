import React from 'react'
import MainSearch from '../Section/MainSearch'
import ListSelectedProducts from '../Section/ListSelectedProducts'
import CategorySection from '../Section/CategorySection'
import Offeres from '../Section/Offerse'

const Home = () => {
  return (
    <div>
      <MainSearch/>
      <CategorySection/>
      <ListSelectedProducts type="featured" heading="FEATURED PRODUCTS" />
      <ListSelectedProducts type="latest" heading="LATEST ARRIVALS"/>
      <ListSelectedProducts type="fandom" heading="SHOP BY FANDOME"/>
      <Offeres />
    </div>
  )
}

export default Home
