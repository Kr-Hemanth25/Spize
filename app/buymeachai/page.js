import React from 'react'
import Image from 'next/image';

const page = () => {
    return (
        <div className="h-[70vh] w-[80vw] m-auto flex items-center justify-center relative sm:bottom-[20vh] pt-[10vh] sm:w-auto sm:min-h-screen">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full capitalize">
                <h2 className="text-3xl font-bold mb-4 text-center">Buy Me a Chai</h2>
                <p className="text-lg mb-6 text-center">Scan the QR code below to send me money for a chai.</p>
                <div className="flex justify-center mb-6">
                    <Image width='2000' height='2000' src="/krphonepe.jpg" alt="Your Money QR Code" className="w-48 h-48 object-contain" />
                </div>
                <p className="text-sm text-center text-gray-500">Thank you for your generosity!</p>
            </div>
        </div>
    );
}

export default page;
