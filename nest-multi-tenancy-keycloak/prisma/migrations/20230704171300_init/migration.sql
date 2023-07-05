-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tenant_id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tenantsId" INTEGER,
    CONSTRAINT "User_tenantsId_fkey" FOREIGN KEY ("tenantsId") REFERENCES "Tenants" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
