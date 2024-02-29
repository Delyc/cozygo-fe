'use client'

import React from "react";

import { Play } from "next/font/google";

const font = Play({
  weight: ["700"],
  display: "swap",
  subsets: ["cyrillic"],
});

import { motion } from "framer-motion";
import { useRouter } from "next/router";
// import { signIn, useSession } from "next-auth/react";

export default function Pricing({
  fromStart,
  currentPlan,
  changeTo,
  isLoading,
}: {
  fromStart?: boolean;
  currentPlan?: string;
  changeTo?: (plan: string) => void;
  isLoading?: boolean;
}) {
  // const router = useRouter();

  // const { data: session } = useSession();

  // const buttonAction = (plan: string) => {
  //   if (currentPlan) {
  //     changeTo && changeTo(plan);
  //   } else {
  //     if (fromStart) {
  //       if (session?.user) {
  //         router.push(`/setup?sub=${plan}`);
  //       } else {
  //         signIn("auth0", {
  //           callbackUrl: `${window.location.origin}/setup?sub=${plan}`,
  //         });
  //       }
  //     } else {
  //       signIn("auth0", {
  //         callbackUrl: `${window.location.origin}/setup?sub=${plan}`,
  //       });
  //     }
  //   }
  // };

  const textToCapitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
  const upgradeOrDowngradeText = (toPlanName: string) => {
    switch (toPlanName) {
      case "starter":
        return currentPlan !== "Free"
          ? `Downgrade to ${textToCapitalize(toPlanName)}`
          : `Upgrade to ${textToCapitalize(toPlanName)}`;
      case "regular":
        return currentPlan === "pro"
          ? `Downgrade to ${textToCapitalize(toPlanName)}`
          : `Upgrade to ${textToCapitalize(toPlanName)}`;
      case "pro":
        return `Upgrade to ${textToCapitalize(toPlanName)}`;
      case "free":
        return `Upgrade to ${textToCapitalize(toPlanName)}`;

      default:
        return `Upgrade to ${textToCapitalize(toPlanName)}`;
    }
  };

  return (
    <section
      id="pricing"
      className="relative mx-auto my-16 w-full bg-white px-4 py-10 text-gray-600"
    >
      <div className="mx-auto max-w-7xl flex-col lg:flex">
        <div className="mb-8 lg:flex-col xl:flex xl:w-full">
          <div className="w-full flex-grow text-center xl:pr-5">
            <h2
              className={`textGradientTitles mb-5 text-4xl font-bold ${font.className}`}
            >
              Choose a Plan
            </h2>
            <p className="text-md mb-5 font-medium tracking-tight">
              Exceptional Training, Budget-Friendly Pricing. Start for free.
            </p>
          </div>
        </div>

        <div
          className={`${
            fromStart ? "w-full" : "lg:w-full xl:w-full"
          } relative mr-auto`}
        >
          <div className="relative mx-auto max-w-4xl lg:flex">
            <motion.div
              initial={{ x: -30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.1 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature featureThreeGradient bg-red-500 disable-mobile-animation relative mx-auto mb-3 w-full min-w-[250px] rounded-md px-4 py-8 text-white md:max-w-[300px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-4 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase ${font.className}`}
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
              {/* <div className="flex w-full flex-col">
                {currentPlan === "starter" ? (
                  <span className="font-semibold text-white">Current Plan</span>
                ) : (
                  <button
                    onClick={() => buttonAction("starter")}
                    disabled={isLoading}
                    className="mx-auto w-max rounded-md bg-white px-12 py-2 text-sm font-bold text-secondary transition-colors duration-300 ease-in hover:bg-secondary/50 hover:text-white"
                  >
                    {fromStart
                      ? currentPlan
                        ? upgradeOrDowngradeText("starter")
                        : "Continue"
                      : "Start for free"}
                  </button>
                )}
              </div> */}
            </motion.div>
            <motion.div
              initial={{ scale: 1 }}
              whileInView={{ scale: 1.1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.2 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] rounded-md px-8 py-8 text-white md:max-w-[300px] lg:relative lg:z-10 lg:-mx-3 lg:mb-0 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase ${font.className}`}
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
              {/* <div className="flex w-full flex-col">
                {currentPlan === "regular" ? (
                  <span className="font-semibold text-white">Current Plan</span>
                ) : (
                  <button
                    onClick={() => buttonAction("regular")}
                    disabled={isLoading}
                    className="mx-auto w-max rounded-md bg-white px-12 py-2 text-sm font-bold text-secondary transition-colors duration-300 ease-in hover:bg-secondary/50 hover:text-white"
                  >
                    {fromStart
                      ? currentPlan
                        ? upgradeOrDowngradeText("regular")
                        : "Continue"
                      : "Start for free"}
                  </button>
                )}
              </div> */}
            </motion.div>
            <motion.div
              initial={{ x: 30, scale: 1 }}
              whileInView={{ x: 0, scale: 1 }}
              transition={{ ease: "easeOut", duration: 0.5, delay: 0.3 }}
              viewport={{ amount: 0.9, once: true }}
              className="shadowAroundFeature featureThreeGradient disable-mobile-animation mx-auto mb-3 w-full min-w-[300px] rounded-md px-8 py-8 text-white md:max-w-[300px] lg:my-2 lg:flex lg:w-1/3 lg:max-w-none lg:flex-col lg:px-10 lg:py-10"
            >
              <div className="w-full flex-grow">
                <h3
                  className={`mb-4 text-center font-bold uppercase ${font.className}`}
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
              {/* <div className="flex w-full flex-col">
                {currentPlan === "pro" ? (
                  <span className="font-semibold text-white">Current Plan</span>
                ) : (
                  <button
                    disabled={isLoading}
                    onClick={() => buttonAction("pro")}
                    className="mx-auto w-max rounded-md bg-white px-12 py-2 text-sm font-bold text-secondary transition-colors duration-300 ease-in hover:bg-secondary/50 hover:text-white"
                  >
                    {fromStart
                      ? currentPlan
                        ? upgradeOrDowngradeText("pro")
                        : "Continue"
                      : "Start for free"}
                  </button>
                )}
              </div> */}
            </motion.div>
          </div>

          {/* {!session && (
            <div className="text-md absolute mb-5 flex w-full flex-col gap-2 pt-8 text-center text-sm font-medium italic tracking-tight">
              <p className="text-base font-semibold">
                All plans start with a free plan. No credit card required.
              </p>
              <div className="flex w-full items-center justify-center gap-4">
                <div className="flex w-max items-center gap-1 text-tertiary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles text-secondary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                  <span>Up to 5 talents</span>
                </div>
                <div className="flex w-max items-center gap-1 text-tertiary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles text-secondary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                  <span>Up to 5 courses</span>
                </div>
                <div className="flex w-max items-center gap-1 text-tertiary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-sparkles text-secondary"
                  >
                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                    <path d="M5 3v4" />
                    <path d="M19 17v4" />
                    <path d="M3 5h4" />
                    <path d="M17 19h4" />
                  </svg>
                  <span>Full access to other features</span>
                </div>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
}