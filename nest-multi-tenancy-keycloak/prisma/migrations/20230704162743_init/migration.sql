-- CreateTable
CREATE TABLE "Tenants" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "subdomain" TEXT NOT NULL,
    "name" TEXT
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "type" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "brand" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Tenants_subdomain_key" ON "Tenants"("subdomain");
