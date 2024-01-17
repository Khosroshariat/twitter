import { DotsHorizontalIcon, SearchIcon } from "@heroicons/react/outline";
import { BadgeCheckIcon } from "@heroicons/react/solid";

export default function Trending()  {
  return (
    <div className="hidden lg:flex flex-col m-3">
  
      <div
        className="flex space-x-3 bg-white bg-opacity-15 w-[300px] h-[44px]
        p-3 rounded-3xl"
      >
        <SearchIcon className="w-6 text-gray-600" />
        <input
          className="bg-transparent focus:outline-none placeholder:text-gray-600"
          placeholder="Search Twitter"
        />
      </div>
      <div className="w-[300px] h-[500px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">What's happening?</h1>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-5" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">China</h1>
          <p className="text-xs text-gray-500">340k Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-5" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">The USA</h1>
          <p className="text-xs text-gray-500">340k Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-5" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Canada</h1>
          <p className="text-xs text-gray-500">340k Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-5" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Germany</h1>
          <p className="text-xs text-gray-500">340k Tweets</p>
        </div>
        <div className="relative p-3">
          <DotsHorizontalIcon className="w-5 text-gray-600 absolute right-5" />
          <p className="text-xs text-gray-500">Trending in US</p>
          <h1 className="text-[15px] font-bold">Japan</h1>
          <p className="text-xs text-gray-500">340k Tweets</p>
        </div>
      </div>
      <div className="w-[300px] h-[300px] bg-white bg-opacity-10 rounded-3xl mt-3">
        <h1 className="font-bold text-xl p-3">Who to follow</h1>

        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="/assets/bragg.png"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <div className="flex">
                <h1 className="font-bold ">David Bragg</h1>
                <BadgeCheckIcon className="w-4 text-blue-400 " />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@DavidBragg</h1>
            </div>
          </div>

          <button className="text-black bg-white rounded-3xl w-20 h-8 text-xs font-bold">Follow</button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="/assets/kylie.png"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <div className="flex">
                <h1 className="font-bold ">Kylie</h1>
                <BadgeCheckIcon className="w-4 text-blue-400 " />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@Kylie</h1>
            </div>
          </div>

          <button className="text-black bg-white rounded-3xl w-20 h-8 text-xs font-bold">Follow</button>
        </div>
        <div className="flex justify-between p-3">
          <div className="flex space-x-3">
            <img
              src="/assets/pfp.png"
              className="w-11 h-11 rounded-full object-cover"
            />

            <div>
              <div className="flex">
                <h1 className="font-bold ">Elon Musk</h1>
                <BadgeCheckIcon className="w-4 text-blue-400 " />
              </div>
              <h1 className="text-[12px] text-gray-500 mt-1">@ElonMusk</h1>
            </div>
          </div>

          <button className="text-black bg-white rounded-3xl w-20 h-8 text-xs font-bold">Follow</button>
        </div>
      </div>
    </div>
  );
};
