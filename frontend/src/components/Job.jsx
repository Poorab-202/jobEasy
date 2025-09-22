import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'





export default function Job({ job }) {

  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  }

  return (
    <div className='p-5 border border-gray-200 rounded-2xl shadow-xl bg-white '>
      <div className='flex items-center justify-between'>
        <p className='text-xs'>{daysAgoFunction(job?.createdAt) === 0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago `}</p>
        <Button variant='outline' className='rounded-full cursor-pointer hover:bg-gray-100' size='icon'><Bookmark></Bookmark></Button>
      </div>
      <div className='flex items-center gap-2 my-2'>

        <Avatar>
          <AvatarImage src={job?.company?.logo}>
          </AvatarImage>
        </Avatar>

        <div>
          <h1 className='font-medium'>{job?.company?.name}</h1>
          <p className='text-sm'>{job?.location}</p>
        </div>
      </div>
      <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600'>{job?.description}</p>
      </div>
      <div className='flex items-center gap-2 mt-4'>
        <Badge variant="ghost" className="text-blue-700 font-bold text-xs">{job?.numberOfPositions}</Badge>
        <Badge variant="ghost" className="text-[#F83002] font-bold">{job?.jobType}</Badge>
        <Badge variant="ghost" className="text-[#7209b7] font-bold">{job?.salary} LPA</Badge>
      </div>
      <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" className="rounded-xl cursor-pointer">Save For Later</Button>
        <Button onClick={() => navigate(`/description/${job._id}`)} className="bg-black text-white px-4 rounded-lg transition-all duration-300 hover:bg-gray-800 hover:scale-105 shadow-lg cursor-pointer">Details</Button>
      </div>
    </div>
  )
}
