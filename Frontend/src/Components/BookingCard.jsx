import React from 'react'

const BookingCard = ({
    eventName,
    eventDate,
    eventTime,
    eventImage,
    headcount,
    additionalInfo,
}) => {
    return (
        <div className="product-card w-full max-w-[260px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[360px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-4 bg-blue-200 flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
            <div className="para uppercase text-center leading-none z-40">
                <p
                    style={{
                        WebkitTextStroke: "1px #1e90ff",
                        WebkitTextFillColor: "transparent",
                        textShadow: "1px 1px rgba(0, 0, 0, 0.8)",
                        backgroundColor: "rgba(255, 255, 255, 0.7)",
                        padding: "0 4px",
                        borderRadius: "4px",
                    }}
                    className="z-10 font-bold text-lg -mb-5 tracking-wider text-blue-800"
                >
                    {eventName}
                </p>

                <p className="font-bold text-xl font-serif tracking-wider mt-5 text-[#181868] z-30">
                    {eventDate}
                </p>
            </div>
            <div className="w-[150px] aspect-square relative z-20 after:absolute after:h-1 after:w-full after:opacity-0 after:bg-[#24187b] after:top-9 after:left-0 after:group-hover:opacity-100 after:translate-x-1/2 after:translate-y-1/2 after:-z-20 after:group-hover:w-full after:transition-all after:duration-300 after:group-hover:origin-right after:group-hover:-translate-x-1/2 group-hover:translate-x-1/2 transition-all duration-300">
                <img
                    src={eventImage}
                    alt={eventName}
                    className="w-full h-full object-cover rounded-md group-hover:opacity-90 transition-all duration-300"
                />

                <div className="tooltips absolute top-0 left-0.5 right-7 -translate-x-[150%] p-2 flex flex-col items-start gap-6 transition-all duration-300 group-hover:-translate-x-full">
                    <p className="text-[#24187b] font-semibold font-serif text-xl uppercase group-hover:delay-900 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                        {eventTime}
                    </p>
                    <ul className="flex flex-col items-start gap-3">
                        <li className="inline-flex gap-2 items-center justify-center group-hover:delay-200 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="#0a036c"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                height={12}
                                width={12}
                                className="stroke-[#0a036c]"
                            >
                                <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
                                <circle cx="9" cy="7" r="4" />
                                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>

                            <p className="text-s font-semibold font-serif text-[#0a036c]">
                                {headcount}
                            </p>
                        </li>
                        <li className="inline-flex gap-2 items-center justify-center group-hover:delay-300 transition-all opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500">
                            <svg
                                strokeLinejoin="round"
                                strokeLinecap="round"
                                strokeWidth={3}
                                className="stroke-[#0a036c]"
                                stroke="#000000"
                                fill="none"
                                viewBox="0 0 24 24"
                                height={10}
                                width={10}
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            <p className="text-s font-semibold font-serif text-[#0a036c]">
                                {additionalInfo}
                            </p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;