'use server'

import prisma from '@/lib/prisma'

export async function submitSupportTicket(formData: FormData) {
  const email = formData.get('email') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!email || !subject || !message) {
    return { error: 'Please fill out all fields.' }
  }

  await prisma.supportTicket.create({
    data: {
      email,
      subject,
      message,
    }
  })

  return { success: true }
}
