export type Lang = 'ru' | 'en'

export const t = {
  nav: {
    about: { ru: 'Обо мне', en: 'About' },
    experience: { ru: 'Опыт', en: 'Experience' },
    skills: { ru: 'Навыки', en: 'Skills' },
    education: { ru: 'Образование', en: 'Education' },
    projects: { ru: 'Проекты', en: 'Projects' },
    contact: { ru: 'Контакты', en: 'Contact' },
  },
  hero: {
    role: { ru: 'Middle DevOps инженер', en: 'Middle DevOps Engineer' },
    typing: {
      ru: ['Автоматизирую инфраструктуру', 'Строю CI/CD пайплайны', 'Мониторю системы', 'Пишу IaC с Ansible & Terraform'],
      en: ['Automating infrastructure', 'Building CI/CD pipelines', 'Monitoring systems', 'Writing IaC with Ansible & Terraform'],
    },
    cta_projects: { ru: 'Мои проекты', en: 'My Projects' },
    cta_contact: { ru: 'Связаться', en: 'Contact Me' },
    scroll: { ru: 'Скроллить вниз', en: 'Scroll down' },
  },
  about: {
    title: { ru: 'Обо мне', en: 'About Me' },
    text1: {
      ru: 'DevOps-инженер с глубокими знаниями системного администрирования и автоматизации IT-инфраструктуры на базе Astra Linux.',
      en: 'DevOps engineer with deep expertise in system administration and IT infrastructure automation based on Astra Linux.',
    },
    text2: {
      ru: 'Опыт разработки и поддержки инфраструктурных проектов с применением Ansible и Terraform, а также автоматизации процессов в облачных средах Yandex Cloud.',
      en: 'Experience in developing and maintaining infrastructure projects using Ansible and Terraform, as well as automating processes in Yandex Cloud environments.',
    },
    text3: {
      ru: 'Стремлюсь к постоянному развитию в области инфраструктурной автоматизации, контейнеризации и безопасных CI/CD-процессов.',
      en: 'Constantly developing expertise in infrastructure automation, containerization, and secure CI/CD processes.',
    },
  },
  experience: {
    title: { ru: 'Опыт работы', en: 'Work Experience' },
    present: { ru: 'настоящее время', en: 'present' },
    duties: { ru: 'Обязанности', en: 'Responsibilities' },
    achievements: { ru: 'Достижения', en: 'Achievements' },
    stack: { ru: 'Стек технологий', en: 'Tech Stack' },
  },
  skills: {
    title: { ru: 'Навыки', en: 'Skills' },
    categories: {
      devops: { ru: 'DevOps / IaC', en: 'DevOps / IaC' },
      monitoring: { ru: 'Мониторинг', en: 'Monitoring' },
      cloud: { ru: 'Облако', en: 'Cloud' },
      virtualization: { ru: 'Виртуализация', en: 'Virtualization' },
      backup: { ru: 'Резервное копирование', en: 'Backup' },
      os: { ru: 'Операционные системы', en: 'Operating Systems' },
      directory: { ru: 'Службы каталогов', en: 'Directory Services' },
      mail: { ru: 'Почтовые сервисы', en: 'Mail Services' },
      programming: { ru: 'Программирование', en: 'Programming' },
    },
  },
  education: {
    title: { ru: 'Образование', en: 'Education' },
    courses: { ru: 'Курсы и сертификаты', en: 'Courses & Certificates' },
    bachelor: { ru: 'Бакалавр', en: 'Bachelor\'s Degree' },
  },
  contact: {
    title: { ru: 'Контакты', en: 'Contact' },
    subtitle: {
      ru: 'Открыт к интересным предложениям и проектам',
      en: 'Open to interesting opportunities and projects',
    },
    email: { ru: 'Написать письмо', en: 'Send Email' },
    telegram: { ru: 'Написать в Telegram', en: 'Message on Telegram' },
  },
  projects: {
    title: { ru: 'AI Проекты', en: 'AI Projects' },
    subtitle: {
      ru: 'Инструменты и приложения, созданные с применением AI и автоматизации',
      en: 'Tools and applications built with AI and automation',
    },
    github: { ru: 'GitHub', en: 'GitHub' },
    demo: { ru: 'Demo', en: 'Demo' },
    all: { ru: 'Все', en: 'All' },
    noProjects: {
      ru: 'Проекты скоро появятся',
      en: 'Projects coming soon',
    },
  },
  admin: {
    login: { ru: 'Войти', en: 'Login' },
    logout: { ru: 'Выйти', en: 'Logout' },
    password: { ru: 'Пароль', en: 'Password' },
    dashboard: { ru: 'Панель управления', en: 'Dashboard' },
    add_project: { ru: 'Добавить проект', en: 'Add Project' },
    edit_project: { ru: 'Редактировать', en: 'Edit' },
    delete_project: { ru: 'Удалить', en: 'Delete' },
    save: { ru: 'Сохранить', en: 'Save' },
    cancel: { ru: 'Отмена', en: 'Cancel' },
    title_field: { ru: 'Название (RU)', en: 'Title (RU)' },
    title_en_field: { ru: 'Название (EN)', en: 'Title (EN)' },
    desc_field: { ru: 'Описание (RU)', en: 'Description (RU)' },
    desc_en_field: { ru: 'Описание (EN)', en: 'Description (EN)' },
    tech_field: { ru: 'Технологии (через запятую)', en: 'Technologies (comma separated)' },
    github_field: { ru: 'GitHub URL', en: 'GitHub URL' },
    demo_field: { ru: 'Demo URL', en: 'Demo URL' },
    featured_field: { ru: 'Рекомендуемый', en: 'Featured' },
    wrong_password: { ru: 'Неверный пароль', en: 'Wrong password' },
    success_save: { ru: 'Сохранено!', en: 'Saved!' },
    success_delete: { ru: 'Удалено!', en: 'Deleted!' },
  },
  footer: {
    made: { ru: 'Создано с', en: 'Made with' },
    rights: { ru: 'Все права защищены', en: 'All rights reserved' },
  },
}

export function tr(key: { ru: string; en: string }, lang: Lang): string {
  return key[lang]
}
