-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "full_name" VARCHAR(250) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "password" VARCHAR(250) NOT NULL,
    "phone" VARCHAR(100) NOT NULL,
    "address" VARCHAR(250) NOT NULL,
    "date_birth" TIMESTAMP(3) NOT NULL,
    "gender" VARCHAR(1) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "identity_card" VARCHAR(100) NOT NULL,
    "degree" VARCHAR(100) NOT NULL,
    "institution" VARCHAR(100) NOT NULL,
    "is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tokenization" (
    "id" SERIAL NOT NULL,
    "id_user" INTEGER NOT NULL,
    "access_token" VARCHAR(250) NOT NULL,
    "refresh_token" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tokenization_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tokenization_id_user_key" ON "Tokenization"("id_user");

-- AddForeignKey
ALTER TABLE "Tokenization" ADD CONSTRAINT "Tokenization_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
