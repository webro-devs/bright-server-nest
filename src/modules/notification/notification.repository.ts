import { Repository } from 'typeorm';

import { Notification } from './notification.entity';

export class NotificationRepository extends Repository<Notification> {}
