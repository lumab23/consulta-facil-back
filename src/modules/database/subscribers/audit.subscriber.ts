import { EntitySubscriberInterface, EventSubscriber, UpdateEvent, InsertEvent } from 'typeorm';

@EventSubscriber()
export class AuditSubscriber implements EntitySubscriberInterface {
  beforeInsert(event: InsertEvent<any>) {
    if (event.entity && 'created_at' in event.entity) {
      event.entity.created_at = new Date();
    }
  }

  beforeUpdate(event: UpdateEvent<any>) {
    if (event.entity && 'updated_at' in event.entity) {
      event.entity.updated_at = new Date();
    }
  }
}