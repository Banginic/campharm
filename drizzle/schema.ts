import { password } from "@/assets/photos";
import { integer, pgTable, serial, varchar, boolean, jsonb } from "drizzle-orm/pg-core";

export const pharmacyTable = pgTable('pharmacy_table', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    pharmacyName: varchar('pharmacy_name', { length: 255}).notNull().unique(),
    email: varchar('email', {length:25}).notNull().unique(),
    pharmacistName: varchar('pharmacist_name', { length: 50}).notNull(). default('No Verified'),
    phoneNumber: varchar('phone_number', { length: 15 }).notNull(),
    region: varchar('region', { length: 15 }).notNull(),
    town: varchar('town', { length: 50 }).notNull(),
    password: varchar('password', { length: 255 }).notNull(),
    isOnCall: boolean("isOnCall").notNull().default(false),
    isVerified: boolean("isVerified").notNull().default(false),
    isOpen: boolean("isOpen").notNull().default(true),
    location: jsonb('location').notNull(),
     weeklySchedule: jsonb("weekly_schedule").notNull()

})

export const drugTable = pgTable('drug_table', {
     id: serial("id").primaryKey(),
     tradeName: varchar('trade_name',{ length: 255 }),
     genericName: varchar('generic_name',{ length: 255 }),
     price: integer('price'),
     pharmacyId: integer('pharmacy_id').references(() => pharmacyTable.id, { onDelete: 'cascade'}).notNull()
})

export const users = pgTable('users', {
    id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
    name: varchar('name', { length: 50 }).notNull(),
})