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
      <ListSelectedProducts/>
      <ListSelectedProducts/>
      <ListSelectedProducts/>
      <Offeres />
    </div>
  )
}

export default Home
