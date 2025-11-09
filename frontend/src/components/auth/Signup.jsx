import { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { RadioGroup } from '../ui/radio-group';
import { Button } from '../ui/button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Loader2 } from 'lucide-react';


export default function Signup() {

    const navigate = useNavigate();
    const { loading } = useSelector(store => store.auth);
    const dispatch = useDispatch();  // dispatch function from react-redux 


    const [input, setInput] = useState({
        fullName: '',
        email: '',
        phoneNumber: '',
        password: '',
        role: '',
        file: ''
    })

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }
    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    }


    const submitHandler = async (e) => {
        e.preventDefault();

        const fromData = new FormData();
        fromData.append("fullName", input.fullName);
        fromData.append("email", input.email);
        fromData.append("phoneNumber", input.phoneNumber);
        fromData.append("password", input.password);
        fromData.append("role", input.role);
        if (input.file) {
            fromData.append("file", input.file)
        }
        console.log(input);

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, fromData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true,
            })


            if (res.data.success) {
                navigate("/login");
                toast.success(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            const message = error?.response?.data?.message || "Something went wrong!";
            toast.error(message);
        }
        finally {
            dispatch(setLoading(false));
        }
    }
    const { user } = useSelector(store => store.auth);
    useEffect(() => {
        if (user) navigate("/")
    }, [])




    return (

        <div>
            <Navbar />
            <div className='flex item-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-grey-200 p-4 my-10 rounded-3xl'>
                    <div className='flex flex-col items-center'><h1 className='font-bold text-xl mb-5'>Signup</h1></div>
                    <div className='my-2'>
                        <Label>Full Name</Label>
                        <Input type="text" value={input.fullName} name="fullName" onChange={changeEventHandler} placeholder="Poorab Patel" />
                    </div>
                    <div className='my-2'>
                        <Label>E-mail</Label>
                        <Input type="email" value={input.email} name="email" onChange={changeEventHandler} placeholder="example@gmail.com" />
                    </div>
                    <div className='my-2'>
                        <Label>Phone Number</Label>
                        <Input type="text" value={input.phoneNumber} name="phoneNumber" onChange={changeEventHandler} placeholder="8080808080" />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="password" value={input.password} name="password" onChange={changeEventHandler} />
                    </div>
                    <div className='flex items-center gap-6'>
                        <div className='flex items-center gap-1'>
                            <Label>Role</Label>
                            <RadioGroup className="flex items-center gap-4 my-5">
                                <div className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} />
                                    <Label htmlFor="r1">Student</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
                                    <Label htmlFor="r2">Recruiter</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <Label>Profile</Label>

                        <Input accept="image/*" type="file" onChange={changeFileHandler} className="cursor-pointer" />

                    </div>

                    {
                        loading ? <Button className="w-full my-3 bg-black text-white"><Loader2 className='mr-2 h-4 w-4 animate-spin'>  </Loader2> Please wait</Button> : <Button variant="outline" type="submit" className="w-full my-3 bg-black text-white hover:bg-gray-800 cursor-pointer">Sign up</Button>
                    }
                    <span className='text-sm'>Already have an account? <Link to="/login" className="text-blue-600">login</Link></span>
                </form>
            </div>
        </div>
    );
}