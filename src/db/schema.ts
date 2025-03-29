import { relations } from "drizzle-orm";
import {
    boolean,
    integer,
    jsonb,
    pgTable,
    serial,
    text,
    timestamp,
    varchar
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// 2. Forms Table
export const forms = pgTable('forms', {
  id: serial('id').primaryKey(),
  userId: text('user_id').references(() => user.id, { onDelete: 'cascade' }),
  title: varchar('title', { length: 255 }).notNull(),
  description: text('description'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 3. Form Fields Table
export const formFields = pgTable('form_fields', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').references(() => forms.id, { onDelete: 'cascade' }),
  name: varchar('name', { length: 255 }).notNull(),
  fieldType: varchar('field_type', { length: 50 }).notNull(),
  label: varchar('label', { length: 255 }).notNull(),
  placeholder: varchar('placeholder', { length: 255 }),
  required: boolean('required').default(false),
  options: jsonb('options'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// 4. Form Submissions Table
export const formSubmissions = pgTable('form_submissions', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').references(() => forms.id, { onDelete: 'cascade' }),
  submissionData: jsonb('submission_data').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// 5. Analytics Table
export const analytics = pgTable('analytics', {
  id: serial('id').primaryKey(),
  formId: integer('form_id').references(() => forms.id, { onDelete: 'cascade' }),
  pageViews: integer('page_views').default(0),
  uniqueVisitors: integer('unique_visitors').default(0),
  referrerPlatform: varchar('referrer_platform', { length: 255 }),
  ipAddress: varchar('ip_address', { length: 50 }),
  country: varchar('country', { length: 100 }),
  state: varchar('state', { length: 100 }),
  city: varchar('city', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow(),
});

// 6. Sessions Table
export const formsessions = pgTable('formsessions', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).unique().notNull(),
  formId: integer('form_id').references(() => forms.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
});

// 7. Events Table
export const events = pgTable('events', {
  id: serial('id').primaryKey(),
  sessionId: varchar('session_id', { length: 255 }).references(() => formsessions.sessionId, { onDelete: 'cascade' }),
  eventType: varchar('event_type', { length: 100 }).notNull(),
  eventData: jsonb('event_data'),
  createdAt: timestamp('created_at').defaultNow(),
});

// Relations (Optional, for querying with joins)
export const usersRelations = relations(user, ({ many }) => ({
  forms: many(forms),
}));

export const formsRelations = relations(forms, ({ one, many }) => ({
  user: one(user, {
    fields: [forms.userId],
    references: [user.id],
  }),
  fields: many(formFields),
  submissions: many(formSubmissions),
  analytics: many(analytics),
}));

export const formFieldsRelations = relations(formFields, ({ one }) => ({
  form: one(forms, {
    fields: [formFields.formId],
    references: [forms.id],
  }),
}));

export const formSubmissionsRelations = relations(formSubmissions, ({ one }) => ({
  form: one(forms, {
    fields: [formSubmissions.formId],
    references: [forms.id],
  }),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  form: one(forms, {
    fields: [analytics.formId],
    references: [forms.id],
  }),
}));

export const formsessionsRelations = relations(formsessions, ({ one, many }) => ({
  form: one(forms, {
    fields: [formsessions.formId],
    references: [forms.id],
  }),
  events: many(events),
}));

export const eventsRelations = relations(events, ({ one }) => ({
  session: one(formsessions, {
    fields: [events.sessionId],
    references: [formsessions.sessionId],
  }),
}));

export const authSchema = {user , account, session, verification}