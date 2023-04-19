import request from "@/utils/request";
import type LoginData from "./interfaces";

export const login = (usename: string, password: string) => request.get<LoginData>("/login", { usename, password })
