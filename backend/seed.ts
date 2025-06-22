import { connectDB, resetDB } from './utils/dbUtils';
import { ProspectModel } from '../apps/backend/src/modules/prospect/prospect.model';
import { MaterialModel } from '../apps/backend/src/modules/material/material.model';
import { NotificationModel } from '../apps/backend/src/modules/notification/notification.model';
import { OrganizationModel } from '../apps/backend/src/modules/organization/organization.model';
import { TenantModel } from '../apps/backend/src/modules/tenant/tenant.model';
import { TaskModel } from '../apps/backend/src/modules/task/task.model';
import { FormModel } from '../apps/backend/src/modules/form/form.model';
import { DonationModel } from '../apps/backend/src/modules/donation/donation.model';
import { StripeAccountModel } from '../apps/backend/src/modules/stripeAccount/stripeAccount.model';
import { InteractionModel } from '../apps/backend/src/modules/interaction/interaction.model';
import { MessageModel } from '../apps/backend/src/modules/message/message.model';
import { CommentModel } from '../apps/backend/src/modules/comment/comment.model';
import { CallSessionModel } from '../apps/backend/src/modules/callSession/callSession.model';



async function seed() {
  await connectDB();
  await resetDB();

  // Seed tenants
  const tenant = await TenantModel.create({ name: 'Default Tenant' });

  // Seed organizations
  const organization = await OrganizationModel.create({ name: 'Default Org', tenantId: tenant._id });

  // Seed prospects
  await ProspectModel.create([
    { name: 'Prospect One', email: 'one@example.com' },
    { name: 'Prospect Two', email: 'two@example.com' },
  ]);

  // Seed materials
  await MaterialModel.create([
    { name: 'Material One', description: 'Description One' },
    { name: 'Material Two', description: 'Description Two' },
  ]);

  // Seed notifications
  await NotificationModel.create([
    { title: 'Notification One', message: 'Message One', userId: 'user1', read: false },
    { title: 'Notification Two', message: 'Message Two', userId: 'user2', read: true },
  ]);

  // Seed tasks
  await TaskModel.create([
    { title: 'Task One', description: 'Task Desc One', assignedUserId: 'user1' },
    { title: 'Task Two', description: 'Task Desc Two', assignedUserId: 'user2' },
  ]);

  // Seed forms
  await FormModel.create([
    { title: 'Form One', description: 'Form Desc One' },
    { title: 'Form Two', description: 'Form Desc Two' },
  ]);

  // Seed donations
  await DonationModel.create([
    { amount: 100, currency: 'USD', donorName: 'Donor One', paymentMethod: 'card' },
    { amount: 200, currency: 'EUR', donorName: 'Donor Two', paymentMethod: 'paypal' },
  ]);

  // Seed stripe accounts
  await StripeAccountModel.create([
    { userId: 'user1', type: 'express', charges_enabled: true },
    { userId: 'user2', type: 'standard', charges_enabled: false },
  ]);

  // Seed interactions
  await InteractionModel.create([
    { type: 'call', missionId: 'mission1', comment: 'Interaction One' },
    { type: 'email', missionId: 'mission2', comment: 'Interaction Two' },
  ]);

  // Seed messages
  await MessageModel.create([
    { content: 'Message One', userId: 'user1', interactionId: 'interaction1' },
    { content: 'Message Two', userId: 'user2', interactionId: 'interaction2' },
  ]);

  // Seed comments
  await CommentModel.create([
    { content: 'Comment One', userId: 'user1', missionId: 'mission1', moderated: false },
    { content: 'Comment Two', userId: 'user2', missionId: 'mission2', moderated: true },
  ]);

  // Seed call sessions
  await CallSessionModel.create([
    { duration: 3600, userIds: ['user1'], missionId: 'mission1' },
    { duration: 1800, userIds: ['user2'], missionId: 'mission2' },
  ]);

  console.log('Database seeded successfully');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Error seeding database:', err);
  process.exit(1);
});
