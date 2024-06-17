import React from 'react'
import Layout from '../../components/Layout/layout';
import HistoriesData from '../../components/Chart/HistoriesData';
import FuelConsumptionChart from '../../components/Chart/FuelConsumptionChart';
import ServiceScheduleCard from '../../components/Card/ServiceScheduleCard';

const page = () => {
  return (
    <Layout><HistoriesData/><FuelConsumptionChart/><ServiceScheduleCard /></Layout>
  )
}

export default page;