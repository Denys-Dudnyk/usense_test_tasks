import React, { useEffect, useState } from 'react'
import axios from 'axios'
export const useExchangeRates = () => {
	const [rates, setRates] = useState({})
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchRates = async () => {
			try {
				const response = await axios.get(
					`https://v6.exchangerate-api.com/v6/${process.env.REACT_APP_API_KEY}/latest/UAH`
				)

				setRates(response.data.conversion_rates)
				setLoading(false)
			} catch (error) {
				console.error('Error fetching exchange rates', error)
				setLoading(false)
			}
		}

		fetchRates()

		const interval = setInterval(fetchRates, 60000)

		return () => clearInterval(interval)
	}, [])

	return { rates, loading }
}
