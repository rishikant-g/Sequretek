import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import { MutationOpt, QueryOpt } from "../type/IRequest";
import { IUser } from "../type/model/IUserResponse";

export const useSingleUser = (
  url: string,
  id: string | undefined,
  options?: QueryOpt<any>,
) => {
  const params = { id: id };
  const fn = () =>
    request<IEmpty, IUser>({
      url,
      method: "GET",
      params,
    });

  return useQuery({
    queryKey: ["USER", id],
    queryFn: fn,
    ...options,
  });
};

export const useDeleteUser = (url: string, options?: MutationOpt<any, any>) => {
  const fn = (params: any) =>
    request<any, any>({
      url,
      method: "DELETE",
      params,
      useData: true,
    });

  return useMutation<any, any, any>({
    mutationKey: ["DELETE_USER"],
    mutationFn: fn,
    ...options,
  });
};
