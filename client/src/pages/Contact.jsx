import React from "react";
import { assets } from "../assets/assets_frontend/assets";

const Contact = () => {
  return (
    <>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          Contact <span className="text-gray-700 font-semibold">Us</span>
        </p>
      </div>
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.contact_image}
          alt="contact_us"
        />
        <div className="flex flex-col justify-center items-center gap-6">
          <p className="font-semibold text-lg text-gray-600">Our Office</p>
          <p className="text-gray-500">
            <b>Address: </b>5437, Williams Station <br />
            San Fransisco, Washington, USA
          </p>
          <p className="text-gray-500">
            <b>Tel: </b> +(412) 123-456-789 <br /> <b>Email: </b>{" "}
            prescripto@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">
            Careers At Prescripto
          </p>
          <p className="text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500">
            Explore Our Jobs
          </button>
        </div>
      </div>
    </>
  );
};

export default Contact;
