import { Link } from 'react-router-dom';
import './BannerStyle.css'

export default function Banner({data}){
    
    const { content, destination, label} = data;

    return(
        <div className="banner">
            {/* <h1>{title}</h1> */}
            {/* <img src={require("../Images/1.png")} alt="Croffle Haus background" /> */}
            <h1>{content}</h1>
            <Link className="btn btn-custom" to={destination}>{label}</Link>
        </div>
        
    )
}
