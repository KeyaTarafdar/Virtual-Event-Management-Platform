import React from 'react';

const CompanyCard = ({ logo, rating }) => {
  const stars = Array.from({ length: 5 }, (_, index) => (
    <i
      key={index}
      className={`fa fa-star text-xs ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
      aria-hidden="true"
    />
  ));

  return (
    <div id="collaborators" className="flex justify-center items-center">
      <div className="rounded-xl xs:w-56 w-44 h-40 justify-center shadow-md bg-zinc-100 flex flex-col items-center">
        <div className=" rounded-xl h-20 bg-gradient-to-r from-blue-900 to-cyan-600 shadow-2xl w-full"></div>
        <img
          className="rounded-full w-[120px] h-[115px] mt-[-66px] border-4 border-white-500/100 shadow-2xl"
          src={logo}
          alt="Company Logo"
        />
        <div className="p-2 pt-[10px]">Rating : {stars}</div>
      </div>
    </div>
  );
};

const CompanyGrid = ({ companies }) => {
  return (
    <div className="py-24 grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 xs:gap-x-6 xs:gap-y-6 gap-x-20 gap-y-10">
      {companies.map((company, index) => (
        <CompanyCard key={index} logo={company.logo} rating={company.rating} />
      ))}
    </div>
  );
};


const companiesData = [
  {
    logo: 'https://logos-world.net/wp-content/uploads/2020/04/Amazon-Symbol.jpg',
    rating: 4,
  },
  {
    logo: 'https://sightsinplus.com/wp-content/uploads/2022/03/Cognizant-announces-new-logo-and-tagline.jpg',
    rating: 3,
  },
  {
    logo: 'https://media.talentbattle.in/Files/C4U_Images/C4U_BLOG_IMAGES/C4U_BLOG_CATEGORIES_IMAGES/85/29.png',
    rating: 4,
  },
  {
    logo: 'https://i.pinimg.com/736x/dc/ff/1e/dcff1e321e7fc8387ccb4d1007906cdf.jpg',
    rating: 3,
  },
  {
    logo: 'https://animationvisarts.com/wp-content/uploads/2016/10/tata-logo-design.jpg',
    rating: 2,
  },
  {
    logo: 'https://i.pinimg.com/474x/26/18/66/261866f939644dc0fc73eb129af3b42e.jpg',
    rating: 2,
  },
  {
    logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkmk-siGMW3NHmUIx8VoPzJPwv9xWVxzIV0A&s',
    rating: 3,
  },
  {
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/Meesho_logo.png',
    rating: 4,
  },
  {
    logo: 'https://media.geeksforgeeks.org/wp-content/uploads/20190802021607/geeks14.png',
    rating: 4,
  },
];

export default function App() {
  return <CompanyGrid companies={companiesData} />;
}