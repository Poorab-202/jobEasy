import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

export default function ApplicationsTable() {
    const { allAppliedJobs } = useSelector(store => store.job);


    return (

        <div>

            <Table className="mb-10">
                
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Job Role</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        !allAppliedJobs ? <span className='font-bold '>You haven't applied any job yet.</span> : allAppliedJobs?.map((Element, index) => (
                            <TableRow key={index}>
                                <TableCell>{Element?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{Element?.job?.title}</TableCell>
                                <TableCell>{Element?.job?.company?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge
                                        variant="ghost"
                                        className={`text-white ${Element?.status === "rejected"
                                            ? "bg-red-600"
                                            : Element?.status === "accepted"
                                                ? "bg-green-600"
                                                : "bg-gray-500"
                                            }`}
                                    >
                                        {Element?.status.charAt(0).toUpperCase() + Element?.status.slice(1)}

                                    </Badge>
                                </TableCell>

                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>

        </div>
    )
}
