import { Controller, Get, Param } from '@nestjs/common';
import { DashboardManagerService } from './dashboard-manager.service';
import { Dashboard } from './schemas/dashboard.schema';

@Controller('dashboards')
export class DashboardManagerController {
  constructor(private readonly dashboardService: DashboardManagerService) {}

  // Endpoint to get a dashboard by owner (user ID)
  @Get('user/:ownerId')
  async getDashboardByOwner(
    @Param('ownerId') ownerId: string,
  ): Promise<Dashboard> {
    return this.dashboardService.getDashboardByOwner(ownerId);
  }

  // Endpoint to get all dashboards
  @Get()
  async getAllDashboards(): Promise<Dashboard[]> {
    return this.dashboardService.getAllDashboards();
  }
}
