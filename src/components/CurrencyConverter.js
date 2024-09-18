import React, { useEffect, useState } from 'react'
import CurrencySelect from './CurrencySelect'
import { useExchangeRates } from '../hooks/useExchangeRates'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

import './CurrencyConverter.css'

const CurrencyConverter = () => {
	const [amount1, setAmount1] = useState(1)
	const [amount2, setAmount2] = useState(1)
	const [currency1, setCurrency1] = useState('USD')
	const [currency2, setCurrency2] = useState('UAH')

	const { rates, loading } = useExchangeRates()

	useEffect(() => {
		if (rates[currency2]) {
			setAmount2(
				Number((amount1 * (rates[currency2] / rates[currency1])).toFixed(2))
			)
		}
	}, [amount1, currency1, currency2, rates])

	const handleAmount1Change = amount => {
		if (amount === '') {
			setAmount1('')
			setAmount2('')
		} else {
			const numericAmount = Number(amount)
			setAmount1(numericAmount)

			if (rates[currency1] && rates[currency2]) {
				setAmount2(
					Number((amount * (rates[currency2] / rates[currency1])).toFixed(2))
				)
			}
		}
	}

	const handleAmount2Change = amount => {
		if (amount === '') {
			setAmount2('')
			setAmount1('')
		} else {
			const numericAmount = Number(amount)

			setAmount2(numericAmount)

			if (rates[currency1] && rates[currency2]) {
				setAmount1(
					Number((amount * (rates[currency1] / rates[currency2])).toFixed(2))
				)
			}
		}
	}

	const handleCurrency1Change = currency => {
		setCurrency1(currency)
		setAmount2(
			Number((amount1 * (rates[currency2] / rates[currency1])).toFixed(2))
		)
	}

	const handleCurrency2Change = currency => {
		setCurrency2(currency)
		setAmount1(
			Number((amount2 * (rates[currency1] / rates[currency2])).toFixed(2))
		)
	}

	const handleSwapCurrencies = () => {
		setCurrency1(currency2)
		setCurrency2(currency1)
		setAmount1(amount2)
		setAmount2(amount1)
	}

	return (
		<div className='container'>
			<header className='header'>
				<h1>Курс валют</h1>
				<div className='exchange-rates'>
					<div className='rate'>
						<img src='/usd-flag.svg' alt='USD' width={30} height={30} />
						<p>
							USD/UAH:{' '}
							{loading ? (
								<FontAwesomeIcon icon={faSpinner} spin color='#3b82f6' />
							) : (
								(1 / rates.USD).toFixed(2)
							)}
						</p>
					</div>
					<div className='rate'>
						<img src='/eur-flag.svg' alt='EUR' width={30} height={30} />
						<p>
							EUR/UAH:{' '}
							{loading ? (
								<FontAwesomeIcon icon={faSpinner} spin color='#3b82f6' />
							) : (
								(1 / rates.EUR).toFixed(2)
							)}
						</p>
					</div>
				</div>
			</header>

			<div className='converter'>
				<h2>Конвертер валют</h2>
				<div className='converter-content'>
					<div className='currency-input'>
						<div className='input-wrapper'>
							<input
								type='number'
								value={amount1 === 0 ? '' : amount1}
								onChange={e => handleAmount1Change(Number(e.target.value))}
							/>
						</div>
						<CurrencySelect
							value={currency1}
							onChange={handleCurrency1Change}
						/>
					</div>
					<button
						onClick={handleSwapCurrencies}
						className='swap-button'
						aria-label='Поміняти валюти місцями'
					>
						⇄
					</button>
					<div className='currency-input'>
						<div className='input-wrapper'>
							<input
								type='number'
								value={amount2 === 0 ? '' : amount2}
								onChange={e => handleAmount2Change(Number(e.target.value))}
							/>
						</div>
						<CurrencySelect
							value={currency2}
							onChange={handleCurrency2Change}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CurrencyConverter
