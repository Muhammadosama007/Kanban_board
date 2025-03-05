import axios from "axios";

const baseUrl = "http://localhost:3002";

export const getTasks = async (token) => {
    try {
        const response = await axios.get(`${baseUrl}/task/getTask`, {
            headers: { Authorization: `Bearer ${token}` }
        });

        return response.data.tasks;
    } catch (err) {
        console.log("Error retriveving tasks!!", err);
    }
}


export const createTask = async (token, obj) => {
    try {
        const response = await axios.post(`${baseUrl}/task/create`, obj, {
            headers: { Authorization: `Bearer ${token}` }
        })

        return response.data;
    } catch (err) {
        console.log("Error creating tasks!!!", err);
    }
}


export const updateTask = async (token, taskId, updatedData) => {
    try {
        return await axios.patch(`${baseUrl}/task/updateTask/${taskId}`, updatedData, {
            headers: { Authorization: `Bearer ${token}` },
        });
       // return response.data;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
};


export const deleteTask = async (token, taskId) => {
    try {
        await axios.delete(`${baseUrl}/task/delTask/${taskId}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
};

export const getActivityLogs = async () => {
    try {
        return await axios.get(`${baseUrl}/log/getLog`);
        //return response.data.log.reverse();
    } catch (err) {
        console.error("Error fetching logs:", err);
    }
}

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post(`${baseUrl}/auth/login`,  email, password );
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};


export const signupUser = async (Fname, Lname, email, password) => {
    try {
        await axios.post(`${baseUrl}/auth/signup`, { Fname, Lname, email, password });
    } catch (error) {
        console.error("Signup failed:", error);
        throw error;
    }
};