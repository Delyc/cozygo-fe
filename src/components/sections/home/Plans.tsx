

'use client'

import { motion } from "framer-motion";


const Plans =  ({
    fromStart,
    currentPlan,
    changeTo,
  }: {
    fromStart?: boolean;
    currentPlan?: string;
    changeTo?: (plan: string) => void;
    isLoading?: boolean;
  }) => {
    return(
        <div className="flex flex-col py-10 xl:py-20 gap-10 w-full max-w-[60rem]">

        <div className="flex flex-col w-full  px-5 gap-2.5 xl:gap-5 xl:px-20" >
          <p className="uppercase text-sm text-indigo-600 font-regular text-center lg:text-start">pricing plan</p>
          <p className="xl:font-semibold xl:text-2xl text-[#878C9F] text-center">Choose a plan that’s right for you</p>
        </div>
        <div
          className={`w-full ${fromStart ? "w-full" : "lg:w-full xl:w-full"
            } relative mr-auto`}
        >
          <div className="relative mx-auto w-full  lg:flex px-5 md:px-8 grid md:grid-cols-3 xl:grid-cols-2 place-content-center">
            <motion.div
              initial={{ x: -30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature featureThreeGradient bg-indigo-600/80 disable-mobile-animation relative mx-auto mb-3 w-full min-w-[250px]  md:min-w-[100px] rounded-md px-4 py-8 text-white md:max-w-[250px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-4 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Starter
                </h3>
                <span className="mb-5 text-center text-4xl font-bold">
                  $30<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    15 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature bg-indigo-600 featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] md:min-w-[100px] rounded-md px-8 py-8 text-white md:max-w-[250px] lg:relative lg:z-10 lg:-mx-3 lg:mb-0 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Regular
                </h3>
                <span className="mb-5 text-center text-4xl font-bold lg:text-5xl">
                  $90<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex  flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    40 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
            <motion.div
              initial={{ x: 30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature bg-indigo-600/80 featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] md:min-w-[100px] rounded-md px-8 py-8 text-white md:max-w-[250px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase `}
                >
                  Pro
                </h3>
                <span className="mb-5 text-center text-4xl font-bold">
                  $200<span className="text-sm">/mo</span>
                </span>
                <ul className="my-8 flex flex-col gap-2 text-sm">
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    250 talent seats
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited courses
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Single Sign On
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 support
                  </li>
                  <li className="flex items-center gap-2 leading-tight">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6 shrink-0 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Custom domain + SSL
                  </li>
                </ul>
              </div>

            </motion.div>
          </div>


        </div>
      </div>
    )
}

export default Plans