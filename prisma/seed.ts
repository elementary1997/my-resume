import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Clear existing
  await prisma.project.deleteMany()

  await prisma.project.createMany({
    data: [
      {
        title: 'easySTT',
        titleEn: 'easySTT',
        description:
          'Push-to-talk приложение для преобразования речи в текст на Windows и Linux. Удерживайте хоткей, говорите — текст автоматически вставляется в активное окно. Поддерживает локальный whisper.cpp (офлайн), Cloud.ru Foundation Models и OpenRouter.',
        descriptionEn:
          'Push-to-talk speech-to-text app for Windows and Linux. Hold a hotkey, speak — text is automatically pasted into the active window. Supports local whisper.cpp (offline), Cloud.ru Foundation Models, and OpenRouter.',
        techStack: 'Rust, TypeScript, React, Tauri, whisper.cpp, CUDA, Vulkan',
        githubUrl: 'https://github.com/elementary1997/easySTT',
        demoUrl: '',
        imageUrl: '',
        category: 'ai',
        featured: true,
        sortOrder: 1,
      },
      {
        title: 'Ansible Lint Helper',
        titleEn: 'Ansible Lint Helper',
        description:
          'VS Code расширение для комплексной проверки Ansible-кода: трёхуровневый пайплайн (yamllint → pre-commit → ansible-lint), подсветка ошибок прямо в редакторе, боковая панель с группировкой по файлам, двуязычные сообщения (RU/EN), автоисправление.',
        descriptionEn:
          'VS Code extension for comprehensive Ansible code linting: three-level pipeline (yamllint → pre-commit → ansible-lint), inline error highlighting, side panel with file-based grouping, bilingual messages (RU/EN), auto-fix support.',
        techStack: 'TypeScript, VS Code API, yamllint, ansible-lint, pre-commit',
        githubUrl: 'https://github.com/elementary1997/ansible_formatter_vscode',
        demoUrl: '',
        imageUrl: '',
        category: 'devops',
        featured: true,
        sortOrder: 2,
      },
    ],
  })

  console.log('✅ Seed complete')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
