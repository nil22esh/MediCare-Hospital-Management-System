import React from "react";
import { assets } from "../assets/assets_frontend/assets";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="logo" />
          <p className="w-full md:w-3/4 text-gray-600 leading-5">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Placeat,
            debitis consequuntur fugiat odit tempora eius. Iure, iusto
            cupiditate libero mollitia sint aliquid enim tenetur quidem eos
            dignissimos porro doloremque soluta suscipit. Reiciendis quibusdam,
            quidem laudantium quod nesciunt obcaecati quis impedit adipisci
            eaque possimus error in laborum sint dolores temporibus cum
            consectetur! Unde facere nostrum impedit earum molestias officiis
            consequuntur? Quos in esse autem. Sed quibusdam dolorum odit laborum
            eligendi autem!
          </p>
        </div>

        <div>
          <p className="text-sl font-medium mb-5">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>

        <div>
          <p className="text-sl font-medium mb-5">Get In Touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+91 1234567890</li>
            <li>medicare@gmail.com</li>
          </ul>
        </div>
      </div>

      <div>
        <hr />
        <p className="py-5 text-sm text-center">
          Copyright © 2025 Medicare - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
