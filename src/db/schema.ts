import {boolean, integer, pgTable, timestamp, uuid, varchar} from "drizzle-orm/pg-core";
import { randomUUID } from "crypto";
import {sql} from "drizzle-orm"


export const usersTable = pgTable("users", {
    id: varchar("id", {length: 100}).primaryKey(),
    name: varchar("name",{ length: 100 }).notNull(),
    email: varchar("email").unique().notNull(),
    password: varchar("password", { length: 100 }).notNull()
})
export const studentTable = pgTable("student", {
    id: varchar("id", {length: 100}).references(() => usersTable.id).primaryKey(),
    college: varchar("college", { length: 100}).notNull(),
    stream: varchar("stream", {length: 100}).notNull(),
    year: integer("year").notNull()
})

export const adminTable = pgTable("admin", {
    id: varchar("id", {length: 100}).references(() => usersTable.id).primaryKey(),
    name: varchar("name", { length: 100 }).notNull()
})

export const ticketTable = pgTable("tickets", {
    id: varchar("id", {length: 100}).primaryKey(), //gen random uuid
    title: varchar("title", {length: 100}).notNull(),
    descriptionID: varchar("descriptionID", {length: 100}).unique().notNull(),
    userID: varchar("userID", {length: 100}).references(() => studentTable.id).notNull(),
    adminID: varchar("adminID", {length: 100}).references(() => adminTable.id).notNull(),
    isValid: boolean("isValid").notNull(),
    createdAt: timestamp("createdAt").notNull()
})
export const descriptionsTable = pgTable("descriptions", {
    id: varchar("id", {length: 100}).references(() => ticketTable.descriptionID).primaryKey(),
    header: varchar("header", {length : 100}).notNull(),
    description: varchar("description", {length : 100}).notNull(),
    footer: varchar("footer", {length : 100}).notNull(),
})