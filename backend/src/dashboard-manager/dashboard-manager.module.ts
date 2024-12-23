import { Module } from '@nestjs/common';
import { DashboardManagerService } from './dashboard-manager.service';
import { DashboardManagerController } from './dashboard-manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dashboard, DashboardSchema } from './schemas/dashboard.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Dashboard.name, schema: DashboardSchema },
    ]),
  ],
  providers: [DashboardManagerService],
  controllers: [DashboardManagerController],
})
export class DashboardManagerModule {}
