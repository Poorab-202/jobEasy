import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "../redux/jobSlice";

export default function HeroSection() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const searchHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }

    return (
        <div className='text-center'>
            <div className='flex flex-col gap-5 my-10'>
                <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>No. 1 Job Hunt Website</span>
                <h1 className='text-5xl font-bold'>Search, apply & <br></br> Get your <span className='text-[#6A38C2]'>Dream Jobs</span></h1>
                <p className='text-sm'>Discover your next opportunity — explore thousands of jobs, tailored just for you.</p>
                <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto '>
                    <input type='text'
                        value={query}
                        placeholder='Find your Job'
                        className='outline-none border-none w-full'
                        onChange={(e) => { setQuery(e.target.value) }}>
                    </input>
                    <Button onClick={searchHandler} className="rounded-r-full bg-[#6A38C2]  hover:bg-[#522a99] cursor-pointer"><Search className='h-5 w-5 text-white'></Search></Button>
                </div>
            </div>
        </div>
    )
}
