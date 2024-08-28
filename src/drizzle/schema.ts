import { pgEnum, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const UserEnum = pgEnum("user_role", ["ADMIN", "USER"]);
export const Status = pgEnum("status", ["PENDING", "APPROVED", "REJECTED"]);

export const UserTable = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: UserEnum("role").default("USER").notNull(),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export const outlet = pgTable("outlet", {
  outletID: uuid("outletID").primaryKey().defaultRandom(),
  outletName: text("outletName"),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
  userID: uuid("userID")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(), // Cascade delete when related user is deleted
});

export const FeedBack = pgTable("feedback", {
  feedbackID: uuid("feedbackID").primaryKey().defaultRandom(),
  feedback: text("feedback"),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
  status: Status("status").default("PENDING").notNull(),
  outletID: uuid("outletID")
    .references(() => outlet.outletID, { onDelete: "cascade" })
    .notNull(),
  // Cascade delete when related outlet is deleted
  userID: uuid("userID")
    .references(() => UserTable.id, { onDelete: "cascade" })
    .notNull(),
  // Cascade delete when related user is deleted
});
