import React from "react";
import {
  AiOutlineTwitter,
  AiFillFacebook,
  AiFillInstagram,
} from "react-icons/ai";

const Footer: React.FC = () => {
  return (
    <div className="footer-container flex flex-col">
      <div className="footer flex flex-col justify-around bg-neutral-800 text-white">
        <div className="top-section flex justify-around w-full">
          <div className="left-footer-section">
            <h2 className="text-cyan-400 mb-5 mt-20">Company</h2>
            <ul>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">About Us</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Terms and Conditions of Sale</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Exchange and Returns Policy</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Cookie Policy</a>
              </li>
            </ul>
          </div>
          <div className="middle-footer-section">
            <ul>
              <h2 className="text-cyan-400 mb-5 mt-20">FAQ</h2>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">How to Buy</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Shipping and Delivery</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Payment Methods</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">Partner Program</a>
              </li>
            </ul>
          </div>
          <div className="right-footer-section">
            <ul>
              <h2 className="text-cyan-400 mb-5 mt-20">Customer</h2>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">My Account</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">My Orders</a>
              </li>
              <li className="mt-5 hover:text-cyan-400">
                <a href="#">My Tickets</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="social-section bg-neutral-700 mt-28 flex flex-col items-center">
          <div className="social-text h-14 w-full flex justify-center items-center">
            <p>Follow Us</p>
          </div>
          <div className="social-icons flex flex-row items-center justify-around w-96 h-28">
            <a href="#" className="hover:text-cyan-400">
              <AiOutlineTwitter className="text-7xl" />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <AiFillFacebook className="text-7xl" />
            </a>
            <a href="#" className="hover:text-cyan-400">
              <AiFillInstagram className="text-7xl" />
            </a>
          </div>
        </div>
        <div className="company-section py-10 flex flex-row justify-center">
          <div className="company-section-logo">
            <img
              src="/productsImg/logo.png"
              alt="Company Logo"
              className="w-72"
            />
          </div>
          <div className="company-section-desc text-white flex flex-col text-center justify-center w-4/12">
            <p>React GPU Store Informatics LLC.</p>

            <p className="uppercase">Customer Service</p>
            <p>Monday to Friday from 9:00 AM to 6:00 PM</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
