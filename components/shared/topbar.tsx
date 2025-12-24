import React from 'react'

type Props = {
    className?: string
    title: string
    backBtn?: boolean
}

function Topbar({ className, title, backBtn }: Props) {
  return (
    <div className={`w-full h-16 bg-white text-black border-b border-gray-200 sticky py-4 px-2 ${className}`}>
        <div className={`${backBtn ? 'block' : 'hidden'}`}>
            <p className="text-lg font-semibold cursor-pointer"></p>
        </div>
        <h1 className="text-xl font-bold text-center">{title}</h1>
    </div>
  )
}

export default Topbar