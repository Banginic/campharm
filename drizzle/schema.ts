import { password } from "@/assets/photos";
import { integer, pgTable, serial, varchar, boolean, jsonb, timestamp, time } from "drizzle-orm/pg-core";

export const pharmacyTable = pgTable('pharmacy_table', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  pharmacyName: varchar('pharmacy_name', { length: 255 }).notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  pharmacistName: varchar('pharmacist_name', { length: 50 }).notNull().default('Not Verified'),
  phoneNumber: varchar('phone_number', { length: 20 }).notNull(),
  region: varchar('region', { length: 50 }).notNull(),
  town: varchar('town', { length: 100 }).notNull(),
  address: varchar('address', { length: 100 }).notNull().default(''),
  password: varchar('password', { length: 255 }).notNull(),
  isVerified: boolean("is_verified").notNull().default(false),
  photoId: varchar('photo_id').notNull().default(''),
  licenceNumber: varchar('licence_number', { length: 100 }).notNull().default('N/A'),
  location: jsonb('location').notNull().default({ lat: 0, lng: 0 }),
  isFrozen: boolean('is_frozen').notNull().default(false),
  verificationOTP: varchar('verification_otp', {length: 6}).notNull().default(''),
  verificationOTPExpired: timestamp('otp_expiry_time').notNull().defaultNow(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow(),
  updatedAt: timestamp('updated_at', { mode: 'date' }).defaultNow()

})

export const drugTable = pgTable('drug_table', {
     id: serial("id").primaryKey(),
     tradeName: varchar('trade_name',{ length: 255 }).notNull().default(''),
     description: varchar('description',{ length: 500 }).notNull().default(''),
     dosageForm: varchar('dosage_form',{ length: 255 }),
     dosageStrength: varchar('dosage_strength',{ length: 255 }),
     genericName: varchar('generic_name',{ length: 255 }),
     price: integer('price').default(0).notNull(),
     inStock: boolean('in_stock').default(true).notNull(),
     pharmacyId: integer('pharmacy_id').references(() => pharmacyTable.id, { onDelete: 'cascade'}).notNull(),
     createdAt: timestamp('created_at').notNull().defaultNow()
})

export const dailySchedule = pgTable('daily_schedule_table', {
  id: serial("id").primaryKey(),
  day: varchar('day', { length: 255 }).notNull().default(''),
  isOpen: boolean("is_open").notNull().default(true),
  isOnCall: boolean("is_on_call").notNull().default(false),
  openingTime: time("opening_time").notNull(),
  closingTime: time("closing_time").notNull(),
  pharmacyId: integer('pharmacy_id')
    .references(() => pharmacyTable.id, { onDelete: 'cascade' })
    .notNull()
});
export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50 }).notNull(),
})