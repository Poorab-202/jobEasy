import { useEffect } from 'react';
import axios from 'axios';
import { JOB_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchedJobs } from "../redux/jobSlice";

export default function useGetSearchedJobs() {
  const dispatch = useDispatch();
  const { searchedQuery } = useSelector(store => store.job);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const url = searchedQuery.trim()
          ? `${JOB_API_END_POINT}/search?keyword=${searchedQuery}`
          : `${JOB_API_END_POINT}/get`;

        const res = await axios.get(url, { withCredentials: true });

        if (res.data.success) {
          dispatch(setSearchedJobs(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchJobs();
  }, [searchedQuery, dispatch]);
}
