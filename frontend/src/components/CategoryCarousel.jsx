import React, { useState } from 'react'
import {
    Carousel, CarouselContent, CarouselItem, CarouselNext,
    CarouselPrevious,
} from './ui/carousel'
import { Button } from './ui/button'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '../redux/jobSlice';


const category = [
    "Frontend Developed",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Full-Stack Developer"
]

export default function CategoryCarousel() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const searchHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse")
    }
    return (
        <div>

            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        category.map((cat, index) => (
                            <CarouselItem className="lg:basis-1/3 md:basis-1/2 text-center" key={index}>
                                <Button onClick={(e)=>searchHandler(cat)} className="bg-black text-white rounded-full">{cat}</Button>
                            </CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious className="hover:bg-gray-100"></CarouselPrevious>
                <CarouselNext className="hover:bg-gray-100"></CarouselNext>

            </Carousel>
        </div>
    )
}
