import { useQuery } from "@tanstack/react-query";
import { request } from "./http";
import { IEmpty } from "../type/IEmpty";
import { QueryOpt } from "../type/IRequest";
import { IChartData } from "../type/model/IChartResponse";

export const useChartData = (url: string, options?: QueryOpt<any>) => {
  const fn = () =>
    request<IEmpty, IChartData>({
      url,
      method: "GET",
    });

  return useQuery({
    queryKey: ["RESOURCES"],
    queryFn: fn,
    ...options,
  });
};
