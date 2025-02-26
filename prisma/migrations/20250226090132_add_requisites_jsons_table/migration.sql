-- CreateEnum
CREATE TYPE "catalog"."RequisiteType" AS ENUM ('PREREQ', 'COREQ', 'ANTIREQ');

-- CreateTable
CREATE TABLE "catalog"."requisites_jsons" (
    "id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "requisite_type" "catalog"."RequisiteType" NOT NULL,
    "text" TEXT NOT NULL,
    "departments" TEXT[],
    "faculties" TEXT[],
    "program" TEXT NOT NULL,
    "jsons" JSONB[],

    CONSTRAINT "requisites_jsons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "requisite_components_unique" ON "catalog"."requisites_jsons"("requisite_type", "text", "departments", "faculties", "program");
