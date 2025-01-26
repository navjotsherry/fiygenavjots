## Generate Data base
echo "Generating database"
docker exec backend npx prisma generate

echo "Migrating the database"
docker exec backend npx prisma migrate dev --name init 

echo "Seeding the database"
docker exec backend node prisma/seed.js


