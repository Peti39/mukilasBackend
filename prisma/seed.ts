/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { PrismaClient, Material } from "../generated/prisma/client"
import { faker } from '@faker-js/faker'
import dotenv from 'dotenv'

dotenv.config()
const prisma = new PrismaClient()

async function main() {
  await prisma.$transaction(async tx =>{



    
    for (let i = 0; i < 10; i++) {
      await tx.kid.create({
        data: {
          name: faker.person.fullName(),
          location: `${faker.location.country()}, ${faker.location.city()}, ${faker.location.streetAddress()}`,
          wasGood: faker.datatype.boolean(),
        },
      })
      
    }
    
    const materials = ['wood', 'metal', 'plastic', 'other']
    for(let i = 0; i < 10; i++){
      await tx.toy.create({
        data: {
          name : faker.commerce.productName(),
          material : faker.helpers.arrayElement(materials) as Material,
          wheight : faker.number.float({ min: 0.1, max: 5.0,multipleOf: 0.1 }),
        },
      })
    }
})
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
