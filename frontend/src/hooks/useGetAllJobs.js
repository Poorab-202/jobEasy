import { useEffect } from 'react'
import axios from 'axios'
import { JOB_API_END_POINT } from '../utils/constant'
import { useDispatch } from "react-redux"
import { setAllJobs } from "../redux/jobSlice"

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    fetchAllJobs();
  }, [])
  const fetchAllJobs = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${JOB_API_END_POINT}/get`, { withCredentials: true }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (res.data.success) {
        dispatch(setAllJobs(res.data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  }
}
export default useGetAllJobs;
