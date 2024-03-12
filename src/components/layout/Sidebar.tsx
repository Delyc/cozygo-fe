"use client";
import React, { useEffect, useState } from "react";
import RequestTable from "../UI/table/RequestTable";
import AgentHouse from "../dashboard/AgentHouse";
import UserWishlist from "../dashboard/UserWishlist";
import HouseForm from "../forms/HouseForm";
import { ArrowIcon, Declined, Expand, Home, House, Message, Open } from "../svgs/Heart";
import { decodeToken } from "@/helpers/decodeToken";
import Houses from "@/app/houses/page";
import getToken from "@/helpers/getToken";
import Chat from "@/app/chat/page";
type SidebarProps = {
  setSelectedContent: (content: React.ReactNode) => void;
  setIsSidebarExpanded: (content: React.ReactNode) => void;
  isSidebarExpanded: any;
};

const Sidebar: React.FC<SidebarProps> = ({
  setSelectedContent,
  setIsSidebarExpanded,
  isSidebarExpanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [token, setToken] = useState("")

  useEffect(() => {
    return setToken(getToken());
}, [])

  const user = decodeToken(token || '')

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setIsSidebarExpanded(false);
      } else {
        setIsSidebarExpanded(true);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const toggleSidebar = () => {
    setIsSidebarExpanded(!isSidebarExpanded);
  };
  const handleExpandableItemClick = () => {
    setIsExpanded(!isExpanded);
    setSelectedContent(<RequestTable />);
  };

  const handleExpandableHouse = () => {
    setIsExpanded(!isExpanded);
    if (user?.accountType === 'agent') {
      setSelectedContent(<AgentHouse />)
    } else {
      setSelectedContent(<Houses />)
    }
    ;
  };

  console.log(user?.accountType)
  const userType = "user";
  return (
    <aside
      className={`${isSidebarExpanded ? "w-64" : "w-16"
        } fixed lg:relative h-screen transition-width duration-300 ease-in-out z-30 bg-indigo-600`}
      aria-label="Sidebar"
    >
      <div className="h-full pt-10 overflow-y-auto rounded ">
        <div className="flex flex-col justify-between h-full ">
          <div>
            <div className="p-5">
              <button onClick={toggleSidebar} className="text-white xl:hidden">
                {isSidebarExpanded ? (
                  <ArrowIcon fill="white" height="20px" width="20px" stroke={""} strokeWidth={0} />
                ) : (
                  <Expand fill="white" height="20px" width="20px" stroke={""} strokeWidth={0} />
                )}
              </button>
            </div>
            <div
              className={`border-white/20 pb-6 border-b-2 ${isSidebarExpanded ? "px-5" : "px-2"}`}
            >
              <h1 className={`text-white text-2xl leading-8 ${isSidebarExpanded ? "" : "hidden"}`}>
                CozyGo
              </h1>
            </div>
            <div className={` mt-5 ${isSidebarExpanded ? "px-5" : "px-2"}`}>
              <button
                onClick={() => setSelectedContent("")}
                className={` ${isSidebarExpanded
                  ? "flex flex-row  text-start"
                  : "flex flex-col text-xs text-center items-center px-2.5"
                  } gap-2 p-2 w-full text-white/80  rounded hover:bg-black/20`}
              >
                <Home
                  fill={"white"}
                  height={"20px"}
                  width={"20px"}
                  stroke={"white"}
                  strokeWidth={0}
                />
                <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>Dashboard overview</p>
              </button>
              <button
                onClick={() =>
                  setSelectedContent(user?.accountType === "homeSeeker" ? <UserWishlist /> : <AgentHouse />)
                }
                className="flex items-center w-full p-2 rounded gap-2 text-white/80 text-start hover:bg-black/20"
              >
                <House fill={"white"} height={"20px"} width={"20px"} stroke={""} strokeWidth={0} />
                <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>
                  {" "}
                  {user?.accountType === "homeSeeker" ? " My wishlist" : "My house"}
                </p>
              </button>
              <div className="mt-2">
                <button
                  onClick={handleExpandableHouse}
                  className="flex items-center justify-between block w-full p-2 rounded text-white/80 text-start hover:bg-black/20"
                >
                  <div className="flex items-center gap-2">
                    <House
                      fill={"white"}
                      height={"20px"}
                      width={"20px"}
                      stroke={""}
                      strokeWidth={0}
                    />
                    <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>Houses</p>
                  </div>
                  {user?.accountType !== "homeSeeker" &&
                    <Open
                      fill={"none"}
                      height={"20px"}
                      width={"20px"}
                      stroke={"white"}
                      strokeWidth={0}
                    />}
                </button>
                {user?.accountType !== "homeSeeker" ? isExpanded && (
                  <div className="mt-1">
                    <button
                      onClick={() =>
                        setSelectedContent(
                          <div className="w-[98%] lg:w-1/2">
                            <HouseForm />
                          </div>
                        )
                      }
                      className="flex items-center w-full p-2 ml-4 text-sm rounded gap-2 hover:bg-black/20 text-start text-white/80"
                    >
                      <Declined
                        fill={"white"}
                        height={"15px"}
                        width={"20px"}
                        stroke={"white"}
                        strokeWidth={0}
                      />
                      <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>Add house</p>
                    </button>

                    <button
                      onClick={() => setSelectedContent(<AgentHouse />)}
                      className="flex items-center w-full p-2 ml-4 text-sm rounded gap-2 hover:bg-black/20 text-start text-white/80"
                    >
                      <House
                        fill={"white"}
                        height={"15px"}
                        width={"20px"}
                        stroke={"white"}
                        strokeWidth={0}
                      />
                      <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>View all houses</p>
                    </button>
                  </div>
                ) : <div></div>}
              </div>

              <button onClick={() => setSelectedContent(<Chat/>)} className="flex items-center w-full p-2 rounded gap-2 text-white/80 text-start hover:bg-black/20">
                                <Message fill={'white'} height={'20px'} width={'20px'} stroke={'white'} strokeWidth={0} />
                                <p className={`mt-1 ${isSidebarExpanded ? '' : 'hidden'}`}>Chat</p>
                            </button>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="px-5 ">
              <p className={`text-white ${isSidebarExpanded ? "" : "hidden"}`}>Account</p>
              <div className="ml-5">
                <button
                  onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)}
                  className="flex items-center w-full p-2 text-sm rounded gap-2 text-white/80 text-start hover:bg-black/20"
                >
                  <House
                    fill={"white"}
                    height={"20px"}
                    width={"20px"}
                    stroke={""}
                    strokeWidth={0}
                  />
                  <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>Notifications</p>
                </button>
                <button
                  onClick={() => setSelectedContent(<h1>Dashboard Content</h1>)}
                  className="flex items-center w-full p-2 text-sm rounded gap-2 text-white/80 text-start hover:bg-black/20"
                >
                  <House
                    fill={"white"}
                    height={"20px"}
                    width={"20px"}
                    stroke={""}
                    strokeWidth={0}
                  />
                  <p className={`mt-1 ${isSidebarExpanded ? "" : "hidden"}`}>Profile settings</p>
                </button>
              </div>
            </div>

            <div
              className={` items-center flex gap-2.5 bg-black/20  rounded-md shadow-2xl py-5 ${isSidebarExpanded ? "flex-row px-5 " : "flex-col px-2"
                }`}
            >
              <img src={user?.profilePictureUrl} className="w-12 h-12 rounded-full" alt="person" />
              <div className="flex flex-col gap-1">
                <p className="text-xs text-primary_gray ">{user?.firstName}{user?.id}</p>
                <p className="text-xs text-primary_gray ">{user?.lastName}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
