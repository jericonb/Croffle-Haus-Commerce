import Banner from '../components/Banner';
import FeaturedProducts from '../components/FeaturedProducts';
import './HomeStyle.css';
import ProductSearch from '../components/ProductSearch';

export default function Home(){

    const data = {
        content: (
        <div className='slogancontainer'>
            <div className='sloganbox'>
                <div className="slogan"> Where <span className="sloganphrase">Croissant</span> meets <span className="sloganphrase">Waffle</span></div>
                <div className="slogan">The <span className="sloganphrase">Perfect Pairing</span> at <span className="sloganphrase">Croffle Haus!</span></div>
            </div>
        </div>
            ),
        // destination: "/products",
        // label: "Order now!"
    }

    return(
    
		<section className='home'>
                
                <Banner data={data}/>
                <ProductSearch />
                <FeaturedProducts />
		</section>
    
    )
}
