import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from './ui/avatar'
import { AvatarImage } from '@radix-ui/react-avatar'
import { DockIcon, Mail, Pen, Phone } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import ApplicationsTable from './ApplicationsTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import Footer from './shared/Footer'



export default function Profile() {

    useGetAppliedJobs();

    const { user } = useSelector(store => store.auth);
    const [open, setOpen] = useState(false);
    return (
        <div>

            <Navbar></Navbar>
            <div className='max-w-6xl bg-white border border-gray-300 shadow rounded-lg mx-auto p-10 mt-10'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4 my-2'>
                        <Avatar className="h-20 w-20">
                            {
                                user?.profile?.profilePhoto !== "" ? <AvatarImage src={user?.profile?.profilePhoto} />
                                    : <AvatarImage src="https://cdn-icons-png.flaticon.com/512/17593/17593730.png"></AvatarImage>}
                        </Avatar>
                        <div>
                            <h1 className='text-lg'>{user?.fullName}</h1>
                            <p className='text-sm text-gray-600'>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <Button onClick={() => setOpen(true)} variant="outline" className="text-right hover:bg-gray-100 cursor-pointer"><Pen></Pen></Button>
                </div>
                <div className='flex gap-4 items-center mt-2'><Mail></Mail> <p>{user?.email}</p></div>
                <div className='flex gap-4 items-center mt-2'> <Phone></Phone> <p>{user?.phoneNumber}</p></div>
                <div className='mt-2'>
                    <h1>Skills</h1>

                    {
                        user?.profile?.skills.length !== 0 ?
                            user?.profile?.skills.map((element, index) => (
                                <Badge variant={'ghost'} className="bg-black text-white mr-2">{element}</Badge>
                            )) : <span>NA</span>
                    }
                </div>
                <div className='flex gap-4 items-center mt-3'><DockIcon></DockIcon><a href={user?.profile?.resume} className="hover:cursor-pointer underline">{user?.profile?.resumeOriginalName}</a></div>
            </div>

            <div className='max-w-4xl mx-auto bg-white rounded-2xl mt-10'>
                <h1 className='text-xl font-medium mb-4 mx-auto text-center'>Applied Jobs</h1>
                <ApplicationsTable></ApplicationsTable>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}></UpdateProfileDialog>
            <Footer></Footer>
        </div>
    )
}
