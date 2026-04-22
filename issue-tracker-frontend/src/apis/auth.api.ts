import type { User } from "../types/user.types";
import axiosInstance from "../utils/axios";

export const registerUser = async (data: Partial<User>) => {
    const response = await axiosInstance.post("/users/register", data);
    return response.data;
};

export const loginUser = async (data: Partial<User>) => {
    const response = await axiosInstance.post("/users/login", data);
    return response.data;
}