import React from 'react';
import './FooterStyle.css'
import '@fortawesome/fontawesome-free/css/all.min.css';

export default function Highlights() {
  return (
        <section className="footercontainer">
            <div className="footer">
                <div>Contact Us:</div>
                <div><i class="fa-brands fa-facebook"></i><a href="https://web.facebook.com/profile.php?id=100095314691079">Facebook</a></div>
                <div><i class="fa-solid fa-envelope"></i> crofflehaus@mail.com </div>
                <div><i class="fa-solid fa-phone"></i> +63 9123456789 </div>
                <div><i class="fa-solid fa-house"></i> Parañaque, Metro Manila</div>
            </div>
        </section>
  )
}
