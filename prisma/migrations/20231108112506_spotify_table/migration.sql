-- CreateTable
CREATE TABLE "SpotifyProfile" (
    "id" SERIAL NOT NULL,
    "spotifyId" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "refreshToken" TEXT NOT NULL,

    CONSTRAINT "SpotifyProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SpotifyProfile_spotifyId_key" ON "SpotifyProfile"("spotifyId");
