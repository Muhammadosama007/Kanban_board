import React from 'react'
import axios from "axios";
import { useEffect, useState } from "react";
import ActivityCard from '../Components/ActivityCard';
import { getActivityLogs } from '../api/services';

function ActivityLogPage() {
    const [log, setLog] = useState([]);

    useEffect(() => {
        fetchLog();
    }, [])

    const fetchLog = async () => {

        try {
            //const fetchedLogs = await axios.get("http://localhost:3002/log/getLog");
            const fetchedLogs= await getActivityLogs();
            setLog(fetchedLogs.data.Log.reverse());

        } catch (err) {
            console.log("error in fetching logs!! ", err);
        }
    }
    console.log("logs", log);
    return (
        <div>
            {log.map((i, index) => (
                <ActivityCard log={i} />
            ))}
        </div>
    )
}

export default ActivityLogPage
