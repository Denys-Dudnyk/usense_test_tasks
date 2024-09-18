import React, { useEffect, useRef, useState } from 'react'
import { ChevronUpDownIcon, CheckIcon } from '@heroicons/react/24/outline'

import './CurrencySelect.css'

const currencyOptions = [
	{ value: 'UAH', label: 'UAH - Гривня', image: '/uah-flag.svg' },
	{ value: 'USD', label: 'USD - Долар США', image: '/usd-flag.svg' },
	{ value: 'EUR', label: 'EUR - Євро', image: '/eur-flag.svg' },
]

const CurrencySelect = ({ value, onChange }) => {
	const [isOpen, setIsOpen] = useState(false)
	const selectedOption = currencyOptions.find(option => option.value === value)

	const selectRef = useRef(null)

	const handleClickOutside = event => {
		if (selectRef.current && !selectRef.current.contains(event.target)) {
			setIsOpen(false)
		}
	}

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [])

	return (
		<div className='currency_select' ref={selectRef}>
			<button
				type='button'
				className='select_button'
				onClick={() => setIsOpen(!isOpen)}
			>
				<span className='selected_option'>
					<img src={selectedOption?.image} alt={selectedOption?.value} />
					<span>{selectedOption?.label}</span>
				</span>
				<span className='arrow'>
					<ChevronUpDownIcon className='arrow_icon' aria-hidden='true' />
				</span>
			</button>

			{isOpen && (
				<ul className='option_list'>
					{currencyOptions.map(option => (
						<li
							key={option.value}
							className={`option ${value === option.value ? 'selected' : ''}`}
							onClick={() => {
								onChange(option.value)
								setIsOpen(false)
							}}
						>
							<div className='option_wrapper'>
								<img src={option.image} alt={option.value} />
								<span>{option.label}</span>
							</div>
							{value === option.value && (
								<span className='check'>
									<CheckIcon className='check_svg' aria-hidden='true' />
								</span>
							)}
						</li>
					))}
				</ul>
			)}
		</div>
	)
}

export default CurrencySelect
