"use client"

import clsx from "clsx";
import Link from "next/link";

const MobileItem = ({ label, icon: Icon, active, onClick, href }) => {

    const handleClick = () => {
        if (onClick) {
            return onClick();
        }
    }

  return (
    <Link onClick={handleClick}  href={href} className={clsx("group flex gap-x-3 p-4 rounded-md text-sm leading-6 font-semibold w-full justify-center text-gray-500 hover:text-black hover:bg-gray-100", active && 'bg-gray-100 text-black')}>
        <Icon className={clsx("h-6 w-6 shrink-0", active && "text-black")}/>
        <span className="sr-only">{label}</span>
    </Link>
  )
}

export default MobileItem