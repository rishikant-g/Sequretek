import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import { MutationOpt, QueryOpt } from "../type/IRequest";
import { IUserResponse } from "../type/model/IUserResponse";

export interface CREATE_SINGLE_REQUEST {
  name: string;
  job: string;
}

export interface CREATE_SINGLE_USER_RESPONSE {
  name: string;
  job: string;
}

export const useUsers = (
  url: string,
  page: number,
  per_page: number,
  options?: QueryOpt<any>,
) => {
  const params = { page: page, per_page: per_page };
  const fn = () =>
    request<IEmpty, IUserResponse>({
      url,
      method: "GET",
      params,
    });

  return useQuery({
    queryKey: ["USERS", page, per_page],
    queryFn: fn,
    ...options,
  });
};

export const usePostCreateUser = (
  url: string,
  options?: MutationOpt<any, any>,
) => {
  const fn = (params: CREATE_SINGLE_REQUEST) =>
    request<CREATE_SINGLE_REQUEST, CREATE_SINGLE_USER_RESPONSE>({
      url,
      method: "POST",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["POST_CREATE_USER"],
    mutationFn: fn,
    ...options,
  });
};

export const usePutUpdate = (url: string, options?: MutationOpt<any, any>) => {
  const fn = (params: CREATE_SINGLE_REQUEST) =>
    request<CREATE_SINGLE_REQUEST, CREATE_SINGLE_USER_RESPONSE>({
      url,
      method: "PUT",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["PUT_UPDATE"],
    mutationFn: fn,
    ...options,
  });
};
