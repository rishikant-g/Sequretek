export interface IChartResponse {
  page: number;
  per_page: number;
  total_pages: number;
  data: IChartData[];
}

export interface IChartData {
  id: number;
  name: string;
  year: number;
  color: string;
  pantone_value: string;
}
