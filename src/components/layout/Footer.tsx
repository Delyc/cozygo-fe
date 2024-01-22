
// components/Footer.js
'use client'
import { useState } from "react";
import Button from "../UI/Button";
import { Apple, Expand, PlayStore } from "../svgs/Heart";
import MobileApp from "../modals/MobileApp";

const Footer = () => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleButtonClick = () => {
      setModalOpen(true);
    };
    return (
        <footer className="flex  justify-center px-5   ">

            <div className=" flex justify-between gap-20  max-w-[1330px]">

                <div className="flex flex-col gap-5 w-[20rem]">
                    <p className="text-indigo-600 font-bold text-lg">CozyGo</p>
                    <p className="text-xs text-secondary_gray leading-6 font-[400]">Lorem ipsum dolor sit amet, consectetur adipiscing
                        elit. Maecenas in pulvinar neque. Nulla finibus
                        lobortis pulvinar.</p>
                    <div className="flex items-center gap-2">
                        <svg width="13" height="10" viewBox="0 0 13 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7812 0.25C12.4414 0.25 13 0.808594 13 1.46875V8.78125C13 9.4668 12.4414 10 11.7812 10H1.21875C0.533203 10 0 9.4668 0 8.78125V1.46875C0 0.808594 0.533203 0.25 1.21875 0.25H11.7812ZM11.7812 1.46875H1.21875V2.50977C1.77734 2.99219 2.69141 3.70312 4.62109 5.22656C5.05273 5.55664 5.89062 6.36914 6.5 6.34375C7.08398 6.36914 7.92188 5.55664 8.35352 5.22656C10.2832 3.70312 11.1973 2.99219 11.7812 2.50977V1.46875ZM1.21875 8.78125H11.7812V4.08398C11.1973 4.54102 10.3594 5.20117 9.11523 6.19141C8.53125 6.62305 7.56641 7.58789 6.5 7.5625C5.4082 7.58789 4.41797 6.62305 3.85938 6.19141C2.61523 5.20117 1.77734 4.54102 1.21875 4.08398V8.78125Z" fill="#3270FC" />
                        </svg>

                        <p className="text-sm font-semibold text-darkBlue">yourmail@domain.com</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="bg-indigo-600 w-8 h-8 grid place-content-center rounded">
                            <svg width="13" height="13" viewBox="0 0 7 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.7302 6.5625H4.11887V11.375H1.97043V6.5625H0.208715V4.58594H1.97043V3.06055C1.97043 1.3418 3.00168 0.375 4.57004 0.375C5.322 0.375 6.11692 0.525391 6.11692 0.525391V2.22266H5.23606C4.37668 2.22266 4.11887 2.73828 4.11887 3.29688V4.58594H6.03098L5.7302 6.5625Z" fill="white" />
                            </svg>

                        </div>

                        <div className="bg-indigo-600 w-8 h-8 grid place-content-center rounded">
                            <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5.15888 2.4043C6.51239 2.4043 7.62958 3.52148 7.62958 4.875C7.62958 6.25 6.51239 7.3457 5.15888 7.3457C3.78388 7.3457 2.68818 6.25 2.68818 4.875C2.68818 3.52148 3.78388 2.4043 5.15888 2.4043ZM5.15888 6.48633C6.03974 6.48633 6.74872 5.77734 6.74872 4.875C6.74872 3.99414 6.03974 3.28516 5.15888 3.28516C4.25654 3.28516 3.54755 3.99414 3.54755 4.875C3.54755 5.77734 4.27802 6.48633 5.15888 6.48633ZM8.2956 2.31836C8.2956 2.64062 8.03779 2.89844 7.71552 2.89844C7.39325 2.89844 7.13544 2.64062 7.13544 2.31836C7.13544 1.99609 7.39325 1.73828 7.71552 1.73828C8.03779 1.73828 8.2956 1.99609 8.2956 2.31836ZM9.92841 2.89844C9.97138 3.69336 9.97138 6.07812 9.92841 6.87305C9.88544 7.64648 9.71357 8.3125 9.15497 8.89258C8.59638 9.45117 7.90888 9.62305 7.13544 9.66602C6.34052 9.70898 3.95575 9.70898 3.16083 9.66602C2.38739 9.62305 1.72138 9.45117 1.1413 8.89258C0.582707 8.3125 0.410832 7.64648 0.367863 6.87305C0.324894 6.07812 0.324894 3.69336 0.367863 2.89844C0.410832 2.125 0.582707 1.4375 1.1413 0.878906C1.72138 0.320312 2.38739 0.148438 3.16083 0.105469C3.95575 0.0625 6.34052 0.0625 7.13544 0.105469C7.90888 0.148438 8.59638 0.320312 9.15497 0.878906C9.71357 1.4375 9.88544 2.125 9.92841 2.89844ZM8.89716 7.71094C9.15497 7.08789 9.09052 5.58398 9.09052 4.875C9.09052 4.1875 9.15497 2.68359 8.89716 2.03906C8.72529 1.63086 8.40302 1.28711 7.99482 1.13672C7.35029 0.878906 5.84638 0.943359 5.15888 0.943359C4.44989 0.943359 2.94599 0.878906 2.32294 1.13672C1.89325 1.30859 1.57099 1.63086 1.39911 2.03906C1.1413 2.68359 1.20575 4.1875 1.20575 4.875C1.20575 5.58398 1.1413 7.08789 1.39911 7.71094C1.57099 8.14062 1.89325 8.46289 2.32294 8.63477C2.94599 8.89258 4.44989 8.82812 5.15888 8.82812C5.84638 8.82812 7.35029 8.89258 7.99482 8.63477C8.40302 8.46289 8.74677 8.14062 8.89716 7.71094Z" fill="white" />
                            </svg>


                        </div>


                    </div>
                </div>

                <div className="flex flex-col gap-5 w-[10rem]">

                    <p className="text-[#566985]">Helpful Links</p>

                    <div className="flex flex-col gap-3 " >
                        <div className="flex items-center gap-1">
                            <Expand fill={"#4f46e5"} height={""} width={""} stroke={""} stroke_width={0} />
                            <p className="text-sm font-semibold text-darkBlue">Home</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Expand fill={"#4f46e5"} height={""} width={""} stroke={""} stroke_width={0} />
                            <p className="text-sm font-semibold text-darkBlue">Home</p>
                        </div>
                        <div className="flex items-center gap-1">
                            <Expand fill={"#4f46e5"} height={""} width={""} stroke={""} stroke_width={0} />
                            <p className="text-sm font-semibold text-darkBlue">Home</p>
                        </div>

                    </div>
                </div>


                <div className="flex flex-col gap-5 w-[10rem]">

                    <p className="text-[#566985]">Legal</p>

                    <div className="flex flex-col gap-3" >
                        <p className="text-sm font-semibold text-darkBlue">Terms & Conditions</p>
                        <p className="text-sm font-semibold text-darkBlue">Privacy Policy</p>
                        <p className="text-sm font-semibold text-darkBlue">Faq</p>

                    </div>
                </div>


                <div className="flex flex-col gap-5 w-[20rem] relative  ">

                    <p className="text-[#566985]">Download our app</p>
                    <p className="text-xs text-secondary_gray leading-6 font-[400] max-w-[15rem]">Start working with Homeradar that can provide
                        everything you need</p>

                    <div className="flex flex-col gap-2.5">
                        <Button onClick={handleButtonClick} label={"Apple Store"} Icon={<Apple fill={""} height={""} width={""} stroke={""} stroke_width={0} />} className={""} />
                        <Button onClick={handleButtonClick} label={"Play Store"} Icon={<PlayStore fill={""} height={""} width={""} stroke={""} stroke_width={0} />} className={""} />
                    </div>
                    <MobileApp isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        <p className="text-xs text-primary_gray">Our mobile app is currently under development and will be launching soon. Stay tuned for updates!</p>
      </MobileApp>
                </div>

            </div>
            <div>

            </div>

            <div>

            </div>

        </footer>
    );
}

export default Footer;

