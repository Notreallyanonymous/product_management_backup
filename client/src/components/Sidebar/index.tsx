"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";
import {  LockIcon, LucideIcon, Home, X, Briefcase, Search, Settings, User, Users, ChevronUp, ChevronDown, AlertCircle, ShieldAlert, AlertTriangleIcon, AlertOctagon } from "lucide-react";
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation";
import React , {useState} from 'react'

const Sidebar = () => {
    const [showProjects, setShowProjects] = useState(true)
    const [showPriority, setShowPriority] = useState(true)

  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector((state) => state.global.isSidebarCollapsed )
  const sidebarClassNames = `fixed flex flex-col h-[100%] justify between shadow-xl
    transition-all duration-300 h-full z-40 dark:bg-black overflow-y-auto bg-white
    ${isSidebarCollapsed ? "w-0 hidden": "w-64"}`;

  return (
    <div className={sidebarClassNames}>
        <div className='flex h-[100%] w-full flex-col justify-start'>
        {/* Top Logo */}
        <div className='z-50 flex min-h-[56px] w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black'>
        <div className='text-xl font-bold text-gray-800 dark:text-white'>First American  
         </div>
         {isSidebarCollapsed ? null : (
          <button className="py-3" onClick={()=>
            {dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))}}
          >
            <X className = "h-6 w-6 text-gray-800 hover:text-gray-500 dark:text-white"/>
          </button>
        )}
        </div>
         {/* TEAM */}
         <div className='flex items-center gap-5 border-y-[1.5px] border-gray-200 px-12 py-3 dark:border-gray-700'>
            <Image src ="/logo.png" alt="Logo" width = {40} height = {40} />
            <div>
                <h3 className="text-md font-bold tracking-wide dark:text-gray-200">update name</h3>
                <div className="mt-1 flex items-center gap-2">
                    <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400"/>
                    <p className="text-xs text-gray-500">Private</p>
                </div>
            </div>
         </div>
         {/* Navbar links */}
         <nav className="z-10 w-full">
          <SidebarLink 
          icon = {Home}
          label = "Home"
          href="/" />
          <SidebarLink 
          icon = {Briefcase}
          label = "Timeline"
          href="/timeline" />
          <SidebarLink 
          icon = {Search}
          label = "Search"
          href="/search" />
          <SidebarLink 
          icon = {Settings}
          label = "Settings"
          href="/settings" />
          <SidebarLink 
          icon = {User}
          label = "User"
          href="/user" />
          <SidebarLink 
          icon = {Users}
          label = "Users"
          href="/users" />
          </nav>  

        {/* Ticket Links */}

          <button onClick={()=> setShowProjects((prev) => !prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
            <span className="">Tickets</span>
            {showProjects ? (
              <ChevronUp className="h-5 w-5"/>
            ) : (<ChevronDown className="h-5 w-5" />)}
          </button>
          {/* Ticket Lists */}

        {/* Priorities Links */}
          <button onClick={()=> setShowPriority((prev) => !prev)} className="flex w-full items-center justify-between px-8 py-3 text-gray-500">
            <span className="">Priorities</span>
            {showPriority ? (
              <ChevronUp className="h-5 w-5"/>
            ) : (<ChevronDown className="h-5 w-5" />)}
          </button>
            {showPriority &&
            (
              <>
                <SidebarLink 
                icon = {AlertCircle}
                label = "Urgent"
                href="/priority/urgent" />
                <SidebarLink 
                icon = {ShieldAlert}
                label = "High"
                href="/priority/high" />
                 <SidebarLink 
                icon = {AlertTriangleIcon}
                label = "Meduim"
                href="/priority/meduim" />
                 <SidebarLink 
                icon = {AlertOctagon}
                label = "Low"
                href="/priority/low" />
                 <SidebarLink 
                icon = {Users}
                label = "Backlog"
                href="/priority/backlog" />
              </>
            )}
      </div>
    </div>
  )
}

interface SidebarLinkProps{
  href: string;
  icon: LucideIcon;
  label: string; 
  // isCollapsed: boolean;
}

const SidebarLink = ({
  href, 
  icon: Icon, 
  label, 
} : SidebarLinkProps)=>{
  const pathname = usePathname();
  const isActive = pathname === href ||(pathname === "/" && href === "/dashboard")


return(
  <Link href={href} className="w-full ">
    <div 
    className={`relative flex cursor-pointer items-center gap-3 transition-colors
      hover:bg-gray-100 dark:bg-black dark:hover:bg-gray-700 px-4 mt-1 ${isActive ? "bg-gray-100 text-white dark:bg-gray-600 justify-start px-4 py-3" : ""}`}
    >
      {isActive &&  (
        <div className="absolute left-0 top-0 h-[100%] w-[5px] bg-blue-200" />
        )} 
      <Icon className="h-6 w-6 text-gray-800 dark:text-gray-100 mt-2"/>
      <span className= {`font-medium text-gray-800 dark:text-gray-100`}>{label}</span>
    </div>
    </Link>
)
}

export default Sidebar
