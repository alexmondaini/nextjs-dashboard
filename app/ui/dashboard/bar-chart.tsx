import { BarChart } from '@tremor/react';
import { fetchRevenue } from '@/app/lib/data';



export default async function RevenueBarChart() {
    const revenue = await fetchRevenue();

    return (
        <>
        <BarChart
        data={revenue}
        index='month'
        categories={['revenue']}
        colors={['blue']}
        yAxisWidth={48}
        />
        </>
    )
    
}





