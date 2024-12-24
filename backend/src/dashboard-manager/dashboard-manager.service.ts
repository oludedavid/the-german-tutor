import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Dashboard, DashbordDocument } from './schemas/dashboard.schema';
import { Types } from 'mongoose';

@Injectable()
export class DashboardManagerService {
  constructor(
    @InjectModel(Dashboard.name)
    private dashboardModel: Model<DashbordDocument>,
  ) {}

  // Get a dashboard by the user's ID
  async getDashboardByOwner(ownerId: string): Promise<Dashboard | null> {
    return this.dashboardModel
      .findOne({ owner: new Types.ObjectId(ownerId) })
      .exec();
  }

  // Get all dashboards
  async getAllDashboards(): Promise<Dashboard[]> {
    return this.dashboardModel.find().exec();
  }
}
