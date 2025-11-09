import React from 'react';
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

export default function Footer() {
    return (
        <footer className="w-full bg-white text-gray-900 py-6 border-t border-gray-200">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-6">

                <div className="text-lg font-semibold">
                    © 2025 <span>JobEasy</span>
                </div>

                <Separator className="my-4 w-full md:hidden" />

                <nav className="flex flex-wrap gap-4 text-sm">
                    <Link className="hover:text-gray-500 transition">Home</Link>
                    <Link className="hover:text-gray-500 transition">About</Link>
                    <Link className="hover:text-gray-500 transition">Contact</Link>
                    <Link className="hover:text-gray-500 transition">Privacy Policy</Link>
                </nav>

            </div>
        </footer>
    )
}