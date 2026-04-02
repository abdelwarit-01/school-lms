const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');
  
  // Clear existing
  await prisma.material.deleteMany();
  await prisma.announcement.deleteMany();
  await prisma.user.deleteMany();
  await prisma.class.deleteMany();

  // Create Class
  const class1 = await prisma.class.create({
    data: { name: 'الأولى إعدادي - 1', description: 'القسم الأول' }
  });

  // Create Users (Mock credentials we gave the user)
  await prisma.user.create({
    data: {
      name: 'السيد المدير',
      email: 'modir@nouressafa.ma',
      password: 'modir123',
      role: 'ADMIN',
    }
  });

  const teacher = await prisma.user.create({
    data: {
      name: 'الأستاذ العلوي',
      email: 'ostad@nouressafa.ma',
      password: 'ostad123',
      role: 'TEACHER',
    }
  });

  const student = await prisma.user.create({
    data: {
      name: 'يوسف التلميذ',
      email: '202401', // Using email field as Student ID
      password: 'tlmid123',
      role: 'STUDENT',
      classId: class1.id
    }
  });

  // Add dummy announcement
  await prisma.announcement.create({
    data: {
      title: 'إجتماع أولياء الأمور',
      content: 'نعلمكم أن الإجتماع سيكون يوم الجمعة إن شاء الله.',
      authorId: (await prisma.user.findFirst({ where: { role: 'ADMIN' } })).id
    }
  });

  // Add dummy material
  await prisma.material.create({
    data: {
      title: 'درس النظمات',
      description: 'الجزء الأول من الدرس',
      type: 'LESSON',
      teacherId: teacher.id,
      classId: class1.id
    }
  });

  console.log('Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
