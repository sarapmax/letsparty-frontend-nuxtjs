export default function (app, inject) {
  // Here is where we set enum variables.
  // Try to use enum variable instead of magic string.

  inject('enum', {
    saveState: {
      create: 'create',
      update: 'update',
    },
    locale: {
      th: 'th',
      en: 'en',
    },
  })
  inject('displayEnum', {
    saveState: {
      create: 'สร้าง',
      update: 'แก้ไข',
    },
  })
}
