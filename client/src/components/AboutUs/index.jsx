import React from "react";
import { FiArrowLeft } from "react-icons/fi";
import { motion } from "framer-motion"; // 👈 animation library
// import BuyerNavigationFooter from "../BuyerNavigationFooter";

const AboutUs = () => {
    return (
        <div className="min-h-screen bg-white px-4 py-6 text-black">
            {/* Top Bar */}
            <div className="flex items-center mb-6">
                {/* <button className="text-2xl">
                    <FiArrowLeft />
                </button> */}
                <h1 className="flex-1 text-center font-semibold text-lg">Karshak</h1>
            </div>

            {/* Title */}
            <motion.h2
                className="text-lg font-bold text-center mb-4"
                initial={{ y: -40, opacity: 0 }} // start position
                animate={{ y: 0, opacity: 1 }} // end position
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                About Us
            </motion.h2>

            {/* Content */}
            <motion.div
                className="space-y-4 text-sm leading-relaxed text-justify mb-80"
                initial={{ y: -50, opacity: 0 }} // start off above & invisible
                animate={{ y: 0, opacity: 1 }} // slide down + fade in
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
                <p>
                    Karshak is a dedicated farmer-to-consumer mobile application designed
                    to transform the way agricultural goods are distributed and accessed.
                    The platform creates a direct connection between farmers and consumers,
                    ensuring that farm produce reaches buyers without unnecessary
                    middlemen.
                </p>
                <p>
                    The goal of Karshak is to empower local farmers by giving them a
                    digital space to showcase their products, set fair prices, and manage
                    sales independently. For consumers, the app offers access to fresh,
                    locally sourced produce with complete transparency and trust.
                </p>
                <p>
                    Karshak promotes sustainable, community-based commerce by supporting
                    regional agriculture and encouraging healthy consumption patterns. With
                    a simple interface and regional language support, the platform is
                    accessible to users from all backgrounds.
                </p>
                <p>
                    By simplifying the distribution chain and building trust between
                    producers and buyers, Karshak contributes to a stronger agricultural
                    economy and a more connected rural-urban ecosystem.
                </p>
            </motion.div>

            {/* <BuyerNavigationFooter /> */}
        </div>
        );
    };

export default AboutUs;
