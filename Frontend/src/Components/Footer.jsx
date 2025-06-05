/* eslint-disable react/prop-types */
import {  useEffect } from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { AiFillVideoCamera, AiFillMail, AiFillPhone } from "react-icons/ai";
import { Link } from "react-scroll";
import { fetchCompanyDetails } from "../utils/utils";
import { useCompany } from "../context/companyContext/CompanyContext";

export default function Footer({ menuItems1 }) {
  const { company, setCompany } = useCompany()

  useEffect(() => {
    if (!company) {
      fetchCompanyDetails().then((response) => {
        setCompany(response);
      });
    }
  }, []);

  return (
    <footer className="bg-gradient-to-r from-blue-950 to-cyan-900 text-white py-8 px-6">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {/* About Us */}
        <div className="flex flex-col items-center text-center">
          <div className="text-2xl font-serif text-center md:text-left md:mb-0">
            {company?.companyName}
          </div>
          <p className="mt-[2rem] text-gray-300">{company?.description}</p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4 ml-[-30px]">Quick Links</h3>
          <ul className="space-y-2">
            {menuItems1.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.href}
                  smooth={true}
                  duration={500}
                  className="flex items-center text-gray-300 hover:text-blue-400 transition-colors cursor-pointer"
                >
                  {item.icon && <item.icon className="mr-2" />}
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Developed By */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4">Developed By</h3>
          <a
            href="https://docs.google.com/document/d/159yuCoWaNpEdNQU9DL74hRHT_nfcmgWF4dYBVrmyf2o/edit"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Jayita Bhowmick
          </a>
          <a
            href="https://docs.google.com/document/d/159yuCoWaNpEdNQU9DL74hRHT_nfcmgWF4dYBVrmyf2o/edit"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Keya Tarafdar
          </a>
          <a
            href="https://docs.google.com/document/d/159yuCoWaNpEdNQU9DL74hRHT_nfcmgWF4dYBVrmyf2o/edit"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Priya Acharjee
          </a><a
            href="https://docs.google.com/document/d/159yuCoWaNpEdNQU9DL74hRHT_nfcmgWF4dYBVrmyf2o/edit"
            className="text-gray-300 hover:text-blue-400 transition-colors"
          >
            Shreya Kundu
          </a>
        </div>

        {/* Get in Touch */}
        <div className="flex flex-col items-center text-center">
          <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
          <div className="flex space-x-4 mb-4">
            <a
              href={company?.fbLink}
              className="text-2xl text-gray-300 hover:text-blue-600 transition-colors"
            >
              <FaFacebook />
            </a>
            <a
              href={company?.instaLink}
              className="text-2xl text-gray-300 hover:text-pink-500 transition-colors"
            >
              <FaInstagram />
            </a>
            <a
              href={company?.linkedinLink}
              className="text-2xl text-gray-300 hover:text-blue-700 transition-colors"
            >
              <FaLinkedin />
            </a>
          </div>
          <div>
            <Link
              to="gallery"
              smooth={true}
              duration={500}
              className="flex items-center text-pink-500 text-2xl hover:text-blue-400 transition-colors cursor-pointer"
            >
              <AiFillVideoCamera className="mr-2" /> Our Gallery
            </Link>
          </div>
          <div className="mt-4 flex justify-center items-center hover:text-blue-400">
            <AiFillMail className="mr-2" />
            <a href="mailto:eventek@gmail.com" className="hover:underline">
              {company?.email}
            </a>
          </div>
          <div className="mt-4 flex justify-center items-center hover:text-blue-400">
            <AiFillPhone className="mr-2" />
            {company?.contact}
          </div>
        </div>
      </div>

      {/* Bottom Text */}
      <div className="bg-gray-900 text-center py-4 mt-8">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} {company?.companyName}. All rights
          reserved | Terms & Conditions | Privacy Policy
        </p>
      </div>
    </footer>
  );
}
