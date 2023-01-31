import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-start">
                <div className="footer-start-links">
                    <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header">شركة</p>
                        <ul>
                            <li><Link to='/'>معلومات عنا</Link></li>
                            <li><Link to='/'>مركز المساعدة</Link></li>
                            <li><Link to='/'>سياسة خاصة</Link></li>
                            <li><Link to='/'>كن شريكا</Link></li>
                        </ul>
                    </div>
                    <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header">رابط سريع</p>
                        <ul>
                            <li><Link to='/'>معلومات عنا</Link></li>
                            <li><Link to='/'>مركز المساعدة</Link></li>
                            <li><Link to='/'>سياسة خاصة</Link></li>
                            <li><Link to='/'>كن شريكا</Link></li>
                        </ul>
                    </div>
                    <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header">ابقى على تواصل</p>
                        <ul>
                            <li>tartel@mail.com</li>
                            <li>Riyadh 2231</li>
                        </ul>
                    </div>
                </div>
                <div className="footer-start-support">
                    <p>مدعوم من</p>
                    <div className="footer-start-support-logos">
                        <i className="fa-brands fa-spotify"></i>
                        <i className="fa-brands fa-apple"></i>
                        <i className="fa-brands fa-itunes"></i>
                    </div>
                </div>
            </div>
            <div className="footer-end">
                <div className="footer-end-logo">
                    <h2>logo</h2>
                </div>
                <div className="footer-end-social">
                    <div className="footer-end-social-logos">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-youtube"></i>
                    </div>
                    <p>Copyright 2022 By Tartel</p>
                </div>
            </div>

        </footer>
    )
}

export default Footer;