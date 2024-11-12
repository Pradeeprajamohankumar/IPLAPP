import React from "react";
import ipl_logo from '../../assets/ipl-logo.svg';
import LanguageIcon from '@mui/icons-material/Language';
import './Header.css';
function Header() {
    return (
        <div className="Header-container">
           <img src={ipl_logo} alt="ipl-logo" className="ipl-logo" />
            <a href="https://www.iplt20.com/" target="_blank" className="ipl-site"><LanguageIcon/></a>
        </div>
    );
}
export default Header