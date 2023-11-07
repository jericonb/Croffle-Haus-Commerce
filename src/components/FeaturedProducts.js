import {useState, useEffect} from 'react';
import PreviewProducts from './PreviewProducts';
import './FeaturedProductsStyle.css'

export default function FeaturedProducts(){
	const [previews, setPreviews] = useState([])

	useEffect(() => {
		fetch(`https://croffle-haus.onrender.com/products/active`, {
			method: 'GET'
		})
		.then(res => res.json())
		.then(data => {
			console.log(data)

			const numbers = []
			const featured = []

			const generateRandomNums = () => {
				let randomNum = Math.floor(Math.random() * data.length)

				if(numbers.indexOf(randomNum) === -1){
					numbers.push(randomNum)
				}else{
					generateRandomNums()
				}
			}

	
			for(let i = 0; i < 4; i++){
				generateRandomNums()

			
				featured.push(
					<PreviewProducts data={data[numbers[i]]} key={data[numbers[i]]._id} breakPoint={2} />
				)
			}

			setPreviews(featured)
		})
	}, [])

	return(
		<div className="previews">
				{previews}
		</div>
	)
}