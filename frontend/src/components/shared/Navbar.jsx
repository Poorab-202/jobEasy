import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from '../ui/button'
import { LogOut, User, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { setUser } from '@/redux/authSlice'
import { toast } from 'sonner'

export default function Navbar() {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logoutHandler = async () => {

        try {
            const res = await axios.post(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.res.data.message);

        }
    }
    return (
        <div className='bg-white' >
            <div className='flex items-center justify-between mx-auto max-w-7xl h-16 px-12'>
                <div>
                    <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Easy</span></h1>
                </div>

                <div className='flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-5'>
                        {
                            user && user.role === "recruiter" ?
                                <>
                                    <li><Link to="/admin/companies">Companies</Link></li>
                                    <li><Link to="/admin/jobsPage">Jobs</Link></li>
                                </>
                                :
                                <>
                                    <li><Link to="/">Home</Link></li>
                                    <li><Link to="/jobs">Jobs</Link></li>
                                    <li><Link to="/browse">Browse</Link></li>
                                </>
                        }

                    </ul>

                    {
                        !user ? (
                            <div className='flex items-center gap-2'>
                                <Link to="/login"><Button variant="outline" className="rounded cursor-pointer">Login</Button></Link>
                                <Link to="/signup"><Button className="bg-[#6A38C2] hover:bg-[#522a99] text-white rounded cursor-pointer">Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar className="h-12 w-12 cursor-pointer">
                                        {user?.profile?.profilePhoto ? (
                                            <AvatarImage src={user.profile.profilePhoto} />
                                        ) : (
                                            <AvatarImage src="https://cdn-icons-png.flaticon.com/512/17593/17593730.png" />
                                        )}
                                    </Avatar>
                                </PopoverTrigger>

                                <PopoverContent className="w-80 border border-gray-200 rounded-lg shadow-lg p-3 bg-white z-[9999]">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex items-center gap-4 my-2">
                                            <Avatar className="h-14 w-14">
                                                {user?.profile?.profilePhoto ? (
                                                    <AvatarImage src={user.profile.profilePhoto} />
                                                ) : (
                                                    <AvatarImage src="https://cdn-icons-png.flaticon.com/512/17593/17593730.png" />
                                                )}
                                            </Avatar>
                                            <div>
                                                <h1 className="text-lg">{user?.fullName}</h1>
                                                <p className="text-sm text-gray-600">{user?.profile?.bio}</p>
                                            </div>
                                        </div>

                                        <div className="flex flex-col gap-1 text-gray-600 items-start">
                                            {user?.role === "recruiter" ? (
                                                <div className="flex items-center gap-1">
                                                    <LogOut />
                                                    <Button onClick={logoutHandler} variant="link" className="cursor-pointer">
                                                        Logout
                                                    </Button>
                                                </div>
                                            ) : (
                                                <>
                                                    <div className="flex items-center gap-1">
                                                        <User2 />
                                                        <Button variant="link" className="cursor-pointer">
                                                            <Link to="/profile">View Profile</Link>
                                                        </Button>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <LogOut />
                                                        <Button onClick={logoutHandler} variant="link" className="cursor-pointer">
                                                            Logout
                                                        </Button>
                                                    </div>
                                                </>
                                            )}
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>

                        )
                    }
                </div>
            </div>
        </div>
    )
}
