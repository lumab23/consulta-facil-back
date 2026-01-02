export class DashboardOverviewDto {
  counts: {
    activeCases: number;      
    hearingsNext7Days: number; 
  };
  upcomingHearings: any[];     
  recentCases: any[];         
}